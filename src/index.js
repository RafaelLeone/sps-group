const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const authenticateToken = require('./authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

// Middleware to protect routes that require authentication
app.use((req, res, next) => {
  // Exclude authentication check for specific routes here
  if (req.path === '/users' || req.path.startsWith('/users/')) {
    return next(); // Skip authentication middleware for /users and /users/:userId
  }
  authenticateToken(req, res, next); // Apply authentication middleware for other routes
});

// Your application routes
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
