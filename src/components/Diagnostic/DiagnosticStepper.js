import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Box, keyframes } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(56, 135, 113, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(56, 135, 113, 0); }
  100% { box-shadow: 0 0 0 0 rgba(56, 135, 113, 0); }
`;

const DiagnosticStepper = ({ activeStep }) => {
  const { t } = useTranslation('diagnostic');
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  const steps = [
    { key: 'upload', label: t('instructionSteps.upload') },
    { key: 'analysis', label: t('instructionSteps.analysis') },
    { key: 'results', label: t('instructionSteps.results') }
  ];

  const CustomConnector = ({ active, completed, index }) => {
    const color = completed 
      ? 'var(--dark-primary-color)' 
      : active 
        ? 'var(--primary-color)' 
        : 'var(--dark-bg-color)';

    return (
      <motion.div
        initial={initialLoad ? { scaleX: 0 } : false}
        animate={{ scaleX: 1 }}
        transition={{ 
          delay: initialLoad ? index * 0.2 + 0.1 : 0,
          duration: 0.6,
          type: 'spring',
          stiffness: 100
        }}
        style={{
          position: 'absolute',
          top: '25%',
          left: 'calc(-50% + 36px)',
          right: 'calc(50% + 36px)',
          height: 2,
          backgroundColor: color,
          transformOrigin: 'left center',
          zIndex: -1,
        }}
      />
    );
  };

  return (
    <Box sx={{ 
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      py: 4
    }}>
      <Stepper 
        activeStep={activeStep} 
        alternativeLabel
        connector={null}
        sx={{
          position: 'relative',
          '& .MuiStep-root': {
            position: 'relative',
            padding: 0,
            zIndex: 1,
            flex: 1,
          },
          '& .MuiStepConnector-line': { borderLeftColor: 'var(--white-color)', },
          '& .Mui-active': {'& .MuiStepConnector-line': { borderLeftColor: 'var(--primary-color)',}},
          '& .Mui-completed': { '& .MuiStepConnector-line': {borderLeftColor: 'var(--dark-primary-color)',}},
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.key}  completed={index < activeStep}>
            {index > 0 && (
              <CustomConnector 
                active={index === activeStep} 
                completed={index < activeStep}
                index={index}
              />
            )}

            <StepLabel
              StepIconComponent={(props) => (
                <motion.div
                  initial={initialLoad ? { x: -50, opacity: 0 } : false}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    delay: initialLoad ? index * 0.2 : 0,
                    type: 'spring', 
                    stiffness: 100 
                  }}
                >
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: props.completed 
                        ? 'var(--dark-primary-color)' 
                        : props.active 
                          ? 'var(--primary-color)' 
                          : 'var(--white-color)',
                      border: (props.completed || props.active) ? 'none':  '2px solid var(--dark-bg-color)',
                      borderRadius: '50%',
                      color: (props.active || props.completed ) ? 'white' : 'var(--dark-text-color)',
                      fontSize: '1.2rem', fontWeight: 400,
                      position: 'relative',
                      animation: props.active ? `${pulse} 2s infinite` : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {props.completed ? '✓' : index + 1}
                  </Box>
                </motion.div>
              )}
               sx={{
                    '& .MuiStepLabel-labelContainer': {
                      '& .MuiStepLabel-label': {
                       fontSize: '1.1rem',
                        '&.Mui-active': {
                          fontWeight: '700 !important', color: 'var(--primary-color)',
                        },
                        '&.Mui-completed': {
                          fontWeight: '500 !important', color: 'var(--primary-color)',
                        },
                        '&:not(.Mui-active):not(.Mui-completed)': {
                          fontWeight: '400 !important', color: 'var(--grey-color)',
                        },
                      },
                    },
                    alignItems: 'center', padding: 0,
                  }}
            >
              <motion.div
                initial={initialLoad ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                transition={{ delay: initialLoad ? index * 0.2 + 0.3 : 0 }}
              >
                {step.label}
              </motion.div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default DiagnosticStepper;