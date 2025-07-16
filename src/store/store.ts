// src/store/store.ts
import { create } from "zustand";

// Compatible interface with current blog structure
interface BlogPost {
  _id?: string;
  blogID?: string;
  slug: string;
  blogType?: "arabic" | "english" | "both";
  title: string;
  excerpt: string;
  isUP: boolean | null;
  author: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  publishedAt?: string;
  isFeatured?: boolean;
  // Legacy fields for compatibility
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
  contentEN?: string;
  contentAR?: string;
}

interface BlogStore {
  blogs: BlogPost[];
  blogsAR: BlogPost[];
  blogsEN: BlogPost[];
  filteredBlogs: BlogPost[];
  isLoading: boolean;
  error: string | null;
  isDataFetched: boolean;
  lastFetchTime: number | null;
  cacheExpiry: number;
  isUP: boolean | null;

  toggleIsUP: () => void;
  setBlogs: (blogs: BlogPost[]) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  filterBlogsByCategory: (category: string, language?: string) => void;
  getFeaturedBlogs: (language?: string) => BlogPost[];
  shouldFetchBlogs: () => boolean;
  resetCache: () => void;
  markDataAsFetched: () => void;
}

// ✅ إنشاء الـ store الأساسي
const blogStore = create<BlogStore>((set, get) => ({
  blogs: [],
  blogsAR: [],
  blogsEN: [],
  filteredBlogs: [],
  isLoading: true,
  error: null,
  isDataFetched: false,
  lastFetchTime: null,
  cacheExpiry: 5 * 60 * 1000, // 5 دقائق بالميلي ثانية
  isUP: false,

  setBlogs: (blogs) => {
    // ✅ فلترة المقالات التي لها publishedAt غير null
    const publishedBlogs = blogs
      .filter(
        (blog) => blog.publishedAt !== null && blog.publishedAt !== undefined,
      )
      .map((blog) => {
        // إذا كانت الحقول الخاصة باللغتين غير موجودة، عيّنها من الحقول العامة
        return {
          ...blog,
          titleEN: blog.titleEN || blog.title || "",
          titleAR: blog.titleAR || blog.title || "",
          excerptEN: blog.excerptEN || blog.excerpt || "",
          excerptAR: blog.excerptAR || blog.excerpt || "",
          authorEN: blog.authorEN || blog.author || "",
          authorAR: blog.authorAR || blog.author || "",
          categoryEN: blog.categoryEN || blog.category || "",
          categoryAR: blog.categoryAR || blog.category || "",
          tagsEN: blog.tagsEN || blog.tags || [],
          tagsAR: blog.tagsAR || blog.tags || [],
          contentEN: blog.contentEN || "",
          contentAR: blog.contentAR || "",
        };
      });
    // تقسيم المقالات حسب اللغة
    const blogsAR = publishedBlogs.filter(
      (blog) =>
        (blog.blogType === "arabic" || blog.blogType === "both") &&
        blog.titleAR &&
        blog.contentAR,
    );
    const blogsEN = publishedBlogs.filter(
      (blog) =>
        (blog.blogType === "english" || blog.blogType === "both") &&
        blog.titleEN &&
        blog.contentEN,
    );
    console.log("publishedBlogs", publishedBlogs.length);
    set({
      blogs: publishedBlogs,
      blogsAR,
      blogsEN,
      filteredBlogs: publishedBlogs,
      isDataFetched: true,
      lastFetchTime: Date.now(),
      error: null,
    });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  setError: (error) => set({ error }),

  toggleIsUP: () => {
    set((state) => ({
      isUP: !state.isUP,
    }));
  },

  filterBlogsByCategory: (category, language = "en") => {
    set((state) => {
      const categoriesMap = {
        "media-production": { en: "Media Production", ar: "الإنتاج الإعلامي" },
        "event-management": { en: "Event Management", ar: "إدارة الفعاليات" },
        "booth-production": { en: "Booth Production", ar: "إنتاج المعارض" },
        printing: { en: "Printing", ar: "الطباعة" },
        "corporate-news": { en: "Corporate News", ar: "أخبار الشركات" },
      };

      const definedCategories = Object.keys(categoriesMap);

      // ✅ تطبيع من اسم التصنيف إلى الـslug المناسب
      const normalizeCategory = (rawCategory: string): string => {
        const catLower = rawCategory?.toLowerCase()?.trim();
        for (const [slug, names] of Object.entries(categoriesMap)) {
          if (names[language]?.toLowerCase() === catLower) {
            return slug;
          }
        }
        return "other";
      };

      const filteredBlogs = state.blogs.filter((blog) => {
        const rawCategory =
          language === "ar" ? blog.categoryAR : blog.categoryEN;

        // Handle undefined category values
        if (!rawCategory) return false;

        const normalized = normalizeCategory(rawCategory);

        if (category === "all") return true;
        if (category === "other")
          return !definedCategories.includes(normalized);
        return normalized === category;
      });

      const categoryDisplayName =
        category === "all"
          ? language === "ar"
            ? "الكل"
            : "All"
          : category === "other"
            ? language === "ar"
              ? "أخرى"
              : "Other"
            : categoriesMap[category]?.[language] || category;

      return {
        filteredBlogs,
        categoryDisplayName,
      };
    });
  },

  shouldFetchBlogs: () => {
    const state = get();

    if (!state.isDataFetched || !state.lastFetchTime) {
      return true;
    }

    const now = Date.now();
    const timeSinceLastFetch = now - state.lastFetchTime;

    if (timeSinceLastFetch > state.cacheExpiry) {
      return true;
    }

    if (state.blogs.length === 0) {
      return true;
    }

    return false;
  },

  resetCache: () => {
    set({
      blogs: [],
      filteredBlogs: [],
      isDataFetched: false,
      lastFetchTime: null,
      error: null,
    });
  },

  markDataAsFetched: () => {
    set({
      isDataFetched: true,
      lastFetchTime: Date.now(),
    });
  },

  getFeaturedBlogs: (language?: string) => {
    const state = get();
    return state.blogs.filter((blog) => blog.isFeatured);
  },
}));

// ✅ تصدير الـ hook للاستخدام في المكونات
export const useBlogStore = blogStore;

// ✅ تصدير الـ store object للاستخدام خارج المكونات
export const blogStoreApi = blogStore;

// ✅ تصدير default للتوافق مع الكود الحالي
export default useBlogStore;
