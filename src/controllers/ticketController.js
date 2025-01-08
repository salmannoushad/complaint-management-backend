const Ticket = require('../models/ticket');

const ticketController = {
  createTicket: async (req, res) => {
    const { subject, description } = req.body;
    const customerId = req.user.id;

    const [result] = await Ticket.createTicket(subject, description, customerId);
    res.status(201).json({ message: 'Ticket created successfully', ticketId: result.insertId });
  },

  getAllTickets: async (req, res) => {
    const [tickets] = await Ticket.getAllTickets();
    res.status(200).json(tickets);
  },

  updateTicketStatus: async (req, res) => {
    const { status } = req.body;
    const { ticketId } = req.params;

    await Ticket.updateTicketStatus(ticketId, status);
    res.status(200).json({ message: 'Ticket status updated' });
  },

  replyToTicket: async (req, res) => {
    const { message } = req.body;
    const { ticketId } = req.params;
    const adminId = req.user.id;

    await Ticket.addReplyToTicket(ticketId, message, adminId);
    res.status(200).json({ message: 'Reply added to ticket' });
  }
};

module.exports = ticketController;
