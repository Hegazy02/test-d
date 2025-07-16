// src\app\[locale]\events-management\page.tsx
import type { Metadata } from "next";
import { getWebsiteData, initializeWebsiteData } from "@/lib/getWebsiteData";
import EventsWrapper from "@/components/events-management/EventsWrapper";

// Initialize website data at build time
initializeWebsiteData();

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === "ar";

  const page = await getWebsiteData("events management");

  // Default values based on locale
  const defaultTitle = isRTL
    ? "درب للإنتاج - إدارة الفعاليات والمؤتمرات"
    : "Darb Productions - Event Management & Conferences";

  const defaultDescription = isRTL
    ? "درب للإنتاج تقدم خدمات إدارة الفعاليات والمؤتمرات المتكاملة مع أعلى معايير الجودة والاحترافية في السعودية والإمارات."
    : "Darb Productions offers comprehensive event management and conference services with the highest standards of quality and professionalism in Saudi Arabia and UAE.";

  const defaultKeywords = isRTL
    ? "إدارة فعاليات، تنظيم مؤتمرات، إدارة أحداث، فعاليات الشركات، مؤتمرات، السعودية، الإمارات"
    : "event management, conference organization, corporate events, event planning, conferences, Saudi Arabia, UAE";

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
      url: `https://www.darbproductions.com${locale=="ar"?"/ar":""}/events-management`,
      siteName: "Darb Productions",
      images: [
        {
          url: "https://www.darbproductions.com/images/events/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isRTL
            ? "درب للإنتاج - إدارة الفعاليات"
            : "Darb Productions - Event Management",
        },
      ],
      locale: isRTL ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.darbproductions.com/images/events/twitter-image.jpg"],
    },
    alternates: {
      canonical: `https://www.darbproductions.com${locale=="ar"?"/ar":""}/events-management`,
      languages: {
        en: "https://www.darbproductions.com/events-management",
        ar: "https://www.darbproductions.com/ar/events-management",
      },
    },
  };
}

export default function EventsManagementPage() {
  return <EventsWrapper />;
}
