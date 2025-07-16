import { useTranslation } from "react-i18next";

// Translations
const translations = {
  en: {
    loadingArticles: "Loading articles...",
  },
  ar: {
    loadingArticles: "جاري تحميل المقالات...",
  },
};

export default function LoadingState() {
  const { i18n } = useTranslation();
  const lang = i18n?.language || "en";
  const t = lang === "ar" ? translations.ar : translations.en;
  const isRTL = lang === "ar";

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004B4B]"></div>
      <p className={`mt-4 text-gray-600 ${isRTL ? "text-right" : "text-left"}`}>
        {t.loadingArticles}
      </p>
    </div>
  );
}
