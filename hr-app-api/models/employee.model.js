const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  hours: Number
  // Add more fields as needed
});

module.exports = mongoose.model('Employee', employeeSchema);