"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useBlogStore from "@/store/store";

export type BlogCategory =
  | "all"
  | "media-production"
  | "event-management"
  | "booth-production"
  | "printing"
  | "other";

// الترجمة
const translations = {
  en: {
    categoriesLabel: "— Categories —",
    categories: {
      all: "All",
      "media-production": "Media Production",
      "event-management": "Event Management",
      "booth-production": "Booth Production",
      printing: "Printing",
      other: "Other",
    },
  },
  ar: {
    categoriesLabel: "— التصنيفات —",
    categories: {
      all: "الكل",
      "media-production": "الإنتاج الإعلامي",
      "event-management": "إدارة الفعاليات",
      "booth-production": "إنتاج المعارض",
      printing: "الطباعة",
      other: "أخرى",
    },
  },
};

// خريطة لتطبيع التصنيفات من EN و AR إلى Slug
const categorySlugMap: Record<string, BlogCategory> = {
  // EN
  "media production": "media-production",
  "event management": "event-management",
  "booth production": "booth-production",
  printing: "printing",
  media: "media-production",
  events: "event-management",
  booth: "booth-production",
  print: "printing",

  // AR
  "الإنتاج الإعلامي": "media-production",
  "إدارة الفعاليات": "event-management",
  "إنتاج المعارض": "booth-production",
  الطباعة: "printing",
  إعلامي: "media-production",
  فعاليات: "event-management",
  معارض: "booth-production",
};

export default function BlogCategories() {
  const { blogs, filterBlogsByCategory, getFeaturedBlogs, isLoading } =
    useBlogStore();
  const { i18n } = useTranslation();
  const lang = i18n?.language || "en";
  const t = lang === "ar" ? translations.ar : translations.en;
  const isRTL = lang === "ar";

  // State للتحكم في المقالات المميزة
  const [featuredBlogs, setFeaturedBlogs] = useState<any[]>([]);
  const [hasFeaturedBlogs, setHasFeaturedBlogs] = useState(false);

  // useEffect للتحكم في المقالات المميزة
  useEffect(() => {
    if (isLoading) {
      // إذا كان في حالة التحميل، اجعل hasFeaturedBlogs = false
      setHasFeaturedBlogs(false);
      setFeaturedBlogs([]);
    } else {
      // إذا انتهى التحميل، تحقق من المقالات المميزة
      const featured = getFeaturedBlogs(lang);
      setFeaturedBlogs(featured);
      setHasFeaturedBlogs(featured.length > 0);
    }
    console.log("featuredBlogs", featuredBlogs);
    console.log("hasFeaturedBlogs", hasFeaturedBlogs);
  }, [isLoading, lang, getFeaturedBlogs]);

  const definedCategories: BlogCategory[] = [
    "media-production",
    "event-management",
    "booth-production",
    "printing",
  ];

  // تطبيع التصنيف إلى slug موحد
  const normalizeCategory = (rawCategory: string): BlogCategory => {
    if (!rawCategory) return "other";

    const lower = rawCategory.toLowerCase().trim();

    // Check against categorySlugMap
    for (const key in categorySlugMap) {
      if (key.toLowerCase().trim() === lower) {
        return categorySlugMap[key];
      }
    }

    // Check against defined slugs directly
    if (definedCategories.includes(lower as BlogCategory)) {
      return lower as BlogCategory;
    }

    // Log unmapped categories for debugging
    console.warn(`Unmapped category: ${rawCategory}`);
    return "other";
  };

  // فلترة المقالات حسب اللغة الحالية ونوع التدوينة
  const filteredBlogsByLang = blogs
    .filter((post: any) => {
      if (post.blogType === "both") return true;
      if (lang === "ar" && post.blogType === "arabic") return true;
      if (lang === "en" && post.blogType === "english") return true;
      return false;
    })
    .filter((post: any) => {
      // تحقق من وجود محتوى في اللغة الحالية
      if (lang === "ar") {
        return post.titleAR && post.contentAR;
      } else {
        return post.titleEN && post.contentEN;
      }
    });

  const categoryCounts = filteredBlogsByLang.reduce(
    (counts: Record<BlogCategory, number>, post: any) => {
      const rawCategory =
        lang === "ar"
          ? post?.categoryAR || post?.category || post?.categoryEN || ""
          : post?.categoryEN || post?.category || post?.categoryAR || "";
      const slug = normalizeCategory(rawCategory);
      counts[slug] = (counts[slug] || 0) + 1;
      return counts;
    },
    {
      all: filteredBlogsByLang.length,
      "media-production": 0,
      "event-management": 0,
      "booth-production": 0,
      printing: 0,
      other: 0,
    } as Record<BlogCategory, number>,
  );

  const categories: { name: string; slug: BlogCategory }[] = [
    { name: t.categories.all, slug: "all" },
    { name: t.categories["media-production"], slug: "media-production" },
    { name: t.categories["event-management"], slug: "event-management" },
    { name: t.categories["booth-production"], slug: "booth-production" },
    { name: t.categories.printing, slug: "printing" },
    { name: t.categories.other, slug: "other" },
  ];

  const handleCategoryChange = useCallback(
    (category: BlogCategory) => {
      filterBlogsByCategory(category);
    },
    [filterBlogsByCategory],
  );

  return (
    <section
      className={`flex items-center ${!hasFeaturedBlogs ? "pt-10" : ""}`}
    >
      <div className="container mx-auto px-4">
        <div className="space-y-8">
          <div
            className={`dark:text-[#13B5B8] font-semibold text-center text-4xl ${
              isRTL ? "font-arabic" : ""
            }`}
          >
            {t.categoriesLabel}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3">
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant="outline"
                className={`
                  border-[#004B4B] 
                  dark:text-black 
                  dark:bg-white 
                  text-[#004B4B] 
                  transition-all 
                  duration-300
                  hover:bg-gradient-to-t
                  hover:from-[#2D2D2D] 
                  hover:to-[#525252]
                  hover:text-white
                  hover:border-transparent
                  ${isRTL ? "font-arabic" : ""}
                `}
                size="sm"
                onClick={() => handleCategoryChange(category.slug)}
              >
                {category.name}{" "}
                <span
                  className={`text-xs opacity-70 ${isRTL ? "mr-1" : "ml-1"}`}
                >
                  ({categoryCounts[category.slug] || 0})
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
