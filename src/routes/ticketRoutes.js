const express = require('express');
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('Customer'), ticketController.createTicket);
router.get('/', authMiddleware, roleMiddleware('Admin'), ticketController.getAllTickets);
router.patch('/:ticketId/status', authMiddleware, roleMiddleware('Admin'), ticketController.updateTicketStatus);
router.post('/:ticketId/reply', authMiddleware, roleMiddleware('Admin'), ticketController.replyToTicket);

module.exports = router;
