import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
// import { API_BASE_URL } from '../utils/api.js';

const History = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Please log in as admin to view tickets.');
      return;
    }

    const fetchTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched tickets:', response.data); // Debug log
        setTickets(response.data);
      } catch (err) {
        console.error('Error fetching tickets:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });
        setError(err.response?.data?.message || 'Failed to load tickets.');
      }
    };

    fetchTickets();
  }, []);

  return (
    <>
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
            <Button component={Link} to="/create" color="inherit">Create Ticket</Button>
            <Button component={Link} to="/" color="inherit">Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundColor: '#f0f0f0',
          minHeight: '100vh',
          pt: 10,
          pb: 10,
        }}
      >
        <Container maxWidth="lg">
          {error && (
            <Typography variant="h6" color="error" align="center">
              {error}
            </Typography>
          )}

          <TableContainer component={Paper} elevation={6}>
            <Table>
              <TableHead sx={{ backgroundColor: 'gray' }}>
                <TableRow>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Priority</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Created By</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket._id}>
                    <TableCell>{ticket.title || 'Untitled'}</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>{ticket.description || 'No description'}</TableCell>
                    <TableCell>{ticket.status || 'Open'}</TableCell>
                    <TableCell>{ticket.priority || 'Unknown'}</TableCell>
                    <TableCell>{ticket.user?.name || 'Unknown'}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        component={Link}
                        to={`/detail/${ticket._id}`}
                        sx={{
                          backgroundColor: 'orange',
                          color: 'white',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: '#003cb3',
                          },
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>

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
};

export default History;
