import type { Metadata } from "next";
import { getWebsiteData } from "@/lib/getWebsiteData";
import BlogContent from "@/components/blog/latest-blogs/blog-content";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === "ar";

  const page = await getWebsiteData("latest blogs");

  // Default values based on locale
  const defaultTitle = isRTL
    ? "أحدث المقالات - درب للإنتاج"
    : "Latest Articles - Darb Productions";

  const defaultDescription = isRTL
    ? "ابق على اطلاع بأحدث رؤانا وقصصنا من عالم الإنتاج الإعلامي"
    : "Stay updated with our latest insights and stories from the world of media production";

  const defaultKeywords = isRTL
    ? "مقالات، مدونة، إنتاج إعلامي، إدارة فعاليات، طباعة، إنتاج أجنحة، السعودية، الإمارات"
    : "articles, blog, media production, event management, printing, booth production, Saudi Arabia, UAE";

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
      url: `https://www.darbproductions.com${locale=="ar"?"/ar":""}/blog`,
      siteName: "Darb Productions",
      images: [
        {
          url: "https://www.darbproductions.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isRTL ? "درب للإنتاج" : "Darb Productions",
        },
      ],
      locale: isRTL ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.darbproductions.com/twitter-image.jpg"],
    },
    alternates: {
      canonical: `https://www.darbproductions.com${locale=="ar"?"/ar":""}/blog`,
      languages: {
        en: "https://www.darbproductions.com/blog",
        ar: "https://www.darbproductions.com/ar/blog",
      },
    },
  };
}

export default async function LatestArticlesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <BlogContent />
      </main>
    </div>
  );
}
