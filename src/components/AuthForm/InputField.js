import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { motion } from 'framer-motion';

const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  error,
  helperText,
  showPassword,
  setShowPassword,
  isPasswordField,
  delay,
}) => {
  const inputProps = isPasswordField
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton sx={{ color: error ? 'var(--error-color)' : 'var(--grey-color)' }}
            onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        id={id}
        label={label}
        type={isPasswordField ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        slotProps={{
          input: inputProps,
        }}
        sx={{
          '& .MuiOutlinedInput-root': { 
            borderRadius: '24px',
            '&.Mui-focused fieldset': {  
              borderColor: 'var(--primary-color)',
            },
            '&.Mui-error fieldset': {
              borderColor: 'var(--error-color)',
            },
          },
          '& .MuiFormHelperText-root.Mui-error': {
            color: 'var(--error-color)',
          },
          '& .MuiInputBase-input::placeholder': {
            color: 'var(--primary-color)',
          },
          '& .MuiInputLabel-root': {
            color: 'var(--grey-text-color)',
            fontFamily: '"Raleway", serif', 
           },
          '& .MuiInputLabel-root.Mui-focused': {
            color: 'var(--primary-color)',
           },
           '& .MuiInputLabel-root.Mui-error': {
            color: 'var(--error-color)',
          },
        }}
      />
    </motion.div>
  );
};

export default InputField;