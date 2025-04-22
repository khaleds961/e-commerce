"use client";

import { useTranslation } from "react-i18next";
import i18next from "@/i18n"; // Import your i18n instance with its original name


export default function LanguageSwitcher() {
  const { t } = useTranslation();
  
  const toggleLanguage = () => {
    const currentLang = i18next.language;
    const newLang = currentLang === "en" ? "ar" : "en";
    i18next.changeLanguage(newLang);
  };

  return (
    <button
      className="text-white"
      onClick={toggleLanguage}
    >
      {t("lang")}
    </button>
  );
}
