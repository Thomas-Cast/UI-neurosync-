import { useState } from 'react'; // Para el menú
import { Box, AppBar, Toolbar, useTheme, useMediaQuery, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Language as LanguageIcon } from '@mui/icons-material'; // Icono de mundo
import { useTranslation } from 'react-i18next'; // Hook para traducir
import { useNavigation } from '../contexts/NavigationContext';

export function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isSidebarOpen } = useNavigation();
  
  // Lógica de traducción
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleCloseMenu();
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'rgba(15, 20, 37, 0.8)',
        backdropFilter: 'blur(10px)',
        backgroundImage: 'linear-gradient(135deg, rgba(15, 20, 37, 0.8) 0%, rgba(26, 31, 58, 0.8) 100%)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
        width: '100%',
        zIndex: 1100,
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ py: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {(!isSidebarOpen || isMobile) && (
                <Box
                  sx={{
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  NeuroSync
                </Box>
              )}

              <Box
                sx={{
                  fontSize: '0.85rem',
                  color: '#b0b8cc',
                  fontWeight: 500,
                  opacity: 0.8
                }}
              >
                {/* Usamos t() para que este texto también sea traducible */}
                {t('Traductor de lengua sordomuda')}
              </Box>
            </Box>

            {/* Selector de Idioma en la parte derecha */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                onClick={handleOpenMenu} 
                sx={{ 
                  color: '#00d4ff',
                  backgroundColor: 'rgba(0, 212, 255, 0.05)',
                  '&:hover': { backgroundColor: 'rgba(0, 212, 255, 0.15)' }
                }}
              >
                <LanguageIcon />
              </IconButton>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                  sx: { 
                    bgcolor: '#0a0e27', 
                    color: '#fff',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                  }
                }}
              >
                <MenuItem onClick={() => changeLanguage('es')}>Español 🇪🇸</MenuItem>
                <MenuItem onClick={() => changeLanguage('en')}>English 🇺🇸</MenuItem>
                <MenuItem onClick={() => changeLanguage('fr')}>Français 🇫🇷</MenuItem>
              </Menu>
            </Box>
          </Box>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}