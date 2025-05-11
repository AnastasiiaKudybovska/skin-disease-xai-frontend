import React from 'react';
import { Box, Typography } from '@mui/material';

const ResultsDisplay = ({ results, image }) => {
  return (
    <Box>
      {results ? (
        <Typography>{`Results: ${results}`}</Typography>
      ) : (
        <Typography>No results yet</Typography>
      )}
      {image && <img src={URL.createObjectURL(image)} alt="Uploaded" />}
    </Box>
  );
};

export default ResultsDisplay;
