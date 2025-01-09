const db = require('../config/database');

const Ticket = {
  createTicket: (subject, description, customerId) => {
    const query = `INSERT INTO tickets (subject, description, customer_id, status) VALUES (?, ?, ?, 'Open')`;
    return db.promise().query(query, [subject, description, customerId]);
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

  addReplyToTicket: (ticketId, message, adminId) => {
    const query = `INSERT INTO ticket_replies (ticket_id, message, admin_id) VALUES (?, ?, ?)`;
    return db.promise().query(query, [ticketId, message, adminId]);
  }
};

module.exports = Ticket;
