import React, { useState } from 'react';
import { Box, Container, Typography, Stepper, Step, StepLabel, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ImageUpload from '../components/Diagnostic/ImageUpload';
import AnalysisStep from '../components/Diagnostic/AnalysisStep';
import ResultsDisplay from '../components/Diagnostic/ResultsDisplay';
import DiagnosticStepper from '../components/Diagnostic/DiagnosticStepper';


const DiagnosticPage = () => {
  const { t } = useTranslation('diagnostic');
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);

  const steps = [
    { label: t('steps.upload'), component: <ImageUpload onNext={() => setActiveStep(1)} setImage={setImage} /> },
    { label: t('steps.analysis'), component: <AnalysisStep /> },
    { label: t('steps.results'), component: <ResultsDisplay results={results} image={image} /> }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        pt: 14, pb: 8,
        px: { xs: 4, md: 0},
        background: 'var(--white-color)', 
      }}
    >
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        sx={{
          fontWeight: 700,
          fontFamily: '"Playfair Display", serif',
          color: 'var(--dark-text-color)',
          mb: 6
        }}
      >
        {t('title')}
      </Typography>

      <DiagnosticStepper activeStep={activeStep} steps={steps}/>

      <motion.div
        key={`step-${activeStep}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {steps[activeStep].component}
      </motion.div>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, gap: 2 }}>
        {activeStep !== 0 && (
          <Button onClick={() => setActiveStep((prev) => prev - 1)} variant="outlined">
            {t('backButton')}
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button onClick={() => {
            setActiveStep(0);
            setImage(null);
            setResults(null);
          }} variant="contained">
            {t('resetButton')}
          </Button>
        )}
      </Box>
    </Container>
    </Box>
  );
};

export default DiagnosticPage;
