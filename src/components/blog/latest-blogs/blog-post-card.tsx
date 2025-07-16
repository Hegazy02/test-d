import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ChevronRight, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

// Translations
const translations = {
  en: {
    readMore: "Read More",
    fallbackImageAlt: "Featured image for article:",
  },
  ar: {
    readMore: "اقرأ المزيد",
    fallbackImageAlt: "صورة توضيحية لمقال:",
  },
};

interface BlogPostCardProps {
  post: {
    _id: string;
    title: string;
    excerpt: string;
    image: string;
    imageAlt: string;
    featuredImage: string;
    category: string;
    publishedAt: string;
    author: string;
    readTime?: string;
    slug: string;
    tags?: string[];
    isFeatured?: boolean;
  };
  lang?: "en" | "ar";
}

export default function BlogPostCard({ post, lang }: BlogPostCardProps) {
  const { i18n } = useTranslation();
  const currentLang = lang || i18n?.language || "en";
  const t = currentLang === "ar" ? translations.ar : translations.en;
  const isRTL = currentLang === "ar";

  const imageName = post.featuredImage?.split("/").pop() || "";

  // Format date according to language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const locale = currentLang === "ar" ? "ar-SA" : "en-US";
    return date.toLocaleDateString(locale, options);
  };

  const getImageAlt = () => {
    if (post.imageAlt) return post.imageAlt;
    return `${t.fallbackImageAlt} ${post.title}`;
  };

  const pathname = usePathname();
  const supportedLocales = ["en", "ar"];
  const createLocalizedPath = (path) => {
    const pathParts = path.split("/").filter(Boolean);
    if (supportedLocales.includes(pathParts[0])) pathParts.shift();
    const currentPathParts = pathname.split("/").filter(Boolean);
    const isCurrentLocalized = supportedLocales.includes(currentPathParts[0]);
    const currentLocale = isCurrentLocalized ? currentPathParts[0] : null;
    if (isCurrentLocalized) {
      return `/${currentLocale}${path === "/" ? "" : "/" + pathParts.join("/")}`;
    } else {
      return path;
    }
  };

  return (
    <article className="dark:bg-[#434343] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link href={createLocalizedPath(`/blogs/${post.slug}`)} className="block">
        <div className="relative aspect-[16/9]">
          <Image
            src={
              post.featuredImage ||
              `/api/images/${imageName}` ||
              "/placeholder.svg"
            }
            alt={getImageAlt()}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {post.category && (
            <div className="absolute top-4 left-4 bg-[#004B4B] text-white text-xs font-semibold px-3 py-1.5 rounded shadow-md">
              {post.category}
            </div>
          )}
        </div>
        <div className="p-6">
          <div
            className={`flex items-center text-xs dark:text-white text-gray-500 mb-2 space-x-3 ${
              isRTL ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div
              className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <Calendar
                className={`h-3 w-3 dark:text-white text-[#D4B82C] ${isRTL ? "ml-1" : "mr-1"}`}
              />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div
              className={`flex items-center ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <User
                className={`h-3 w-3 dark:text-white text-[#D4B82C] ${isRTL ? "ml-1" : "mr-1"}`}
              />
              <span>{post.author}</span>
            </div>
          </div>

          <h3
            className={`text-xl font-bold dark:text-white text-gray-900 mb-2 line-clamp-2 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {post.title}
          </h3>

          <p
            className={`dark:text-white text-gray-600 mb-4 text-sm line-clamp-3 ${
              isRTL ? "text-right" : "text-left"
            }`}
          >
            {post.excerpt}
          </p>

          <div
            className={`flex items-center dark:text-white text-[#004B4B] font-medium text-sm ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <span>{t.readMore}</span>
            {isRTL ? (
              <ChevronLeft className="mr-1 h-4 w-4" />
            ) : (
              <ChevronRight className="ml-1 h-4 w-4" />
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
