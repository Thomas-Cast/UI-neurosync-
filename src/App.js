import React from 'react';
import { Box } from '@mui/material'; 
import { NavigationProvider, useNavigation } from './contexts/NavigationContext'; 
import { Sidebar } from './componentes/Sidebar';
import { Header } from './componentes/Header';
import { Dashboard } from './componentes/Dashboard';

function AppContent() {
  // Ahora sí, el Hook está dentro de un componente funcional
  const { isSidebarOpen } = useNavigation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#050714' }}>
      
      {/* Pasamos el estado para que el Sidebar sepa si abrirse o cerrarse */}
      <Sidebar open={isSidebarOpen} />
      
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          minWidth: 0,
          transition: 'all 0.3s ease',
          // Ajustamos el margen según el menú esté abierto (280px) o cerrado (80px)
          ml: { md: isSidebarOpen ? '280px' : '80px' }
        }}
      >
        <Header />
        
        <Box 
          component="main" 
          sx={{ 
            p: { xs: 2, md: 4 },
            flexGrow: 1,
            overflowY: 'auto' 
          }}
        >
          <Dashboard />
        </Box>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App; // Asegúrate de que esta línea esté al final