import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import FeatureItem from './FeatureItem';
import {
  Search as SearchIcon,
  Psychology as PsychologyIcon,
  Assessment as AssessmentIcon,
  RocketLaunch as RocketLaunchIcon,
  Devices as DevicesIcon
} from '@mui/icons-material';

const MainFeatures = () => {
  const { t } = useTranslation('home');

  const features = [
    {
      icon: <SearchIcon fontSize="large" />,
      title: t('features.autoClassification'),
      description: t('features.autoClassificationDesc')
    },
    {
      icon: <PsychologyIcon fontSize="large" />,
      title: t('features.xai'),
      description: t('features.xaiDesc')
    },
    {
      icon: <AssessmentIcon fontSize="large" />,
      title: t('features.history'),
      description: t('features.historyDesc')
    },
    {
      icon: <RocketLaunchIcon fontSize="large" />,
      title: t('features.noRegistration'),
      description: t('features.noRegistrationDesc')
    },
    {
      icon: <DevicesIcon fontSize="large" />,
      title: t('features.responsive'),
      description: t('features.responsiveDesc')
    }
  ];

  return (
    <Box sx={{ p: 6, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <Typography variant="h3"
        sx={{
            mb: 4, textAlign: 'center',
            fontFamily: '"Frank Ruhl Libre", serif', fontWeight: 700,
            color: 'var(--dark-text-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', flexDirection: { xs: 'column', sm: 'row' },
        }}
    >
        {t('features.mainTitle')}
        <Box sx={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                mt: { xs: 2, sm: 0 }, ml: { xs: 0, sm: 2 },    flexWrap: 'wrap',
                color: 'var(--dark-text-color)'
         }}>
            <Box component="img" src="/images/logo_light.png" alt="Logo" sx={{ height: { xs: 80, md: 90 }, mr: 2 }} />
            <Box component="span" sx={{ color: 'var(--primary-color)', fontWeight: 400, fontFamily: '"Frank Ruhl Libre", serif' }}>Skin</Box>
            <Box component="span" sx={{ color: 'var(--dark-text-color)', fontWeight: 700, fontFamily: '"Frank Ruhl Libre", serif' }}>Insight</Box>
            <Box component="span" sx={{ color: 'var(--secondary-color)', fontWeight: 600, fontFamily: '"Frank Ruhl Libre", serif', ml: 1.4}}>AI</Box>
            ?
        </Box>
    </Typography>

    <Box sx={{ mb: 2 , maxWidth: 800, }}>
        {features.map((feature, index) => (
          <FeatureItem 
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            index={index}
          />
        ))}
    </Box>
    </Box>
  );
};

export default MainFeatures;