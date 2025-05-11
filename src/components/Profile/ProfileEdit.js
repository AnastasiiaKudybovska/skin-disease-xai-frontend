import {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Box, CircularProgress } from '@mui/material';
import InputField from '../AuthForm/InputField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import 'dayjs/locale/en';
import { motion } from 'framer-motion';

const ProfileEdit = ({ formData, onChange, onSave, onCancel, loading }) => {
  const { t, i18n } = useTranslation('profile');
  const [dateError, setDateError] = useState('');

  const handleDateChange = (newValue) => {
    if (newValue) {
      const selectedDate = dayjs(newValue);
      const today = dayjs();
      const age = today.diff(selectedDate, 'year');

      if (age < 13) {
        setDateError(t('error_age_restriction'));
        onChange('date_of_birth', null);
      } else {
        setDateError('');
        // onChange('date_of_birth', selectedDate.toISOString());
        onChange('date_of_birth', selectedDate.format('YYYY-MM-DD')); 
      }
    } else {
      setDateError('');
      onChange('date_of_birth', null);
    }
  };

  return (
    <>
      <InputField
        id="first_name"
        label={t('first_name')}
        type="text"
        value={formData.first_name || ''}
        onChange={(e) => onChange('first_name', e.target.value)}
      />

      <InputField
        id="last_name"
        label={t('last_name')}
        type="text"
        value={formData.last_name || ''}
        onChange={(e) => onChange('last_name', e.target.value)}
      />

      <InputField
        id="username"
        label={t('username')}
        type="text"
        value={formData.username || ''}
        onChange={(e) => onChange('username', e.target.value)}
      />

      <InputField
        id="email"
        label={t('email')}
        type="text"
        value={formData.email || ''}
        disabled
      />

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
          <DatePicker
            label={t('date_of_birth')}
            value={formData.date_of_birth ? dayjs(formData.date_of_birth) : null}
            onChange={handleDateChange}
            maxDate={dayjs()}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
                required: true,
                error: Boolean(dateError),
                helperText: dateError,
                   sx: {
                          '& .MuiPickersOutlinedInput-root': {
                            borderRadius: '24px',
                            '&.Mui-focused fieldset': {
                              borderColor: 'var(--primary-color) !important',
                            },
                            '&.Mui-error fieldset': {
                              borderColor: 'var(--error-color)',
                            },
                          },
                          '& .MuiInputLabel-root': {
                            color: 'var(--grey-text-color)',
                            fontFamily: '"Raleway", serif',
                            '&.Mui-focused': {
                              color: 'var(--primary-color)',
                            },
                            '&.Mui-error': {
                              color: 'var(--error-color)',
                            },
                          },
                          '& .MuiFormHelperText-root': {
                            '&.Mui-error': {
                              color: 'var(--error-color)',
                            },
                          },
                          '& .MuiInputBase-input': {
                            fontFamily: '"Raleway", serif',
                            color: 'var(--grey-text-color)',
                          },
                          '& .MuiSvgIcon-root': {
                            color: 'var(--grey-color)',
                          },
                          '& .Mui-error .MuiSvgIcon-root': {
                             color: 'var(--error-color)',
                          },
                    
                        },
                      },
                    }}
                />
        </LocalizationProvider>
      </motion.div>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
        <Button 
          variant="outlined" 
          onClick={onCancel}
          disabled={loading}
          sx={{ borderRadius: '24px', fontWeight: 500, fontFamily: '"Inter", serif',  
            color: 'var(--error-color)',
            borderColor: 'var(--error-color)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.3s ease', 
            textTransform: 'none',
            '&:hover': {
             bgcolor: 'var(--error-color)',
             color: 'var(--white-color)',
             boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2), 0 4px 8px rgba(0, 0, 0, 0.3)',
            },
            '&:active': { 
              boxShadow: 'inset 0 0 15px rgba(0, 0, 0, 0.3)',
            }
          }}
        >
          {t('cancel')}
        </Button>
        <Button 
          variant="contained" 
          onClick={onSave} 
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} sx={{color: 'var(--white-color)'}} /> : null}
          sx={{ borderRadius: '24px', fontWeight: 500, fontFamily: '"Inter", serif',  
            bgcolor: 'var(--primary-color)', color: 'var(--white-color)',
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
          {t('save')}
        </Button>
      </Box>
    </>
  );
};

export default ProfileEdit;