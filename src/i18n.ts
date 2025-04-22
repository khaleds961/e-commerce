'use client';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "@/app/locales/en.json";
import arTranslation from "@/app/locales/ar.json";

i18n.use(initReactI18next).init({
    lng: "en",
    fallbackLng: "en",
    resources: {
        en: {
            translation: enTranslation
        },
        ar: {
            translation: arTranslation
        }
    }
})

export default i18n;