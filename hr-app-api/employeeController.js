// employeeController.js

const Employee = require('./models/employee.model')
  
  // Controller function to handle GET request for /api/employee-hours
  exports.getEmployeeHours = async (req, res) => {
    try {
      // Assuming you have a schema and model for Employee
      const employees = await Employee.find();
  
      res.status(200).json(employees);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, email, hours } = req.body;
        // Create a new employee object
        const employee = new Employee({
          firstName,
          lastName,
          email,
          hours, // Make sure to include the email field
        });
        // Save the employee to the database
        await employee.save();
        // Respond with a success message or the created employee data
        res.json(employee);
      } catch (error) {
        // Handle errors here
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
  };
  