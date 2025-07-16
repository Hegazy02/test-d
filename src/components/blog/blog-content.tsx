"use client";

import { useState, useEffect } from "react";
import useBlogStore from "@/store/store.ts";
import BlogPostsList from "./blog-posts-list";
import { loadBlogsData } from "@/lib/loadBlogs";
import { useTranslation } from "react-i18next";
import { useLocalizedBlog } from "@/hooks/useLocalizedBlog";
const translations = {
  en: {
    noArticlesFound: "No articles found matching your search criteria.",
    failedToLoad: "Failed to load articles. Please try again later.",
  },
  ar: {
    noArticlesFound: "لم يتم العثور على مقالات تطابق معايير البحث الخاصة بك.",
    failedToLoad: "فشل في تحميل المقالات. يرجى المحاولة مرة أخرى لاحقاً.",
  },
};

export default function BlogContent() {
  const { filteredBlogs } = useBlogStore();
  const { i18n } = useTranslation();
  const { lang, getLocalizedBlogData, hasContentInCurrentLanguage } =
    useLocalizedBlog();
  const t = lang === "ar" ? translations.ar : translations.en;

  const { blogs, isLoading, error, setLoading, setError } = useBlogStore();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        await loadBlogsData();
      } catch (err) {
        setError(t.failedToLoad);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [setLoading, setError, t.failedToLoad]);

  return (
    <section id="blog-posts-section" className="py-12">
      <div className="container mx-auto px-4">
        <BlogPostsList
          posts={filteredBlogs}
          isLoading={isLoading}
          error={error}
          postsPerPage={12}
        />
      </div>
    </section>
  );
}
