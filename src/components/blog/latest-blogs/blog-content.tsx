"use client";

import { useState, useEffect, Key } from "react";
import HeroSection from "./hero-section";
import FeaturedPost from "./featured-post";
import BlogPostCard from "./blog-post-card";
import LoadingState from "./loading-state";
import ErrorState from "./error-state";
import useBlogStore from "@/store/store.ts";
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
  const [searchQuery, setSearchQuery] = useState("");
  const { blogs, isLoading, error, setLoading, setError } = useBlogStore();
  const { i18n } = useTranslation();
  const { lang, getLocalizedBlogData, hasContentInCurrentLanguage } =
    useLocalizedBlog();
  const t = lang === "ar" ? translations.ar : translations.en;

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

  // Filter blogs based on current language and search query
  const getSearchableText = (blog: any) => {
    const localizedData = getLocalizedBlogData(blog);
    return {
      title: localizedData.title,
      excerpt: localizedData.excerpt,
      category: localizedData.category,
      author: localizedData.author,
      tags: localizedData.tags?.join(" ") || "",
    };
  };

  // Filter blogs based on language compatibility and search query
  const filteredBlogs = blogs.filter((blog: any) => {
    // First check if blog has content in current language
    if (!hasContentInCurrentLanguage(blog)) {
      return false;
    }

    // Then apply search filter
    if (!searchQuery.trim()) return true;

    const searchLower = searchQuery.toLowerCase();
    const searchableData = getSearchableText(blog);

    return (
      searchableData.title?.toLowerCase().includes(searchLower) ||
      searchableData.excerpt?.toLowerCase().includes(searchLower) ||
      searchableData.category?.toLowerCase().includes(searchLower) ||
      searchableData.author?.toLowerCase().includes(searchLower) ||
      searchableData.tags?.toLowerCase().includes(searchLower)
    );
  });

  // Prepare blog posts with localized data
  const prepareLocalizedPost = (post: any) => {
    const localizedData = getLocalizedBlogData(post);

    return {
      _id: post._id || post.blogID,
      blogID: post.blogID,
      title: localizedData.title,
      excerpt: localizedData.excerpt,
      image: post.featuredImage,
      imageAlt: localizedData.imageAlt,
      featuredImage: post.featuredImage,
      category: localizedData.category,
      publishedAt: post.publishedAt,
      author: localizedData.author,
      slug: post.slug,
      tags: localizedData.tags,
      isFeatured: post.isFeatured,
      // Keep original data for compatibility
      originalPost: post,
    };
  };

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <>
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <section className="py-16 light:bg-gray-50">
        <div className="container mx-auto px-4">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">{t.noArticlesFound}</p>
            </div>
          ) : (
            <>
              {/* Featured Post - Show first blog or first featured blog */}
              {(() => {
                const featuredPost =
                  filteredBlogs.find((post: any) => post.isFeatured) ||
                  filteredBlogs[0];
                const localizedFeaturedPost =
                  prepareLocalizedPost(featuredPost);

                return (
                  <FeaturedPost post={localizedFeaturedPost} lang={lang} />
                );
              })()}

              {/* Regular Blog Posts */}
              {filteredBlogs.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs
                    .filter((post: any, index: number) => {
                      // Skip the featured post (either first featured or first post)
                      const featuredPost =
                        filteredBlogs.find((p: any) => p.isFeatured) ||
                        filteredBlogs[0];
                      return post !== featuredPost;
                    })
                    .map((post: any) => {
                      const localizedPost = prepareLocalizedPost(post);

                      // Validate required fields
                      if (
                        localizedPost._id &&
                        localizedPost.title &&
                        localizedPost.excerpt &&
                        localizedPost.category &&
                        localizedPost.publishedAt &&
                        localizedPost.author &&
                        localizedPost.slug
                      ) {
                        return (
                          <BlogPostCard
                            key={localizedPost._id}
                            post={{
                              _id: String(localizedPost._id),
                              title: localizedPost.title,
                              excerpt: localizedPost.excerpt,
                              image: localizedPost.image,
                              imageAlt: localizedPost.imageAlt,
                              featuredImage: localizedPost.featuredImage,
                              category: localizedPost.category,
                              publishedAt: localizedPost.publishedAt,
                              author: localizedPost.author,
                              readTime: calculateReadTime(
                                localizedPost.excerpt,
                                lang,
                              ),
                              slug: localizedPost.slug,
                              tags: localizedPost.tags,
                              isFeatured: localizedPost.isFeatured,
                            }}
                            lang={lang}
                          />
                        );
                      }
                      return null;
                    })
                    .filter(Boolean)}{" "}
                  {/* Remove null values */}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}

// Helper function to calculate read time
function calculateReadTime(content: string, language: "en" | "ar"): string {
  if (!content) return language === "ar" ? "دقيقة واحدة قراءة" : "1 min read";

  const cleanContent = content.replace(/<[^>]*>/g, "");
  const charCount = cleanContent.length;

  // Base reading speed (characters per minute) - adjust for Arabic
  const baseReadingSpeed = language === "ar" ? 800 : 1000;
  const readTimeMinutes = Math.ceil(charCount / baseReadingSpeed);

  if (readTimeMinutes < 1) {
    return language === "ar" ? "أقل من دقيقة قراءة" : "Less than a minute read";
  } else if (readTimeMinutes === 1) {
    return language === "ar" ? "دقيقة واحدة قراءة" : "1 min read";
  } else {
    return language === "ar"
      ? `${readTimeMinutes} دقائق قراءة`
      : `${readTimeMinutes} min read`;
  }
}
