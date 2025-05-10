import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InputField from './InputField';

const AuthForm = ({ isLogin, onSubmit }) => {
  const { t } = useTranslation('auth');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [payload, setPayload] = useState({});

  const validationSchema = Yup.object({
    email: Yup.string().email(t('errors.emailInvalid')).required(t('errors.required')),
    password: Yup.string().min(8, t('errors.passLength')).required(t('errors.required')),
    ...(!isLogin && {
      firstName: Yup.string().required(t('errors.required')),
      lastName: Yup.string().required(t('errors.required')),
      username: Yup.string().required(t('errors.required')),
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
          dateOfBirth: '',
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
            date_of_birth: values.dateOfBirth,
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
          <InputField
            id="firstName"
            label={t('register.firstName')}
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
            delay={0.1}ф
          />
          <InputField
            id="lastName"
            label={t('register.lastName')}
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
            delay={0.2}
          />
          <InputField
            id="username"
            label={t('register.username')}
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            delay={0.3}
          />
        </>
      )}

      <InputField
        id="email"
        label={t('login.email')}
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        delay={isLogin ? 0 : 0.4}
      />

      {!isLogin && (
        <InputField
          id="dateOfBirth"
          label={t('register.dob')}
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
          helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
          type="date"
          delay={0.5}
        />
      )}

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
        delay={isLogin ? 0.1 : 0.6}
      />

      {!isLogin && (
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
          delay={0.7}
        />
      )}

      {isLogin && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          <Link href="#" variant="body2" sx={{ fontFamily: '"Inter", serif', fontSize: '12px', color: 'var(--grey-color)', textDecoration: 'none' }}>
            {t('login.forgot')}
          </Link>
        </Box>
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
