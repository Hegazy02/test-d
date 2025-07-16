"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./blog-card";
import BlogPagination from "./blog-pagination";
import { useTranslation } from "react-i18next";
import { useLocalizedBlog } from "@/hooks/useLocalizedBlog";

// Interface for blog post from the new model
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

interface BlogPostsListProps {
  posts: BlogPost[];
  isLoading: boolean;
  error: string | null;
  postsPerPage?: number;
}

// Translations
const translations = {
  en: {
    noPosts: "No blog posts found in this category.",
    loading: "Loading posts...",
  },
  ar: {
    noPosts: "لا توجد مقالات في هذا التصنيف.",
    loading: "جاري تحميل المقالات...",
  },
};

export default function BlogPostsList({
  posts,
  isLoading,
  error,
  postsPerPage = 12,
}: BlogPostsListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { i18n } = useTranslation();
  const {
    lang,
    isRTL,
    getLocalizedBlogData,
    hasContentInCurrentLanguage,
    filterPostsByLanguage,
  } = useLocalizedBlog();

  // Get translations for current language
  const t = lang === "ar" ? translations.ar : translations.en;

  // Filter posts that have content in current language
  const validPosts = posts.filter((post) => hasContentInCurrentLanguage(post));
  const totalPages = Math.ceil(validPosts.length / postsPerPage);

  const getCurrentPagePosts = () => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return validPosts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the section
    document
      .getElementById("blog-posts-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
        >
          {/* Skeleton Image */}
          <div className="relative aspect-[16/9] w-full bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
          </div>

          {/* Skeleton Content */}
          <div className="p-5 space-y-3">
            {/* Category Skeleton */}
            <div
              className={`h-6 bg-gray-200 rounded w-24 animate-pulse ${
                isRTL ? "mr-auto" : "ml-0"
              }`}
            ></div>

            {/* Title Skeleton */}
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>

            {/* Excerpt Skeleton */}
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            </div>

            {/* Author & Date Skeleton */}
            <div
              className={`flex items-center justify-between mt-4 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`flex items-center space-x-3 ${
                  isRTL ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div
        className={`text-center text-red-500 min-h-[500px] flex items-center justify-center ${
          isRTL ? "text-right" : "text-left"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <p>{error}</p>
      </div>
    );
  }

  if (validPosts.length === 0) {
    return (
      <div
        className={`text-center min-h-[500px] flex items-center justify-center ${
          isRTL ? "text-right" : "text-left"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <p className="text-gray-500">{t.noPosts}</p>
      </div>
    );
  }

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatePresence mode="wait">
          {getCurrentPagePosts().map((post: BlogPost, index: number) => {
            const localizedData = getLocalizedBlogData(post);

            return (
              <motion.div
                key={`${post.slug}-${index}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  opacity: { duration: 0.3 },
                  layout: {
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                  },
                }}
              >
                <>
                  <BlogCard
                    title={localizedData.title || ""}
                    excerpt={localizedData.excerpt || ""}
                    image={post.featuredImage || "/placeholder.svg"}
                    imageAlt={localizedData.imageAlt || ""}
                    category={localizedData.category || ""}
                    publishedAt={post.publishedAt || ""}
                    slug={post.slug}
                    author={localizedData.author || ""}
                    tags={localizedData.tags || []}
                    featuredImage={post.featuredImage || ""}
                    isFeatured={post.isFeatured}
                    isRTL={isRTL}
                  />
                </>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isRTL={isRTL}
        />
      )}
    </div>
  );
}
