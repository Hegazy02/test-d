// src/i18n/index.js
export const i18nConfig = {
  supportedLngs: ["en", "ar"],
  fallbackLng: "ar",
  defaultNS: "common",
  debug: process.env.NODE_ENV === "development",
};

// Simple translation loader for server components
export async function getTranslations(lng, ns = i18nConfig.defaultNS) {
  const namespaces = Array.isArray(ns) ? ns : [ns];
  const translations = {};

  for (const namespace of namespaces) {
    try {
      // Try to load from existing translations
      const { enTranslations, arTranslations } = await import("@/translations");

      if (lng === "ar") {
        translations[namespace] = arTranslations;
      } else {
        translations[namespace] = enTranslations;
      }
    } catch (error) {
      console.error(
        `Failed to load translations for ${lng}/${namespace}:`,
        error,
      );
      translations[namespace] = {};
    }
  }

  // Simple translation function
  const t = (key, options) => {
    const keys = key.split(".");
    let value = translations[namespaces[0]];

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    // Simple interpolation
    if (typeof value === "string" && options) {
      return value.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return options[key] || match;
      });
    }

    return value;
  };

  return {
    t,
    i18n: {
      language: lng,
      changeLanguage: async (newLng) => {
        console.log("Language change requested to:", newLng);
      },
    },
  };
}
