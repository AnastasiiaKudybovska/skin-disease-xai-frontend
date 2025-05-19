import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, Button, Typography, Dialog, DialogActions, DialogTitle,
  Card, CardContent, Avatar, List, ListItem, ListItemIcon,
  ListItemText, Link, Fade, Slide, Grow
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { userService } from '../../services/userService';
import { useAuth } from '../../hooks/useAuth';
import useStyledSnackbar from '../../hooks/useStyledSnackbar';
import ProfileEdit from './ProfileEdit';
import DeleteConfirmationDialog from '../Modals/DeleteConfirmationDialog'
import HistoryIcon from '@mui/icons-material/History';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomLoader from '../CustomLoader';
import dayjs from 'dayjs';

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(56, 135, 113, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(56, 135, 113, 0); }
  100% { box-shadow: 0 0 0 0 rgba(56, 135, 113, 0); }
`;

const ProfileCard = styled(Card)(() => ({
  width: '100%',
  maxWidth: '900px',
  margin: 'auto',
  borderRadius: '24px',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  background: 'white',
}));

const SidebarSection = styled(Box)(() => ({
  padding: '32px',
  background: `linear-gradient(135deg, var(--dark-primary-color) 0%, var(--primary-color) 100%)`,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'var(--white-color)',
  width: '100%',
}));

const ProfileAvatar = styled(Avatar)(() => ({
  width: 140,
  height: 140,
  marginBottom: 16,
  fontSize: 52,
  border: '6px solid',
  borderColor: 'var(--primary-color)',
  background: 'var(--white-color)',
  color: 'var(--primary-color)',
  fontFamily: '"Frank Ruhl Libre", sans-serif',
  fontWeight: 600,
  animation: `${pulse} 2s infinite`,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

const MainContentSection = styled(Box)(() => ({
  padding: '32px',
  background: 'white',
  height: '100%',
  width: '100%',
}));

const InfoItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: 36,
  width: '100%',
  boxSizing: 'border-box',
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
  borderColor: 'var(--white-color)',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
  },
}));


const Profile = () => {
  const { t } = useTranslation('profile');
  const { logout } = useAuth();
  const { showSuccess, showError } = useStyledSnackbar();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    if (!initialLoad && !profile) {
      const fetchProfile = async () => {
        try {
          setLoading(true);
          const token = localStorage.getItem('access_token');
          const data = await userService.getProfile(token);
          setProfile(data);
          setFormData(data);
          setInitialLoad(true);
        } catch (error) {
          showError(t('failed_to_load_profile'));
          if (error.status === 401) logout();
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [logout, showError, initialLoad, profile]);

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const updateData = { ...formData, email: profile.email };
      const updatedProfile = await userService.updateProfile(token, updateData);
      setProfile(updatedProfile);
      setFormData(updatedProfile);
      setEditMode(false);
      showSuccess(t("profile_updated"));
    } catch (error) {
      showError(t('failed_to_update_profile'));
      if (error.status === 401) logout();
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      await userService.deleteAccount(token);
      showSuccess(t('account_deleted'));
      logout();
    } catch (error) {
      showError(t('failed_to_delete_account'));
      if (error.status === 401) logout();
    } finally {
      setLoading(false);
      setOpenDeleteDialog(false);
    }
  };

  if (!profile) {
    return <CustomLoader size={60} />;
  }

  return (
    <Fade in timeout={500}>
      <ProfileCard>
        <CardContent sx={{ p: '0 !important', display: 'flex', height: '100%' }}>
          <Box sx={{ display: 'flex', width: '100%', flexDirection: { xs: 'column', md: 'row'} }}>
            <Box sx={{ flex:  '0 0 40%' }}>
              <Slide direction="right" in timeout={600}>
                <SidebarSection>
                  <ProfileAvatar>
                    {profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
                  </ProfileAvatar>
                  <Typography variant="h4" gutterBottom sx={{ 
                    fontWeight: 700, 
                    color: 'var(--white-color)',
                    fontFamily: '"Frank Ruhl Libre", sans-serif',
                    textAlign: 'center',
                    mb: 3
                  }}>
                    {profile.first_name} {profile.last_name}
                  </Typography>
                  <List sx={{ width: '100%'}}>
                  <ListItem 
                    button 
                    component={Link} 
                    href="/history"
                    sx={{
                      borderRadius: '36px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center', 
                      background: 'rgba(255, 255, 255, 0.1)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'translateX(5px)'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemIcon sx={{ 
                        color: 'var(--white-color)', 
                        minWidth: 'auto',
                        marginRight: '8px',
                      }}>
                        <HistoryIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={t('diagnosis_history')} 
                        sx={{ 
                          fontFamily: '"Raleway", sans-serif', 
                          fontWeight: '600 !important', 
                          color: 'var(--white-color)',
                          '& .MuiListItemText-primary': {
                            whiteSpace: 'nowrap'
                          }
                        }}
                      />
                    </Box>
                  </ListItem>
                  </List>
                  <Box sx={{ mt: 4,  width: '100%' }}>
                    <ActionButton
                      startIcon={<EditIcon />}
                      onClick={() => setEditMode(true)}
                      fullWidth
                       sx={{ mb: 2,
                        backgroundColor: 'var(--dark-primary-color)', color: 'var(--white-color)',
                      }}
                    >
                      {t('edit')}
                    </ActionButton>
                    <ActionButton
                      startIcon={<DeleteIcon />}
                      onClick={() => setOpenDeleteDialog(true)}
                      fullWidth
                      sx={{ 
                        backgroundColor: 'var(--error-color)', color: 'var(--white-color)',
                      }}
                    >
                      {t('delete_account')}
                    </ActionButton>
                  </Box>
                </SidebarSection>
              </Slide>
            </Box>

            <Box sx={{ flex: '0 0 60%' }}>
              <Grow in timeout={800}>
                <MainContentSection>
                  <Typography variant="h4" gutterBottom sx={{ 
                    fontWeight: 700, mb: 4, color: 'var(--dark-text-color)',   fontFamily: '"Inter", sans-serif',
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      display: 'block',
                      width: '60px',
                      height: '4px',
                      background: 'var(--primary-color)',
                      borderRadius: '2px',
                      mt: 1
                    }
                  }}>
                    {t('personal_info')}
                  </Typography>

                  {editMode ? (
                    <ProfileEdit
                      formData={formData}
                      onChange={handleFieldChange}
                      onSave={handleSave}
                      onCancel={() => setEditMode(false)}
                      loading={loading}
                    />
                  ) : (
                    <Box>
                      <InfoItem>
                        <AccountCircleIcon sx={{ fontSize: 42, mr: 2, color: "var(--primary-color)" }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontFamily: "Raleway", color: "var(--grey-text-color)" }}>
                            {t('full_name')}
                          </Typography>
                          <Typography variant="h6" sx={{ fontFamily: "Raleway", color: "var(--dark-text-color)" }}>
                            {profile.first_name} {profile.last_name}
                          </Typography>
                        </Box>
                      </InfoItem>
                      <InfoItem>
                        <PersonIcon sx={{ fontSize: 42, mr: 2, color: "var(--primary-color)" }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontFamily: "Raleway", color: "var(--grey-text-color)" }}>
                            {t('username')}
                          </Typography>
                          <Typography variant="h6" sx={{ fontFamily: "Raleway", color: "var(--dark-text-color)" }}>
                            {profile.username}
                          </Typography>
                        </Box>
                      </InfoItem>
                      <InfoItem>
                        <CakeIcon sx={{ fontSize: 42, mr: 2, color: "var(--primary-color)" }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontFamily: "Raleway", color: "var(--grey-text-color)" }}>
                            {t('date_of_birth')}
                          </Typography>
                          <Typography variant="h6" sx={{ fontFamily: "Raleway", color: "var(--dark-text-color)" }}>
                            {dayjs(profile.date_of_birth).format('DD.MM.YYYY')}
                          </Typography>
                        </Box>
                      </InfoItem>
                      <InfoItem>
                        <EmailIcon sx={{ fontSize: 42, mr: 2, color: "var(--primary-color)" }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontFamily: "Raleway", color: "var(--grey-text-color)" }}>
                            {t('email')}
                          </Typography>
                          <Typography variant="h6" sx={{ fontFamily: "Raleway", color: "var(--dark-text-color)" }}>
                            {profile.email}
                          </Typography>
                        </Box>
                      </InfoItem>
                    </Box>
                  )}
                </MainContentSection>
              </Grow>
            </Box>
          </Box>
    
          <DeleteConfirmationDialog
            locale="profile"
            open={openDeleteDialog}
            onClose={() => setOpenDeleteDialog(false)}
            onConfirm={handleDeleteAccount}
            loading={loading}
          />
        </CardContent>
      </ProfileCard>
    </Fade>
  );
};

export default Profile;
