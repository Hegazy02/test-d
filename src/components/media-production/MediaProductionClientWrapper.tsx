// src/components/media-production/MediaProductionClientWrapper.tsx
"use client";
// import HeroSection from "@/components/darbprint/header";
// import ResultsSection from "@/components/media-production/results-section";
import OurServices from "@/components/darbprint/OurServices";
import YourMediaProductionPartner from "@/components/media-production/YourMediaProduction";
import ClientsSection from "@/components/homepage/clients-section";
import DynamicHeroSection from "@/components/shared/DynamicHeroSection";
import dynamic from "next/dynamic";
import { useMediaProductionData } from "@/data/media-production-data";
import { Results } from "@/components/shared/results";

const WhenYouWorkwith = dynamic(
  () => import("@/components/darbprint/OurOnlineStore"),
  { ssr: true },
);
import SectionDivider from "@/components/shared/SectionDivider";

const WhyDarbProductions = dynamic(
  () => import("@/components/darbprint/WhyDarbProductions"),
  { ssr: true },
);

export default function MediaProductionClientWrapper() {
  const { translations } = useMediaProductionData();

  const heroSectionDATA = {
    backgroundImages: {
      mobile: "/images/media-production/header/hero.webp",
      desktop: "/images/media-production/header/hero.webp",
      sharpen: "/images/homepage/header/sharpen.png",
    },
    services: [
      {
        id: "booth-production",
        title: "BOOTH PRODUCTION",
        titleAr: "إنتاج الأجنحة",
        image: "/images/Results/new/AlbidiaBan.jpeg",
        imageAr: "/images/Results/new/AlbidiaBan.jpeg",
        video: "1048992921",
        link: "/booth-production",
        bgPosition: "center",
      },
      {
        id: "events-management",
        title: "EVENTS MANAGEMENT",
        titleAr: "إدارة الفعاليات",
        image: "/images/Results/Tadawul.jpg",
        imageAr: "/images/Results/Tadawul.jpg",
        video: "1048992771",
        link: "/events-management",
        bgPosition: "center",
      },
      {
        id: "printin1g",
        title: "PRINTI2NG",
        titleAr: "الط2باعة",
        image: "/images/Results/new/TheaterandPerformingArtsCommission.jpg",
        imageAr: "/images/Results/new/TheaterandPerformingArtsCommission.jpg",
        video: "587933499",
        link: "/printing",
        bgPosition: "center",
      },
      {
        id: "printing",
        title: "PRINTING",
        titleAr: "الطباعة",
        image: "/images/media-production/header/heroservices/new/4.webp",
        imageAr: "/images/media-production/header/heroservices/new/4.webp",
        video: "1097135253",
        link: "/printing",
        bgPosition: "center",
      },
    ],

    movingServices: {
      en: ["FRESH FOOD", "GREAT TASTE", "FAST SERVICE", "QUALITY INGREDIENTS"],
      ar: ["طعام طازج", "طعم رائع", "خدمة سريعة", "مكونات عالية الجودة"],
    },

    translations: {
      stats: {
        years: { en: "14+ Years", ar: "14+ سنة" },
        clients: { en: "500+ Clients Served", ar: "+500 عميل تم خدمتهم" },
      },
      hero: {
        title: { en: "Media Production", ar: "الإنتاج الإعلامي" },
        subtitle: {
          en: "Darb Productions offers full-spectrum media services — from interviews and documentaries to podcasts, advertising, and photography.<br> We turn your ideas into compelling visual stories that bring your brand to life.<br> We craft narratives, capture moments, and elevate your media presence with impact.",
          ar: "تقدم درب برودكشنز خدمات إعلامية متكاملة — من المقابلات والأفلام الوثائقية إلى البودكاست، والإعلانات، والتصوير الفوتوغرافي.<br> نحوّل أفكارك إلى قصص بصرية جذابة تُجسّد علامتك التجارية.<br> نُبدع السرد، نلتقط اللحظات، ونرفع حضورك الإعلامي بأثرٍ قوي ومؤثر.",
        },
        callButton: { en: "CALL US", ar: "اتصل بنا" },
        infoButton: { en: "MORE INFO", ar: "للمزيد من المعلومات " },
      },
    },

    buttonLinks: {
      contact: "/order",
      about: "/menu",
    },

    animationSettings: {
      textChangeInterval: 2500,
      autoSlideInterval: 3500,
      swipeThreshold: 40,
    },

    layoutSettings: {
      showMovingServices: false,
      desktopServicesAsSlider: true,
      showSidebar: true,
      showStats: true,
      changeBackgroundPhotoAuto: true,
      showButtons: true,
      mobileHeight: "95vh",
      desktopHeight: "100vh",
    },

    customStyles: {
      title: "text-white",
      subtitle: "text-orange-200",
      movingText: "text-red-400",
      titleSize: "text-3xl md:text-7xl",
      subtitleSize: "text-sm md:text-sm",
      servicesCards_White: false,
    },
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* <HeroSection
          title={translations.hero.title}
          desc={translations.hero.desc}
          buttonName={translations.hero.buttonName}
          buttonURL="/contact"
          imageSRC="/images/media-production/header/header (1).webp"
          imageSRC2="/images/media-production/header/header (2).webp"
        /> */}

        <DynamicHeroSection {...heroSectionDATA} />
        <div className="force-ltr">
          <Results />
        </div>
        <SectionDivider />

        <OurServices
          title={translations.services_section.title}
          desc={translations.services_section.desc}
          services={translations.services}
          isDecSeperete={true}
          gridCountDesk={4}
          isPNG={true}
          isMedia={true}
          backgroundColor="#0A2A2A"
        />
        <YourMediaProductionPartner />

        <WhyDarbProductions features={translations.features} />
        <WhenYouWorkwith
          title={translations.services_section.work_with_us.title}
          paragraph={translations.services_section.work_with_us.paragraph}
          paragraph2=""
          buttonNAME={translations.services_section.work_with_us.buttonName}
          ButtonURL="/contact"
          imageSRC="/images/media-production/whenyouwork/base.svg"
        />
        <ClientsSection />
      </main>
    </div>
  );
}
