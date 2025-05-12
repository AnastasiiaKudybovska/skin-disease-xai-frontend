import { Box,  Typography,  LinearProgress,  Chip, } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { diseaseColors } from '../../../utils/constants'

const DiagnosisResults = ({ results, isMobile }) => {
  const { t } = useTranslation('diagnostic');
  const diseaseLabels = t('diseaseLabels', { returnObjects: true });

  const sortedResults = Object.entries(results.probabilities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
     <Box sx={{flex: 1, minWidth: 0}}>
      <Box sx={{ 
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        height: '100%', p: 3
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, fontFamily: '"Inter", serif', fontWeight: 600,
            color: 'var(--primary-color)'
          }}
        >
          {t('analysisStep.analysisResults')}
        </Typography>
        <Box sx={{  backgroundColor: 'var(--white-color)',  borderRadius: '12px', p: 3, mb: 3}}>
          <Box sx={{ mb: 2, display:'flex', flexDirection: {sx: 'column', md: 'row'}, justifyContent: 'center', alignItems: 'center', gap: 2}}>
            <Typography variant="body1" sx={{fontWeight: 700, fontFamily: '"Inter", sans-serif', color: 'var(--dark-text-color)'}}>
              {t('analysisStep.highestPredicted')}:
            </Typography>
            <Chip 
              label={diseaseLabels[results.predicted_class] || results.predicted_class}
              sx={{ 
                backgroundColor: diseaseColors[results.predicted_class] || 'var(--grey-color)',
                color: 'var(--white-color)',
                fontWeight: 'bold', fontSize: '1rem',
                px: 2, py: 1
              }}
            /> 
            </Box>
            <Box sx={{ mb: 2, display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2}}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  color: 'inherit',
                  fontFamily: '"Inter", sans-serif',
                  textAlign: 'center'
               }}
              >
                <Box component="span" sx={{ color: 'var(--primary-color) !important', display: 'inline'}}>
                  {(results.confidence * 100).toFixed(2)}%
                </Box> 
                <Box component="span" sx={{ ml: 1, fontWeight: '700 !important', color: 'var(--dark-text-color) !important', display: 'inline'}}>
                  {t('analysisStep.confidence')}
                </Box>
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: 'var(--dark-text-color)', fontFamily: '"Inter", sans-serif', }}>
                { t('analysisStep.mostLikelyCondition')}
             </Typography>
            </Box>
        </Box>

        <Typography variant="h6" sx={{  mb: 2, fontFamily: '"Inter", sans-serif', fontWeight: 600 }}>
          {t('analysisStep.topProbabilities')}
        </Typography>
        
        {sortedResults.map(([disease, probability]) => (
          <Box key={disease} sx={{ mb: 3 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              mb: 1,
              gap: 1
            }}>
              <Typography sx={{ 
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontFamily: '"Inter", sans-serif',
              }}>
                {diseaseLabels[disease] || disease}:
              </Typography>
              <Typography sx={{ 
                fontWeight: 600,
                flexShrink: 0
              }}>
                {(probability * 100).toFixed(2)}%
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={probability * 100}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: '#e9ecef',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: diseaseColors[disease] || 'var(--primary-color)',
                  borderRadius: 5
                }
              }}
            />
          </Box>
        ))}

        <Box sx={{ mt: 4, p: 2, backgroundColor: 'var(--white-color)', borderRadius: '8px'}}>
          <Typography variant="body2" sx={{color: "var(--grey-text-color)", fontFamily: '"Raleway", serif',}}>
            <strong>{t('analysisStep.note')}: </strong>{ t('analysisStep.disclaimer')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default DiagnosisResults;