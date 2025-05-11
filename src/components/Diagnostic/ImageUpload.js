import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { useTranslation } from 'react-i18next';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import NotAuthenticatedDialog from '../Modals/NotAuthenticatedDialog';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';

const ImageUpload = ({ onNext, setImage }) => {
  const { t } = useTranslation('diagnostic');
  const [preview, setPreview] = useState(null);
  const [hoverPreview, setHoverPreview] = useState(false);
  const { isAuthenticated } = useAuth();
  const [showDialog, setShowDialog] = useState(false);
  const [skipAuth, setSkipAuth] = useState(false);

  const handleFileSelection = (file) => {
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    if (!isAuthenticated && !skipAuth) {
      setShowDialog(true);
      return;
    }
    handleFileSelection(acceptedFiles[0]);
  }, [isAuthenticated, skipAuth]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop, 
    accept: { 
      'image/*': ['.jpeg', '.jpg', '.png'] 
    },
    maxFiles: 1,
    noClick: true 
  });

  const openFileDialog = () => {
    if (!isAuthenticated && !skipAuth) {
      setShowDialog(true);
      return;
    }
    // Програмно відкриваємо файловий діалог
    document.getElementById('file-input').click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setPreview(null);
    setImage(null);
  };

  const handleContinueWithoutLogin = () => {
    setSkipAuth(true);
    setShowDialog(false);
    document.getElementById('file-input').click();
  };

  return (
    <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
      <Box
        {...getRootProps()}
        onClick={undefined}
        sx={{
          border: '2px dashed',
          borderColor: isDragActive ? 'var(--dark-bg-color)' : 'var(--primary-color)',
          borderRadius: '16px', 
          p: 2,  
          cursor: 'pointer',
          backgroundColor: 'white',
          transition: 'all 0.3s ease',
          minHeight: 300,
          display: 'flex', 
          flexDirection: 'column',  
          alignItems: 'center',  
          justifyContent: 'center',
          position: 'relative',
          '&:hover': {
            borderColor: 'var(--dark-primary-color)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        {/* Прихований input для файлів */}
        <input 
          id="file-input"
          type="file" 
          accept="image/*" 
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        
        {!preview ? (
          <>
            <FileUploadOutlinedIcon sx={{ 
              fontSize: 64, 
              color: 'var(--primary-color)',
              mb: 2 
            }} />
            <Typography variant="body1" sx={{
              color: 'var(--grey-text-color)',  
              fontFamily: '"Raleway", serif'
            }}>
              {t('instructionSteps.uploadDesc')}
            </Typography>
            <Button 
              variant="contained" 
              onClick={openFileDialog} // Обробник кліку для кнопки
              sx={{ 
                mt: 2,  
                px: 4, 
                borderRadius: '24px', 
                fontWeight: 500, 
                fontFamily: '"Inter", serif',  
                bgcolor: 'var(--primary-color)', 
                color: 'var(--white-color)',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease', 
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'var(--dark-primary-color)',
                  boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
                },
                '&:active': { 
                  boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
                }
              }}
            >
              {t("selectImage")}
            </Button>
          </>
        ) : (
          <>
            <Box 
              sx={{ 
                position: 'relative', 
                width: '100%',
                '&:hover .image-overlay': {
                  opacity: 1
                }
              }}
              onMouseEnter={() => setHoverPreview(true)}
              onMouseLeave={() => setHoverPreview(false)}
            >
              <Box
                className="image-overlay"
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  borderRadius: 4,
                  zIndex: 1
                }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={preview} 
                  alt="Preview" 
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: 300, 
                    borderRadius: 4,
                    display: 'block',  
                    margin: '0 auto',
                    filter: hoverPreview ? 'brightness(0.95)' : 'none',
                    transition: 'filter 0.3s ease'
                  }} 
                />
              </motion.div>
            </Box>
            
            <Typography 
              variant="body2"
              sx={{
                mt: 2,
                fontFamily: '"Raleway", serif',
                color: 'var(--grey-text-color)',
                cursor: 'pointer',
                '&:hover': {
                  color: 'var(--primary-color)',
                  textDecoration: 'underline'
                }
              }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage(e);
              }}
            >
              {t('reupload')}
            </Typography>
          </>
        )}
      </Box>

      {preview && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={onNext}
            sx={{ 
              mt: 4,  
              px: 4, 
              borderRadius: '24px', 
              fontWeight: 500, 
              fontFamily: '"Inter", serif',  
              bgcolor: 'var(--primary-color)', 
              color: 'var(--white-color)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              transition: 'all 0.3s ease', 
              textTransform: 'none',
              '&:hover': {
                bgcolor: 'var(--dark-primary-color)',
                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
              },
              '&:active': { 
                boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
              }
            }}
          >
            {t('nextButton')}
          </Button>
        </motion.div>
      )}

      <NotAuthenticatedDialog 
        open={showDialog}
        onClose={() => setShowDialog(false)}
        onContinue={handleContinueWithoutLogin}
      />
    </Box>
  );
};

export default ImageUpload;