import { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  Translate,
  Settings,
  MenuBook,
  Help,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';

const SIDEBAR_WIDTH = 280;

export function Sidebar() {
  const { currentPage, setCurrentPage, sidebarOpen, toggleSidebar } = useApp();
  const { t } = useLanguage();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const navItems = [
    { id: 'dashboard', label: t('home'), icon: <Dashboard /> },
    { id: 'translator', label: t('translator'), icon: <Translate /> },
    { id: 'settings', label: t('settings'), icon: <Settings /> },
    { id: 'manual', label: t('userManual'), icon: <MenuBook /> },
    { id: 'help', label: t('help'), icon: <Help /> },
  ];

  const handleNavigate = (pageId) => {
    setCurrentPage(pageId);
    if (isMobile && sidebarOpen) {
      toggleSidebar();
    }
  };

  const drawerContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={{ height: '100%' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          backgroundColor: '#0a0e27',
          backgroundImage: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
        }}
      >
        <Box sx={{ p: 3 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                fontSize: '1.8rem',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #00d4ff 0%, #0099ff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.5px',
              }}
            >
              NeuroSync
            </Box>
          </motion.div>
        </Box>

        <List sx={{ flex: 1, px: 1 }}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <ListItem disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.id)}
                  sx={{
                    borderRadius: '12px',
                    mx: 1,
                    px: 2,
                    py: 1.5,
                    color: currentPage === item.id ? '#00d4ff' : '#b0b8cc',
                    backgroundColor:
                      currentPage === item.id
                        ? 'rgba(0, 212, 255, 0.1)'
                        : 'transparent',
                    border:
                      currentPage === item.id
                        ? '1px solid rgba(0, 212, 255, 0.3)'
                        : 'none',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      backgroundColor:
                        currentPage === item.id
                          ? 'rgba(0, 212, 255, 0.15)'
                          : 'rgba(0, 212, 255, 0.08)',
                      color: '#00d4ff',
                      transform: 'translateX(8px)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 600, fontSize: '0.95rem' }}
                  />
                </ListItemButton>
              </ListItem>
            </motion.div>
          ))}
        </List>

        <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 212, 255, 0.1)' }}>
          <Box sx={{ fontSize: '0.75rem', color: '#7a8199' }}>v1.0.0</Box>
        </Box>
      </Box>
    </motion.div>
  );

  if (isMobile) {
    return (
      <>
        <Box sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}>
          <IconButton
            onClick={toggleSidebar}
            sx={{ color: '#00d4ff', backgroundColor: 'rgba(0, 212, 255, 0.1)' }}
          >
            {sidebarOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Drawer
          anchor="left"
          open={sidebarOpen}
          onClose={toggleSidebar}
          sx={{
            '& .MuiDrawer-paper': {
              width: SIDEBAR_WIDTH,
              boxSizing: 'border-box',
              backgroundColor: 'transparent',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </>
    );
  }

  return (
    <motion.div
      initial={{ x: -SIDEBAR_WIDTH }}
      animate={{ x: sidebarOpen ? 0 : -SIDEBAR_WIDTH }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        zIndex: 1200,
      }}
    >
      {drawerContent}
    </motion.div>
  );
}