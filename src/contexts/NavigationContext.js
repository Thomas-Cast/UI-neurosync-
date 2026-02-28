import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext(undefined);

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  // Nuevo estado para controlar si el sidebar está expandido o colapsado
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <NavigationContext.Provider value={{ 
      currentPage, 
      setCurrentPage, 
      isSidebarOpen, 
      setIsSidebarOpen 
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
}