import { Box, Button, Typography, Chip, Divider, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ImagePreview = ({ image, imagePreview, isMobile, handleBack, isError, onNext}) => {
  const { t } = useTranslation('diagnostic');
  
  const truncateFileName = (name, maxLength = 20) => {
    if (!name) return 'Skin image';
    if (name.length <= maxLength) return name;
    return `${name.substring(0, maxLength)}...`;
  };

  return (
    <Box sx={{ flex: 1, minWidth: 0, position: 'relative', backgroundColor: 'white',  borderRadius: '16px',}}>
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
        borderRadius: '16px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        height: '100%'
      }}>
        <Box
          component="img"
          src={imagePreview}
          alt="Skin analysis preview"
          sx={{
            width: '100%', height: isMobile ? 'auto' : '300px',
            objectFit: 'cover', display: 'block'
          }}
        />
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" sx={{  
            mb: 2, 
            color: 'var(--dark-text-color)', 
            fontFamily: '"Inter", sans-serif', 
            fontWeight: 600 
          }}>
            {t('analysisStep.uploadedImage')}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Chip 
              label={t('analysisStep.filename')}
              sx={{ 
                backgroundColor: 'white', 
                color: 'var(--primary-color)', 
                flexShrink: 0,
                border: '1px solid var(--primary-color)',
                fontFamily: '"Raleway", serif',
              }}
            />
            <Typography 
              variant="body2" 
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                minWidth: 0,
                color: 'var(--dark-text-color)',
                fontFamily: '"Raleway", serif',
              }}
              title={image?.name}
            >
              {truncateFileName(image?.name, isMobile ? 15 : 30)}
            </Typography>
          </Box>
          {!isError && (
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 6, justifyContent: 'center', gap: 2 }}>
            <Button
              variant="contained"
              onClick={() => onNext()}
              sx={{
                mt: 2, px: 4, fontSize: '14px', alignItems: 'center',
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
              {t('analysisStep.viewXAIExplanation')}
            </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ImagePreview;