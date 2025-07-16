// src\app\[locale]\page.tsx
import type { Metadata } from "next";
import HeroSection from "@/components/shared/DynamicHeroSection";
import { Results } from "@/components/shared/results";
import AboutSection from "@/components/homepage/about-section";
import ServicesSection from "@/components/homepage/oldServices-section";
import AdditionalServicesSection from "@/components/homepage/additional-services-section";
import ClientsSection from "@/components/homepage/clients-section";
import NewsSection from "@/components/homepage/news-section";
import BehindTheScenesSection from "@/components/homepage/behind-the-scenes-section";
import { getWebsiteData, initializeWebsiteData } from "@/lib/getWebsiteData";
import { services } from "@/data/servicesData";
import SectionDivider from "@/components/shared/SectionDivider";

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

  const page = await getWebsiteData("home");

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
      url: `"https://www.darbproductions.com"+${locale=="ar"?"/ar":""} `,
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
      canonical: isRTL
        ? "https://www.darbproductions.com/ar"
        : "https://www.darbproductions.com",
      languages: {
        en: "https://www.darbproductions.com",
        ar: "https://www.darbproductions.com/ar",
      },
    },
  };
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <main className="flex-1">
        <HeroSection numbersIsOn={false} isHomepage={true} />

        <div className="force-ltr">
          <Results />
        </div>

        <SectionDivider />
        <AboutSection />

        <SectionDivider />
        <ServicesSection
          title={{
            en: "Our Services",
            ar: "خدماتنا",
          }}
          desc={{
            en: "Comprehensive printing solutions tailored for businesses, events, and government needs.",
            ar: "حلول طباعة شاملة مصممة خصيصاً للشركات والفعاليات واحتياجات القطاع الحكومي.",
          }}
          services={services}
          gridCountDesk={4}
          isDecSeperete={true}
        />

        <SectionDivider />
        <ClientsSection />

        <SectionDivider />
        <NewsSection />

        <SectionDivider />
        <BehindTheScenesSection />
      </main>
    </div>
  );
}
