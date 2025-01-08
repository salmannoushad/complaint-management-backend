const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  createUser: async (name, email, password, role) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    return db.promise().query(query, [name, email, hashedPassword, role]);
  },

  findByEmail: (email) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    return db.promise().query(query, [email]);
  },

  findById: (id) => {
    const query = `SELECT * FROM users WHERE id = ?`;
    return db.promise().query(query, [id]);
  },

  updateRole: (userId, newRole) => {
    const query = 'UPDATE users SET role = ? WHERE id = ?';
    return db.promise().execute(query, [newRole, userId]);
  },
};

module.exports = User;
