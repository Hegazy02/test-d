// hooks/useLanguage.js
"use client";

import { useParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useLanguage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentLocale = params?.locale || "en";

  // Helper function to get current path without locale
  const getCurrentPathWithoutLocale = useCallback(() => {
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts[0] === currentLocale) {
      pathParts.shift(); // Remove locale from path
    }
    return "/" + pathParts.join("/");
  }, [pathname, currentLocale]);

  // Helper function to create localized paths
  const createLocalizedPath = useCallback(
    (path, locale = currentLocale) => {
      if (path === "/") {
        return `/${locale}`;
      }
      return `/${locale}${path}`;
    },
    [currentLocale],
  );

  // Function to change language
  const changeLanguage = useCallback(
    (newLocale) => {
      const currentPathWithoutLocale = getCurrentPathWithoutLocale();
      const newPath = createLocalizedPath(currentPathWithoutLocale, newLocale);

      // Set cookie for language preference
      document.cookie = `i18next-lang=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`;

      // Navigate to new locale
      router.push(newPath);
    },
    [getCurrentPathWithoutLocale, createLocalizedPath, router],
  );

  return {
    currentLocale,
    changeLanguage,
    createLocalizedPath,
    getCurrentPathWithoutLocale,
    isArabic: currentLocale === "ar",
    isEnglish: currentLocale === "en",
  };
}
