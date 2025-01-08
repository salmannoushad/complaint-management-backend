const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

// Login route
router.post('/login', authController.login);
// Registration route
router.post('/register', authController.register);
//update role
router.put('/update-role', authMiddleware, roleMiddleware(['Admin']), authController.updateUserRole);


module.exports = router;
