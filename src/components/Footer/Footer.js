import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box 
      component="footer" 
      sx={{
        backgroundColor: 'var(--dark-bg-color)',
        color: 'var(--white-color)',
        py: 4,
        px: 2,
        mt: 'auto'
      }}
    >
      <Box sx={{
        maxWidth: '1200px',
        mx: 'auto',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 3
      }}>
        {/* Лого та опис */}
        <Box sx={{ maxWidth: '300px' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <img 
              src="/images/logo.png" 
              alt="Logo" 
              style={{ width: '40px', height: '45px', marginRight: '10px' }}
            />
            <Typography variant="h6" sx={{ fontFamily: '"Frank Ruhl Libre", sans-serif' }}>
              SkinInsight AI
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            {t('footer.description')}
          </Typography>
        </Box>

        {/* Навігація */}
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            {t('footer.navigation')}
          </Typography>
          <Link href="#home" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            {t('nav.home')}
          </Link>
          <Link href="#instructions" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            {t('nav.instructions')}
          </Link>
          <Link href="#diagnostics" color="inherit" sx={{ mb: 1, textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            {t('nav.diagnostics')}
          </Link>
          <Link href="#about" color="inherit" sx={{ textDecoration: 'none', '&:hover': { opacity: 0.8 } }}>
            {t('nav.about')}
          </Link>
        </Box>

        {/* Контакти */}
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
            {t('footer.contact')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Email: info@skininsight.com
          </Typography>
          <Typography variant="body2">
            {t('footer.copyright')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;