import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

function Header() {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2c2c2c' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          NeuroSync
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;