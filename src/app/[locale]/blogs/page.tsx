// src\app\[locale]\blog\page.tsx
import type { Metadata } from "next";
import { getWebsiteData } from "@/lib/getWebsiteData";
import BlogHero from "@/components/blog/blog-hero";
import FeaturedPosts from "@/components/blog/featured-posts";
import BlogCategories from "@/components/blog/blog-categories";
import BlogContent from "@/components/blog/blog-content";
import NewsletterSection from "@/components/blog/newsletter-section";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === "ar";

  const page = await getWebsiteData(1);

  // Default values based on locale
  const defaultTitle = isRTL
    ? "المدونة - درب للإنتاج"
    : "Blog - Darb Productions";

  const defaultDescription = isRTL
    ? "اكتشف أحدث المقالات والأخبار من عالم الإنتاج الإعلامي وإدارة الفعاليات والطباعة وإنتاج الأجنحة."
    : "Discover the latest articles and insights from the world of media production, event management, printing, and booth production.";

  const defaultKeywords = isRTL
    ? "مدونة، مقالات، أخبار، إنتاج إعلامي، إدارة فعاليات، طباعة، إنتاج أجنحة، السعودية، الإمارات"
    : "blog, articles, news, media production, event management, printing, booth production, Saudi Arabia, UAE";

  if (!page) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      keywords: defaultKeywords,
    };
  }

  // Use locale-specific metadata
  const title = isRTL
    ? page.metaTitleAr || defaultTitle
    : page.metaTitleEn || defaultTitle;
  const description = isRTL
    ? page.metaDescriptionAr || defaultDescription
    : page.metaDescriptionEn || defaultDescription;

  return {
    title,
    description,
    keywords: defaultKeywords,
    openGraph: {
      title,
      description,
      url: `https://www.darbproductions.com+${locale=="ar"?"/ar":""}/blog`,
      siteName: "Darb Productions",
      images: [
        {
          url: "https://www.darbproductions.com/images/blog/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isRTL ? "مدونة درب للإنتاج" : "Darb Productions Blog",
        },
      ],
      locale: isRTL ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.darbproductions.com/images/blog/twitter-image.jpg"],
    },
    alternates: {
      canonical: `https://www.darbproductions.com+${locale=="ar"?"/ar":""}/blog`,
      languages: {
        en: "https://www.darbproductions.com/blog",
        ar: "https://www.darbproductions.com/ar/blog",
      },
    },
  };
}

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Blog Hero Section */}
        <BlogHero />

        {/* Featured Posts Section */}
        <FeaturedPosts />

        {/* Blog Categories */}
        <BlogCategories />

        {/* Blog Content (Client Component) */}
        <BlogContent />

        <div id="newsletter">
          <NewsletterSection />
        </div>
      </main>
    </div>
  );
}
