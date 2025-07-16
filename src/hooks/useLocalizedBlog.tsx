// src\hooks\useLocalizedBlog.tsx
import { useTranslation } from "react-i18next";

// Interface for blog post data
interface BlogPost {
  _id?: string;
  blogID?: string;
  slug: string;
  blogType: "arabic" | "english" | "both";
  titleEN?: string;
  titleAR?: string;
  excerptEN?: string;
  excerptAR?: string;
  authorEN?: string;
  authorAR?: string;
  categoryEN?: string;
  categoryAR?: string;
  tagsEN?: string[];
  tagsAR?: string[];
  imageAltEN?: string;
  imageAltAR?: string;
  contentEN?: string;
  contentAR?: string;
  featuredImage?: string;
  publishedAt?: string;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Interface for localized blog data
interface LocalizedBlogData {
  title: string;
  excerpt: string;
  author: string;
  category: string;
  tags: string[];
  imageAlt: string;
  content: string;
}

// Translation mappings for categories
const categoryTranslations = {
  en: {
    "media-production": "Media Production",
    "event-management": "Event Management",
    "booth-production": "Booth Production",
    printing: "Printing",
    "الإنتاج الإعلامي": "Media Production",
    "إدارة الفعاليات": "Event Management",
    "إنتاج المعارض": "Booth Production",
    الطباعة: "Printing",
  },
  ar: {
    "media-production": "الإنتاج الإعلامي",
    "event-management": "إدارة الفعاليات",
    "booth-production": "إنتاج المعارض",
    printing: "الطباعة",
    "Media Production": "الإنتاج الإعلامي",
    "Event Management": "إدارة الفعاليات",
    "Booth Production": "إنتاج المعارض",
    Printing: "الطباعة",
  },
};

export function useLocalizedBlog() {
  const { i18n } = useTranslation();

  // Determine current language
  const lang = (i18n?.language || "en") as "en" | "ar";
  const isRTL = lang === "ar";

  // Function to get localized data for a single blog post
  const getLocalizedBlogData = (post: BlogPost): LocalizedBlogData => {
    if (lang === "ar") {
      return {
        title: post.titleAR || post.titleEN || "",
        excerpt: post.excerptAR || post.excerptEN || "",
        author: post.authorAR || post.authorEN || "",
        category: translateCategory(
          post.categoryAR || post.categoryEN || "",
          lang,
        ),
        tags: post.tagsAR || post.tagsEN || [],
        imageAlt: post.imageAltAR || post.imageAltEN || "",
        content: post.contentAR || post.contentEN || "",
      };
    } else {
      return {
        title: post.titleEN || post.titleAR || "",
        excerpt: post.excerptEN || post.excerptAR || "",
        author: post.authorEN || post.authorAR || "",
        category: translateCategory(
          post.categoryEN || post.categoryAR || "",
          lang,
        ),
        tags: post.tagsEN || post.tagsAR || [],
        imageAlt: post.imageAltEN || post.imageAltAR || "",
        content: post.contentEN || post.contentAR || "",
      };
    }
  };

  // Function to translate category
  const translateCategory = (
    category: string,
    targetLang: "en" | "ar",
  ): string => {
    if (!category) return "";

    const translations = categoryTranslations[targetLang] as {
      [key: string]: string;
    };

    // Try direct translation
    if (translations[category]) {
      return translations[category];
    }

    // Try case-insensitive search
    const lowerCategory = category.toLowerCase();
    const matchingKey = Object.keys(translations).find(
      (key) => key.toLowerCase() === lowerCategory,
    );

    if (matchingKey && translations[matchingKey]) {
      return translations[matchingKey];
    }

    // Return original if no translation found
    return category;
  };

  // Function to get localized data for multiple blog posts
  const getLocalizedBlogList = (
    posts: BlogPost[],
  ): (BlogPost & LocalizedBlogData)[] => {
    return posts.map((post) => ({
      ...post,
      ...getLocalizedBlogData(post),
    }));
  };

  // Function to filter posts by blog type based on current language
  const filterPostsByLanguage = (posts: BlogPost[]): BlogPost[] => {
    return posts.filter((post) => {
      if (post.blogType === "both") return true;
      if (lang === "ar" && post.blogType === "arabic") return true;
      if (lang === "en" && post.blogType === "english") return true;
      return false;
    });
  };

  // Function to check if a post has content in the current language
  const hasContentInCurrentLanguage = (post: BlogPost): boolean => {
    if (lang === "ar") {
      return !!(post.titleAR && post.contentAR);
    } else {
      return !!(post.titleEN && post.contentEN);
    }
  };

  // Function to get the best available language for a post
  const getBestAvailableLanguage = (post: BlogPost): "en" | "ar" => {
    if (lang === "ar" && post.titleAR && post.contentAR) return "ar";
    if (lang === "en" && post.titleEN && post.contentEN) return "en";

    // Fallback logic
    if (post.titleEN && post.contentEN) return "en";
    if (post.titleAR && post.contentAR) return "ar";

    return lang; // Default to current language
  };

  return {
    lang,
    isRTL,
    getLocalizedBlogData,
    getLocalizedBlogList,
    filterPostsByLanguage,
    hasContentInCurrentLanguage,
    getBestAvailableLanguage,
    translateCategory,
  };
}

export default useLocalizedBlog;
