// src\components\blog\featured-posts.tsx
"use client";
import BlogCard, { type BlogCardProps } from "./blog-card";
// ✅ استيراد صحيح للـ hook
import { useBlogStore } from "@/store/store";
import { useTranslation } from "react-i18next";
import { useLocalizedBlog } from "@/hooks/useLocalizedBlog";
import SectionDivider from "@/components/shared/SectionDivider";

// Translations object
const translations = {
  en: {
    featuredArticles: "Featured Articles",
    noFeaturedPosts: "No featured posts available.",
  },
  ar: {
    featuredArticles: "المقالات المميزة",
    noFeaturedPosts: "لا توجد مقالات مميزة متاحة.",
  },
};

// مكون Skeleton للمقالات المميزة
function FeaturedPostsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[...Array(3)].map((_, index) => (
        <article
          key={index}
          className="flex flex-col overflow-hidden border border-gray-200 rounded-lg shadow-sm min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] xl:min-h-[500px]"
        >
          {/* صورة المقال */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-lg">
            <div className="w-full h-full bg-gray-200">
              <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
            </div>
            {/* شارة الفئة */}
            <div className="absolute top-4 left-4 h-6 w-24 bg-gray-300 rounded animate-pulse"></div>
          </div>

          <div className="p-5">
            {/* الوسوم */}
            <div className="flex gap-2 mb-2">
              <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* العنوان */}
            <div className="space-y-2 mb-3">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>

            {/* الملخص */}
            <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
            </div>

            {/* التاريخ والمؤلف */}
            <div className="flex items-center justify-between">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-gray-200 rounded-full mr-2 animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function FeaturedPosts() {
  // ✅ استخدام صحيح للـ hook
  const { blogs, isLoading, getFeaturedBlogs } = useBlogStore();
  const { i18n } = useTranslation();
  const {
    lang,
    isRTL,
    getLocalizedBlogData,
    filterPostsByLanguage,
    hasContentInCurrentLanguage,
  } = useLocalizedBlog();

  // Get translations for current language
  const t = lang === "ar" ? translations.ar : translations.en;

  // جلب المقالات المميزة من الـ store
  const allFeaturedPosts = getFeaturedBlogs(lang);

  // فلترة المقالات التي لها محتوى في اللغة الحالية
  const featuredPosts = allFeaturedPosts
    .filter((post) => hasContentInCurrentLanguage(post))
    .slice(0, 3);

  // إخفاء القسم كاملاً إذا لم توجد مقالات مميزة
  if (!isLoading && featuredPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 light:bg-gray-50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-2xl md:text-3xl font-bold dark:text-white text-[#004B4B] mb-8 text-center`}
        >
          {t.featuredArticles}
        </h2>

        {isLoading ? (
          <FeaturedPostsSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post) => {
              const localizedData = getLocalizedBlogData(post);

              return (
                <BlogCard
                  key={post.slug}
                  title={localizedData.title}
                  excerpt={localizedData.excerpt}
                  image={post.featuredImage}
                  imageAlt={localizedData.imageAlt}
                  category={localizedData.category}
                  publishedAt={post.publishedAt}
                  slug={post.slug}
                  author={localizedData.author}
                  tags={localizedData.tags}
                  featuredImage={post.featuredImage || ""}
                  isFeatured={post.isFeatured}
                  isRTL={isRTL}
                />
              );
            })}
          </div>
        )}
      </div>
      <SectionDivider />
    </section>
  );
}
