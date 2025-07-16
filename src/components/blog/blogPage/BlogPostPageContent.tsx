"use client";

import { useState, useEffect } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import BlogPostHeader from "@/components/blog/blogPage/BlogPostHeader";
import BlogPostContent from "@/components/blog/blogPage/BlogPostContent";
import BlogPostTags from "@/components/blog/blogPage/BlogPostTags";
import BlogPostAuthor from "@/components/blog/blogPage/BlogPostAuthor";
import NewsletterSection from "@/components/blog/newsletter-section";
import { useTranslation } from "react-i18next";
import { useLocalizedBlog } from "@/hooks/useLocalizedBlog";

// Updated interface to match the new blog model
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

interface BlogPostPageContentProps {
  post: BlogPost;
}

// Translations
const translations = {
  en: {
    readTime: {
      lessThanMinute: "Less than a minute read",
      oneMinute: "1 minute read",
      minutes: "minutes read",
      hour: "hour",
      hours: "hours",
      and: "and",
      minute: "minute",
      read: "read",
    },
    fallbackImageAlt: "Featured image for article:",
    loading: "Loading...",
    error: "Error loading content",
  },
  ar: {
    readTime: {
      lessThanMinute: "أقل من دقيقة قراءة",
      oneMinute: "دقيقة واحدة قراءة",
      minutes: "دقائق قراءة",
      hour: "ساعة",
      hours: "ساعات",
      and: "و",
      minute: "دقيقة",
      read: "قراءة",
    },
    fallbackImageAlt: "صورة توضيحية لمقال:",
    loading: "جاري التحميل...",
    error: "خطأ في تحميل المحتوى",
  },
};

// Function to calculate read time with language support
function calculateReadTime(content: string, language: "en" | "ar"): string {
  const t = translations[language];

  // Remove HTML tags and get clean text
  const cleanContent = content.replace(/<[^>]*>/g, "");

  // Calculate different metrics
  const charCount = cleanContent.length;
  const wordCount = cleanContent
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
  const sentenceCount = cleanContent
    .split(/[.!?؟]+/)
    .filter((sentence) => sentence.trim().length > 0).length;

  // Calculate complexity factors
  const avgWordLength = charCount / wordCount;
  const avgSentenceLength = wordCount / sentenceCount;

  // Base reading speed (characters per minute) - adjust for Arabic
  const baseReadingSpeed = language === "ar" ? 800 : 1000; // Arabic is typically slower

  // Adjust reading speed based on content complexity
  let complexityFactor = 1.0;

  // Adjust for word length (longer words take more time to read)
  if (avgWordLength > 8) {
    complexityFactor *= 0.8;
  } else if (avgWordLength > 6) {
    complexityFactor *= 0.9;
  }

  // Adjust for sentence length (longer sentences take more time to process)
  if (avgSentenceLength > 20) {
    complexityFactor *= 0.85;
  } else if (avgSentenceLength > 15) {
    complexityFactor *= 0.9;
  }

  // Calculate reading time in minutes with complexity adjustment
  const adjustedReadingSpeed = baseReadingSpeed * complexityFactor;
  const readTimeMinutes = Math.ceil(charCount / adjustedReadingSpeed);

  // Format the read time string based on language
  if (readTimeMinutes < 1) {
    return t.readTime.lessThanMinute;
  } else if (readTimeMinutes === 1) {
    return t.readTime.oneMinute;
  } else if (readTimeMinutes < 60) {
    if (language === "ar") {
      return `${readTimeMinutes} ${t.readTime.minutes}`;
    } else {
      return `${readTimeMinutes} ${t.readTime.minutes}`;
    }
  } else {
    const hours = Math.floor(readTimeMinutes / 60);
    const minutes = readTimeMinutes % 60;

    if (language === "ar") {
      if (minutes === 0) {
        return `${hours} ${hours === 1 ? t.readTime.hour : t.readTime.hours} ${t.readTime.read}`;
      } else {
        return `${hours} ${hours === 1 ? t.readTime.hour : t.readTime.hours} ${t.readTime.and} ${minutes} ${t.readTime.minute} ${t.readTime.read}`;
      }
    } else {
      if (minutes === 0) {
        return `${hours} ${hours === 1 ? t.readTime.hour : t.readTime.hours} ${t.readTime.read}`;
      } else if (minutes < 10) {
        return `${hours} ${hours === 1 ? t.readTime.hour : t.readTime.hours} ${t.readTime.and} ${minutes} ${minutes === 1 ? t.readTime.minute : t.readTime.minutes} ${t.readTime.read}`;
      } else {
        return `${hours} ${hours === 1 ? t.readTime.hour : t.readTime.hours} ${t.readTime.and} ${minutes} ${t.readTime.minutes} ${t.readTime.read}`;
      }
    }
  }
}

export default function BlogPostPageContent({
  post,
}: BlogPostPageContentProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  // استخدام النظام الجديد للـ hook مع Store
  const {
    lang,
    isRTL,
    getLocalizedBlogData,
    blogs,
    isLoading: blogsLoading,
    error: blogsError,
  } = useLocalizedBlog();

  // Get localized data for the post
  const localizedData = getLocalizedBlogData(post);
  const t = translations[lang];

  // Calculate read time with localized content
  const readTime = calculateReadTime(localizedData.content, lang);

  // تحسين جلب الصورة مع معالجة أفضل للأخطاء
  useEffect(() => {
    const fetchImage = async () => {
      if (!post?.featuredImage) {
        setImageSrc(null);
        return;
      }

      try {
        setImageError(false);
        const imageName = post.featuredImage.split("/").pop() || "";

        if (!imageName) {
          setImageSrc(null);
          return;
        }

        const response = await fetch(`/api/images/${imageName}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        setImageSrc(objectUrl);
      } catch (err) {
        console.error("Error fetching image:", err);
        setImageError(true);
        setImageSrc(null);
      }
    };

    fetchImage();

    // تنظيف URL الكائن عند إلغاء التحميل
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [post?.featuredImage]); // إضافة dependency أفضل

  // Generate appropriate image alt text
  const getImageAlt = () => {
    if (localizedData.imageAlt) {
      return localizedData.imageAlt;
    }
    return `${t.fallbackImageAlt} ${localizedData.title}`;
  };

  // معالجة حالة التحميل
  if (blogsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  // معالجة حالة الخطأ
  if (blogsError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{t.error}</p>
          <p className="text-gray-600">{blogsError}</p>
        </div>
      </div>
    );
  }

  // التحقق من وجود المقال
  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-600">{t.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* رأس المقال مع البيانات الوصفية */}
        <BlogPostHeader
          category={localizedData.category}
          title={localizedData.title}
          excerpt={localizedData.excerpt}
          date={post.publishedAt}
          author={localizedData.author}
          readTime={readTime}
          isRTL={isRTL}
          lang={lang}
        />

        {/* محتوى المقال */}
        <article className="container mx-auto px-4 py-12">
          {/* الصورة المميزة مع معالجة أفضل للأخطاء */}
          {imageSrc && !imageError && (
            <div className="mb-8 w-full sm:w-[80%] items-center mx-auto">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
                <OptimizedImage
                  src={imageSrc}
                  alt={getImageAlt()}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 66vw"
                  className="object-cover"
                  loading="lazy"
                  onError={() => setImageError(true)}
                />
              </div>
            </div>
          )}

          {/* عرض رسالة إذا فشل تحميل الصورة */}
          {imageError && post.featuredImage && (
            <div className="mb-8 w-full sm:w-[80%] items-center mx-auto">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-sm">
                  {lang === "ar"
                    ? "فشل في تحميل الصورة"
                    : "Failed to load image"}
                </p>
              </div>
            </div>
          )}

          <div className="w-full sm:w-[80%] mx-auto">
            <BlogPostContent
              content={localizedData.content || ""}
              isRTL={isRTL}
              lang={lang}
            />
          </div>

          {/* الوسوم */}
          {localizedData.tags && localizedData.tags.length > 0 && (
            <BlogPostTags tags={localizedData.tags} isRTL={isRTL} lang={lang} />
          )}

          {/* السيرة الذاتية للمؤلف */}
          {localizedData.author && (
            <BlogPostAuthor
              author={localizedData.author}
              isRTL={isRTL}
              lang={lang}
            />
          )}
        </article>

        {/* قسم النشرة الإخبارية */}
        <NewsletterSection isRTL={isRTL} lang={lang} />
      </main>
    </div>
  );
}
