import { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    home: 'Home',
    translator: 'Translator',
    settings: 'Settings',
    userManual: 'User Manual',
    help: 'Help',
    welcome: 'Welcome to NeuroSync',
    subtitle: 'AI-Powered Translation & Synchronization',
    features: 'Features',
    quickNav: 'Quick Navigation',
    startTranslating: 'Start Translating',
    manageSetting: 'Manage Settings',
    learnMore: 'Learn More',
    getHelp: 'Get Help',
    textInput: 'Enter text to translate...',
    translate: 'Translate',
    translating: 'Translating...',
    output: 'Translation',
    copy: 'Copy',
    copied: 'Copied!',
    sourceLanguage: 'From',
    targetLanguage: 'To',
    selectLanguage: 'Select Language',
    enterText: 'Enter text',
    recentTranslations: 'Recent Translations',
    noTranslations: 'No translations yet',
    theme: 'Theme',
    language: 'Language',
    notifications: 'Notifications',
    autoTranslate: 'Auto-Translate',
    enableNotifications: 'Enable Notifications',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    english: 'English',
    spanish: 'Spanish',
    french: 'French',
    german: 'German',
    saveSettings: 'Save Settings',
    settingsSaved: 'Settings saved successfully',
    userManualTitle: 'User Manual',
    userManualContent: 'Welcome to NeuroSync User Manual. Here you\'ll find comprehensive guides on how to use all features of our AI-powered translation platform.',
    gettingStarted: 'Getting Started',
    features: 'Features',
    troubleshooting: 'Troubleshooting',
    helpTitle: 'Help & Support',
    faqTitle: 'Frequently Asked Questions',
    contactUs: 'Contact Us',
    email: 'Email us at: support@neurosync.ai',
    liveChat: 'Live Chat Support Available 24/7',
  },
  es: {
    home: 'Inicio',
    translator: 'Traductor',
    settings: 'Configuración',
    userManual: 'Manual de Usuario',
    help: 'Ayuda',
    welcome: 'Bienvenido a NeuroSync',
    subtitle: 'Traducción e Sincronización Impulsada por IA',
    features: 'Características',
    quickNav: 'Navegación Rápida',
    startTranslating: 'Comenzar a Traducir',
    manageSetting: 'Administrar Configuración',
    learnMore: 'Saber Más',
    getHelp: 'Obtener Ayuda',
    textInput: 'Ingrese texto para traducir...',
    translate: 'Traducir',
    translating: 'Traduciendo...',
    output: 'Traducción',
    copy: 'Copiar',
    copied: 'Copiado!',
    sourceLanguage: 'De',
    targetLanguage: 'A',
    selectLanguage: 'Seleccionar Idioma',
    enterText: 'Ingrese texto',
    recentTranslations: 'Traducciones Recientes',
    noTranslations: 'Sin traducciones aún',
    theme: 'Tema',
    language: 'Idioma',
    notifications: 'Notificaciones',
    autoTranslate: 'Traducción Automática',
    enableNotifications: 'Habilitar Notificaciones',
    darkMode: 'Modo Oscuro',
    lightMode: 'Modo Claro',
    english: 'Inglés',
    spanish: 'Español',
    french: 'Francés',
    german: 'Alemán',
    saveSettings: 'Guardar Configuración',
    settingsSaved: 'Configuración guardada exitosamente',
    userManualTitle: 'Manual de Usuario',
    userManualContent: 'Bienvenido al Manual de Usuario de NeuroSync. Aquí encontrarás guías completas sobre cómo usar todas las características de nuestra plataforma de traducción impulsada por IA.',
    gettingStarted: 'Comenzar',
    features: 'Características',
    troubleshooting: 'Solución de Problemas',
    helpTitle: 'Ayuda y Soporte',
    faqTitle: 'Preguntas Frecuentes',
    contactUs: 'Contáctenos',
    email: 'Envíenos un correo electrónico a: support@neurosync.ai',
    liveChat: 'Soporte de Chat en Vivo Disponible 24/7',
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => translations[language][key] || key;

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}