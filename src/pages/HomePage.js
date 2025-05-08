import React from 'react';
import { Box } from '@mui/material';
import MainHero from '../components/MainHero/MainHero';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, minHeight: '92vh' }}>
      <MainHero />
      
      {/* Інші секції можна додати тут */}

    </Box>
  );
};

export default HomePage;