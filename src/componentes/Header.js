import React from 'react';
import { 
  Box, IconButton, Avatar, Badge, InputBase, Typography 
} from '@mui/material';
import { 
  Search, NotificationsNone, Language 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation } from '../contexts/NavigationContext';

export function Header() {
  const { isSidebarOpen } = useNavigation();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        backgroundColor: 'rgba(5, 7, 20, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        height: '64px'
      }}
    >
      {/* SECCIÓN IZQUIERDA: Alternancia Logo e Imagen */}
      <Box sx={{ display: 'flex', alignItems: 'center', minWidth: '150px' }}>
        <AnimatePresence mode="wait">
          {isSidebarOpen ? (
            // CUANDO ESTÁ ABIERTO: Solo IMAGEN
            <Box
              key="header-logo-img"
              component={motion.div}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Box 
                component="img"
                src="/NeuroSyncLogo.png" 
                alt="Logo"
                sx={{ 
                  width: '40px', 
                  height: '40px',
                  filter: 'drop-shadow(0 0 8px rgba(0, 212, 255, 0.6))',
                  display: 'block'
                }}
              />
            </Box>
          ) : (
            // CUANDO ESTÁ CERRADO: Solo TEXTO
            <Box
              key="header-logo-text"
              component={motion.div}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: '#00d4ff',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontSize: '1.1rem',
                  filter: 'drop-shadow(0 0 5px rgba(0, 212, 255, 0.4))'
                }}
              >
                NeuroSync
              </Typography>
            </Box>
          )}
        </AnimatePresence>

        {/* Buscador (Ahora más cerca del logo/texto) */}
        <Box 
          sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            alignItems: 'center', 
            bgcolor: 'rgba(255, 255, 255, 0.05)', 
            borderRadius: '10px', 
            px: 2, 
            width: 200,
            ml: 3, // Margen a la izquierda del buscador
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <Search sx={{ color: '#7a8199', fontSize: 20, mr: 1 }} />
          <InputBase 
            placeholder="Buscar..." 
            sx={{ color: '#fff', fontSize: '0.85rem' }} 
          />
        </Box>
      </Box>

      {/* SECCIÓN DERECHA: Iconos de Estado */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ color: '#7a8199' }}>
          <Language fontSize="small" />
        </IconButton>
        
        <IconButton sx={{ color: '#7a8199' }}>
          <Badge badgeContent={2} color="error" overlap="circular">
            <NotificationsNone />
          </Badge>
        </IconButton>

        <Avatar 
          sx={{ 
            width: 35, 
            height: 35, 
            bgcolor: '#1a1f3a',
            border: '1px solid #00d4ff', 
            cursor: 'pointer',
            '&:hover': { boxShadow: '0 0 10px #00d4ff' }
          }} 
        />
      </Box>
    </Box>
  );
}