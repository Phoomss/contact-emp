import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#FFCC00',color: '#154295'}}>
        <Toolbar variant="dense">
          <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
            <img src="/assets/logo.png" width="75px" alt="Logo" />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            ระบบจัดการลูกจ้างจ้างเหมาบริการ การฝ่ายผลิตแห่งประเทศไทย (กฟผ.)
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
