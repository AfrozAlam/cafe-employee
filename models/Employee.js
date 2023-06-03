const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  _id: {
    type: String,
    default: () => {
      let alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let uid = 'UI';
      for (let i = 0; i < 7; i++) {
        uid += alphanumeric.charAt(Math.floor(Math.random() * alphanumeric.length));
      }
      return uid;
    }
  },
  name: {
    type: String,
    required: true
  },
  email_address: {
    type: String,
    required: true
  },
  phone_number: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  cafe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cafemodels'
  },
  start_date: {
    type: Date,
  }
});

module.exports = mongoose.model('EmployeeModel', EmployeeSchema);