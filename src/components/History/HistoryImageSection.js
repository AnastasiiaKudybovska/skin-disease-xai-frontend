// HistoryImageSection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Skeleton,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Typography,
  IconButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ImageService } from '../../services/imageService';
import { useAuth } from '../../hooks/useAuth';
import DeleteIcon from '@mui/icons-material/Delete';
import { diagnosticService } from '../../services/diagnosticService';
import useStyledSnackbar from '../../hooks/useStyledSnackbar';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PrimaryRadio = styled(Radio)(({ theme }) => ({
  color: 'var(--grey-color)',
  '&.Mui-checked': {
    color: 'var(--primary-color)',
  },
}));

const HistoryImageSection = ({ 
  history, 
  missingMethods, 
  availableMethods = [], 
  setAvailableMethods,
  setDeleteDialogOpen,
  scrollToMethod,
  update,
  setUpdate
}) => {
  const { t } = useTranslation(['history', 'diagnostic']);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { showError, showWarning, showSuccess } = useStyledSnackbar();
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [xaiLoading, setXaiLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(missingMethods[0]?.id || '');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setImageLoading(true);
        if (history.image_id) {
          const url = await ImageService.getImage(history.image_id, isAuthenticated);
          setImageUrl(url);
          
          try {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], 'diagnostic_image.jpg', { type: blob.type });
            setImageFile(file);
          } catch (err) {
            console.error('Error converting image URL to File:', err);
          }
        }
      } finally {
        setImageLoading(false);
      }
    };

    loadImage();

    return () => {
      if (imageUrl) {
        ImageService.revokeImageUrl(imageUrl);
      }
    };
  }, [history.image_id, isAuthenticated]);

  const handleMethodChange = (event) => {
    setSelectedMethod(event.target.value);
    setError(null);
  };

  const handleGenerateExplanation = async () => {
    if (!imageFile) {
      setError(t('diagnostic:xaiMethods.imageError'));
      showError(t('diagnostic:xaiMethods.imageError'));
      return;
    }

    setXaiLoading(true);
    showWarning(t('diagnostic:xaiMethods.waiting'));
    setError(null);
    
    try {
      if(selectedMethod === "integrated gradients"){
        await diagnosticService.getXAIExplanation(
          "ig",
          imageFile,
          { historyId: history.id }
        );
      }else {
        await diagnosticService.getXAIExplanation(
          selectedMethod,
          imageFile,
          { historyId: history.id }
        );
    }
      
      if (typeof setAvailableMethods === 'function') {
        setAvailableMethods(prev => [...prev, selectedMethod]);
      }
      setUpdate(!update);
      showSuccess(t('diagnostic:xaiMethods.success'));
      
      if (typeof scrollToMethod === 'function') {
        setTimeout(() => {
          scrollToMethod(selectedMethod);
        }, 300);
      }
    } catch (err) {
      console.error('Error getting XAI explanation:', err);
      setError(t('diagnostic:xaiMethods.requestError'));
      showError(t('diagnostic:xaiMethods.requestError'));
    } finally {
      setXaiLoading(false);
    }
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleBack = () => {
    navigate('/history');
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <IconButton
        onClick={handleBack}
        sx={{
          position: 'absolute', top: 16, left: 16, zIndex: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
          }
        }}
      >
        <ArrowBackIcon sx={{ color: 'var(--dark-bg-color)' }} />
      </IconButton>
      
      <Box sx={{
        height: 300,
        position: 'relative',
        backgroundColor: '#f8f9fa'
      }}>
        {imageLoading ? (
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height="100%" 
            animation="wave"
            sx={{ 
              transform: 'none', 
              bgcolor: 'rgba(0,0,0,0.05)'
            }} 
          />
        ) : (
          <img
            src={imageUrl || '/placeholder-image.jpg'}
            alt="Diagnostic image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        )}
      </Box>

      {/* XAI Methods Section */}
      {missingMethods.length > 0 && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{  
            mb: 2, 
            fontFamily: '"Inter", sans-serif', 
            color: 'var(--dark-text-color)',
            fontWeight: 600 
          }}>
            {t('history:xaiMethods.generateMissing')}
          </Typography>
          
          <RadioGroup
            value={selectedMethod}
            onChange={handleMethodChange}
            sx={{ mb: 2 }}
          >
            {missingMethods.map((method) => (
              <Box 
                key={method.id}
                sx={{ 
                  py: 1, 
                  px: 2, 
                  mb: 1, 
                  borderRadius: '8px',  
                  border: selectedMethod === method.id ? 
                    '1px solid var(--primary-color)' : 
                    '1px solid var(--dark-bg-color)',
                  backgroundColor: selectedMethod === method.id ? 
                    'var(--white-color)' : 'transparent',
                }}
              >
                <FormControlLabel
                  value={method.id}
                  control={<PrimaryRadio />}
                  label={
                    <Box sx={{ ml: 1 }}>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 500,  
                          fontFamily: '"Inter", sans-serif',
                          color: selectedMethod === method.id ? 
                            'var(--primary-color)' : 'inherit'
                        }}
                      >
                        {method.name}
                      </Typography>
                    </Box>
                  }
                />
              </Box>
            ))}
          </RadioGroup>

          <Button
            variant="contained"
            onClick={handleGenerateExplanation}
            disabled={xaiLoading || !imageFile}
            sx={{
              width: '100%',
              borderRadius: '24px',
              textTransform: 'none',
              fontWeight: 500,
              fontFamily: '"Inter", sans-serif',
              bgcolor: 'var(--primary-color)',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'var(--dark-primary-color)'
              }
            }}
          >
            {xaiLoading ? (
              <CircularProgress size={24} sx={{ color: 'white' }} />
            ) : (
              t('history:xaiMethods.generateExplanation')
            )}
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
            sx={{
              mt: 3,
              width:'100%',
              borderRadius: '24px',
              textTransform: 'none',
              fontWeight: 500,
              border: '1px solid var(--error-color)',
              color: 'var(--error-color)',
              fontFamily: '"Inter", sans-serif',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'var(--error-color)',
                color: 'var(--white-color)'
              }
            }}
          >
            {t('history:deleteHistory')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default HistoryImageSection;