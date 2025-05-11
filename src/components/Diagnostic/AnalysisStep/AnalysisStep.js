import { useState } from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DiagnosisResults from './DiagnosisResults';
import ErrorState from './ErrorState';
import ImagePreview from './ImagePreview';

const AnalysisStep = ({ results, image, handleBack, onNext }) => {
  const { t } = useTranslation('diagnostic');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [imagePreview, setImagePreview] = useState(null);

  useState(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(image);
    }
  }, [image]);

  if (!results) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography color="error" variant="h6">
          {t('analysisStep.no_results')}
        </Typography>
      </Box>
    );
  }

  if (results.isError) {
    let confidence = 0;
    let predictedClass = `${t('analysisStep.unknown')}`;
    
  if (results.error.includes('Unable to classify the image with sufficient confidence')) {
    const classMatch = results.error.match(/\(\s*confidence=[\d.]+\s*\(([^)]+)\)\)/);
    const confidenceMatch = results.error.match(/confidence=([\d.]+)/);
    confidence = confidenceMatch ? parseFloat(confidenceMatch[1]) : 0;
    predictedClass = classMatch ? classMatch[1] : `${t('analysisStep.unknown')}`;
  }

    return (
      <Box sx={{ 
        maxWidth: '1200px', 
        mx: 'auto', 
        py: 4,
        px: { xs: 2, md: 4 }
      }}>

        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 4
        }}>
          <ImagePreview image={image} imagePreview={imagePreview} isMobile={isMobile} 
            handleBack={handleBack} isError={true} onNext={onNext}/>
          <ErrorState 
            error={results.error} 
            predictedClass={predictedClass}
            confidence={confidence}
            handleBack={handleBack}
            isMobile={isMobile}
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: '1200px', 
      mx: 'auto', 
      py: 4,
      px: { xs: 2, md: 4 }
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 4
      }}>
        <ImagePreview image={image} imagePreview={imagePreview} isMobile={isMobile}
          handleBack={handleBack} isError={false} onNext={onNext}/>
        <DiagnosisResults results={results} isMobile={isMobile} />
      </Box>
    </Box>
  );
};

export default AnalysisStep;