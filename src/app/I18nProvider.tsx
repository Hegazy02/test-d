// src/app/I18nProvider.jsx (محدث - بدون تعديل HTML attributes)
"use client";

import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";

// Import existing translations
import { enTranslations, arTranslations } from "@/translations";

const resources = {
  en: {
    translation: enTranslations,
  },
  ar: {
    translation: arTranslations,
  },
};

export function I18nProvider({ children, locale }) {
  const [i18nInstance, setI18nInstance] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initI18n = async () => {
      try {
        const i18nModule = await import("i18next");
        const { initReactI18next } = await import(
          "react-i18next/initReactI18next"
        );
        const i18n = i18nModule.default;

        // Check if already initialized
        if (!i18n.isInitialized) {
          await i18n.use(initReactI18next).init({
            resources,
            lng: locale,
            fallbackLng: "en",
            interpolation: { escapeValue: false },
            react: { useSuspense: false },
          });
        } else {
          // Just change language if already initialized
          await i18n.changeLanguage(locale);
        }

        setI18nInstance(i18n);
      } catch (error) {
        console.error("Error initializing i18n:", error);
      }
    };

    initI18n();
  }, [locale, isClient]);

  // Set document direction and language attributes
  useEffect(() => {
    if (!isClient) return;

    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale, isClient]);

  // Apply Arabic font detection (keeping existing functionality)
  useEffect(() => {
    if (!isClient) return;

    const arabicRegex =
      /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

    const applyArabicFont = () => {
      const allElements = document.querySelectorAll("*");

      allElements.forEach((element) => {
        if (element.childNodes.length > 0) {
          element.childNodes.forEach((node) => {
            if (
              node.nodeType === Node.TEXT_NODE &&
              arabicRegex.test(node.textContent || "")
            ) {
              element.style.fontFamily = "'DIN Next LT Arabic', sans-serif";
            }
          });
        }
      });
    };

    // Apply font when loading
    applyArabicFont();

    // Observe DOM changes
    const observer = new MutationObserver(applyArabicFont);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [isClient]);

  if (!i18nInstance || !isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
      </div>
    );
  }

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
