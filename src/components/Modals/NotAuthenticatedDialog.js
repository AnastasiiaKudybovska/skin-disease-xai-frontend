import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom'; // Додано для навігації

const StyledDialog = styled(Dialog)(() => ({
  '& .MuiBackdrop-root': {
    backdropFilter: 'blur(4px)',
  },
  '& .MuiPaper-root': {
    borderRadius: '24px',
    padding: '36px',
    maxWidth: '700px',
    width: '100%',
    background: 'white',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
    border: `1px solid var(--grey-color)`,
    overflow: 'hidden',
  },
}));

const DialogHeader = styled(DialogTitle)(() => ({
  padding: 0,
  marginBottom: '16px',
  fontWeight: 700,
  fontSize: '1.5rem',
  color: 'var(--dark-text-color)',
  fontFamily: '"Inter", sans-serif',
  textAlign: 'center',
  position: 'relative',
}));

const DialogBody = styled(DialogContent)(() => ({
  padding: 0,
  marginBottom: '32px',
  '& .MuiTypography-body1': {
    color: 'var(--grey-text-color)',
    lineHeight: 1.6,
    fontFamily: '"Raleway", sans-serif',
    textAlign: 'center',
  },
}));

const DialogFooter = styled(DialogActions)(() => ({
  padding: 0,
  justifyContent: 'center',
  gap: '16px'
}));

const ActionButton = styled(Button)(() => ({
  borderRadius: '50px',
  padding: '12px 28px',
  fontWeight: 600,
  fontSize: '16px',
  letterSpacing: '0.5px',
  textTransform: 'none',
  fontFamily: '"Raleway", sans-serif',
  transition: 'all 0.3s ease',
  boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.1)',
  color: 'var(--white-color)',
  backgroundColor: 'var(--primary-color)',
  border: '1px solid var(--primary-color)',
  '&:hover': {
    backgroundColor: 'var(--dark-primary-color)',
    transform: 'translateY(-2px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const NotAuthenticatedDialog = ({ open, onClose, onContinue  }) => {
  const { t } = useTranslation('diagnostic');
  const navigate = useNavigate(); // Хук для навігації

  const handleLogin = () => {
    onClose(); // Закриваємо діалог
    navigate('/login'); // Навігація на сторінку логіну
  };

  const handleContinue = () => {
    onClose(); // Просто закриваємо діалог
    // Тут можна додати додаткову логіку для продовження без логіну
  };

  return (
    <AnimatePresence>
      {open && (
        <StyledDialog
          open={open}
          onClose={onClose}
          PaperProps={{
            component: motion.div,
            initial: { opacity: 0, y: 100 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: 100 },
            transition: { duration: 0.3 }
          }}
        >
          <Box position="absolute" top={16} right={16}>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>

          <DialogHeader>
            {t('notAuthTitle')}
          </DialogHeader>

          <DialogBody>
            <Typography variant="body1">
              {t('notAuthDesc')}
            </Typography>
          </DialogBody>

          <DialogFooter>
            <ActionButton onClick={handleLogin}>
              {t('logIn')}
            </ActionButton>
            <ActionButton
              onClick={onContinue}
              sx={{
                backgroundColor: 'transparent',
                color: 'var(--primary-color)',
                border: '1px solid var(--primary-color)'
              }}
            >
              {t('continueWithoutLogin')}
            </ActionButton>
          </DialogFooter>
        </StyledDialog>
      )}
    </AnimatePresence>
  );
};

export default NotAuthenticatedDialog;