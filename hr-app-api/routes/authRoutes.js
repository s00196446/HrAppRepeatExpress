const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// Dummy user data
const users = [
  { id: 1, username: 'user1', password: 'password1', role: 'user' },
  { id: 2, username: 'admin1', password: 'adminpassword1', role: 'admin' }
];

router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });

  newUser.save((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error registering new user' });
    }
    res.status(200).json({ message: 'User registered successfully' });
  });
});


router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = jwt.sign({ sub: user._id, username: user.username, role: user.role }, 'secretkey', { expiresIn: '1h' });
  res.status(200).json({ access_token: token });
});

module.exports = router;