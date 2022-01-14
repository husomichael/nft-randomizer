import React from 'react';
import {Box} from '@mui/material';
import './Footer.css';

function Footer() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="81vh"
    >
      <footer>
        &copy; Michael Huso
      </footer>
    </Box>
  )
}

export default Footer;