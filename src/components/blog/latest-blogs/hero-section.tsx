"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import {createLocalizedPath} from "@/components/Nav";
import { usePathname } from "next/navigation";

// Translations
const translations = {
  en: {
    title: "Latest Articles",
    subtitle:
      "Stay updated with our latest insights, news, and stories from the world of media production",
    searchPlaceholder: "Search articles...",
    backToAllArticles: "Back to all articles",
  },
  ar: {
    title: "أحدث المقالات",
    subtitle: "ابق على اطلاع بآخر الرؤى والأخبار والقصص من عالم إنتاج الوسائط",
    searchPlaceholder: "البحث في المقالات...",
    backToAllArticles: "العودة لجميع المقالات",
  },
};

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export default function HeroSection({
  searchQuery,
  onSearchChange,
}: HeroSectionProps) {
  const { i18n } = useTranslation();
  const pathname = usePathname();

  const lang = i18n?.language || "en";
  const t = lang === "ar" ? translations.ar : translations.en;
  const isRTL = lang === "ar";

  return (
    <section className="dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C] bg-[#004B4B] text-white py-[7rem] ">
      {/* Back button for normal view (sm and above) */}
      <div
        className={`hidden sm:block sm:absolute sm:top-4 sm:z-[10] mt-[6rem] ${
          isRTL ? "sm:right-0 sm:mr-10" : "sm:left-0 sm:ml-10"
        }`}
      >
        <Link
          href={createLocalizedPath("/blogs",pathname)}
          className={`inline-flex items-center text-white hover:text-[#D4B82C] transition-colors px-3 py-2 rounded-md ${
            isRTL ? "flex-row-reverse" : ""
          }`}
        >
          {isRTL ? (
            <>
              <span>{t.backToAllArticles}</span>
              <ChevronRight className="mr-1 h-4 w-4" />
            </>
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-1" />
              <span>{t.backToAllArticles}</span>
            </>
          )}
        </Link>
      </div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center relative">
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
              isRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            {t.title}
          </h1>

          <p
            className={`text-lg md:text-xl opacity-90 mb-8 ${
              isRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            {t.subtitle}
          </p>

          <div className="relative max-w-xl mx-auto mb-4">
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12 ${
                isRTL ? "pr-10 text-right" : "pl-10 text-left"
              }`}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <Search
              className={`absolute top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/60 ${
                isRTL ? "right-3" : "left-3"
              }`}
            />
          </div>

          {/* Back button for small view (smaller than sm) */}
          <div className="block sm:hidden mt-4">
            <Link
          href={createLocalizedPath("/blogs",pathname)}
          className={`inline-flex items-center text-white hover:text-[#D4B82C] transition-colors px-3 py-2 rounded-md ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {isRTL ? (
                <>
                  <span>{t.backToAllArticles}</span>
                  <ChevronRight className="mr-1 h-4 w-4" />
                </>
              ) : (
                <>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <span>{t.backToAllArticles}</span>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
