import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
// import { API_BASE_URL } from '../utils/api.js';

const Dashboard = () => {
  const navigate = useNavigate();
  const [allTickets, setAllTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserTickets = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('Token:', token); // Debug
        if (!token) {
          setError('You must be logged in to view tickets.');
          return;
        }

        const res = await axios.get(
          `https://ticket-managementser.onrender.com/api/tickets/my-tickets`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log('Fetched tickets:', res.data); // Debug
        setAllTickets(res.data);
      } catch (error) {
        console.error('Error fetching user tickets:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
        setError(error.response?.data?.message || 'Failed to load tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchUserTickets();
  }, []);

  const handleDelete = async (ticketId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('You must be logged in to delete tickets.');
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/tickets/${ticketId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAllTickets(allTickets.filter((t) => t._id !== ticketId));
    } catch (error) {
      console.error('Error deleting ticket:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
      setError(error.response?.data?.message || 'Failed to delete ticket');
    }
  };

  if (loading) {
    return (
      <Container sx={{ mt: 5, textAlign: 'center' }}>
        <CircularProgress />
        <Typography mt={2}>Loading tickets...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          My Tickets
        </Typography>

        <Paper sx={{ p: 3 }}>
          {allTickets.length === 0 ? (
            <Typography>No tickets created yet.</Typography>
          ) : (
            <List>
              {allTickets.map((t) => (
                <Box key={t._id} mb={2}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{t.title || 'Untitled'}</Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        {t.description || 'No description'}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Priority:</strong> {t.priority || 'Unknown'} |{' '}
                        <strong>Status:</strong> {t.status || 'Open'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        component={Link}
                        to={`/edit/${t._id}`}
                        variant="contained"
                        sx={{ backgroundColor: 'orange', color: 'white' }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(t._id)}
                        variant="outlined"
                        sx={{ color: 'red', borderColor: 'red' }}
                      >
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
