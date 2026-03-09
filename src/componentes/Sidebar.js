import React from 'react';
import { 
  Box, List, ListItem, ListItemButton, 
  ListItemIcon, ListItemText, Typography, ButtonBase
} from '@mui/material';
import { 
  HomeOutlined, TranslateOutlined, BookOutlined, 
  PsychologyOutlined, HistoryOutlined, PersonOutline, 
  SettingsOutlined 
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigation } from '../contexts/NavigationContext';

const sidebarWidth = 260;
const collapsedWidth = 90;

export function Sidebar() {
  const { currentPage, setCurrentPage, isSidebarOpen, setIsSidebarOpen } = useNavigation();

  const navItems = [
    { label: 'Home', icon: <HomeOutlined />, page: 'dashboard' },
    { label: 'Translate', icon: <TranslateOutlined />, page: 'translator' },
    { label: 'Sign Dictionary', icon: <BookOutlined />, page: 'dictionary' },
    { label: 'Practice Mode', icon: <PsychologyOutlined />, page: 'practice' },
    { label: 'History', icon: <HistoryOutlined />, page: 'history' },
    { label: 'Profile', icon: <PersonOutline />, page: 'profile' },
    { label: 'Settings', icon: <SettingsOutlined />, page: 'settings' },
  ];

  return (
    <Box
      component={motion.div}
      animate={{ width: isSidebarOpen ? sidebarWidth : collapsedWidth }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      sx={{
        height: '100vh',
        backgroundColor: '#050a18',
        borderRight: '1px solid rgba(0, 212, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0, top: 0, zIndex: 1200,
      }}
    >
      {/* SECCIÓN DEL LOGO: Ahora es el botón */}
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100px' // Mantiene el espacio constante
      }}>
        <ButtonBase 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          sx={{ 
            borderRadius: '12px',
            p: 1,
            transition: '0.3s',
            '&:hover': { backgroundColor: 'rgba(0, 212, 255, 0.05)' }
          }}
        >
          {isSidebarOpen ? (
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#00d4ff',
                letterSpacing: '1px',
                filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.5))'
              }}
            >
              NeuroSync
            </Typography>
          ) : (
            <Box 
              component="img"
              src="/NeuroSyncLogo.png" 
              alt="Logo"
              sx={{ 
                width: '60px', 
                height: 'auto',
                filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))' 
              }}
            />
          )}
        </ButtonBase>
      </Box>

      {/* Lista de Navegación */}
      <List sx={{ px: isSidebarOpen ? 2 : 1.5, mt: 2 }}>
        {navItems.map((item) => {
          const isActive = currentPage === item.page;
          return (
            <ListItem key={item.page} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => setCurrentPage(item.page)}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  justifyContent: isSidebarOpen ? 'initial' : 'center',
                  backgroundColor: isActive ? 'rgba(0, 212, 255, 0.1)' : 'transparent',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#00d4ff' : '#7a8199',
                    minWidth: isSidebarOpen ? 40 : 0,
                    justifyContent: 'center',
                    filter: isActive ? 'drop-shadow(0 0 5px #00d4ff)' : 'none'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                
                {isSidebarOpen && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#fff' : '#7a8199',
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}