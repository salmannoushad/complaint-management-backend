// src/services/userService.js
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const createUser = async (name, email, password, role) => {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const [existingUser] = await User.findByEmail(email);
    if (existingUser.length > 0) {
      throw new Error('Email is already registered');
    }

    // Create the user
    const result = await User.createUser(name, email, hashedPassword, role);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser };
