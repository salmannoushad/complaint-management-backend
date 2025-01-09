const Ticket = require('../models/ticket');

const ticketController = {
  createTicket: async (req, res) => {
    const { subject, description } = req.body;
    const customerId = req.user.id;
    const customerName = req.user.name;

    try {
      const [result] = await Ticket.createTicket(subject, description, customerId, customerName);
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

  updateTicket: async (req, res) => {
    const { ticketId } = req.params;
    const { subject, description } = req.body;
    const customerId = req.user.id;

    // console.log('update ticketId, customerId: ', ticketId, customerId);
    
  
    try {
      // Verify if the ticket belongs to the customer
      const [result] = await Ticket.getTicketById(ticketId);
      const ticket = result[0];
      // console.log('ticket', ticket);
      
      if (!ticket || ticket.customer_id !== customerId) {
        return res.status(403).json({ message: 'You are not authorized to update this ticket' });
      }
  
      // Update the ticket
      await Ticket.updateTicket(ticketId, subject, description);
      res.status(200).json({ message: 'Ticket updated successfully' });
    } catch (error) {
      console.error('Error updating ticket:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  deleteTicket: async (req, res) => {
    const { ticketId } = req.params;
    const customerId = req.user.id;
  
    try {
      // Verify if the ticket belongs to the customer or if the user is an admin
      const [result] = await Ticket.getTicketById(ticketId);
      const ticket = result[0];
      if (!ticket) {
        return res.status(404).json({ message: 'Ticket not found' });
      }
  
      if (ticket.customer_id !== customerId && req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'You are not authorized to delete this ticket' });
      }
  
      // Delete the ticket
      await Ticket.deleteTicket(ticketId);
      res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
      console.error('Error deleting ticket:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  

  updateTicketStatus: async (req, res) => {
    const { status } = req.body;
    const { ticketId } = req.params;

    console.log(status, ticketId);
    

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
    const adminName = req.user.name;

    // console.log('adminName', adminName);
    

    console.log(message, ticketId, adminId, adminName);


    try {
      await Ticket.addReplyToTicket(ticketId, message, adminId, adminName);
      res.status(200).json({ message: 'Reply added to ticket' });
    } catch (error) {
      console.error('Error adding reply to ticket:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getTicketReplies: async (req, res) => {
    const { ticketId } = req.params;
    const userId = req.user.id; // Authenticated user's ID
    const userRole = req.user.role; // Authenticated user's role
  
    try {
      if (userRole === 'Customer') {
        // Verify the ticket belongs to the customer
        const [ticket] = await Ticket.getCustomerTicketById(ticketId, userId);
  
        if (!ticket || ticket.length === 0) {
          return res.status(403).json({ message: 'You are not authorized to view replies for this ticket' });
        }
  
        // Fetch replies for the customer's ticket
        const [replies] = await Ticket.getTicketReplies(ticketId);
  
        if (replies.length === 0) {
          return res.status(200).json([{ message: 'No replies found for this ticket' }]);
        }
  
        console.log('replies', replies);
        return res.status(200).json(replies);
      }
  
      if (userRole === 'Admin') {
        // Admin can fetch all replies for the ticket
        const [replies] = await Ticket.getTicketReplies(ticketId);
  
        if (replies.length === 0) {
          return res.status(200).json([{ message: 'No replies found for this ticket' }]);
        }
  
        return res.status(200).json(replies);
      }
  
      return res.status(403).json({ message: 'You are not authorized to view replies' });
    } catch (error) {
      console.error('Error fetching ticket replies:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  
  
};

module.exports = ticketController;
