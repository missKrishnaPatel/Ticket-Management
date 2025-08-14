
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Paper, Typography } from '@mui/material';

const EditTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const existingTicket = tickets.find(t => t.id.toString() === id);
    if (existingTicket) {
      setTicket(existingTicket);
    }
  }, [id]);

  const handleSave = () => {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const updated = tickets.map(t => t.id.toString() === id ? ticket : t);
    localStorage.setItem('tickets', JSON.stringify(updated));
    navigate(`/dashboard/${id}`);
  };

  if (!ticket) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>Edit Ticket</Typography>
        <TextField
          fullWidth
          label="Title"
          value={ticket.title}
          onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={ticket.description}
          onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
          margin="normal"
          multiline
          rows={4}
        />
        <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>Save</Button>
      </Paper>
    </Container>
  );
};

export default EditTicket;
