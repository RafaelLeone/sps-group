// src/authRoutes.js

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const users = require('./users.json');

const authRoutes = Router();

authRoutes.post('/users', (req, res) => {
  // Here, validate the credentials (e.g., username and password) from req.body

  // For simplicity, assume authentication is successful and generate a token
  const username = req.body.username;
  const user = users.find(user => user.name === username);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});

module.exports = authRoutes;
