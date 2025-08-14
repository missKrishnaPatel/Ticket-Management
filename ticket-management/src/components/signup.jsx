import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { API_BASE_URL } from '../utils/api.js';

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSignup = async () => {
  try {
    const res = await axios.post(`https://ticket-managementser.onrender.com/api/auth/signup`, formData);
    console.log('Signup Success:', res.data);
    navigate('/'); // Redirect to login
  } catch (err) {
    console.error('Signup Failed:', err);
    setError(err?.response?.data?.msg || 'Signup failed. Try again.');
  }
};


  return (
    <Box
      sx={{
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkU7FyrnORHsyIjr_lnyXXux26XKQotjTwpg&s")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper elevation={6} sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
          Sign Up
        </Typography>

        {error && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Name"
          name="name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />

        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          name="password"
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2, background: 'orange' }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
            Log In
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}
