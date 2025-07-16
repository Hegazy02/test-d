// src/app/[locale]/about/page.tsx
import type { Metadata } from "next";
import { getWebsiteData } from "@/lib/getWebsiteData";
import AboutPageClient from "./AboutPageClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// generateMetadata للـ Server Component
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === "ar";
  const page = await getWebsiteData("about");

  // Default values based on locale
  const defaultTitle = isRTL
    ? "عن درب - حلول الإبداع والإنتاج | شركة درب برودكشنز"
    : "About Darb - Creative Production Solutions | Darb Productions";

  const defaultDescription = isRTL
    ? "تعرف على شركة درب للإنتاج الإعلامي وإدارة الفعاليات والطباعة وإنتاج الأجنحة. رؤيتنا ورسالتنا وفريق العمل المتميز."
    : "Learn about Darb Productions - your partner for media production, event management, printing, and booth production. Our vision, mission, and exceptional team.";

  const defaultKeywords = isRTL
    ? "عن درب للإنتاج، شركة درب، رؤية درب، رسالة درب، فريق درب، إنتاج إعلامي، إدارة فعاليات، طباعة، إنتاج أجنحة، السعودية، الإمارات"
    : "about darb productions, darb company, darb vision, darb mission, darb team, media production, event management, printing, booth production, Saudi Arabia, UAE";

  if (!page) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      keywords: defaultKeywords,
    };
  }

  // Use locale-specific metadata from database
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
      url: `"https://www.darbproductions.com"+${locale=="ar"?"/ar":""}/about`,
      siteName: "Darb Productions",
      images: [
        {
          url: "https://www.darbproductions.com/images/about/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isRTL ? "عن شركة درب للإنتاج" : "About Darb Productions",
        },
      ],
      locale: isRTL ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.darbproductions.com/images/about/twitter-image.jpg"],
    },
    alternates: {
      canonical: isRTL
        ? "https://www.darbproductions.com/ar/about"
        : "https://www.darbproductions.com/about",
      languages: {
        en: "https://www.darbproductions.com/about",
        ar: "https://www.darbproductions.com/ar/about",
      },
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Server Component
export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  const page = await getWebsiteData("about");

  return <AboutPageClient locale={locale} pageData={page} />;
}
