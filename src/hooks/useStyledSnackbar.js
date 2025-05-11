import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

const useStyledSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation(['errors', 'common']);

  const showMessage = (message, options = {}) => {
    const translatedMessage = t(message, { defaultValue: message });
    
    enqueueSnackbar(translatedMessage, {
      variant: options.variant || 'default',
      autoHideDuration: options.duration || (options.variant === 'error' ? 5000 : 3000),
      anchorOrigin: { vertical: 'top', horizontal: 'right' },
      style: {
        fontFamily: '"Raleway", sans-serif',
        fontSize: '14px',
        ...(options.variant === 'success' && { backgroundColor: 'var(--primary-color)' }),
        ...(options.variant === 'error' && { backgroundColor: 'var(-error-color)' }),
        ...(options.variant === 'warning' && { backgroundColor: '#ff9800' }),
      },
      ...options,
    });
  };

  const showSuccess = (message, options) => 
    showMessage(message, { ...options, variant: 'success' });

  const showError = (errorKey, options) => {
    const message = typeof errorKey === 'object' ? errorKey.message || 'unknown_error' : errorKey;
    showMessage(message, { ...options, variant: 'error' });
  };

  const showWarning = (message, options) => 
    showMessage(message, { ...options, variant: 'warning' });

  return { showSuccess, showError, showWarning, closeSnackbar, showMessage };
};

export default useStyledSnackbar;