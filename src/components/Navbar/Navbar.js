import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem, useMediaQuery, useTheme, Avatar, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import ReactCountryFlag from 'react-country-flag';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langAnchorEl, setLangAnchorEl] = useState(null);
  const [showSlogan, setShowSlogan] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const handleLangMenuOpen = (event) => setLangAnchorEl(event.currentTarget);
  const handleLangMenuClose = () => setLangAnchorEl(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleLangMenuClose();
  };

  const navItems = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.instructions'), path: '#instructions' },
    { name: t('nav.diagnostics'), path: '/diagnostics' },
    { name: t('nav.about'), path: '/about' }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    toggleMobileMenu();
  };

  return (
    <AppBar position="fixed" className="navbar-container">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Link href="/" sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box 
            sx={{ display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setShowSlogan(true)}
            onMouseLeave={() => setShowSlogan(false)}
          >
            <Avatar 
              src="/images/logo.png" 
              alt="Logo" 
              sx={{ width: 52, height: 58, mr: 2, borderRadius: 0 }}
            />
            <Box sx={{ display: 'inline-flex', flexDirection: 'column', maxWidth: '181px', transition: 'all 0.3s ease-in-out' }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontFamily: '"Frank Ruhl Libre", sans-serif', 
                  fontSize: '28px',
                  lineHeight: 1, 
                  whiteSpace: 'nowrap',
                  transform: showSlogan ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'transform 0.3s ease-in-out'
                }}
              >
                <span className='logo-text-part-1'>Skin</span>
                <span className='logo-text-part-2'>Insight</span>
                <span className='logo-text-part-3'> AI</span>
              </Typography>
              {showSlogan && (
                <Typography 
                  sx={{
                    fontFamily: '"Inter", sans-serif', textTransform: 'uppercase',
                    letterSpacing: 1.6, fontSize: '6px',
                    color: 'var(--white-color)', whiteSpace: 'normal',
                    wordWrap: 'break-word', textAlign: 'justify',
                    width: 'fit-content', maxWidth: '100%',
                    animation: 'fadeIn 0.3s ease-in-out'
                  }}
                >
                  {t('nav.slogan')}
                </Typography>
              )}
            </Box>
          </Box>
        </Link>

        {!isMobile ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {navItems.map((item) => (
              <Typography key={item.path} component="a"
                href={item.path}
                sx={{ 
                  mx: 1, color: 'var(--white-color)', textDecoration: 'none', cursor: 'pointer', 
                  fontFamily: "Raleway", fontSize: {md:'0.9rem', lg: '1rem'},
                  '&:hover': {
                    color: 'var(--grey-color)'
                  }
                }}
              >
                {item.name}
              </Typography>
            ))}

            {isAuthenticated ? (
              <>
                <Typography component="a" href="/history"
                  sx={{ 
                    mx: 1, color: 'var(--white-color)', textDecoration: 'none', cursor: 'pointer',
                    fontFamily: "Raleway", fontSize: {md:'0.9rem', lg: '1rem'},
                    '&:hover': {
                      color: 'var(--grey-color)'
                    }
                  }}
                >
                  {t('nav.history')}
                </Typography>
                <Typography component="a" href="/profile"
                  sx={{ 
                    mx: 1, color: 'var(--white-color)', textDecoration: 'none', cursor: 'pointer',
                    fontFamily: "Raleway", fontSize: {md:'0.9rem', lg: '1rem'},
                    '&:hover': {
                      color: 'var(--grey-color)'
                    }
                  }}
                >
                  {t('nav.profile')}
                </Typography>
              </>
            ) : (
              <>
                <Typography component="a" href="/login"
                  sx={{ 
                    mx: 1, color: 'var(--white-color)', textDecoration: 'none', cursor: 'pointer',
                    border: '1px solid white', borderRadius: '16px', padding: '6px 16px', fontSize: {md:'0.9rem', lg: '1rem'},
                    '&:hover': {
                      backgroundColor: 'var(--primary-color)'
                    }
                  }}
                >
                  {t('nav.login')}
                </Typography>
                <Typography component="a" href="/signup"
                  sx={{ 
                    mx: 1, color: 'var(--white-color)', textDecoration: 'none', cursor: 'pointer',
                    border: '1px solid white', borderRadius: '16px', padding: '6px 16px', fontSize: {md:'0.9rem', lg: '1rem'}, 
                    '&:hover': {
                      backgroundColor: 'var(--primary-color)'
                    }
                  }}
                >
                  {t('nav.signup')}
                </Typography>
              </>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton 
                onClick={handleLangMenuOpen} 
                sx={{ color: 'var(--white-color)', '&:hover': { backgroundColor: 'var(--grey-color)' }}}
              >
                <LanguageIcon />
              </IconButton>
              <Typography variant="body2" onClick={handleLangMenuOpen}
                sx={{color: 'var(--white-color)', cursor: 'pointer', fontSize: {md:'0.8rem', lg: '0.9rem'}, textTransform: 'uppercase', '&:hover': { opacity: 0.8}}}
              >
                {i18n.language === 'uk' ? 'Укр' : 'Eng'}
              </Typography>
            </Box>
            {isAuthenticated ? (<IconButton onClick={logout}
              sx={{ 
                mx: 1, color: 'var(--white-color)',
                '&:hover': {
                    backgroundColor: 'var(--grey-color)'
                }
              }}
                title={t('nav.logout')}
            >
              <LogoutIcon />
            </IconButton> ) : <></>
            } 
          </Box>
        ) : (
          <Box>
            <IconButton onClick={toggleMobileMenu} sx={{ color: 'var(--white-color)', '&:hover': { backgroundColor: 'var(--grey-color)' } }}>
              <MenuIcon />
            </IconButton>
          </Box>
        )}

        <div className={`mobile-menu-backdrop ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} />
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={toggleMobileMenu} sx={{ color: 'var(--white-color)', '&:hover': { backgroundColor: 'var(--grey-color)' }}} >
              <CloseIcon />
            </IconButton>
          </Box>
          {navItems.map((item) => (
            <div key={item.path} className="mobile-menu-item">
              <Typography component="a" href={item.path}
                sx={{ 
                  width: '100%', display: 'block', padding: '8px 16px', color: 'var(--white-color)',
                  textDecoration: 'none', cursor: 'pointer', '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.08)'}
                }}
                onClick={toggleMobileMenu}
              >
                {item.name}
              </Typography>
            </div>
          ))}

          {isAuthenticated ? (
            <>
              <div className="mobile-menu-item">
                <Typography component="a" href="/history"
                  sx={{ 
                    width: '100%', display: 'block', padding: '8px 16px', color: 'var(--white-color)',
                    textDecoration: 'none', cursor: 'pointer', '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.08)'}
                  }}
                  onClick={toggleMobileMenu}
                >
                  {t('nav.history')}
                </Typography>
              </div>
              <div className="mobile-menu-item">
                <Typography component="a" href="/profile"
                  sx={{ 
                    width: '100%', display: 'block', padding: '8px 16px', color: 'var(--white-color)',
                    textDecoration: 'none', cursor: 'pointer', '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.08)'}
                  }}
                  onClick={toggleMobileMenu}
                >
                  {t('nav.profile')}
                </Typography>
              </div>
              <div className="mobile-menu-item">
                <Typography onClick={handleLogout}
                  sx={{ 
                    width: '100%', display: 'block', padding: '8px 16px', color: 'var(--white-color)',
                    textDecoration: 'none', cursor: 'pointer', '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.08)'}
                  }}
                >
                  <LogoutIcon sx={{ mr: 0.2, verticalAlign: 'middle'  }} /> {t('nav.logout')}
                </Typography>
              </div>
            </>
          ) : (
            <>
              <div className="mobile-menu-item">
                <Typography component="a" href="/login"
                  sx={{ 
                    width: '100%', display: 'block', padding: '8px 16px', color: 'var(--white-color)',
                    textDecoration: 'none', cursor: 'pointer', '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.08)'}
                  }}
                  onClick={toggleMobileMenu}
                >
                  {t('nav.login')}
                </Typography>
              </div>
              <div className="mobile-menu-item">
                <Typography component="a" href="/signup"
                  sx={{ 
                    width: '100%', display: 'block', padding: '8px 16px', color: 'var(--white-color)',
                    textDecoration: 'none', cursor: 'pointer', '&:hover': {backgroundColor: 'rgba(255, 255, 255, 0.08)'}
                  }}
                  onClick={toggleMobileMenu}
                >
                  {t('nav.signup')}
                </Typography>
              </div>
            </>
          )}

          <div className="mobile-menu-item">
            <Typography component="div"
              sx={{
                width: '100%', display: 'block', padding: '8px 16px', color: 'inherit', cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)'
                }
              }}
              onClick={handleLangMenuOpen}
            >
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <LanguageIcon sx={{ mr: 1, color: 'white' }} />
                {t('nav.language')}
              </Box>
            </Typography>
          </div>
        </div>

        <Menu anchorEl={langAnchorEl} open={Boolean(langAnchorEl)} onClose={handleLangMenuClose}>
          <MenuItem onClick={() => changeLanguage('uk')}>
            <ReactCountryFlag countryCode="UA" style={{ marginRight: '8px', fontSize: '1.2em'}} svg/>
            Українська
          </MenuItem>
          <MenuItem onClick={() => changeLanguage('en')}>
            <ReactCountryFlag countryCode="GB" style={{marginRight: '8px', fontSize: '1.2em'}} svg/>
            English
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;