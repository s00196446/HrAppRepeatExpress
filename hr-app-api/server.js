const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/HrApp', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const Employee = require('./models/employee.model');


  
const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employee-hours', employeeRoutes);
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});