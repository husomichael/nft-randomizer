import React from 'react';
import {Box} from '@mui/material';
import './Footer.css';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {
  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="65vh"
    >
    <footer>
      &copy; Michael Huso
    </footer>
  </Box>
  )
}

export default Footer;
