import React from 'react';
import { Box } from '@mui/material'; 
import { NavigationProvider, useNavigation } from './contexts/NavigationContext'; 
import { Sidebar } from './componentes/Sidebar';
import { Header } from './componentes/Header';
import { Dashboard } from './componentes/Dashboard';

function AppContent() {
  const { isSidebarOpen } = useNavigation();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#050714' }}>
      
      <Sidebar />
      
      {/* Contenedor principal */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column',
          minWidth: 0, // Evita que el contenido desborde en pantallas chicas
          transition: 'all 0.3s ease',
        }}
      >
        {/* El Header ahora está fuera del padding, ocupando el 100% del ancho disponible */}
        <Header />
        
        {/* El contenido (Dashboard) mantiene su padding para no pegarse a los bordes */}
        <Box 
          component="main" 
          sx={{ 
            p: { xs: 2, md: 4 }, // Padding responsivo
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

export default App;