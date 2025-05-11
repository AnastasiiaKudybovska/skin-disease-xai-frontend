import React from 'react';
import { Box, Container } from '@mui/material';
import Profile from '../components/Profile/Profile';

const ProfilePage = () => {
  return (
    <>
      <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            py: {xs: 16, md: 6},
            px: { xs: 4, md: 0},
            background: 'var(--white-color)', 
          }}
      >
      <Container maxWidth="lg">
        <Profile />
      </Container>
      </Box>
    </>
  );
};

export default ProfilePage;