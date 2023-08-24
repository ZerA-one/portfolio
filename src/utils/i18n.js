import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import fr from "./fr";

const resources = { en, fr };

i18next.use(initReactI18next).init({
  resources,
  lng: "fr",
  fallbackLng: "fr",
  debug: false,
  nsSeparator: false,
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
