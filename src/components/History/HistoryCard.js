import React from 'react';
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  Skeleton,
  LinearProgress,
  Stack,
  useTheme,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ImageService } from '../../services/imageService';
import { useAuth } from '../../hooks/useAuth';
import { diseaseColors } from '../../utils/constants';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';

const HistoryCard = ({ history, onDelete }) => {
  const { t } = useTranslation(['history', 'diagnostic']);
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = React.useState(null);
  const [imageLoading, setImageLoading] = React.useState(true);

  const topDiagnoses = Object.entries(history.probabilities || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  React.useEffect(() => {
    const loadImage = async () => {
      try {
        setImageLoading(true);
        if (history.image_id) {
          const url = await ImageService.getImage(history.image_id, isAuthenticated);
          setImageUrl(url);
        }
      } finally {
        setImageLoading(false);
      }
    };

    loadImage();

    return () => {
      if (imageUrl) {
        ImageService.revokeImageUrl(imageUrl);
      }
    };
  }, [history.image_id, isAuthenticated]);

  const handleClick = () => {
    navigate(`/history/${history.id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <motion.div whileHover={{ y: -5 }} style={{ height: '100%' }}>
      <Card 
        sx={{ 
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          height: '100%',
          minHeight: '520px', // Фіксована мінімальна висота
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '16px',
          overflow: 'hidden',
          backgroundColor: 'white',
          boxShadow: theme.shadows[3],
          width: 320,
          position: 'relative',
          '&:hover': {
            boxShadow: theme.shadows[6],
            transform: 'translateY(-5px)'
          }
        }}
        onClick={handleClick}
      >
        <IconButton
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 8,
            zIndex: 2,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': {
              backgroundColor: 'var(--error-color)',
              color: 'var(--white-color)'
            }
          }}
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>

        {/* Заголовок з назвою захворювання */}
        <Box sx={{
          p: 2,
          backgroundColor: diseaseColors[history.predicted_class] || theme.palette.primary.main,
          color: 'white',
          flexShrink: 0 // Запобігає стисканню
        }}>
          <Typography variant="h6" sx={{ 
            fontFamily: '"Inter", sans-serif',
            fontWeight: 700,
            textAlign: 'center',
            letterSpacing: '0.5px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {t(`diagnostic:diseaseLabels.${history.predicted_class}`)}
          </Typography>
        </Box>

        {/* Зображення */}
        <Box sx={{ 
          height: 200,
          minHeight: 200,
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#f8f9fa',
          flexShrink: 0
        }}>
          {imageLoading ? (
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height="100%" 
              animation="wave"
              sx={{ 
                transform: 'none', 
                bgcolor: 'rgba(0,0,0,0.05)'
              }} 
            />
          ) : (
            <CardMedia
              component="img"
              height="200"
              image={imageUrl || '/placeholder-image.jpg'}
              alt="Diagnostic image"
              sx={{ 
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0
              }}
            />
          )}
        </Box>
        
        {/* Основний вміст */}
        <CardContent sx={{ 
          flex: '1 1 auto',
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Відсоток впевненості */}
          <Box sx={{ 
            mb: 3,
            textAlign: 'center',
            flexShrink: 0
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              color: diseaseColors[history.predicted_class] || theme.palette.primary.main,
              fontFamily: '"Inter", sans-serif'
            }}>
              {(history.confidence * 100).toFixed(1)}%
            </Typography>
            <Typography variant="body2" sx={{ 
              color: theme.palette.text.secondary,
              fontFamily: '"Inter", sans-serif'
            }}>
              {t('history:history.confidenceLevel')}
            </Typography>
          </Box>

          {/* Топ діагнози */}
          <Box sx={{ 
            mb: 2,
            flex: '1 1 auto',
            overflow: 'hidden'
          }}>
            <Typography variant="subtitle2" sx={{ 
              mb: 1,
              color: theme.palette.text.secondary,
              fontFamily: '"Inter", sans-serif',
              fontWeight: 600
            }}>
              {t('history:history.topDiagnoses')}:
            </Typography>
            
            <Stack spacing={1.5} sx={{ overflow: 'hidden' }}>
              {topDiagnoses.map(([disease, probability]) => (
                <Box key={disease}>
                  <Box sx={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 0.5
                  }}>
                    <Typography variant="body2" sx={{ 
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 500,
                      color: theme.palette.text.primary,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {t(`diagnostic:diseaseLabels.${disease}`)}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      fontFamily: '"Inter", sans-serif',
                      fontWeight: 600,
                      color: diseaseColors[disease] || theme.palette.primary.main,
                      flexShrink: 0,
                      ml: 1
                    }}>
                      {(probability * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={probability * 100}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: 'rgba(0,0,0,0.05)',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: diseaseColors[disease] || theme.palette.primary.main,
                        borderRadius: 3
                      }
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Дата */}
          <Box sx={{ 
            mt: 'auto',
            pt: 2,
            borderTop: `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
            flexShrink: 0
          }}>
            <Typography variant="caption" sx={{ 
              color: theme.palette.text.secondary,
              fontFamily: '"Inter", sans-serif'
            }}>
              {new Date(history.timestamp).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default HistoryCard;