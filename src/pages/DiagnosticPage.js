import React, { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import DiagnosticStepper from '../components/Diagnostic/DiagnosticStepper';
import ImageUpload from '../components/Diagnostic/ImageUpload';
import ResultsDisplay from '../components/Diagnostic/ResultsDisplay';

const DiagnosticPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ fontWeight: 700 }}>
        Діагностика шкірних захворювань
      </Typography>
      
      <DiagnosticStepper activeStep={activeStep} />
      
      <Box sx={{ my: 4 }}>
        {activeStep === 0 && (
          <ImageUpload 
            onImageUpload={setImage} 
            onNext={handleNext} 
          />
        )}
        
        {activeStep === 1 && (
          <ResultsDisplay 
            image={image} 
            results={results} 
            onBack={handleBack} 
            onNext={handleNext}
          />
        )}
        
        {/* {activeStep === 2 && (
          <DiagnosticHistory 
            onReset={handleReset} 
          />
        )} */}
      </Box>
    </Container>
  );
};

export default DiagnosticPage;