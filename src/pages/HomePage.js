import React from 'react';
import { Box } from '@mui/material';
import MainHero from '../components/MainHero/MainHero';
import InstructionSteps from '../components/InstructionSteps/InstructionSteps';
import MainFeatures from '../components/MainFeatures/MainFeatures';
import WarningBlock from '../components/WarningBlock/WarningBlock';
import DiseasesCarousel from '../components/DiseaseCarousel/DiseaseCarousel';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, minHeight: '92vh' }}>
      <MainHero />
      <section id="instructions" >
         <InstructionSteps />
      </section>
     
      <MainFeatures />
      <WarningBlock />
      <DiseasesCarousel />
      
      {/* Інші секції можна додати тут */}

    </Box>
  );
};

export default HomePage;