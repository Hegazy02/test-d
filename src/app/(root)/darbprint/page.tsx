// src\app\[locale]\darbprint\page.tsx
import type { Metadata } from "next";
import { getWebsiteData, initializeWebsiteData } from "@/lib/getWebsiteData";
import DarbPrintClientWrapper from "@/components/darbprint/DarbPrintClientWrapper";

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

  const page = await getWebsiteData("darbprint");
  console.log("Page data for DarbPrint:", page);
  // Default values based on locale
  const defaultTitle = isRTL
    ? "درب للإنتاج - جميع احتياجاتك الطباعية في مكان واحد"
    : "Darb Productions - All Your Printing Needs in One Place";

  const defaultDescription = isRTL
    ? "حلول طباعة متكاملة للشركات والجهات الحكومية — الطباعة الرقمية والهدايا الترويجية والجوائز المخصصة ومواد المعارض."
    : "Full-service printing solutions for corporations and government entities — digital printing, promotional gifts, custom awards, and exhibition materials.";

  const defaultKeywords = isRTL
    ? "خدمات طباعة، طباعة رقمية، هدايا ترويجية، جوائز مخصصة، مواد معارض، بطاقات أعمال، كتيبات، السعودية، الإمارات"
    : "printing services, digital printing, promotional gifts, custom awards, exhibition materials, business cards, brochures, Saudi Arabia, UAE";

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
      url: `https://www.darbproductions.com+${locale=="ar"?"/ar":""}/darbprint`,
      siteName: "Darb Productions",
      images: [
        {
          url: "https://www.darbproductions.com/images/services/darbprint/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isRTL
            ? "درب للإنتاج - خدمات الطباعة"
            : "Darb Productions - Printing Services",
        },
      ],
      locale: isRTL ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "https://www.darbproductions.com/images/services/darbprint/twitter-image.jpg",
      ],
    },
    alternates: {
      canonical: `https://www.darbproductions.com+${locale=="ar"?"/ar":""}/darbprint`,
      languages: {
        en: "https://www.darbproductions.com/darbprint",
        ar: "https://www.darbproductions.com/ar/darbprint",
      },
    },
  };
}

export default function DarbPrintPage() {
  return <DarbPrintClientWrapper />;
}
