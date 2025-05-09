import React from 'react';
import { Box } from '@mui/material';
import { diseaseKeys, diseaseColors } from '../../utils/constants';

const DiseaseCarouselRotator = ({ 
  activeDisease, 
  handleDiseaseSelect, 
  setHovered,
  hovered
}) => {
  return (
    <Box 
      sx={{
        position: 'relative',
        width: '250px',
        height: '500px',
        flexShrink: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Box sx={{
        left: -2, 
        width: '100%', 
        height: '100%',
        borderRadius: '0 100% 100% 0 / 0 50% 50% 0',
        border: '2px dashed', 
        borderColor: diseaseColors[activeDisease],
        position: 'relative', 
        boxSizing: 'border-box',
      }} />

      <Box sx={{
        position: 'absolute', 
        top: 0, 
        left: 0,
        width: '100%', 
        height: '100%',
        borderRadius: '0 100% 100% 0 / 0 50% 50% 0',
        overflow: 'hidden', 
        zIndex: 1,
      }}>
        <div style={{ width: '100%', height: '100%' }} />
      </Box>

      {diseaseKeys.map((key, index) => {
        const total = diseaseKeys.length;
        const activeIdx = diseaseKeys.indexOf(activeDisease);
        const offset = (index - activeIdx + total) % total;

        const half = Math.floor(total / 2);
        const relativeIndex = offset <= half ? offset : offset - total;
        const distanceFromActive = Math.abs(relativeIndex);

        const angle = (relativeIndex / half) * (Math.PI / 1.5);
        const radius = 250;
        const spreadFactor = 1;
        const x = radius * Math.cos(angle) * spreadFactor;
        const y = radius * Math.sin(angle) * spreadFactor;

        const isActive = activeDisease === key;
        const size = isActive ? 180 : 50 + (50 * (1 - distanceFromActive / half));
        const grayscaleValue = 1 - (distanceFromActive / half) * 0.7;
        const opacity = 0.7 + (0.3 * (1 - distanceFromActive / half));

        return (
          <Box
            key={key}
            onClick={() => handleDiseaseSelect(key)}
            sx={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              top: 2,
              borderRadius: '50%',
              backgroundColor: 'var(--white-color)',
              border: isActive 
                ? '4px solid' 
                : `3px solid rgba(0,0,0,${0.3 + (0.7 * (1 - distanceFromActive / half))})`,
              borderColor: isActive ? diseaseColors[activeDisease] : 'rgba(0,0,0,0.3)',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: `translate(${x - size/2}px, ${y + 250 - size/2}px)`,
              zIndex: isActive ? 3 : 2,
              opacity: opacity,
              boxShadow: isActive 
                ? `0 0 20px ${diseaseColors[activeDisease]}, 0 0 30px rgba(0,0,0,0.4)`
                : `0 0 ${10 * (1 - distanceFromActive / half)}px rgba(0,0,0,${0.3 * (1 - distanceFromActive / half)})`,
              '&:hover': {
                transform: `translate(${x - size/2}px, ${y + 250 - size/2}px) scale(1.15)`,
                boxShadow: `0 0 15px ${diseaseColors[key]}, 0 0 20px rgba(0,0,0,0.5)`,
                zIndex: 4,
                opacity: 1,
              },
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: '50%',
                border: isActive ? '2px solid rgba(255,255,255,0.8)' : '1px solid rgba(255,255,255,0.5)',
                zIndex: 1,
                pointerEvents: 'none',
              }
            }}
          >
            <img 
              src={`/images/${key}.jpg`} 
              alt={key}
              style={{
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                filter: isActive 
                  ? 'brightness(1.1) saturate(1.2)' 
                  : `grayscale(${1 - grayscaleValue}) brightness(${0.6 + grayscaleValue * 0.4})`,
                transition: 'filter 0.8s ease, transform 0.8s ease',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default DiseaseCarouselRotator;