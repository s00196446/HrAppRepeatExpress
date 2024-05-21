const express = require('express');
const router = express.Router();
const EmployeeController = require('../employeeController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');

// Public route to get employee list
router.get('/', EmployeeController.getEmployeeHours);

// Admin-only routes
router.post('/', authenticateToken, authorizeAdmin, EmployeeController.createEmployee);
router.put('/:id', authenticateToken, authorizeAdmin, EmployeeController.updateEmployee);
router.delete('/:id', authenticateToken, authorizeAdmin, EmployeeController.deleteEmployee);

module.exports = router;
