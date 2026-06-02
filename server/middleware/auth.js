const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Accept both x-auth-token and Authorization: Bearer <token>
  const token = req.header('x-auth-token') ||
    (req.headers.authorization?.startsWith('Bearer ') && req.headers.authorization.split(' ')[1]);

  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
