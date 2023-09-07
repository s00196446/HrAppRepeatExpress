const express = require('express');
const router = express.Router();
const EmployeeController = require('../employeeController');

// Define a GET route for /api/employee-hours
router.get('/', EmployeeController.getEmployeeHours);
router.post('/', EmployeeController.createEmployee);

module.exports = router;

