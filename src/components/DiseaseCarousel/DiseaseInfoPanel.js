import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { diseaseColors } from '../../utils/constants';

const DiseaseInfoPanel = ({ activeDisease, hovered }) => {
  const { t } = useTranslation('home');

  return (
    <Box sx={{ 
      flex: 1, 
      padding: '40px',
      transition: 'all 0.5s ease',
      opacity: hovered ? 0.9 : 1,
      backgroundColor: 'rgba(255,255,255,0.9)',
      color: 'var(--dark-text-color)',
      borderRadius: '24px',
      boxShadow: `0 8px 32px ${diseaseColors[activeDisease]}40`,
      mx: 8,
      border: `1px solid ${diseaseColors[activeDisease]}20`,
    }}>
      <Typography variant="h4" sx={{ 
        mb: 3, 
        fontWeight: 'bold',
        fontFamily: '"Inter", sans-serif', 
        color: diseaseColors[activeDisease],
        transition: 'color 0.5s ease',
      }}>
        {t(`diseases.${activeDisease}.name`)}
      </Typography>
      
      <Typography variant="body1" sx={{ 
        mb: 3,
        lineHeight: 1.8,
        fontSize: '1.1rem',
        fontFamily: '"Raleway", sans-serif',
      }}>
        {t(`diseases.${activeDisease}.description`)}
      </Typography>
      
      <Box sx={{
        backgroundColor: `${diseaseColors[activeDisease]}15`,
        borderRadius: '16px',
        padding: '24px',
        mb: 3,
        borderLeft: `4px solid ${diseaseColors[activeDisease]}`,
      }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold',  fontFamily: '"Inter", sans-serif', color: diseaseColors[activeDisease] }}>
          {t('diseases.common.symptoms')}
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.8, fontFamily: '"Raleway", sans-serif',}}>
          {t(`diseases.${activeDisease}.symptoms`)}
        </Typography>
      </Box>
      
      <Box sx={{
        backgroundColor: `${diseaseColors[activeDisease]}15`,
        borderRadius: '16px',
        padding: '24px',
        borderLeft: `4px solid ${diseaseColors[activeDisease]}`,
      }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', fontFamily: '"Inter", sans-serif', color: diseaseColors[activeDisease] }}>
          {t('diseases.common.treatment')}
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.8, fontFamily: '"Raleway", sans-serif', }}>
          {t(`diseases.${activeDisease}.treatment`)}
        </Typography>
      </Box>
    </Box>
  );
};

export default DiseaseInfoPanel;