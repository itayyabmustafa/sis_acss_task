const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(error);
    res.status(401).json({ error: 'Token is not valid' });
  }
};

module.exports = authMiddleware;