import React, { useState } from 'react';
import Sidebar from './componentes/Sidebar';
import Header from './componentes/Header';
import Dashboard from './componentes/Dashboard';

function App() {
  const [section, setSection] = useState('dashboard');

  const renderSection = () => {
    switch (section) {
      case 'translator':
        return <div style={{ padding: '20px' }}>Aquí irá el Traductor</div>;
      case 'settings':
        return <div style={{ padding: '20px' }}>Aquí irá la Configuración</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar onSelect={setSection} />
      <div style={{ flexGrow: 1 }}>
        <Header />
        {renderSection()}
      </div>
    </div>
  );
}

export default App;