import { CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: '24px',
    padding: '36px',
    maxWidth: '700px',
    width: '100%',
    background: 'white',
    boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)',
    border: `1px solid var(--grey-color)`,
  },
}));

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(2),
  fontWeight: 700,
  fontSize: '1.5rem',
  color: 'var(--dark-text-color)',
  fontFamily: '"Inter", sans-serif',
  textAlign: 'center',
  position: 'relative',
}));

const DialogBody = styled(DialogContent)(({ theme }) => ({
  padding: 0,
  marginBottom: theme.spacing(4),
  '& .MuiTypography-body1': {
    color: 'var(--grey-text-color)',
    lineHeight: 1.6,
  },
}));

const DialogFooter = styled(DialogActions)(({ theme }) => ({
  padding: 0,
  justifyContent: 'flex-end',
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
  border: '1px solid var(--white-color)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  loading,
}) => {
  const { t } = useTranslation('profile');

  return (
    <StyledDialog open={open} onClose={onClose}>
      <Box component="div">
        <DialogHeader>
          {t('confirm_delete')}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: -18,
              top: -32
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogHeader>

        <DialogBody>
          <Typography variant="body1" sx={{ fontFamily: '"Raleway", sans-serif' }}>
            {t('delete_warning')}
          </Typography>
        </DialogBody>

        <DialogFooter sx={{ alignItems: 'center', justifyContent: 'center' }}>
          <ActionButton
            onClick={onClose}
            color="inherit"
            sx={{
              mr: 2,
              color: 'var(--primary-color)',
              borderColor: 'var(--primary-color)',
              '&:hover': {
                bgcolor: 'var(--primary-color)',
                color: 'var(--white-color)',
              },
            }}
          >
            {t('cancel')}
          </ActionButton>

          <ActionButton
            onClick={onConfirm}
            color="error"
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} sx={{color: 'var(--white-color)'}} />}
            sx={{
              color: 'var(--white-color)',
              bgcolor: 'var(--error-color)',
              borderColor: 'var(--error-color)',
              '&:hover': {
                bgcolor: 'var(--dark-error-color)',
                color: 'var(--white-color)',
              },
            }}
          >
            {t('confirm')}
          </ActionButton>
        </DialogFooter>
      </Box>
    </StyledDialog>
  );
};

export default DeleteConfirmationDialog;
