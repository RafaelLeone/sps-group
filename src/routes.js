const { Router } = require("express");
const fs = require("fs");
const path = require("path");

const routes = Router();
const usersFilePath = path.join(__dirname, "users.json");

const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading users file:", err);
    return [];
  }
};

const writeUsersToFile = (users) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error("Error writing users file:", err);
  }
};

// Create a new user
routes.post("/users", (req, res) => {
  const users = readUsersFromFile();
  const user = req.body;
  users.push(user);
  writeUsersToFile(users);
  res.status(201).send(user);
});

// Read all users
routes.get("/users", (req, res) => {
  const users = readUsersFromFile();
  res.send(users);
});

// Read a single user by email
routes.get("/users/:email", (req, res) => {
  const users = readUsersFromFile();
  const { email } = req.params;
  const user = users.find(u => u.email === email);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

// Update a user by email
routes.put("/users/:email", (req, res) => {
  const users = readUsersFromFile();
  const { email } = req.params;
  const index = users.findIndex(u => u.email === email);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    writeUsersToFile(users);
    res.send(users[index]);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

// Delete a user by email
routes.delete("/users/:email", (req, res) => {
  let users = readUsersFromFile();
  const { email } = req.params;
  users = users.filter(u => u.email !== email);
  writeUsersToFile(users);
  res.status(204).send();
});

module.exports = routes;
