const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

const Cafe = require('../models/Cafe');
const Employee = require('../models/Employee');

// @route     GET /cafe?location=<location>
// @desc      Get all cafes or cafes based on location 
// @access    Public
router.get('/', async (req, res) => {
  const { location } = req.query;
  let cafes;
  try {
    if (location) {
      cafes = await Cafe.aggregate([
        { $match: { location } },
        { $lookup: { from: 'cafemodels', localField: '_id', foreignField: 'cafe', as: 'employees' } },
        { $project: { name: 1, description: 1, location: 1, employeeCount: { $size: '$employees' } } },
        { $sort: { employeeCount: -1 } }
      ]);
    } else {
      cafes = await Cafe.aggregate([
        { $lookup: { from: 'employeemodels', localField: '_id', foreignField: 'cafe', as: 'employees' } },
        { $project: { name: 1, description: 1, location: 1, employeeCount: { $size: '$employees' } } },
        { $sort: { employeeCount: -1 } }
      ]);
    }
    
    res.json(cafes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST /cafe
// @desc      Add new cafe
// @access    Public
router.post(
  '/',
  [
    [
      check('name').notEmpty().withMessage('Name is required'),
      check('description').notEmpty().withMessage('Description is required'),
      check('location').notEmpty().withMessage('Location is required'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const { name, description, location } = req.body;

    try {
      let cafeFound = await Cafe.findOne({name, description, location});

      if (cafeFound) return res.status(404).json({msg: 'Cafe exists ! please add other cafe details'});

      const newCafe = new Cafe({
        name,
        description,
        location,
      });

      const cafe = await newCafe.save();

      res.json(cafe);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT /cafe/:id
// @desc      Update cafe
// @access    Public
router.put('/:id', async (req, res) => {
  const { name, description, location } = req.body;

  // Build contact object
  const cafeFields = {};
  if (name) cafeFields.name = name;
  if (description) cafeFields.description = description;
  if (location) cafeFields.location = location;

  try {
    let cafe = await Cafe.findById(req.params.id);

    if (!cafe) return res.status(404).json({msg: 'Cafe not found'});

    cafe = await Cafe.findByIdAndUpdate(
      req.params.id,
      {$set: cafeFields},
      {new: true},
    );

    res.json(cafe);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE /cafe/:id
// @desc      Delete cafe
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let cafe = await Cafe.findById(req.params.id);

    if (!cafe) return res.status(404).json({msg: 'Cafe not found'});
    const employee = await Employee.deleteMany({cafe: req.params.id})
    cafe = await Cafe.findByIdAndRemove(req.params.id);

    // res.json({msg: `Cafe removed with employee ${employee.deletedCount}`});
    res.json(cafe)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;