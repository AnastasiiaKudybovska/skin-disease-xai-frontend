import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const fullSizeImages = [
  { id: 1, src: '/images/mainhero_full1.jpeg' },
  { id: 2, src: '/images/mainhero_full2.jpg' },
];

const smallImages = [
  { id: 1, src: '/images/mainhero_small1.jpg' },
  { id: 2, src: '/images/mainhero_small2.jpg' },
  { id: 3, src: '/images/mainhero_small3.jpg' },
  { id: 4, src: '/images/mainhero_small4.jpg' },
  { id: 5, src: '/images/mainhero_small5.jpg' },
];

const MainHero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const [currentFullImageIndex, setCurrentFullImageIndex] = useState(0);
  const [currentSmallImageIndex, setCurrentSmallImageIndex] = useState(0);
  const [showFullImage, setShowFullImage] = useState(true);

  useEffect(() => {
    const displayDuration = 4000;
    const interval = setInterval(() => {
      setShowFullImage(prev => {
        if (prev) {
          setCurrentSmallImageIndex(prevIndex => (prevIndex + 1) % smallImages.length);
        } else {
          setCurrentFullImageIndex(prevIndex => (prevIndex + 1) % fullSizeImages.length);
        }
        return !prev;
      });
    }, displayDuration);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      minHeight: isMobile ? 'auto' : '92vh',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: 'var(--white-color)',
    }}>
      <Box sx={{
        width: isMobile ? '100%' : '50%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: isMobile ? theme.spacing(4) : theme.spacing(8),
        mt: isMobile ? 8 : 0, mb: isMobile ? 6 : 0,
        textAlign: isMobile ? 'center' : 'left',
        position: 'relative', zIndex: 2,
      }}>
        <Typography variant={isMobile ? 'h3' : 'h2'} sx={{
          fontFamily: '"Frank Ruhl Libre", serif',
          fontWeight: 700,
          mb: 3,
          color: theme.palette.text.primary,
        }}>
            <Box component="span" sx={{ color: 'var(--primary-color)', fontWeight: 400 }}>Skin</Box>
            <Box component="span" sx={{ color: 'var(--dark-bg-color)', fontWeight: 700 }}>Insight</Box>
            <Box component="span" sx={{ color: 'var(--secondary-color)', fontWeight: 600 }}> AI</Box>
        </Typography>
        
        <Typography variant={isMobile ? 'h5' : 'h4'} sx={{
          fontFamily: '"Raleway", sans-serif', fontWeight: 600,
          mb: 3, color: 'var(--dark-bg-color)',
        }}>
          {t('mainHero.subtitle')}
        </Typography>
        
        <Typography variant="body1" sx={{
          fontFamily: '"Raleway", sans-serif',
          mb: 6, lineHeight: 1.6, fontSize: isMobile ? '1rem' : '1.1rem',
          color: 'var(--grey-color)'
        }}>
          {t('mainHero.description')}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
            <Button 
                variant="contained" size={isMobile ? 'medium' : 'large'}
                sx={{
                    width: isMobile ? '160px' : '200px', py: isMobile ? 1.5 : 2,
                    borderRadius: '25px', textTransform: 'none',
                    fontWeight: 600, fontSize: isMobile ? '0.9rem' : '1rem',
                    backgroundColor: 'var(--primary-color)', color: 'var(--white-color)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'all 0.3s ease',
                    '&:hover': {
                        backgroundColor: 'var(--dark-primary-color)',
                        boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
                    },
                    '&:active': { boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)', }
                }}
                >
                {t('mainHero.tryButton')}
            </Button>
        </Box>
      </Box>

      <Box sx={{
        width: isMobile ? '100%' : '50%', height: isMobile ? '60vh' : '100vh',
        position: 'relative', zIndex: 2, overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute', pointerEvents: 'none',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 3,
        }
      }}>
        <Box sx={{
          width: '100%', height: '100%', position: 'absolute', top: 0, left: 0,
          opacity: showFullImage ? 1 : 0,  zIndex: 2,
          transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'translateZ(0)',
          willChange: 'opacity',
          backgroundImage: `url(${fullSizeImages[currentFullImageIndex].src})`,
          backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
          backgroundAttachment: isMobile ? 'scroll' : 'fixed',
          filter: 'brightness(0.95) contrast(1.05)',
        }} />
        <Box sx={{
          width: '100%', height: '100%',
          position: 'absolute', top: 0, left: 0, zIndex: 1,
          opacity: !showFullImage ? 1 : 0,
          transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)', 
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gridTemplateRows: 'repeat(2, 1fr)', gap: 0,
          transform: 'translateZ(0)', willChange: 'opacity',
        }}>
          {[0, 1, 2, 3].map((position) => (
            <Box 
              key={position}
              sx={{
                position: 'relative', overflow: 'hidden',
                '&::after': {
                  content: '""', position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0, zIndex: 1,
                },
                backgroundImage: `url(${smallImages[(currentSmallImageIndex + position) % smallImages.length].src})`,
                backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
                backgroundAttachment: isMobile ? 'scroll' : 'fixed',
                filter: 'brightness(0.95)',  transform: 'scale(1.01)',
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MainHero;