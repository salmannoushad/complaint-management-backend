// src/services/userService.js
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const db = require('../config/database');

const createUser = async (name, email, password, role) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password during registration:", hashedPassword);

    // Check if user exists
    const [existingUser] = await User.findByEmail(email);
    if (existingUser.length > 0) {
      throw new Error('Email is already registered');
    }

    // Create the user
    const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    return db.promise().query(query, [name, email, hashedPassword, role]);
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser };
