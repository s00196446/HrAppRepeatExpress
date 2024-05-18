//authRoutes.js//

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Dummy user data (replace with actual user data from your database)
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'user' },
  { id: 2, username: 'admin1', password: 'adminpassword1', role: 'admin' }
];

router.post('/login', (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  // Find user in the users array by username and password
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // If user is found, generate JWT token
    const token = jwt.sign({ sub: user.id, username: user.username, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ access_token: token });
  } else {
    // If user is not found, return unauthorized status
    res.status(401).json({ message: 'Unauthorized' });
  }
});

module.exports = router;