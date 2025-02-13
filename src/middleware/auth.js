const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const authMiddleware = async (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split('Bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
  }
};

module.exports = authMiddleware;