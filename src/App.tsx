import { Box, CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { Dashboard } from './components/Dashboard';
import { Translator } from './components/Translator';
import { Settings } from './components/Settings';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { motion, AnimatePresence } from 'framer-motion';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0a0e27',
      paper: '#0f1425',
    },
    primary: {
      main: '#00d4ff',
    },
    secondary: {
      main: '#00ff88',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Oxygen", "Ubuntu", sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

function AppContent() {
  const { currentPage } = useNavigation();
  const isMobile = useMediaQuery(darkTheme.breakpoints.down('md'));
  const sidebarWidth = 280;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard key="dashboard" />;
      case 'translator':
        return <Translator key="translator" />;
      case 'settings':
        return <Settings key="settings" />;
      default:
        return <Dashboard key="dashboard" />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          backgroundColor: '#0a0e27',
          backgroundImage: 'linear-gradient(135deg, #0a0e27 0%, #0f1425 100%)',
        }}
      >
        <Sidebar />

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            ml: isMobile ? 0 : `${sidebarWidth}px`,
            transition: 'margin-left 0.3s ease',
          }}
        >
          <Header />

          <Box
            sx={{
              flex: 1,
              mt: '80px',
              p: { xs: 2, sm: 3, md: 4 },
              overflow: 'auto',
              backgroundColor: 'transparent',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
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