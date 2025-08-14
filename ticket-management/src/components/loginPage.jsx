import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  Paper,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { API_BASE_URL } from '../utils/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
const handleLogin = async () => {
  try {
    const res = await axios.post(`https://ticket-managementser.onrender.com/api/auth/login`, {
      email,
      password,
    });

    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));

    if (res.data.user.role === 'admin') {
      navigate('/history');
    } else {
      navigate('/create');
    }
  } catch (err) {
    console.error('Login Error:', err);
    setError(err?.response?.data?.msg || 'Login failed. Check your credentials.');
  }
};


  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkU7FyrnORHsyIjr_lnyXXux26XKQotjTwpg&s")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        px: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pt: 2, pl: 2, color: 'white' }}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHY7BfCRxRS0dsrbW_5g97mic8TuwVXmMigQ&s"
          alt="Logo"
          style={{ width: 40, height: 40 }}
        />
        <Typography sx={{ fontSize: '48px', fontWeight: 700, color: 'orange' }}>
          TICKET MANAGEMENT SYSTEM
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          mt: 4,
          px: 4,
        }}
      >
        <Box sx={{ maxWidth: 500, color: 'white', pr: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Manage your tickets with ease
          </Typography>
          <Typography variant="h6" gutterBottom>
            Empower your team with efficient ticket tracking and resolution tools.
          </Typography>
          <Typography>
            Whether you are a manager tracking progress or an employee submitting requests, our
            platform streamlines communication and boosts productivity.
          </Typography>
        </Box>

        <Paper elevation={6} sx={{ p: 4, width: 360, borderRadius: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
            Login
          </Typography>

          {error && (
            <Typography color="error" variant="body2" sx={{ mb: 1 }}>
              {error}
            </Typography>
          )}

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 1 }}>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Typography variant="body2" sx={{ cursor: 'pointer', color: 'primary.main' }}>
              Forgot password?
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={handleLogin}
            fullWidth
            sx={{ background: 'orange' }}
          >
            Log In
          </Button>

          <Typography align="center" sx={{ mt: 2 }}>
            Don’t have an account?{' '}
            <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'none', fontWeight: 500 }}>
              Sign Up
            </Link>
          </Typography>

          <Typography variant="caption" display="block" align="center" sx={{ mt: 2 }}>
            Terms of use | Privacy Policy
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
