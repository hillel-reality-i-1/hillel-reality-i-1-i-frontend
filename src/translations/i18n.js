import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { TRANSLATIONS_UK } from "./uk/translations";
import { TRANSLATIONS_EN } from "./en/translations";

i18n
  .use(initReactI18next)
  .init({
    lng: 'uk',
    fallbackLng: 'uk',
    resources: {
      uk: {
        translation: TRANSLATIONS_UK
      },
      en: {
        translation: TRANSLATIONS_EN
      }
    }
  });

export default i18n;
