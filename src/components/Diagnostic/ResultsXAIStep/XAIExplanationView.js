import { Box, Typography, Button, useTheme, useMediaQuery, Switch, FormControlLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ImageService } from '../../../services/imageService';
import { useAuth } from '../../../hooks/useAuth';

const XAIExplanationView = ({ explanation, onBack }) => {
  const { t } = useTranslation('diagnostic');
  const { isAuthenticated } = useAuth();  
  const diseaseLabels = t('diseaseLabels', { returnObjects: true });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [imageUrl, setImageUrl] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);

  const firstExplanation = explanation.explanation?.explanations?.explanations?.[0];
  const overlayImageId = firstExplanation?.overlay_image_id;
  const heatmapImageId = firstExplanation?.heatmap_image_id;
  const method = firstExplanation?.method 
    ? firstExplanation.method.charAt(0).toUpperCase() + firstExplanation.method.slice(1).toLowerCase()
    : '';
  const predictedClass = explanation.explanation?.predicted_class;
  const predictedProbs = explanation.explanation?.predicted_probs;

  useEffect(() => {
    setCurrentImageId(showHeatmap ? heatmapImageId : overlayImageId);
  }, [showHeatmap, overlayImageId, heatmapImageId]);

  useEffect(() => {
    const loadImage = async () => {
      if (currentImageId) {
        const url = await ImageService.getImage(currentImageId, isAuthenticated);
        setImageUrl(url);
      }
    };

    loadImage();

    return () => {
      if (imageUrl) {
        ImageService.revokeImageUrl(imageUrl);
      }
    };
  }, [currentImageId, isAuthenticated]);

  const handleToggleChange = (event) => {
    setShowHeatmap(event.target.checked);
  };

  const maxProbability = predictedProbs 
    ? (Math.max(...predictedProbs) * 100).toFixed(2)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ flex: 1 }}
    >
      <Box sx={{ 
        borderRadius: '16px',
        backgroundColor: 'white',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        height: '100%',
        p: 3,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 2,
            fontFamily: '"Inter", serif',
            fontWeight: 600,
            color: 'var(--dark-text-color)'
          }}
        >
          {t('xaiMethods.explanationTitle')} { method }
        </Typography>

        <Box sx={{
          flex: 1,
          mb: 1,
          borderRadius: '8px',
          overflow: 'hidden',
          position: 'relative',
          minHeight: '300px',
          backgroundColor: 'var(--light-bg-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {imageUrl ? (
            <img 
              src={imageUrl}
              alt="XAI Explanation"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '400px',
                objectFit: 'contain'
              }}
              onError={() => setImageUrl(null)}
            />
          ) : (
            <Typography color="text.secondary">
              {t('xaiMethods.noExplanationImage')}
            </Typography>
          )}
        </Box>

     {heatmapImageId && overlayImageId && (
      <Box sx={{ 
        mb: 3,
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: '12px',
        mr: 4,
      }}>
        <Switch
          checked={showHeatmap}
          onChange={handleToggleChange}
          sx={{
            '& .MuiSwitch-switchBase': {
              position: 'absolute',
              left: 0,
              color: 'var(--grey-color)',
              '& + .MuiSwitch-track': {
                  backgroundColor: 'var(--grey-color)'
                },
              '&.Mui-checked': {
                color: 'var(--primary-color)',
                '& + .MuiSwitch-track': {
                  backgroundColor: 'var(--primary-color)'
                }
              }
            },
            '& .MuiSwitch-track': {
              backgroundColor: 'var(--light-grey)'
            }
          }}
        />
        
        <Typography 
          variant="body2" 
          sx={{
            fontWeight: 400,
            color: showHeatmap ? 'var(--primary-color)' : 'var(--grey-color)',
            fontFamily: '"Inter", sans-serif',
            transition: 'all 0.3s ease'
          }}
        >
         {firstExplanation.method === "anchor" ? `${t('xaiMethods.anchorDescLongToggle')}` : `${t('xaiMethods.showHeatmap')}`} 
        </Typography>
      </Box>
    )}

        {/* Explanation Details */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Inter", sans-serif', fontWeight: 600 }}>
            {t('xaiMethods.predictionDetails')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>
              {t('xaiMethods.predictedClass')}:
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: '"Inter", sans-serif' }}>
              {diseaseLabels[predictedClass] || predictedClass}
            </Typography>
          </Box>
          {maxProbability && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: '"Inter", sans-serif' }}>
                {t('xaiMethods.confidence')}:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, fontFamily: '"Inter", sans-serif', color: 'var(--primary-color)' }}>
                {maxProbability}%
              </Typography>
            </Box>
          )}
        </Box>

        {firstExplanation?.method && (
          <Box sx={{ mb: 2, p: 2, backgroundColor: 'var(--white-color)', borderRadius: '8px' }}>
            <Typography variant="body2" sx={{ color: "var(--grey-text-color)", fontWeight: 600, fontFamily: '"Raleway", serif' }}>
              {t(`xaiMethods.${firstExplanation.method}DescLong`, 
                 t('xaiMethods.defaultDesc'))}
            </Typography>
          </Box>
        )}

        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            px: 4,
            borderRadius: '24px',
            fontWeight: 500,
            fontFamily: '"Inter", serif',
            textTransform: 'none',
            border: '2px solid var(--primary-color)',
            color: 'var(--primary-color)',
            '&:hover': {
              backgroundColor: 'var(--primary-color)',
              color: 'var(--white-color)',
            }
          }}
        >
          {t('xaiMethods.backToMethods')}
        </Button>
      </Box>
    </motion.div>
  );
};

export default XAIExplanationView;