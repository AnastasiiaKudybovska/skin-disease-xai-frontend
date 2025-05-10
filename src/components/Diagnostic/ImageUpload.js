import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ImageUpload = ({ onImageUpload, onNext }) => {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageUpload(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Завантажте фото ураженої ділянки шкіри
      </Typography>
      
      <Box sx={{ my: 3 }}>
        {preview ? (
          <img 
            src={preview} 
            alt="Preview" 
            style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} 
          />
        ) : (
          <CloudUploadIcon sx={{ fontSize: 80, color: 'action.active' }} />
        )}
      </Box>
      
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="contained-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="contained-button-file">
        <Button 
          variant="contained" 
          component="span"
          sx={{ mr: 2 }}
        >
          Обрати зображення
        </Button>
      </label>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={onNext}
        disabled={!preview}
      >
        Аналізувати
      </Button>
    </Paper>
  );
};

export default ImageUpload;