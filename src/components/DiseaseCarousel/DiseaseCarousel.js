import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DiseaseCarouselRotator from './DiseaseCarouselRotator';
import DiseaseInfoPanel from './DiseaseInfoPanel';
import { diseaseKeys, diseaseColors } from '../../utils/constants';

const DiseaseCarousel = () => {
  const { t } = useTranslation();
  const [activeDisease, setActiveDisease] = useState('vasc');
  const [autoRotate, setAutoRotate] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Auto-rotate every 3 seconds unless user has interacted
  useEffect(() => {
    if (!autoRotate || hovered) return;
    
    const interval = setInterval(() => {
      const currentIndex = diseaseKeys.indexOf(activeDisease);
      const nextIndex = (currentIndex - 1 + diseaseKeys.length) % diseaseKeys.length;
      setActiveDisease(diseaseKeys[nextIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeDisease, autoRotate, hovered]);

  const handleDiseaseSelect = (key) => {
    setActiveDisease(key);
    setAutoRotate(false);
  };

  return (
    <Box sx={{ 
      pt: 4, pb: 8, 
      position: 'relative',
      backgroundColor: `${diseaseColors[activeDisease]}15`,
      transition: 'background-color 0.8s ease',
    }}>
      <Box>
        <Typography variant="h3" sx={{ 
          textAlign: 'center', 
          mb: 4, 
          fontWeight: '700', 
          fontFamily: '"Playfair Display", sans-serif',
          color: 'var(--dark-bg-color)',
        }}>
          {t('diseases.carousel.title')}
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          alignItems: 'flex-start', 
          gap: 24, pt: 2,
          justifyContent: 'center'
        }}>
          <DiseaseCarouselRotator 
            activeDisease={activeDisease}
            handleDiseaseSelect={handleDiseaseSelect}
            setHovered={setHovered}
            hovered={hovered}
          />
          <DiseaseInfoPanel 
            activeDisease={activeDisease}
            hovered={hovered}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DiseaseCarousel;