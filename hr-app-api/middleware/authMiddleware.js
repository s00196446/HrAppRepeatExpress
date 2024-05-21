// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = {
  authenticateToken: (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  },

  authorizeAdmin: (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Access denied' });
    }
    next();
  }
};
