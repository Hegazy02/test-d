import { Calendar, User, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { createLocalizedPath } from "@/components/Nav";
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
interface BlogPostHeaderProps {
  category: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
}

export default function BlogPostHeader({
  category,
  title,
  excerpt,
  date,
  author,
  readTime,
}: BlogPostHeaderProps) {
  const { i18n } = useTranslation();
  const lang = i18n?.language || "en";
  const pathname = usePathname();

  // Only translate the back button text
  const backButtonText =
    lang === "ar" ? "العودة لجميع المقالات" : "Back to all articles";
  const t = lang === "ar" ? translations.ar : translations.en;
  const isRTL = lang === "ar";

  return (
    <header className="bg-transparent text-white relative">
      {/* Green header content starts after the empty space */}
      <div className="dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C] bg-[#004B4B] py-[7rem] relative">
        {/* Back to blog link - positioned below the empty space */}
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
        <div className="container mx-auto px-4 pt-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <span className="bg-[#D4B82C] text-[#004B4B] text-sm font-bold px-3 py-1 rounded">
                {category}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              {title}
            </h1>
            <p className="text-lg opacity-90 mb-6">{excerpt}</p>
            <div className="flex flex-wrap items-center text-sm opacity-80 gap-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {new Date(date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{author}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
