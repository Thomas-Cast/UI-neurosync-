import { Box, AppBar, Toolbar, Button, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useApp } from '../contexts/AppContext';

const SIDEBAR_WIDTH = 280;

export function Header() {
  const { language, toggleLanguage, t } = useLanguage();
  const { sidebarOpen } = useApp();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#0f1425',
        backgroundImage: 'linear-gradient(135deg, #0f1425 0%, #1a1f3a 100%)',
        boxShadow: '0 4px 20px rgba(0, 212, 255, 0.1)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
        ml: isMobile ? 0 : sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0,
        width: isMobile ? '100%' : sidebarOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : '100%',
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ py: 1.5 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                fontSize: '1.4rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
              }}
            >
              NeuroSync
            </Box>

            <Box
              sx={{
                height: 24,
                width: 1,
                background: 'linear-gradient(to right, transparent, rgba(0, 212, 255, 0.2), transparent)',
              }}
            />

            <Box
              sx={{
                fontSize: '0.85rem',
                color: '#7a8199',
                fontWeight: 500,
              }}
            >
              AI Translation Platform
            </Box>
          </Box>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={toggleLanguage}
              sx={{
                px: 2,
                py: 1,
                backgroundColor: 'rgba(0, 212, 255, 0.1)',
                color: '#00d4ff',
                border: '1px solid rgba(0, 212, 255, 0.3)',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                '&:hover': {
                  backgroundColor: 'rgba(0, 212, 255, 0.15)',
                  borderColor: 'rgba(0, 212, 255, 0.5)',
                },
              }}
            >
              {language.toUpperCase()}
            </Button>
          </motion.div>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}