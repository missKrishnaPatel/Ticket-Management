import Ticket from '../models/Ticket.js';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import mongoose from 'mongoose';

export const createTicket = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const { title, description, priority } = req.body;
    if (!title || !description || !priority) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user;
    if (decoded.id) {
      user = await Admin.findById(decoded.id);
    } else if (decoded.email) {
      user = await Admin.findOne({ email: decoded.email });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const ticket = new Ticket({
      title,
      description,
      priority,
      user: user._id,
    });

    await ticket.save();
    res.status(201).json({ message: 'Ticket successfully created' });
  } catch (error) {
    console.error('Error creating ticket:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const tickets = await Ticket.find().populate('user', 'name email');
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUserTickets = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    let user;
    if (decoded.id) {
      user = await Admin.findById(decoded.id);
    } else if (decoded.email) {
      user = await Admin.findOne({ email: decoded.email });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const tickets = await Ticket.find({ user: user._id }).populate('user', 'name email');
    res.status(200).json(tickets);
  } catch (error) {
    console.error('Error fetching user tickets:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findById(req.params.id).populate('user', 'name email');
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const updateTicketStatus = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);
    } catch (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const { status } = req.body;
    console.log('Received status:', status);
    if (!['open', 'pending', 'resolved'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    ticket.status = status;
    await ticket.save();
    console.log('Updated ticket:', ticket);

    res.status(200).json({ message: 'Status updated successfully', ticket });
  } catch (error) {
    console.error('Error updating ticket status:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error('JWT verification error:', err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ticket ID' });
    }

    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    await ticket.deleteOne();
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', { message: error.message, stack: error.stack });
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};