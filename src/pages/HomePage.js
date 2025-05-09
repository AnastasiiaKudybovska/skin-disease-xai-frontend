import React from 'react';
import { Box } from '@mui/material';
import MainHero from '../components/MainHero/MainHero';
import InstructionSteps from '../components/InstructionSteps/InstructionSteps';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, minHeight: '92vh' }}>
      <MainHero />
      <InstructionSteps />
      
      {/* Інші секції можна додати тут */}

    </Box>
  );
};

export default HomePage;