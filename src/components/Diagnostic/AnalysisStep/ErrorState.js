import { Box, Typography, Chip, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { diseaseColors } from '../../../utils/constants'

const ErrorState = ({ error, predictedClass, confidence, handleBack, isMobile }) => {
  const { t } = useTranslation('diagnostic');
  const diseaseLabels = t('diseaseLabels', { returnObjects: true });

  return (
    <Box sx={{
      flex: 1,
      minWidth: 0
    }}>
      <Box sx={{ 
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        height: '100%',
        p: 3
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, fontFamily: '"Inter", serif', fontWeight: 600,
            color: 'var(--error-color)'
          }}
        >
          {t('analysisStep.lowConfidenceTitle')}
        </Typography>

        <Box sx={{  backgroundColor: 'var(--white-color)',  borderRadius: '12px', p: 3, mb: 3}}>
         <Typography 
            variant="subtitle1" 
            sx={{ mb: 1, fontWeight: 600, 
              color: 'inherit', 
              fontFamily: '"Inter", sans-serif',
            }}
          >
            {t('analysisStep.lowConfidenceError')} (
            <Box component="span" sx={{ color: 'var(--error-color) !important', display: 'inline'}}>
              {(confidence * 100).toFixed(2)}%
            </Box>).
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'var(--dark-text-color)', fontFamily: '"Inter", sans-serif', }}>
            {t('analysisStep.lowConfidenceMessage')}
          </Typography>
          
          {predictedClass && (
            <Box sx={{ mb: 2, display:'flex', flexDirection: {sx: 'column', md: 'row'}, justifyContent: 'center', alignItems: 'center', gap: 2}}>
              <Typography variant="body1" sx={{fontWeight: 700, fontFamily: '"Inter", sans-serif', color: 'var(--dark-text-color)'}}>
                {t('analysisStep.highestPredicted')}:
              </Typography>
              <Chip 
                label={diseaseLabels[predictedClass] || predictedClass}
                sx={{ 
                  backgroundColor: diseaseColors[predictedClass] || 'var(--grey-color)',
                  color: 'var(--white-color)',
                  fontWeight: 'bold',
                }}
              />
            </Box>
          )}
        </Box>

        <Typography 
          variant="h6" 
          sx={{  mb: 2, fontFamily: '"Inter", sans-serif', fontWeight: 600 }}
        >
          {t('analysisStep.suggestionsTitle')}
        </Typography>

        <Box component="ul" sx={{  pl: 2,  mb: 3, '& li': { mb: 1 }}}>
          <Typography component="li" sx={{color: 'var(--dark-text-color)', fontFamily: '"Raleway", serif',}}>{t('analysisStep.suggestion1')}</Typography>
          <Typography component="li" sx={{color: 'var(--dark-text-color)', fontFamily: '"Raleway", serif',}}>{t('analysisStep.suggestion2')}</Typography>
          <Typography component="li" sx={{color: 'var(--dark-text-color)', fontFamily: '"Raleway", serif',}}>{t('analysisStep.suggestion3')}</Typography>
        </Box>

        <Button
          variant="contained"
          onClick={handleBack}
          sx={{
            mt: 2, px: 4, width: '100%',
            borderRadius: '24px',
            fontWeight: 500, fontFamily: '"Inter", serif',  
            bgcolor: 'var(--primary-color)', color: 'var(--white-color)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease', 
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'var(--dark-primary-color)',
              boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
            }
          }}
        >
          {t('analysisStep.tryAgainButton')}
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorState;