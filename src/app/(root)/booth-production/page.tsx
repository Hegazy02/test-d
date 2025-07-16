import type { Metadata } from "next";
import { getWebsiteData, initializeWebsiteData } from "@/lib/getWebsiteData";
import BoothProductionClientWrapper from "@/components/booth-production/BoothProductionClientWrapper";

// Initialize website data at build time
initializeWebsiteData();

export async function generateMetadata(): Promise<Metadata> {
  
  const page = await getWebsiteData("booth production");
  if (!page) {
    return {
      title: "Darb Productions - Exhibition Booth Design & Production",
      description:
        "We design and build custom exhibition booths that help your brand stand out at trade shows, conferences, and corporate events in Saudi Arabia and UAE.",
    };
  }
  return {
    title:
      "Darb Productions - Exhibition Booth Design & Production",
    description:
      "We design and build custom exhibition booths that help your brand stand out at trade shows, conferences, and corporate events in Saudi Arabia and UAE.",
    keywords:
      "exhibition booth design, booth production, trade show displays, event booths, custom booths, Saudi Arabia, UAE, exhibition stands",
    openGraph: {
      title:
        "Darb Productions - Exhibition Booth Design & Production",
      description:
        "We design and build custom exhibition booths that help your brand stand out at trade shows, conferences, and corporate events in Saudi Arabia and UAE.",
      url: "https://www.darbproductions.com/booth-production",
      siteName: "Darb Productions",
      images: [
        {
          url: "https://www.darbproductions.com/images/booth-production/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Darb Productions - Exhibition Booth Design & Production",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Darb Productions - Exhibition Booth Design & Production",
      description:
        "We design and build custom exhibition booths that help your brand stand out at trade shows, conferences, and corporate events in Saudi Arabia and UAE.",
      images: [
        "https://www.darbproductions.com/images/booth-production/twitter-image.jpg",
      ],
    },
    alternates: {
      canonical: "https://www.darbproductions.com/booth-production",
      languages: {
        en: "https://www.darbproductions.com/booth-production",
        ar: "https://www.darbproductions.com/ar/booth-production",
      },
    },
  };
}

export default function BoothProductionPage() {
  return <BoothProductionClientWrapper />;
}
