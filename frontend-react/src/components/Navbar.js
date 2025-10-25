import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [langAnchor, setLangAnchor] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLangMenu = (event) => {
    setLangAnchor(event.currentTarget);
  };

  const handleLangClose = () => {
    setLangAnchor(null);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    handleLangClose();
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          School Interview Platform
        </Typography>

        <Button color="inherit" component={Link} to="/">
          {t('home')}
        </Button>

        <Button color="inherit" component={Link} to="/search">
          {t('schools')}
        </Button>

        {/* Language Switcher */}
        <IconButton color="inherit" onClick={handleLangMenu}>
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={langAnchor}
          open={Boolean(langAnchor)}
          onClose={handleLangClose}
        >
          <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
          <MenuItem onClick={() => changeLanguage('sw')}>Kiswahili</MenuItem>
        </Menu>

        {/* User Menu */}
        {isAuthenticated ? (
          <Box>
            <IconButton
              size="large"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem disabled>{user?.full_name}</MenuItem>
              {(user?.role === 'school_admin' || user?.role === 'super_admin') && (
                <MenuItem onClick={() => { handleClose(); navigate('/dashboard'); }}>
                  {t('dashboard')}
                </MenuItem>
              )}
              <MenuItem onClick={handleLogout}>{t('logout')}</MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              {t('login')}
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              {t('signup')}
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
