import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './en/translation.json';
import es from './es/translation.json';
import pt from './pt/translation.json';
import de from './de/translation.json';
import fr from './fr/translation.json';
import hi from './hi/translation.json';
import ru from './ru/translation.json';
import ar from './ar/translation.json';
import ch from './ch/translation.json';
import jp from './jp/translation.json';

i18n
  .use(LanguageDetector) // Detect browser language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      pt: { translation: pt },
      de: { translation: de },
      fr: { translation: fr },
      hi: { translation: hi },
      ru: { translation: ru },
      ar: { translation: ar },
      ch: { translation: ch },
      jp: { translation: jp },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
