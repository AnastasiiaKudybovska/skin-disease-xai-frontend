import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AnalysisStep = () => {
  const { t } = useTranslation('diagnostic');

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <CircularProgress size={60} sx={{ color: 'var(--primary-color)' }} />
      <Typography variant="h6" sx={{ mt: 4, fontFamily: '"Inter", sans-serif' }}>
        {t('analysisDesc')}
      </Typography>
    </Box>
  );
};

export default AnalysisStep;
