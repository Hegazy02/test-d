"use client";
import HeroSection from "@/components/darbprint/header";
import ClientsSection from "@/components/homepage/clients-section";
import dynamic from "next/dynamic";
import OurServices from "@/components/homepage/services-section";
import { TestimonialSlider } from "@/components/shared/testimonial-slider";
import { useTranslation } from "react-i18next";
import DynamicHeroSection from "@/components/shared/DynamicHeroSection";
import SectionDivider from "@/components/shared/SectionDivider";

const LookingtoHost = dynamic(
  () => import("@/components/darbprint/OurOnlineStore"),
  { ssr: true }
);
const WhyDarbProductions = dynamic(
  () => import("@/components/darbprint/WhyDarbProductions"),
  { ssr: true }
);
const Contactus = dynamic(() => import("@/components/darbprint/Contactus"), {
  ssr: true,
});

const translations = {
  en: {
    hero: {
      title: "Exhibition Booth Design & Production",
      desc: "We design and build custom exhibition booths that help your brand stand out — whether at trade shows, conferences, or corporate events. From concept and 3D design to fabrication, logistics, and on-site installation, we handle every detail to ensure a seamless, high-impact presence.",
      buttonName: "Contact us",
    },
    testimonials: [
      {
        id: 1,
        name: "Samy Mostafa",
        company: "Hustle Ninjas",
        logo: "/images/events-management/case/1.png",
        quote:
          "\"I don't have to invest the money I can't lose into my business. With Printify, I only pay the fulfillment fees, and the rest is all profit.\"",
        second_image: "/images/booth-production/case/1.webp",
      },
      {
        id: 2,
        name: "Rich Khun",
        company: "Hustle Ninjas",
        logo: "/images/events-management/case/2.png",
        quote:
          '"I really appreciate working with Printify on my brand. Afro Unicorn was only supposed to be my design on a white shirt. It is so much more. Printify allows me the time to run the business and not work in the business."',
        second_image: "/images/booth-production/case/2.webp",
      },
      {
        id: 3,
        name: "Rich Khun",
        company: "Hustle Ninjas",
        logo: "/images/events-management/case/3.png",
        quote:
          '"Printify helped me start a completely hands-off revenue stream. When you spot a niche that you want to enter quickly, you don\'t have to worry about buying stock or equipment."',
        second_image: "/images/booth-production/case/3.webp",
      },
    ],
    lookingToHost: {
      title: "Custom Exhibition Booths — High Impact, Smart Budget",
      paragraph:
        "You don't have to overspend to stand out. We design and build professional, eye-catching booths that reflect your brand and attract attention — all while keeping your budget in mind.",
      paragraph2:
        "From concept to on-site installation, we deliver efficient, cost-effective booth solutions across Saudi Arabia and the UAE.",
      buttonName: "Contact us",
    },
    features: [
      {
        title: "Deadlines Matter. We Deliver On Time.",
        description:
          "We know exhibitions and events don't wait — we deliver on time, every time, with no excuses.",
        altText: "Deadlines Matter icon",
      },
      {
        title: "Smart Designs with Real Impact",
        description:
          "Our booths are designed to attract attention and support smooth visitor flow on-site.",
        altText: "Smart Designs icon",
      },
      {
        title: "Transparent Pricing. No Surprises.",
        description:
          "Clear, detailed quotations from day one — so you stay in control of your budget.",
        altText: "Transparent Pricing icon",
      },
      {
        title: "Full Support, Start to Finish",
        description:
          "From design consultations to on-site assembly, we stay with you every step of the way.",
        altText: "Full Support icon",
      },
      {
        title: "Local Knowledge. Regional Reach.",
        description:
          "Experienced in Saudi & UAE venues — we navigate logistics, permits, and venue rules with ease.",
        altText: "Local Knowledge icon",
      },
      {
        title: "Stand Out in a Sea of Booths",
        description:
          "We design booths that grab attention, invite engagement, and make your brand impossible to ignore.",
        altText: "Stand Out in Booths icon",
      },
    ],
    ourProcess: {
      title: "Our Booth Production Process",
      desc: "From idea to execution, we handle every detail in-house to ensure a smooth, on-time delivery. Our process is built for reliability, efficiency, and results that make your brand stand out.",
    },
    processSteps: [
      {
        id: "initial-brief-requirements",
        title: "Initial Brief & Requirements",
        description:
          "We align with your objectives, brand guidelines, and event specifications.",
        alt: "Initial Brief & Requirements Service",
        image: "/images/booth-production/ourBooth/light/1.webp",
        imageLight: "/images/booth-production/ourBooth/light/1.webp",
        imageDark: "/images/booth-production/ourBooth/dark/1.webp",
      },
      {
        id: "concept-design-visualization",
        title: "Concept Design & 3D Visualization",
        description:
          "We develop creative layouts and realistic 3D renderings for review and approval.",
        alt: "Concept Design & 3D Visualization Service",
        image: "/images/booth-production/ourBooth/light/2.webp",
        imageLight: "/images/booth-production/ourBooth/light/2.webp",
        imageDark: "/images/booth-production/ourBooth/dark/2.webp",
      },
      {
        id: "material-selection-costing",
        title: "Material Selection & Costing",
        description:
          "We propose materials that balance aesthetics, durability, and budget.",
        alt: "Material Selection & Costing Service",
        image: "/images/booth-production/ourBooth/light/3.webp",
        imageLight: "/images/booth-production/ourBooth/light/3.webp",
        imageDark: "/images/booth-production/ourBooth/dark/3.webp",
      },
      {
        id: "booth-production-installation",
        title: "Booth Production & Installation",
        description:
          "We build your booth in-house with full quality control, then handle transport and on-site setup — ready for your event.",
        alt: "Booth Production & Installation Service",
        image: "/images/booth-production/ourBooth/light/4.webp",
        imageLight: "/images/booth-production/ourBooth/light/4.webp",
        imageDark: "/images/booth-production/ourBooth/dark/4.webp",
      },
      {
        id: "handover-on-site-support",
        title: "Handover & On-Site Support",
        description:
          "Final delivery, setup verification, and dedicated assistance throughout the event.",
        alt: "Handover & On-Site Support Service",
        image: "/images/booth-production/ourBooth/light/5.webp",
        imageLight: "/images/booth-production/ourBooth/light/5.webp",
        imageDark: "/images/booth-production/ourBooth/dark/5.webp",
      },
    ],
  },
  ar: {
    hero: {
      title: "تصميم وإنتاج أجنحة المعارض",
      desc: "نصمم ونبني أجنحة معارض مخصصة تساعد علامتك التجارية على التميز — سواء في المعارض التجارية أو المؤتمرات أو تجهيز الفعاليات. من التصور والتصميم ثلاثي الأبعاد إلى التصنيع واللوجستيات والتركيب في الموقع، نتعامل مع كل التفاصيل لضمان حضور سلس وعالي التأثير.",
      buttonName: "تواصل معنا",
    },
    testimonials: [
      {
        id: 1,
        name: "سامي مصطفى",
        company: "هاسل نينجاز",
        quote:
          '"لا يتعين علي استثمار الأموال التي لا أستطيع خسارتها في عملي. مع برينتيفاي، أدفع فقط رسوم التنفيذ، والباقي كله ربح."',
        second_image: "/images/booth-production/case/1.webp",
        logo: "/images/booth-production/case/stc.png",
      },
      {
        id: 2,
        name: "ريتش خون",
        company: "هاسل نينجاز",
        quote:
          '"أقدر حقاً العمل مع برينتيفاي على علامتي التجارية. كان من المفترض أن يكون أفرو يونيكورن مجرد تصميمي على قميص أبيض. إنه أكثر من ذلك بكثير. يتيح لي برينتيفاي الوقت لإدارة الأعمال وليس العمل في الأعمال."',
        second_image: "/images/booth-production/case/2.webp",
        logo: "/images/booth-production/case/هيئة السعودية للفضاء.png",
      },
      {
        id: 3,
        name: "ريتش خون",
        company: "هاسل نينجاز",
        quote:
          '"ساعدني برينتيفاي في بدء مصدر دخل بدون تدخل تماماً. عندما تكتشف مجالاً تريد دخوله بسرعة، لا داعي للقلق بشأن شراء المخزون أو المعدات."',
        second_image: "/images/booth-production/case/3.webp",
        logo: "/images/booth-production/case/ACWA_Power_logo-white 1.png",
      },
    ],
    lookingToHost: {
      title: "اجنحة معارض مخصصة — تأثير قوي وميزانية مناسبة",
      paragraph: "لا تحتاج لإنفاق مبالغ كبيرة لتبرز.",
      paragraph2:
        " نصمم ونبني بوثات احترافية وجذابة تعكس علامتك التجارية وتجذب الانتباه — مع مراعاة ميزانيتك.",
      paragraph3:
        " من الفكرة وحتى التركيب في الموقع، نقدم حلول اجنحة معارض فعالة ومناسبة التكلفة في السعودية والإمارات.",
      buttonName: "تواصل معنا",
    },
    features: [
      {
        title: "المواعيد مهمة. نلتزم بالتسليم في الوقت  المحدد",
        description:
          "نعلم أن المعارض والفعاليات لا تنتظر — نلتزم بالتسليم في الوقت المحدد دائمًا، بلا أعذار",
        altText: "أيقونة المواعيد النهائية مهمة",
      },
      {
        title: "تصاميم ذكية بتأثير حقيقي",
        description:
          "تصاميم أجنحتنا تهدف لجذب الانتباه ودعم سير الزوار بسلاسة في الموقع",
        altText: "أيقونة التصاميم الذكية",
      },
      {
        title: "أسعار واضحة، بلا مفاجآت",
        description:
          "عروض أسعار واضحة ومفصلة من اليوم الأول — لتبقى متحكمًا في ميزانيتك",
        altText: "أيقونة التسعير الشفاف",
      },
      {
        title: "دعم كامل من البداية حتى النهاية",
        description:
          "من استشارات التصميم إلى التركيب في الموقع، نحن معكم في كل مرحلة من مراحل التنفيذ",
        altText: "أيقونة الدعم الكامل",
      },
      {
        title: "خبرة محلية، وانتشار إقليمي",
        description:
          "بخبرتنا في مواقع المعارض بالسعودية والإمارات، ندير الإجراءات اللوجستية والتصاريح والمتطلبات الجهات المنظمة",
        altText: "أيقونة المعرفة المحلية",
      },
      {
        title: "تميّز في وسط منافسة  المعارض",
        description:
          "نصمم أجنحة تجذب الانتباه، وتشجع التفاعل، وتجعل من علامتك التجارية محط الأنظار",
        altText: "أيقونة التميز في الأجنحة",
      },
    ],
    ourProcess: {
      title: "آلية تنفيذ اجنحة المعارض لدينا",
      desc: "من الفكرة إلى التنفيذ، نتولى جميع التفاصيل داخليًا لضمان تسليم سلس وفي الوقت المحدد.  تم تصميم آلية عملنا لتضمن الكفاءة، والموثوقية، ونتائج تبرز علامتك التجارية",
    },
    processSteps: [
      {
        id: "initial-brief-requirements",
        title: "الملخص والمتطلبات الأولية",
        description:
          "نتوافق مع أهدافكم، وإرشادات علامتكم التجارية، ومتطلبات الفعالية",
        alt: "خدمة الملخص والمتطلبات الأولية",
        imageLight: "/images/booth-production/ourBooth/light/1.webp",
        imageDark: "/images/booth-production/ourBooth/dark/1.webp",
      },
      {
        id: "concept-design-visualization",
        title: "تصميم الفكرة والتصوير الثلاثي الأبعاد",
        description:
          "نقوم بتطوير تصاميم إبداعية وعروض ثلاثية الأبعاد واقعية للمراجعة والموافقة",
        alt: "خدمة تصميم الفكرة والتصوير الثلاثي الأبعاد",
        image: "/images/booth-production/ourBooth/light/2.webp",
        imageLight: "/images/booth-production/ourBooth/light/2.webp",
        imageDark: "/images/booth-production/ourBooth/dark/2.webp",
      },
      {
        id: "material-selection-costing",
        title: "تحديد المواد والتكلفة",
        description: "نقترح مواد تجمع بين الجمال والمتانة والميزانية",
        alt: "خدمة تحديد المواد والتكلفة",
        image: "/images/booth-production/ourBooth/light/3.webp",
        imageLight: "/images/booth-production/ourBooth/light/3.webp",
        imageDark: "/images/booth-production/ourBooth/dark/3.webp",
      },
      {
        id: "booth-production-installation",
        title: "إنتاج وتركيب اجنحة المعارض",
        description:
          "نقوم ببناء جناحك داخليًا مع مراقبة كاملة للجودة، ثم نتولى النقل والتركيب في الموقع – جاهز لفعاليتك",
        alt: "خدمة إنتاج وتركيب اجنحة المعارض",
        image: "/images/booth-production/ourBooth/light/4.webp",
        imageLight: "/images/booth-production/ourBooth/light/4.webp",
        imageDark: "/images/booth-production/ourBooth/dark/4.webp",
      },
      {
        id: "handover-on-site-support",
        title: "التسليم والدعم في الموقع",
        description:
          "فك جناح المعرض، تسليم المحتوى، ومراجعة الأداء بعد الفعالية",
        alt: "خدمة التسليم والدعم في الموقع",
        image: "/images/booth-production/ourBooth/light/5.webp",
        imageLight: "/images/booth-production/ourBooth/light/5.webp",
        imageDark: "/images/booth-production/ourBooth/dark/5.webp",
      },
    ],
  },
};

export default function BoothProductionClientWrapper() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const t = lang === "ar" ? translations.ar : translations.en;

  // Prepare testimonials with translations
  const testimonialsData = t.testimonials.map((testimonial, index) => ({
    ...testimonial,
    color: ["bg-emerald-200", "bg-amber-100", "bg-purple-100"][index],
    textColor: ["text-emerald-800", "text-amber-800", "text-purple-800"][index],
  }));

  // Prepare features with translations
  const featuresData = t.features.map((feature, index) => ({
    iconSrc: `/images/booth-production/whyDarb/${index + 1}.svg`,
    ...feature,
  }));

  // Modify the processStepsData preparation
  const processStepsData = t.processSteps.map((step) => ({
    id: step.id,
    image: step.image, // Default image
    imageLight: step.imageLight, // Optional light mode specific image
    imageDark: step.imageDark, // Optional dark mode specific image
    alt: {
      en: step.alt,
      ar: step.alt,
    },
    title: {
      en: step.title,
      ar: step.title,
    },
    description: {
      en: step.description,
      ar: step.description,
    },
  }));

  const heroSectionDATA = {
    backgroundImages: {
      mobile: "/images/booth-production/header/hero.webp",
      desktop: "/images/booth-production/header/hero.webp",
      sharpen: "/images/homepage/header/sharpen.png",
    },
    services: [
      {
        id: "printing",
        title: "PRINTING",
        titleAr: "الطباعة",
        image: "/images/booth-production/header/services/1.webp",
        imageAr: "/images/booth-production/header/services/1.webp",
        video: "379442806",
        link: "/printing",
        bgPosition: "center",
      },
      {
        id: "booth-production",
        title: "BOOTH PRODUCTION",
        titleAr: "إنتاج الأجنحة",

        image: "/images/booth-production/header/services/2.webp",
        imageAr: "/images/booth-production/header/services/2.webp",
        link: "/booth-production",
        bgPosition: "center",
      },
      {
        id: "events-management",
        title: "EVENTS MANAGEMENT",
        titleAr: "إدارة الفعاليات",
        image: "/images/booth-production/header/services/3.webp",
        imageAr: "/images/booth-production/header/services/3.webp",
        link: "/events-management",
        bgPosition: "center",
      },
      {
        id: "catering",
        title: "CATERING",
        titleAr: "التموين",
        image: "/images/booth-production/header/services/4.webp",
        imageAr: "/images/booth-production/header/services/4.webp",
        link: "/catering",
        bgPosition: "center",
      },
    ],

    translations: {
      stats: {
        years: { en: "14+ Years", ar: "14+ سنه" },
        clients: { en: "500+ Clients Served", ar: "+500 عميل تم خدمتهم" },
      },
      hero: {
        title: { en: "Booth Production", ar: "تصنيع اجنحة المعارض " },
        subtitle: {
          en: "Darb Productions specializes in custom booth design and production — from 3D visualization to full build and on-site support.<br>We integrate lighting, interactive elements, and premium displays to create standout brand experiences.<br>Bring your booth to life with impact, precision, and purpose.",
          ar: "درب برودكشنز متخصصة في تصميم وتنفيذ اجنحة المعارض — من التصور الثلاثي الأبعاد إلى البناء الكامل والدعم في الموقع.<br> نُدمج الإضاءة والعناصر التفاعلية والعروض المميزة لخلق تجارب علامة تجارية فريدة.<br> اجعل جناح معرضك ينبض بالحياة بدقة وتأثير وهدف ",
        },
        callButton: { en: "CALL US", ar: "اتصل بنا" },
        infoButton: { en: "MORE INFO", ar: "للمزيد من المعلومات " },
      },
    },

    buttonLinks: {
      contact: "/contact",
      about: " /about",
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
        {/* Hero Section */}
        {/* <HeroSection
          title={t.hero.title}
          desc={t.hero.desc}
          buttonName={t.hero.buttonName}
          buttonURL=""
          imageSRC="/images/booth-production/header/header.webp"
          imageSRC2=""
        /> */}
        <DynamicHeroSection {...heroSectionDATA} />

        <TestimonialSlider testimonials={testimonialsData} />

        {/* قسم الـ Looking to Host */}
        <LookingtoHost
          title={t.lookingToHost.title}
          paragraph={t.lookingToHost.paragraph}
          paragraph2={t.lookingToHost.paragraph2}
          paragraph3={t.lookingToHost.paragraph3}
          buttonNAME={t.lookingToHost.buttonName}
          ButtonURL={"https://darbprint.com/"}
          imageSRC={
            "/images/booth-production/CustomExhibitionBooths/CustomExhibitionBooths.webp"
          }
        />

        {/* WhyDarbProductions */}
        <WhyDarbProductions features={featuresData} />

        {/* قسم الاتصال contact us */}
        <Contactus />

        {/* How We Make It Happen */}
        <OurServices
          title={{
            en: t.ourProcess.title,
            ar: t.ourProcess.title,
          }}
          desc={{
            en: t.ourProcess.desc,
            ar: t.ourProcess.desc,
          }}
          services={processStepsData}
          gridCountDesk={3}
          isDecSeperete={true}
        />
        <SectionDivider />

        {/* Clients Section */}
        <ClientsSection />
      </main>
    </div>
  );
}
