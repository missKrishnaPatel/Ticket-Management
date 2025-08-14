import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  priority: {
    type: String,
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  status: {
    type: String,
    required: true,
    enum: ['open', 'pending', 'resolved'], // Aligned with frontend
    default: 'open',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', // Reference to Admin model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Ticket', ticketSchema);