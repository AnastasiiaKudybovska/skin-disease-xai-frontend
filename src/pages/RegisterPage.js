import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthForm from '../components/AuthForm/AuthForm';
import { motion } from 'framer-motion';

const RegisterPage = () => {
  const { t } = useTranslation('auth');

  const handleSubmit = async (credentials) => {
    console.log('Register data:', credentials);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: { xs: 4, md: 0 },
        background: {
          xs: 'linear-gradient(135deg, var(--white-color) 70%, white 30%)',
          md: 'linear-gradient(to right, var(--white-color) 80%, white 20%)',
        },
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'stretch',
            justifyContent: 'space-between',
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              pr: { sm: 8 },
              py: 8,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                color: 'var(--dark-text-color)',
                fontFamily: '"Frank Ruhl Libre", serif',
                fontWeight: 700,
                mb: 2,
              }}
            >
              {t('register.welcome')}
              <Box component="span" sx={{ color: 'var(--primary-color)', fontWeight: 400 }}>Skin</Box>
              <Box component="span" sx={{ color: 'var(--dark-text-color)', fontWeight: 700 }}>Insight</Box>
              <Box component="span" sx={{ color: 'var(--secondary-color)', fontWeight: 600 }}> AI</Box>
              !
            </Typography>

            <Typography variant="h6" sx={{ mb: 4, fontFamily: '"Raleway", serif' }}>
              {t('register.subtitle')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--grey-text-color)', fontFamily: '"Raleway", serif' }}>
              {t('register.description')}
            </Typography>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
            }}
          >
            <Paper
              elevation={6}
              sx={{
                p: 5,
                borderRadius: 4,
                width: '100%',
                maxWidth: 500,
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h4" align="center" fontWeight="bold" sx={{ mb: 3, fontFamily: '"Playfair Display", serif' }}>
                {t('register.title')}
              </Typography>
              <AuthForm isLogin={false} onSubmit={handleSubmit} />
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default RegisterPage;
