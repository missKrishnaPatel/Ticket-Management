import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  Paper,
  Alert,
  AppBar,
  Toolbar,
} from '@mui/material';
import { Link } from 'react-router-dom';
// import { API_BASE_URL } from '../utils/api.js';

function Form() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to create a ticket.');
      setMessageType('error');
      return;
    }

    const ticketData = {
      title,
      description,
      priority,
    };

    try {
      await axios.post(
        `http://localhost:5000/api/tickets/`,
        ticketData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('✅ Ticket successfully created!');
      setMessageType('success');
      setTitle('');
      setDescription('');
      setPriority('medium');
    } catch (error) {
      console.error('Error:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      setMessage(error.response?.data?.message || '❌ Failed to create ticket');
      setMessageType('error');
    }
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {/* Header */}
      <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHY7BfCRxRS0dsrbW_5g97mic8TuwVXmMigQ&s"
              alt="Logo"
              sx={{ width: 40, height: 40, mr: 2 }}
            />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Ticket Management
            </Typography>
          </Box>
          <Box>
            <Button component={Link} to="/" color="inherit">Home</Button>
            <Button component={Link} to="/dashboard" color="inherit">View Tickets</Button>
            <Button component={Link} to="/" color="inherit">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Ticket Form */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          py: 10,
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={6}
            sx={{
              padding: 5,
              borderRadius: 4,
              backgroundColor: 'white',
              boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Box
                component="img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGSKTG1S0m4qAx3I2i_3haOYF9YWPXygzg2Q&s"
                alt="Form Logo"
                sx={{ width: 60, height: 60, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'gray' }}>
                Create a New Ticket
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} noValidate>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <TextField
                fullWidth
                select
                label="Priority"
                margin="normal"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>

              <Button
                variant="contained"
                sx={{
                  mt: 3,
                  backgroundColor: 'orange',
                  color: 'white',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#ff9900',
                  },
                }}
                type="submit"
                fullWidth
              >
                Submit Ticket
              </Button>

              {message && (
                <Alert severity={messageType} sx={{ mt: 2 }}>
                  {message}
                </Alert>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          bgcolor: '#f0f0f0',
          color: 'black',
          py: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="body2">
          © {new Date().getFullYear()} Ticket Management System. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

export default Form;
