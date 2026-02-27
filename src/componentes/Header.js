import { Box, AppBar, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';

export function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const sidebarWidth = 280;

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#0f1425',
        backgroundImage: 'linear-gradient(135deg, #0f1425 0%, #1a1f3a 100%)',
        boxShadow: '0 4px 20px rgba(0, 212, 255, 0.1)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.2)',
        ml: isMobile ? 0 : `${sidebarWidth}px`,
        width: isMobile ? '100%' : `calc(100% - ${sidebarWidth}px)`,
        transition: 'all 0.3s ease',
      }}
    >
      <Toolbar sx={{ py: 1.5 }}>
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
              gap: 2,
            }}
          >
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
                background:
                  'linear-gradient(to right, transparent, rgba(0, 212, 255, 0.2), transparent)',
              }}
            />

            <Box
              sx={{
                fontSize: '0.85rem',
                color: '#7a8199',
                fontWeight: 500,
              }}
            >
              AI-Powered Translation & Sync
            </Box>
          </Box>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}
