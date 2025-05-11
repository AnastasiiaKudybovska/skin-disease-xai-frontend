import React, { useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ImageUpload from '../components/Diagnostic/ImageUpload';
import AnalysisStep from '../components/Diagnostic/AnalysisStep/AnalysisStep';
import ResultsDisplay from '../components/Diagnostic/ResultsDisplay';
import DiagnosticStepper from '../components/Diagnostic/DiagnosticStepper';

const DiagnosticPage = () => {
  const { t } = useTranslation('diagnostic');
  const [activeStep, setActiveStep] = useState(0);
  const [image, setImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);

  const handleReset = () => {
    setActiveStep(0);
    setImage(null);
    setAnalysisResults(null);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const steps = [
    { 
      label: t('steps.upload'), 
      component: (
        <ImageUpload 
          onNext={() => setActiveStep(1)} 
          setImage={setImage} 
          initialImage={image}
          setAnalysisResults={setAnalysisResults}
        />
      ) 
    },
    { 
      label: t('steps.analysis'), 
      component: <AnalysisStep results={analysisResults} image={image} handleBack={handleBack}  onNext={() => setActiveStep(2)} /> 
    },
    { 
      label: t('steps.results'), 
      component: <ResultsDisplay results={analysisResults} image={image} /> 
    }
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

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} variant="contained"
              sx={{ mt: 4, px: 4, borderRadius: '24px', minWidth: '150px',
                fontWeight: 500, fontFamily: '"Inter", serif', textTransform: 'none',
                bgcolor: 'var(--white-color)',  color: 'var(--primary-color)', border: '2px solid var(--primary-color)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'all 0.3s ease', 
                '&:hover': { bgcolor: 'var(--primary-color)', color: 'var(--white-color)',
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
                  },
                '&:active': { boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',},
                }}
             >
              {t('backButton')}
            </Button>                        
          )}
          {activeStep === 1 && analysisResults && !analysisResults.isError &&(
            <Button onClick={() => setActiveStep(2)} variant="contained"
              sx={{ mt: 4, px: 4, borderRadius: '24px', minWidth: '150px',
                fontWeight: 500, fontFamily: '"Inter", serif', textTransform: 'none',
                bgcolor: 'var(--primary-color)',  color: 'var(--white-color)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'all 0.3s ease', 
                '&:hover': { bgcolor: 'var(--dark-primary-color)',
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
                  },
                '&:active': { boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',},
                }}>
              {t('analysisStep.viewXAIExplanation')}
            </Button>                        
          )}
          {activeStep === steps.length - 1 && (
            <Button onClick={handleReset} variant="contained"
                sx={{ mt: 4, px: 4, borderRadius: '24px',  
                fontWeight: 500, fontFamily: '"Inter", serif', textTransform: 'none',
                bgcolor: 'var(--primary-color)',  color: 'var(--white-color)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', transition: 'all 0.3s ease', 
                '&:hover': { bgcolor: 'var(--dark-primary-color)',
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
                  },
                '&:active': { boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',},
                }}>
              {t('resetButton')}
            </Button>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default DiagnosticPage;