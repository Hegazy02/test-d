// src/app/[locale]/contact/page.tsx
import type { Metadata } from "next";
import { getWebsiteData } from "@/lib/getWebsiteData";
import ContactPageClient from "./ContactPageClient";

interface PageProps {
  params: Promise<{ locale: string }>;
}

// generateMetadata للـ Server Component
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isRTL = locale === "ar";

  const page = await getWebsiteData("contact");

  // Default values based on locale
  const defaultTitle = isRTL
    ? "تواصل معنا - درب للإنتاج"
    : "Contact Us - Darb Productions";

  const defaultDescription = isRTL
    ? "تواصل مع درب للإنتاج لخدمات الإنتاج الإعلامي وإدارة الفعاليات والطباعة وإنتاج الأجنحة. تواصل معنا اليوم لمشروعك القادم."
    : "Get in touch with Darb Productions for media production, event management, printing, and booth production services. Contact us today for your next project.";

  const defaultKeywords = isRTL
    ? "تواصل درب للإنتاج، اتصل بنا، تواصل إنتاج إعلامي، تواصل إدارة فعاليات، تواصل خدمات طباعة، تواصل إنتاج أجنحة، السعودية، الإمارات"
    : "contact darb productions, get in touch, media production contact, event management contact, printing services contact, booth production contact, Saudi Arabia, UAE";

  if (!page) {
    return {
      title: defaultTitle,
      description: defaultDescription,
      keywords: defaultKeywords,
    };
  }

  // Use locale-specific metadata
  // استخدام البيانات من قاعدة البيانات
  const title = isRTL
    ? page.metaTitleAr || defaultTitle
    : page.metaTitleEn || defaultTitle;
  const description = isRTL
    ? page.metaDescriptionAr || defaultDescription
    : page.metaDescriptionEn || defaultDescription;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://www.darbproductions.com${locale=="ar"?"/ar":""}/contact-us`,
      siteName: "Darb Productions",
      images: [
        {
          url: "https://www.darbproductions.com/images/contact/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isRTL ? "تواصل مع درب للإنتاج" : "Contact Darb Productions",
        },
      ],
      locale: isRTL ? "ar_SA" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://www.darbproductions.com/images/contact/twitter-image.jpg"],
    },
    alternates: {
      canonical: `https://www.darbproductions.com${locale=="ar"?"/ar":""}/contact-us`,
      languages: {
        en: "https://www.darbproductions.com/contact-us",
        ar: "https://www.darbproductions.com/ar/contact-us",
      },
    },
  };
}

// Server Component الرئيسي
export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;

  return <ContactPageClient locale={locale} />;
}
