import express from 'express';
import { createTicket, getAllTickets,getUserTickets, getTicketById, updateTicketStatus, deleteTicket } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', createTicket);
router.get('/', getAllTickets);
router.get('/my-tickets', getUserTickets);
router.get('/:id', getTicketById);
router.patch('/:id/status', updateTicketStatus);
router.delete('/:id', deleteTicket);

export default router;