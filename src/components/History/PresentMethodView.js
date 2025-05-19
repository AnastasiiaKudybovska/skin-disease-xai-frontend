import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  useTheme, 
  useMediaQuery,
  Slider,
  Switch,
  Stack
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ImageService } from '../../services/imageService';
import { useAuth } from '../../hooks/useAuth';

const PresentMethodView = ({ methodData }) => {
  const { t } = useTranslation('diagnostic');
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [imageUrl, setImageUrl] = useState(null);
  const [overlayUrl, setOverlayUrl] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [currentImageId, setCurrentImageId] = useState(null);
  const [opacity, setOpacity] = useState(50);

  const { method, overlayImageId, heatmapImageId, predictedClass, confidence } = methodData;
  const isSHAP = method.toLowerCase() === 'shap';
  const isAnchor = method.toLowerCase() === 'anchor';
  const isIG = method.toLowerCase() === 'integrated gradients';
  const isGradCAM = method.toLowerCase() === 'gradcam';
  const isLIME = method.toLowerCase() === 'lime';

  useEffect(() => {
    setCurrentImageId(isSHAP ? heatmapImageId : (showHeatmap ? heatmapImageId : overlayImageId));
  }, [showHeatmap, overlayImageId, heatmapImageId, isSHAP]);

  // Image loading effects
  useEffect(() => {
    const loadImage = async () => {
      if (currentImageId) {
        const url = await ImageService.getImage(currentImageId, isAuthenticated);
        setImageUrl(url);
      }
    };
    loadImage();
    return () => imageUrl && ImageService.revokeImageUrl(imageUrl);
  }, [currentImageId, isAuthenticated]);

  useEffect(() => {
    const loadOverlayImage = async () => {
      if (isSHAP && overlayImageId) {
        const url = await ImageService.getImage(overlayImageId, isAuthenticated);
        setOverlayUrl(url);
      }
    };
    loadOverlayImage();
    return () => overlayUrl && ImageService.revokeImageUrl(overlayUrl);
  }, [isSHAP, overlayImageId, isAuthenticated]);

  const methodsData = {
    'gradcam': { 
      title: 'Grad-CAM', 
      description: t('xaiMethods.gradcamDescLong'),
      interpretation: t('xaiMethods.gradcamInterpretation'),
      howToUse: t('xaiMethods.gradcamHowToUse')
    },
    'lime': { 
      title: 'LIME', 
      description: t('xaiMethods.limeDescLong'),
      interpretation: t('xaiMethods.limeInterpretation'),
      howToUse: t('xaiMethods.limeHowToUse')
    },
    'shap': { 
      title: 'SHAP', 
      description: t('xaiMethods.shapDescLong'),
      interpretation: t('xaiMethods.shapInterpretation'),
      howToUse: t('xaiMethods.shapHowToUse')
    },
    'anchor': { 
      title: 'Anchor', 
      description: t('xaiMethods.anchorDescLong'),
      interpretation: t('xaiMethods.anchorInterpretation'),
      howToUse: t('xaiMethods.anchorHowToUse')
    },
    'integrated gradients': { 
      title: t('xaiMethods.igTitle'), 
      description: t('xaiMethods.igDescLong'),
      interpretation: t('xaiMethods.igInterpretation'),
      howToUse: t('xaiMethods.igHowToUse')
    }
  };

  const currentMethod = methodsData[method.toLowerCase()] || { 
    title: method, 
    description: '',
    interpretation: '',
    howToUse: ''
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Stack direction={isMobile ? 'column' : 'row'} spacing={3} sx={{
        backgroundColor: 'white',
        borderRadius: '12px',
        p: 2,
        boxShadow: theme.shadows[1]
      }}>
        {/* Image Section */}
        <Box sx={{
          width: isMobile ? '100%' : '40%',
          maxHeight: 300,
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <Box sx={{
            flex: 1,
            height: 250,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: '6px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            {imageUrl ? (
              <>
                {isSHAP && overlayUrl && (
                  <img 
                    src={overlayUrl}
                    alt="Original"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      position: 'absolute',
                      zIndex: 1
                    }}
                  />
                )}
                <img 
                  src={imageUrl}
                  alt={`${currentMethod.title} explanation`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    position: 'relative',
                    zIndex: 2,
                    opacity: isSHAP ? `${opacity}%` : '100%'
                  }}
                />
              </>
            ) : (
              <Typography variant="body2" color="text.secondary">
                {t('xaiMethods.noExplanationImage')}
              </Typography>
            )}
          </Box>

          {/* Controls */}
          {isSHAP ? (
            <Box sx={{ width: '100%' }}>
              <Slider
                value={opacity}
                onChange={(e, val) => setOpacity(val)}
                min={10}
                max={100}
                size="small"
                sx={{
                  color: 'var(--primary-color)',
                  '& .MuiSlider-thumb': {
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 0 0 8px rgba(25, 118, 210, 0.16)'
                    }
                  }
                }}
              />
              <Typography variant="caption" display="block" textAlign="center" sx={{ ml: 1, fontFamily: '"Inter", serif', color: 'var(--primary-color)'}}>
                {t('xaiMethods.heatmapOpacity')}: {opacity}%
              </Typography>
            </Box>
          ) : (
            heatmapImageId && overlayImageId && (
              <Box display="flex" alignItems="center" justifyContent="flex-end">
                <Switch
                  checked={showHeatmap}
                  onChange={(e) => setShowHeatmap(e.target.checked)}
                  size="small"
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
                <Typography variant="caption" sx={{ ml: 1, fontFamily: '"Inter", serif', color: 'var(--primary-color)'}}>
                  {isAnchor ? t('xaiMethods.anchorDescLongToggle') : isIG ? t('xaiMethods.igDescLongToggle') : t('xaiMethods.showHeatmap')}
                </Typography>
              </Box>
            )
          )}
        </Box>

        {/* Text Section */}
        <Box sx={{
          width: isMobile ? '100%' : '60%',
          display: 'flex',
          flexDirection: 'column',
          gap: 1
        }}>
          <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: '"Inter", serif', color: 'var(--primary-color)'}}>
            {currentMethod.title}
          </Typography>
          
          <Box>
            <Typography variant="body1" sx={{ fontFamily: '"Inter", serif', color: 'var(--primary-color)'}}>
              <strong style={{color: 'var(--dark-text-color)'}}>{t('xaiMethods.predictedClass')}:</strong> {t(`diseaseLabels.${predictedClass}`)}
            </Typography>
            {confidence && (
              <Typography variant="body1" sx={{ pt: 1, fontFamily: '"Inter", serif', color: 'var(--primary-color)'}}>
                <strong style={{color: 'var(--dark-text-color)'}}>{t('xaiMethods.confidence')}:</strong> {(confidence * 100).toFixed(2)}%
              </Typography>
            )}
          </Box>
          
          <Box sx={{ p: 2, backgroundColor: 'var(--white-color)', borderRadius: '8px' }}>
            <Typography variant="body1" sx={{ color: "var(--grey-text-color)", fontFamily: '"Raleway", serif' }}>
              {currentMethod.description}
            </Typography>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 'bold', 
                color: 'var(--dark-text-color)',
                fontFamily: '"Inter", serif'
              }}>
                {t('xaiMethods.interpretationTitle')}
              </Typography>
              <Typography variant="body1" sx={{ 
                mt: 1,
                color: "var(--grey-text-color)", 
                fontFamily: '"Raleway", serif'
              }}>
                {currentMethod.interpretation}
              </Typography>
            </Box>
            
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ 
                fontWeight: 'bold', 
                color: 'var(--dark-text-color)',
                fontFamily: '"Inter", serif'
              }}>
                {t('xaiMethods.howToUseTitle')}
              </Typography>
              <Typography variant="body1" sx={{ 
                mt: 1,
                color: "var(--grey-text-color)", 
                fontFamily: '"Raleway", serif'
              }}>
                {currentMethod.howToUse}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Stack>
    </motion.div>
  );
};

export default PresentMethodView;