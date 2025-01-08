const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

dotenv.config();

const app = express();

app.use(express.json()); // To parse JSON request bodies
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

module.exports = app;
