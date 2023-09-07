

const Employee = require('./models/employee.model')

  exports.getEmployeeHours = async (req, res) => {
    try {
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
        const employee = new Employee({
          firstName,
          lastName,
          email,
          hours,
        });
        // Save the employee to the database
        await employee.save();
        // Respond with a success message or the created employee data
        res.json(employee);
      } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
  };
  