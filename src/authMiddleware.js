// src/authMiddleware.js

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  // Bypass authentication for specific routes or methods
  if (req.method === 'OPTIONS') { // Example: Allow preflight requests
    return next();
  }

  if (req.path === '/users') {
    return next(); // Allow access without token verification for /users
  }

  if (token == null) {
    return res.sendStatus(401); // Unauthorized for other routes without token
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }
    req.user = user;
    next(); // Pass the execution to the next middleware
  });
}

module.exports = authenticateToken;
