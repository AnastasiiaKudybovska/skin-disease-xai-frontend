import React from 'react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import WarningIcon from '@mui/icons-material/Warning'; 

const WarningBlock = () => {
  const { t } = useTranslation('home');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const backgroundImages = [
    '/images/warning_bg_disease1.png',
    '/images/warning_bg_disease2.jpg',
    '/images/warning_bg_disease3.jpg',
  ];

  const getVisibleImages = () => {
    if (isSmallScreen) {
      return [backgroundImages[2]];
    }
    return backgroundImages;
  };

  const visibleImages = getVisibleImages();

  return (
    <Box sx={{ 
      position: 'relative',  overflow: 'hidden', height: { xs: 'auto', md: 300 },  minHeight: 350,
      display: 'flex', alignItems: 'center',  justifyContent: 'center',
      px: { xs: 3, sm: 6 }, py: { xs: 6, md: 0 },
      '&:hover $iconContainer': {
        transform: 'scale(1.1)',
      }
    }}>
      <Box sx={{
        position: 'absolute', 
        top: 0, left: 0, right: 0,  bottom: 0, 
        display: 'flex', overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute',
          top: 0, left: 0, right: 0,  bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          zIndex: 1
        }
      }}>
        <Box sx={{
          display: 'grid', gridTemplateColumns: `repeat(${visibleImages.length}, 1fr)`,
          width: '100%', height: '100%', 
        }}>
          {visibleImages.map((img, index) => (
            <Box key={index} component="div" 
              sx={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative', }}
            >
              <Box 
                component="div"
                sx={{
                  backgroundImage: `url(${img})`, backgroundSize: 'cover',  backgroundRepeat: 'no-repeat',
                  width: '100%', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', 
        color: 'white', textAlign: { xs: 'center', sm: 'left' }, gap: 4,
        backgroundColor: 'rgba(31, 34, 42, 0.4)', backdropFilter: 'blur(6px)',
        borderRadius: 2, py: 4, px: 8,  mx: 2,
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(31, 34, 42, 0.6)',
        }
      }}>
        <Box 
          sx={{ 
            width: 120, height: 120,
            borderRadius: '50%',  border: '8px solid var(--secondary-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 40, fontWeight: 700,
            color: 'var(--secondary-color)', flexShrink: 0, 
            backgroundColor: 'var(--white-color)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
              boxShadow: '0 0 20px rgba(170, 33, 75, 0.7)',
            }
          }}
        >
          <WarningIcon sx={{ fontSize: 60 }} />
        </Box>
        <Box>
          <Typography variant="h4" sx={{ 
            mb: 2,
            fontWeight: 700, fontFamily: '"Playfair Display", serif',
            color: 'var(--white-color)', textShadow: '1px 1px 3px rgba(0,0,0,0.5)'
          }}>
            {t('warning.title')}
          </Typography>
          <Typography variant="body1" sx={{ 
            fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 600,
            fontFamily: '"Raleway", sans-serif', color: 'var(--white-color)'
          }}>
            {t('warning.description')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default WarningBlock;