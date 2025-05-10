import React, { useState } from 'react';
import { Box, Button, Typography, Paper, CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

const ResultsDisplay = ({ image, onBack, onNext }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null); // Moved state management inside component

  const handleAnalyze = () => {
    setLoading(true);
    // Simulation of image analysis
    setTimeout(() => {
      setResults({
        diagnosis: t('diagnostic.melanoma'),
        probability: '85%',
        description: t('diagnostic.melanomaDescription'),
        recommendations: t('diagnostic.melanomaRecommendations')
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {t('diagnostic.yourImage')}
          </Typography>
          <img 
            src={image} 
            alt={t('diagnostic.uploadedImageAlt')} 
            style={{ 
              maxWidth: '100%', 
              borderRadius: '8px' 
            }} 
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2 }}>
                {t('diagnostic.analyzing')}
              </Typography>
            </Box>
          ) : results ? (
            <>
              <Typography variant="h5" gutterBottom>
                {t('diagnostic.resultsTitle')}
              </Typography>
              <Typography variant="h6" color="error">
                {t('diagnostic.diagnosis')}: {results.diagnosis} ({results.probability})
              </Typography>
              <Typography variant="body1" paragraph>
                {results.description}
              </Typography>
              <Typography variant="h6">
                {t('diagnostic.recommendationsTitle')}:
              </Typography>
              <Typography variant="body1">
                {results.recommendations}
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h5" gutterBottom>
                {t('diagnostic.readyForAnalysis')}
              </Typography>
              <Typography paragraph>
                {t('diagnostic.analysisInstructions')}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>
          {t('common.back')}
        </Button>
        {!results && !loading && (
          <Button 
            variant="contained" 
            onClick={handleAnalyze}
          >
            {t('diagnostic.startAnalysis')}
          </Button>
        )}
        {results && (
          <Button 
            variant="contained" 
            onClick={onNext}
          >
            {t('common.save')}
          </Button>
        )}
      </Box>
    </Paper>
  );
};

export default ResultsDisplay;