import React from 'react';
import { 
  Box, 
  Typography, 
  Chip,
  LinearProgress,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { diseaseColors } from '../../utils/constants';

const HistoryInfoSection = ({ history }) => {
  const { t } = useTranslation(['history', 'diagnostic']);
  const theme = useTheme();

  const topDiagnoses = Object.entries(history.probabilities || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  return (
    <Box sx={{
      p: 4,
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Disease Name */}
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 3,
          fontFamily: '"Inter", sans-serif',
          fontWeight: 700,
          color: diseaseColors[history.predicted_class] || theme.palette.primary.main,
          textAlign: 'center'
        }}
      >
        {t(`diagnostic:diseaseLabels.${history.predicted_class}`)}
      </Typography>

      {/* Diagnosis Info */}
      <Box sx={{  
        backgroundColor: 'var(--white-color)',  
        borderRadius: '12px', 
        p: 3, 
        mb: 3
      }}>
        <Box sx={{ 
          mb: 2, 
          display:'flex', 
          flexDirection: {xs: 'column', md: 'row'}, 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 2
        }}>
          <Typography variant="body1" sx={{
            fontWeight: 700, 
            fontFamily: '"Inter", sans-serif', 
            color: 'var(--dark-text-color)'
          }}>
            {t('diagnostic:analysisStep.highestPredicted')}:
          </Typography>
          <Chip 
            label={t(`diagnostic:diseaseLabels.${history.predicted_class}`)}
            sx={{ 
              backgroundColor: diseaseColors[history.predicted_class] || 'var(--grey-color)',
              color: 'var(--white-color)',
              fontWeight: 'bold', 
              fontSize: '1rem',
              px: 2, 
              py: 1
            }}
          /> 
        </Box>
        
        <Box sx={{ 
          mb: 2, 
          display:'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 2
        }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: 'inherit',
              fontFamily: '"Inter", sans-serif',
              textAlign: 'center'
            }}
          >
            <Box component="span" sx={{ 
              color: 'var(--primary-color) !important', 
              display: 'inline'
            }}>
              {(history.confidence * 100).toFixed(2)}%
            </Box> 
            <Box component="span" sx={{ 
              ml: 1, 
              fontWeight: '700 !important', 
              color: 'var(--dark-text-color) !important', 
              display: 'inline'
            }}>
              {t('diagnostic:analysisStep.confidence')}
            </Box>
          </Typography>
          
          <Typography variant="body1" sx={{ 
            mb: 2, 
            color: 'var(--dark-text-color)', 
            fontFamily: '"Inter", sans-serif',
            textAlign: 'center'
          }}>
            {t('diagnostic:analysisStep.mostLikelyCondition')}
          </Typography>
        </Box>
      </Box>

      {/* Top Diagnoses */}
      <Typography variant="h6" sx={{  
        mb: 2, 
        fontFamily: '"Inter", sans-serif', 
        fontWeight: 600 
      }}>
        {t('diagnostic:analysisStep.topProbabilities')}
      </Typography>
      
      {topDiagnoses.map(([disease, probability]) => (
        <Box key={disease} sx={{ mb: 1 }}>
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
              {t(`diagnostic:diseaseLabels.${disease}`)}:
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

      {/* Disclaimer */}
      <Box sx={{ 
        p: 2, 
        backgroundColor: 'var(--white-color)', 
        borderRadius: '8px'
      }}>
        <Typography variant="body2" sx={{
          color: "var(--grey-text-color)", 
          fontFamily: '"Raleway", serif',
        }}>
          <strong>{t('diagnostic:analysisStep.note')}: </strong>{t('diagnostic:analysisStep.disclaimer')}
        </Typography>
      </Box>

      {/* Date */}
      <Box sx={{ 
        mt: 3,
        pt: 2,
        borderTop: `1px solid ${theme.palette.divider}`,
        textAlign: 'center'
      }}>
        <Typography variant="body2" sx={{ 
          color: theme.palette.text.secondary,
          fontFamily: '"Inter", sans-serif'
        }}>
          {new Date(history.timestamp).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default HistoryInfoSection;