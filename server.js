// server.js

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;

// Example user database (replace with your actual authentication logic)
const users = [
  { username: 'admin', password: '1234' },
  { username: 'user', password: 'password' }
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Load users from JSON file
let users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

// Endpoint to create a new user
app.post('/users', (req, res) => {
  const { username, email, password, type } = req.body;

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists.' });
  }

  // Generate an auto-incremented id (simplified for example)
  const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  const newUser = { id, username, email, password, type };
  users.push(newUser);

  // Update users.json file
  fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));

  // Generate JWT token
  const token = jwt.sign({ username, email }, 'your_secret_key', { expiresIn: '1h' });

  // Return token and new user data as response
  res.status(201).json({ id, username, email, type, token });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
