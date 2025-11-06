// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// 🔤 Translation resources
const resources = {
  en: {
    translation: {
      welcome: 'Welcome to our website!',
      about: 'About Us',
      contact: 'Contact Us',
      services: 'Our Services',
      description:
        'We provide top-quality travel experiences tailored to your needs.',
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue sur notre site web !',
      about: 'À propos de nous',
      contact: 'Contactez-nous',
      services: 'Nos services',
      description:
        'Nous offrons des expériences de voyage de haute qualité adaptées à vos besoins.',
    },
  },
  es: {
    translation: {
      welcome: '¡Bienvenido a nuestro sitio web!',
      about: 'Sobre nosotros',
      contact: 'Contáctenos',
      services: 'Nuestros servicios',
      description:
        'Ofrecemos experiencias de viaje de alta calidad adaptadas a sus necesidades.',
    },
  },
  hi: {
    translation: {
      welcome: 'हमारी वेबसाइट पर आपका स्वागत है!',
      about: 'हमारे बारे में',
      contact: 'संपर्क करें',
      services: 'हमारी सेवाएँ',
      description:
        'हम आपकी आवश्यकताओं के अनुसार उच्च गुणवत्ता वाले यात्रा अनुभव प्रदान करते हैं।',
    },
  },
};

// ⚙️ Initialize i18n
i18n
  .use(LanguageDetector) // detect from browser or localStorage
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false, // turn ON (true) in dev mode for debugging
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
