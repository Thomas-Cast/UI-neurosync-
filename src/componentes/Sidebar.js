import { useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  IconButton,
} from '@mui/material';
import {
  Dashboard,
  Translate,
  Settings,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigation, Page } from '../contexts/NavigationContext';

const sidebarWidth = 280;

interface SidebarProps {
  open?: boolean;
  onClose?: () => void;
}

export function Sidebar({ open: externalOpen, onClose: externalOnClose }: SidebarProps) {
  const { currentPage, setCurrentPage } = useNavigation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const isOpen = isMobile ? mobileOpen : true;
  const handleToggle = () => setMobileOpen(!mobileOpen);

  const navItems: Array<{ label: string; icon: React.ReactNode; page: Page }> = [
    { label: 'Home', icon: <Dashboard />, page: 'dashboard' },
    { label: 'Translator', icon: <Translate />, page: 'translator' },
    { label: 'Settings', icon: <Settings />, page: 'settings' },
  ];

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const drawerContent = (
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
            key={item.page}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <ListItem disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.page)}
                sx={{
                  borderRadius: '12px',
                  mx: 1,
                  px: 2,
                  py: 1.5,
                  color: currentPage === item.page ? '#00d4ff' : '#b0b8cc',
                  backgroundColor:
                    currentPage === item.page
                      ? 'rgba(0, 212, 255, 0.1)'
                      : 'transparent',
                  border:
                    currentPage === item.page
                      ? '1px solid rgba(0, 212, 255, 0.3)'
                      : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    backgroundColor:
                      currentPage === item.page
                        ? 'rgba(0, 212, 255, 0.15)'
                        : 'rgba(0, 212, 255, 0.08)',
                    color: '#00d4ff',
                    transform: 'translateX(8px)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 40,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: 600,
                    fontSize: '0.95rem',
                  }}
                />
              </ListItemButton>
            </ListItem>
          </motion.div>
        ))}
      </List>

      <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 212, 255, 0.1)' }}>
        <Box sx={{ fontSize: '0.75rem', color: '#7a8199' }}>
          v1.0.0
        </Box>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <>
        <Box sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1300 }}>
          <IconButton
            onClick={handleToggle}
            sx={{ color: '#00d4ff', backgroundColor: 'rgba(0, 212, 255, 0.1)' }}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleToggle}
          sx={{
            '& .MuiDrawer-paper': {
              width: sidebarWidth,
              boxSizing: 'border-box',
              backgroundColor: 'transparent',
              backgroundImage: 'none',
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </>
    );
  }

  return (
    <Box
      component="nav"
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1200,
      }}
    >
      {drawerContent}
    </Box>
  );
}
