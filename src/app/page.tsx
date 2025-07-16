// src/app/page.tsx - Root page that works without locale prefix
import type { Metadata } from "next";
import HeroSection from "@/components/shared/DynamicHeroSection";
import { Results } from "@/components/shared/results";
import AboutSection from "@/components/homepage/about-section";
import ClientsSection from "@/components/homepage/clients-section";
import NewsSection from "@/components/homepage/news-section";
import BehindTheScenesSection from "@/components/homepage/behind-the-scenes-section";
import { getWebsiteData, initializeWebsiteData } from "@/lib/getWebsiteData";
import SectionDivider from "@/components/shared/SectionDivider";
import ClientLayout from "./[locale]/ClientLayout";

// Initialize website data at build time
initializeWebsiteData();

export async function generateMetadata(): Promise<Metadata> {
  const page = await getWebsiteData("home");
  
  const defaultTitle = "Darb Productions - Media Production & Event Management";
  const defaultDescription =
    "Darb Productions helps brands come to life through media production, event management, printing, and booth production services.";
  const defaultKeywords =
    "media production, event management, printing, booth production, Saudi Arabia, UAE";

  if (!page) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      keywords: defaultKeywords,
    };
  }

  const title = page.metaTitleEn || defaultTitle;
  const description = page.metaDescriptionEn || defaultDescription;

  return {
    title,
    description,
    keywords: defaultKeywords,
    openGraph: {
      title,
      description,
      url: "https://www.darbproductions.com",
      siteName: "Darb Productions",
      images: [
        {
          url: "https://www.darbproductions.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Darb Productions",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.darbproductions.com/twitter-image.jpg"],
    },
    alternates: {
      canonical: "https://www.darbproductions.com",
      languages: {
        en: "https://www.darbproductions.com",
        ar: "https://www.darbproductions.com/ar",
      },
    },
  };
}

export default function RootHome() {
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
        <ClientsSection />

        <SectionDivider />
        <NewsSection />

        <SectionDivider />
        <BehindTheScenesSection />
      </main>
    </div>
  );
}
