import React, { useRef, useEffect } from 'react';
import { Box, Typography, Chip, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import HistoryImageSection from './HistoryImageSection';
import HistoryInfoSection from './HistoryInfoSection';
import PresentMethodView from './PresentMethodView';

const HistoryDetailCard = ({ history, setDeleteDialogOpen,update, setUpdate, scrollToMethod, methodRefs}) => {
  const { t } = useTranslation(['history', 'diagnostic']);
  const theme = useTheme();
  
  // const methodRefs = useRef({});
  const existingMethods = history.explanations?.[0]?.map(exp => exp.method.toLowerCase()) || [];

  const allMethods = [
    { id: 'gradcam', name: 'Grad-CAM' },
    { id: 'lime', name: 'LIME' },
    { id: 'anchor', name: 'Anchor' },
    { id: 'shap', name: 'SHAP' },
    { id: 'integrated gradients', name: 'Integrated Gradients' }
  ];

  const missingMethods = allMethods.filter(
    method => !existingMethods.includes(method.id)
  );

  const presentMethods = allMethods.filter(
    method => existingMethods.includes(method.id)
  );

 


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: '16px',
        boxShadow: theme.shadows[3],
        overflow: 'hidden',
        '&:hover': {
          boxShadow: theme.shadows[6]
        }
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          overflow: 'hidden',
          position: 'relative',
        }}>
          <Box sx={{ 
            width: { xs: '100%', md: '40%' },
            order: { xs: 2, md: 1 }
          }}>
            <HistoryImageSection 
              history={history} 
              missingMethods={missingMethods}
              existingMethods={existingMethods}
              setDeleteDialogOpen={setDeleteDialogOpen}
              scrollToMethod={scrollToMethod}
              update={update}
              setUpdate={setUpdate}
            />
          </Box>
          
          <Box sx={{ 
            width: { xs: '100%', md: '60%' },
            order: { xs: 1, md: 2 }
          }}>
            <HistoryInfoSection history={history} />
          </Box>
        </Box>

        {presentMethods.length > 0 && (
          <>
            <Box sx={{ 
              mt: 3,
              p: 3,
              textAlign: "center",
            }}>
              <Typography variant="h5" sx={{  
                      mb: 3, 
                      fontFamily: '"Inter", sans-serif', 
                      fontWeight: 600 
                    }}>
                {t('history:xaiMethods.availableExplanations')}
              </Typography>
              
              <Box sx={{ 
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 2,
              }}>
                {presentMethods.map((method) => (
                  <Chip
                    key={method.id}
                    label={method.name}
                    onClick={() => scrollToMethod(method.id)}
                    sx={{
                      px: 2,
                      py: 1,
                      fontSize: '1rem',
                      backgroundColor: 'var(--primary-color)',
                      color: 'white',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'var(--dark-primary-color)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {history.explanations?.[0]?.map((explanation, index) => {
              const methodId = explanation.method.toLowerCase();
              return (
                <Box 
                  key={index} 
                  ref={el => methodRefs.current[methodId] = el}
                  sx={{ p: 3 }}
                >
                  <PresentMethodView 
                    methodData={{
                      method: explanation.method,
                      overlayImageId: explanation.overlay_image_id,
                      heatmapImageId: explanation.heatmap_image_id,
                      predictedClass: history.predicted_class,
                      confidence: history.confidence
                    }}
                    scrollToMethod={scrollToMethod}
                  />
                </Box>
              );
            })}
          </>
        )}  
      </Box>
    </motion.div>
  );
};

export default HistoryDetailCard;