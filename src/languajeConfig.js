import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        translation: {
          "welcome": "Te damos la bienvenida a NeuroSync",
          "subtitle": "Tu puente inteligente hacia un mundo sin barreras. Traduce lengua de señas en cualquier idioma.",
          "nav_home": "Inicio",
          "nav_translator": "Traductor",
          "nav_settings": "Ajustes",
          "card_speed": "Diferentes formas de traducir",
          "card_security": "Seguridad",
          "explore": "EXPLORAR"
        }
      },
      en: {
        translation: {
          "welcome": "Welcome to NeuroSync",
          "subtitle": "Your intelligent bridge to a world without barriers. Translate sign language in any language.",
          "nav_home": "Home",
          "nav_translator": "Translator",
          "nav_settings": "Settings",
          "card_speed": "Different ways to translate",
          "card_security": "Security",
          "explore": "EXPLORE"
        }
      }
    },
    fallbackLng: "es",
    interpolation: { escapeValue: false }
  });

export default i18n;