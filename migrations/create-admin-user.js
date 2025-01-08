// migrations/20250108-create-admin-user.js
require('dotenv').config();
const db = require('../src/config/database');

async function createAdminUser() {
  const passwordHash = '$2a$10$eDGCdV5.MuOnLFICPqx9X.fN1Kn1Qi7Jr56Txi17aIVbD5Tg6knGu'; // Provided hashed password
  const adminUser = {
    name: 'Salman',
    email: 'salman@example.com', // Set a default admin email
    password: passwordHash,
    role: 'Admin',
  };

  try {
    // Insert the admin user into the users table
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;
    await db.promise().query(query, [adminUser.name, adminUser.email, adminUser.password, adminUser.role]);
    console.log('Admin user created successfully');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

// Call the function to create the admin user
createAdminUser();

module.exports = createAdminUser;
