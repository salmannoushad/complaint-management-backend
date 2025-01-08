const Ticket = require('../models/ticket');

const ticketController = {
  createTicket: async (req, res) => {
    const { subject, description } = req.body;
    const customerId = req.user.id;

    try {
      const [result] = await Ticket.createTicket(subject, description, customerId);
      res.status(201).json({ message: 'Ticket created successfully', ticketId: result.insertId });
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getAllTickets: async (req, res) => {
    try {
      const [tickets] = await Ticket.getAllTickets();
      res.status(200).json(tickets);
    } catch (error) {
      console.error('Error fetching all tickets:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getUserTickets: async (req, res) => {
    const customerId = req.user.id;
    console.log('customerId for getUserTickets: ', customerId);

    try {
      const [tickets] = await Ticket.getUserTickets(customerId);
      res.status(200).json(tickets);
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  updateTicketStatus: async (req, res) => {
    const { status } = req.body;
    const { ticketId } = req.params;

    try {
      await Ticket.updateTicketStatus(ticketId, status);
      res.status(200).json({ message: 'Ticket status updated' });
    } catch (error) {
      console.error('Error updating ticket status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  replyToTicket: async (req, res) => {
    const { message } = req.body;
    const { ticketId } = req.params;
    const adminId = req.user.id;

    console.log(message, ticketId, adminId);


    try {
      await Ticket.addReplyToTicket(ticketId, message, adminId);
      res.status(200).json({ message: 'Reply added to ticket' });
    } catch (error) {
      console.error('Error adding reply to ticket:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = ticketController;
