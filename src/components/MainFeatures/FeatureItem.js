import React, {useEffect} from 'react';
import { Box, Typography} from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeatureItem = ({ icon, title, description, index }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const variants = {
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: index * 0.15 }
    },
    hidden: { opacity: 0, x: -50 }
  };

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} style={{ marginBottom: 36 }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
        <Box sx={{
          width: 56, height: 56,
          borderRadius: '50%', 
          bgcolor: index % 2 === 0 ? 'var(--primary-color)' : 'var(--dark-bg-color)',
          display: 'flex', alignItems: 'center',  justifyContent: 'center',
          fontSize: '1.8rem', color: 'var(--white-color)',
          mr: 4, flexShrink: 0,
        }}>
          {icon}
        </Box>
        <Box>
          <Typography variant="h5" sx={{ 
            fontWeight: 600, mb: 1, 
            color: index % 2 === 0 ? 'var(--dark-primary-color)' : 'var(--dark-bg-color)',
            fontFamily: '"Inter", sans-serif',
          }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: 'var(--grey-text-color)',   fontFamily: '"Raleway", sans-serif',
            lineHeight: 1.6}}>
            {description}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default FeatureItem;