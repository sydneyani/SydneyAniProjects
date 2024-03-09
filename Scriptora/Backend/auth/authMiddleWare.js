/* eslint-disable prettier/prettier */
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('Something went wrong with the auth middleware', err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};
