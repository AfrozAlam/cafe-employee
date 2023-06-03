const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const Employee = require('../models/Employee');
const mongoose = require('mongoose');

// @route     GET /employee?cafe=<cafe>
// @desc      Get all employee or employee based on cafe
// @access    Public
router.get('/', async (req, res) => {
  const { cafe } = req.query;
  if(cafe && !/^[0-9a-fA-F]{24}$/.test(cafe)) return res.status(400).send({msg: 'cafe must be a string of 12 bytes or a string of 24 hex characters'});
  try {
    const matchStage = cafe ? { $match: { cafe: new mongoose.Types.ObjectId(cafe) } } : { $match: {} };
    let employees = await Employee.aggregate([ matchStage,
      { $lookup: { from: 'cafemodels', localField: 'cafe', foreignField: '_id', as: 'cafeInfo', }, },
      { $addFields: { days_worked: { $divide: [{ $subtract: [new Date(), { $ifNull: ['$start_date', new Date()] }] }, 1000 * 60 * 60 * 24], }, }, },
      { $unwind: { path: '$cafeInfo', preserveNullAndEmptyArrays: true } },
      { $project: { _id: 1, name: 1, email_address: 1, phone_number: 1, gender: 1, cafe: { $ifNull: ['$cafeInfo.name', ''] }, days_worked: 1, }, },
      { $sort: { days_worked: -1 } },
    ]);

    res.json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST /employee
// @desc      Add new employee
// @access    Public
router.post(
  '/',
  [
    [
      check('name').notEmpty().withMessage('Name is required'),
      check('email_address').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email'),
      check('phone_number').notEmpty().withMessage('Phone is required').matches(/^[89]\d{7}$/).withMessage('Invalid phone number'),
      check('gender').notEmpty().withMessage('Gender is required').isIn(['male', 'female']).withMessage('Invalid gender'),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const { name, email_address, phone_number, gender, cafe, start_date } = req.body;

    try {
      let employeeFound = await Employee.findOne({name, email_address, phone_number, gender});

      if (employeeFound) return res.status(404).json({msg: 'Employee exists ! please add other employee details'});

      const newEmployee = new Employee({
        name,
        email_address,
        phone_number,
        gender,
        cafe,
        start_date
      });

      const employee = await newEmployee.save();

      res.json(employee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT /employee/:id
// @desc      Update employee
// @access    Public
router.put('/:id', async (req, res) => {
  const { name, email_address, phone_number, gender, cafe, start_date } = req.body;

  // Build contact object
  const employeeFields = {};
  if (name) employeeFields.name = name;
  if (email_address) employeeFields.email_address = email_address;
  if (phone_number) employeeFields.phone_number = phone_number;
  if (gender) employeeFields.gender = gender;
  if (cafe) employeeFields.cafe = cafe;
  if (start_date) employeeFields.start_date = start_date;

  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({msg: 'Employee not found'});

    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      {$set: employeeFields},
      {new: true},
    );

    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE /employee/:id
// @desc      Delete employee
// @access    Public
router.delete('/:id', async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) return res.status(404).json({msg: 'Employee not found'});

    employee = await Employee.findByIdAndRemove(req.params.id);

    // res.json({msg: 'Employee removed'});
    res.json(employee);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;