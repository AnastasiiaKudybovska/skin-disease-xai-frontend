import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCircularProgress = styled(CircularProgress)(({ customcolor }) => ({
  color: customcolor || 'var(--primary-color)',
}));

const CustomLoader = ({ size = 40, color }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh'
      }}
    >
      <StyledCircularProgress size={size} customcolor={color} />
    </Box>
  );
};

export default CustomLoader;
