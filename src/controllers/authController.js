const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model
const dotenvConfig = require('../config/dotenv'); // To access JWT_SECRET
const userService = require('../services/userService');

const authController = {
  // User Login
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Check if user exists
      const [userRows] = await User.findByEmail(email);

      if (userRows.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const user = userRows[0];
      console.log("user", user.password);
      

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("isMatch",  isMatch);
      
      // if (!isMatch) {
      //   return res.status(400).json({ message: 'Invalid credentialsssss' });
      // }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // User Registration
  register: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      // Force role to 'Customer' if not provided or unauthorized
      const userRole = role && role === 'Admin' ? 'Admin' : 'Customer';

      // Create the user via service
      const result = await userService.createUser(name, email, password, userRole);

      if (result && result[0] && result[0].affectedRows > 0) {
        res.status(201).json({ message: 'User registered successfully' });
      } else {
        res.status(500).json({ message: 'Failed to register user' });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ message: error.message || 'Internal server error' });
    }
  },

  //update role update
  updateUserRole: async (req, res) => {
    const { userId, newRole } = req.body;

    try {
      // Only allow Admins to update roles
      if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'You do not have permission to update roles' });
      }

      // Ensure the new role is valid
      if (!['Admin', 'Customer'].includes(newRole)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      // Update user role
      const result = await User.updateRole(userId, newRole);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'User role updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = authController;
