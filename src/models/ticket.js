const db = require('../config/database');

const Ticket = {
  createTicket: (subject, description, customerId, customerName) => {
    const query = `INSERT INTO tickets (subject, description, customer_id, customer_name, status) VALUES (?, ?, ?, ?, 'Open')`;
    return db.promise().query(query, [subject, description, customerId, customerName]);
  },

  getAllTickets: () => {
    const query = `SELECT * FROM tickets`;
    return db.promise().query(query);
  },

  getUserTickets: (customerId) => {
    const query = `SELECT * FROM tickets WHERE customer_id = ?`;
    return db.promise().query(query, [customerId]);
  },

  getTicketById: (id) => {
    const query = `SELECT * FROM tickets WHERE id = ?`;
    return db.promise().query(query, [id]);
  },

  deleteTicket: (id) => {
    const query = `DELETE FROM tickets WHERE id = ?`;
    return db.promise().query(query, [id]);
  },

  updateTicket: (id, subject, description) => {
    const query = `UPDATE tickets SET subject = ?, description = ? WHERE id = ?`;
    return db.promise().query(query, [subject, description, id]);
  },
  
  
  updateTicketStatus: (id, status) => {
    const query = `UPDATE tickets SET status = ? WHERE id = ?`;
    return db.promise().query(query, [status, id]);
  },

  addReplyToTicket: (ticketId, message, adminId, adminName) => {
    const query = `INSERT INTO ticket_replies (ticket_id, message, admin_id, admin_name) VALUES (?, ?, ?, ?)`;
    return db.promise().query(query, [ticketId, message, adminId, adminName]);
  },

  // Fetch all replies for a ticket
  getTicketReplies: (ticketId) => {
    const query = `SELECT * FROM ticket_replies WHERE ticket_id = ?`;
    return db.promise().query(query, [ticketId]);
  },

  // Check if the ticket belongs to a specific customer
  getCustomerTicketById: (ticketId, customerId) => {
    const query = `SELECT * FROM tickets WHERE id = ? AND customer_id = ?`;
    return db.promise().query(query, [ticketId, customerId]);
  },
  
};

module.exports = Ticket;
