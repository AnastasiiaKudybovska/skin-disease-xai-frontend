import React from 'react';
import { Box } from '@mui/material';
import MainHero from '../components/MainHero/MainHero';
import InstructionSteps from '../components/InstructionSteps/InstructionSteps';
import MainFeatures from '../components/MainFeatures/MainFeatures';
import WarningBlock from '../components/WarningBlock/WarningBlock';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, minHeight: '92vh' }}>
      <MainHero />
      <InstructionSteps />
      <MainFeatures />
      <WarningBlock />
      
      {/* Інші секції можна додати тут */}

    </Box>
  );
};

export default HomePage;