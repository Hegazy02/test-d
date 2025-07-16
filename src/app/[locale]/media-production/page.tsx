import type { Metadata } from "next";
import { getWebsiteData, initializeWebsiteData } from "@/lib/getWebsiteData";
import MediaProductionClientWrapper from "@/components/media-production/MediaProductionClientWrapper";

initializeWebsiteData();

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === "ar";

  const page = await getWebsiteData("media production");

  // Default values based on locale
  const defaultTitle = isRTL
    ? "درب للإنتاج - الإنتاج الإعلامي وإدارة الفعاليات"
    : "Darb Productions - Media Production & Event Management";

  const defaultDescription = isRTL
    ? "درب للإنتاج تساعد العلامات التجارية على الحياة من خلال خدمات الإنتاج الإعلامي وإدارة الفعاليات والطباعة وإنتاج الأجنحة."
    : "Darb Productions helps brands come to life through media production, event management, printing, and booth production services.";

  const defaultKeywords = isRTL
    ? "إنتاج إعلامي، إدارة فعاليات، طباعة، إنتاج أجنحة، السعودية، الإمارات"
    : "media production, event management, printing, booth production, Saudi Arabia, UAE";

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
      url: `https://www.darbproductions.com${locale=="ar"?"/ar":""}/media-production`,
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
      canonical: `https://www.darbproductions.com${locale=="ar"?"/ar":""}/media-production`,
      languages: {
        en: "https://www.darbproductions.com/media-production",
        ar: "https://www.darbproductions.com/ar/media-production",
      },
    },
  };
}

export default function MediaProductionPage() {
  return <MediaProductionClientWrapper />;
}
