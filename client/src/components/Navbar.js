import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ background: '#4D81B7' }}>
      <Container maxWidth="2xl" sx={{ml: 2, mr: 2}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            style={{fontFamily: 'Dosis'}}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex'} }}
          >
            SHOPPING LIST
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            SHOPPING LIST
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
