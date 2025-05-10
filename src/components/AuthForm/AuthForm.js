import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import 'dayjs/locale/en';
import InputField from './InputField';
import { motion } from 'framer-motion';

const AuthForm = ({ isLogin, onSubmit }) => {
  const { t, i18n } = useTranslation('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [payload, setPayload] = useState({});

  // Set dayjs locale based on i18n language
  dayjs.locale(i18n.language);

  const validationSchema = Yup.object({
    email: Yup.string().email(t('errors.emailInvalid')).required(t('errors.required')),
    password: Yup.string().min(8, t('errors.passLength')).required(t('errors.required')),
    ...(!isLogin && {
      firstName: Yup.string().required(t('errors.required')),
      lastName: Yup.string().required(t('errors.required')),
      username: Yup.string().required(t('errors.required')),
      dateOfBirth: Yup.date()
        .required(t('errors.required'))
        .max(new Date(), t('errors.futureDate'))
        .test(
          'min-age',
          t('errors.minAge'),
          value => {
            if (!value) return false;
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
              return age - 1 >= 13;
            }
            return age >= 13;
          }
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t('errors.passMatch'))
        .required(t('errors.required')),
    }),
  });

  const formik = useFormik({
    initialValues: isLogin
      ? { email: '', password: '' }
      : {
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          dateOfBirth: null,
          password: '',
          confirmPassword: '',
        },
    validationSchema,
    onSubmit: (values) => {
      const newPayload = isLogin
        ? { email: values.email, password: values.password }
        : {
            first_name: values.firstName,
            last_name: values.lastName,
            username: values.username,
            email: values.email,
            date_of_birth: values.dateOfBirth ? dayjs(values.dateOfBirth).format('YYYY-MM-DD') : null,
            password: values.password,
          };

      setPayload(newPayload);
      onSubmit(newPayload);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
      {!isLogin && (
        <>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <InputField
                id="firstName"
                label={t('register.firstName')}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                delay={0.1}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <InputField
                id="lastName"
                label={t('register.lastName')}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                delay={0.2}
              />
            </Box>
          </Box>

          <Box>
            <InputField
              id="email"
              label={t('login.email')}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              delay={0.3}
            />
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <InputField
                id="username"
                label={t('register.username')}
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
                delay={0.4}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language}>
                  <DatePicker
                    label={t('register.dateOfBirth')}
                    value={formik.values.dateOfBirth ? dayjs(formik.values.dateOfBirth) : null}
                    onChange={(date) => {
                      formik.setFieldValue('dateOfBirth', date ? date.toDate() : null);
                    }}
                    maxDate={dayjs()}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: 'normal',
                        required: true,
                        error: formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth),
                        helperText: formik.touched.dateOfBirth && formik.errors.dateOfBirth,
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
            </Box>
          </Box>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <InputField
                id="password"
                label={t('login.password')}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                isPasswordField={true}
                delay={0.7}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 200 }}>
              <InputField
                id="confirmPassword"
                label={t('register.confirmPass')}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                type="password"
                showPassword={showConfirmPassword}
                setShowPassword={setShowConfirmPassword}
                isPasswordField={true}
                delay={0.8}
              />
            </Box>
          </Box>
        </>
      )}

      {isLogin && (
        <>
          <InputField
            id="email"
            label={t('login.email')}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            delay={0.1}
          />
          <InputField
            id="password"
            label={t('login.password')}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            isPasswordField={true}
            delay={0.2}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Link href="#" variant="body2" sx={{ fontFamily: '"Inter", serif', fontSize: '12px', color: 'var(--grey-color)', textDecoration: 'none' }}>
              {t('login.forgot')}
            </Link>
          </Box>
        </>
      )}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3, mb: 2, py: 1.5,
          borderRadius: '24px', 
          fontWeight: 600, fontFamily: '"Inter", serif',  
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
        {isLogin ? t('login.submit') : t('register.submit')}
      </Button>

      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" sx={{ fontFamily: '"Inter", serif', color: 'var(--grey-text-color)' }}>
          {isLogin ? t('login.noAccount') : t('register.haveAccount')}{' '}
          <Link href={isLogin ? '/signup' : '/login'} variant="body2" sx={{ fontFamily: '"Inter", serif', color: 'var(--primary-color)' }}>
            {isLogin ? t('login.create') : t('register.login')}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthForm;