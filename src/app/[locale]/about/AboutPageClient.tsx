// src/app/[locale]/about/AboutPageClient.tsx
"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import HeroSection from "@/components/about/hero-section";
import AboutSection from "@/components/about/about-section";
import NumberSection from "@/components/about/numbers-section";
import MessageSection from "@/components/about/message-section";
import MissionSection from "@/components/about/mission-section";
// import VisionSection from "@/components/about/vision-section";
// import TeamSection from "@/components/about/team-section";
// import TestimonialsSection from "@/components/about/testimonials-section";
import ErrorBoundary from "@/components/about/error-boundary";
import { useTranslation } from "react-i18next";
import ClientsSection from "@/components/homepage/clients-section";

// Translation data
const translations = {
  en: {
    pageTitle: "About Darb - Creative Production Solutions | Darb Productions",
    clientsSection: {
      title: "Premium Collaborations",
    },
  },
  ar: {
    pageTitle: "عن درب - حلول الإبداع والإنتاج | شركة درب برودكشنز",
    clientsSection: {
      title: "شراكات مميزة",
    },
  },
};

interface AboutPageClientProps {
  locale: string;
  pageData?: any; // يمكنك تحديد نوع البيانات بدقة أكثر
}

// Main page component
function AboutPageContent({ locale, pageData }: AboutPageClientProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language || locale;
  const t = lang === "ar" ? translations.ar : translations.en;

  useEffect(() => {
    // Set page title from database or fallback to default
    const title = pageData
      ? lang === "ar"
        ? pageData.metaTitleAr || t.pageTitle
        : pageData.metaTitleEn || t.pageTitle
      : t.pageTitle;

    document.title = title;
  }, [t.pageTitle, pageData, lang]);

  return (
    <main id="main-content" className="min-h-screen" role="main">
      <ErrorBoundary>
        <HeroSection pageData={pageData} locale={locale} />
      </ErrorBoundary>

      <ErrorBoundary>
        <AboutSection pageData={pageData} locale={locale} />
      </ErrorBoundary>

      <ErrorBoundary>
        <NumberSection pageData={pageData} locale={locale} />
      </ErrorBoundary>

      <ErrorBoundary>
        <MessageSection pageData={pageData} locale={locale} />
      </ErrorBoundary>

      <ErrorBoundary>
        <MissionSection pageData={pageData} locale={locale} />
      </ErrorBoundary>

      {/* <ErrorBoundary>
        <VisionSection pageData={pageData} locale={locale} />
      </ErrorBoundary> */}

      {/* Uncomment when ready */}
      {/* <ErrorBoundary>
        <TeamSection pageData={pageData} locale={locale} />
      </ErrorBoundary> */}

      {/* <ErrorBoundary>
        <TestimonialsSection pageData={pageData} locale={locale} />
      </ErrorBoundary> */}

      <ErrorBoundary>
        <ClientsSection title={t.clientsSection.title} />
      </ErrorBoundary>
    </main>
  );
}

export default function AboutPageClient({
  locale,
  pageData,
}: AboutPageClientProps) {
  return <AboutPageContent locale={locale} pageData={pageData} />;
}
