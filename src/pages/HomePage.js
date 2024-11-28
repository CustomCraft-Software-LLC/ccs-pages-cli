import React from 'react';
import { Typography, Container, Box } from '@mui/material';

const Home = () => {
  return (
    <Container>
      <Box>
        <Typography variant="h3">
          Welcome to Our Website
        </Typography>
        <Typography variant="body1">
          This is the homepage where we showcase the latest updates and features.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;