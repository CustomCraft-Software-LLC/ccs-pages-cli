import React from 'react';
import { Typography, Container, Box } from '@mui/material';
import Seo from '../components/Seo';

const HomePage = () => {
  return (
    <Container>
      <Seo 
        title="Home | Example Website" 
        description="Welcome to Example Website. Discover our services, learn about our mission, and explore how we can help you." 
        keywords="home, Example Website, services, mission, values" 
        image="https://www.example.com/image.jpg"  
        url="https://www.example.com/"  
      />
      <Box>
        <Typography variant="h1">
          Welcome to Our Website
        </Typography>
        <Typography variant="body1">
          This is the homepage where we showcase the latest updates and features.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage;