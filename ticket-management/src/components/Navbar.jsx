import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Ticket Management 
        </Typography>
        {/* <Button color="inherit" component={Link} to="/history">
          History
        </Button> */}
        <Button color="inherit" component={Link} to="/create">
          Create Ticket
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
