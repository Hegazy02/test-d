"use client";
import dynamic from "next/dynamic";
import Header from "@/components/darbprint/header";
import OurServices from "@/components/darbprint/OurServices";
import React from "react";
import { useTranslation } from "react-i18next";
import DynamicHeroSection from "@/components/shared/DynamicHeroSection";

const OurOnlineStore = dynamic(
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
const ClientsSlider = dynamic(
  () => import("@/components/homepage/clients-section"),
  { ssr: true }
);

// Translation data
const translations = {
  en: {
    header: {
      title: "All Your Printing Needs in One Place",
      desc: "At Darb Productions, we deliver full-service printing solutions for corporations and government entities — including digital printing, promotional gifts, custom awards, and exhibition/conference materials — all tailored to your needs.",
      buttonName: "Contact us",
    },
    ourServices: {
      title: "Our Services",
      desc: "Comprehensive printing solutions tailored for businesses, events, and government needs.",
    },
    services: [
      {
        id: "promotional-gifts",
        title: "Promotional Gifts Printing",
        description: "Roll-ups, signage, stands, ID cards, conference bags.",
        alt: "Promotional Gifts Printing services including roll-ups, signage, and conference materials",
      },
      {
        id: "custom-awards",
        title: "Custom Awards Manufacturing",
        description:
          "Elegant acrylic, wooden, and metal trophies designed to impress.",
        alt: "Custom Awards Manufacturing featuring acrylic, wooden, and metal trophies",
      },
      {
        id: "event-materials",
        title: "Event & Exhibition Materials",
        description:
          "Mugs, notebooks, pens, bags, USBs — fully customized with your branding.",
        alt: "Event and Exhibition Materials including branded mugs, notebooks, and promotional items",
      },
      {
        id: "digital-printing",
        title: "Digital Printing",
        description:
          "Business cards, brochures, flyers, annual reports, and more.",
        alt: "Digital Printing services for business cards, brochures, flyers and reports",
      },
    ],
    onlineStore: {
      title: "Our Online Store",
      paragraph:
        "All our services and pricing are available on our online store.",
      paragraph2:
        "Browse products, view details, and explore the options that suit your needs.",
      buttonName: "Visit the Store",
    },
    features: [
      {
        title: "Experience with Top-Tier Clients",
        description:
          "We proudly work with leading corporations and government entities, which has shaped our operations to meet the highest standards of professionalism, confidentiality, and reliability. We understand how large organizations think — and we deliver accordingly.",
        altText: "Crown icon representing top-tier client experience",
      },
      {
        title: "On-Time, High-Precision Delivery",
        description:
          "Deadlines matter. Our operational system is optimized to ensure every project is delivered on time and exactly as requested. You can rely on us when time is tight and expectations are high.",
        altText: "Clock and delivery truck icon representing on-time delivery",
      },
      {
        title: "Full Customization",
        description:
          "Every company is unique — and so are your printing needs. It's your brand. Printed your way.",
        altText:
          "Customization tools icon representing full customization options",
      },
      {
        title: "In-House Professional Support",
        description:
          "From concept to final product — we're with you all the way.",
        altText: "Support team icon representing in-house professional support",
      },
      {
        title: "Quality Materials & Modern Machines",
        description:
          "We invest in premium materials and advanced printing technology. You'll see and feel the difference.",
        altText:
          "Printing machine icon representing quality materials and modern equipment",
      },
      {
        title: "Multilingual Team",
        description:
          "Our team speaks Arabic and English fluently – we understand your vision — and your language.",
        altText: "Multilingual team icon representing language capabilities",
      },
    ],
  },
  ar: {
    header: {
      title: "جميع احتياجاتك الطباعية في مكان واحد",
      desc: "في درب للإنتاج، نقدم حلول طباعة متكاملة للشركات والجهات الحكومية — تشمل الطباعة الرقمية والهدايا الترويجية والجوائز المخصصة ومواد المعارض والمؤتمرات — كلها مصممة خصيصاً لتلبية احتياجاتك.",
      buttonName: "تواصل معنا",
    },
    ourServices: {
      title: "خدماتنا",
      desc: "حلول طباعة شاملة مصممة للأعمال والفعاليات والاحتياجات الحكومية.",
    },
    services: [
      {
        id: "promotional-gifts",
        title: " طباعة الهدايا الترويجية ",
        description: "رول اب، لافتات، ستاندات، بطاقات تعريفية، وحقائب مؤتمرات",
        alt: "خدمات طباعة الهدايا الترويجية  تشمل الرول أب واللافتات ومواد المؤتمرات",
      },
      {
        id: "custom-awards",
        title: " تصنيع دروع حسب الطلب ",
        description:
          "دروع فاخرة من الاكريليك , خشب , معدن مصممة لتترك انطباعا مميزا ",
        alt: "تصنيع دروع حسب الطلب  من الأكريليك والخشب والمعدن",
      },
      {
        id: "event-materials",
        title: " مستلزمات الفعاليات والمعارض ",
        description:
          "أكواب، دفاتر، أقلام، حقائب، فلاشات — مخصصة بالكامل بعلامتك التجارية.",
        alt: "مستلزمات الفعاليات والمعارض  تشمل الأكواب والدفاتر والمواد الترويجية ذات العلامة التجارية",
      },
      {
        id: "digital-printing",
        title: " الطباعة الرقمية",
        description: "بزنس كارد، كتيبات، منشورات، تقارير سنوية، وأكثر.",
        alt: "خدمات الطباعة الرقمية لبطاقات الأعمال والكتيبات والمنشورات والتقارير",
      },
    ],
    onlineStore: {
      title: "متجرنا الإلكتروني",
      paragraph: "جميع خدماتنا وأسعارنا متوفرة على متجرنا الإلكتروني.",
      paragraph2:
        "تصفح المنتجات، شاهد التفاصيل، واستكشف الخيارات التي تناسب احتياجاتك.",
      buttonName: "زيارة المتجر",
    },
    features: [
      {
        title: "خبرة مع نخبة العملاء",
        description:
          "نفخر بالتعاون مع كبرى الشركات والجهات الحكومية، مما شكّل آلية عملنا لتواكب أعلى معايير الاحترافية والسرية والموثوقية.  نُدرك كيف تفكر المؤسسات الكبرى — ونعمل وفقًا لذلك",
        altText: "أيقونة التاج تمثل الخبرة مع نخبة العملاء",
      },
      {
        title: "تسليم دقيق وفي الوقت المحدد",
        description:
          "نُقدّر أهمية المواعيد النهائية. لقد صُمّم نظام العمل لدينا لضمان تسليم كل مشروع في الوقت المحدد وبالدقة المطلوبة.  يمكنك الاعتماد علينا عندما يكون الوقت ضيقًا والتوقعات عالية",
        altText: "أيقونة الساعة وشاحنة التوصيل تمثل التسليم في الوقت المحدد",
      },
      {
        title: "تخصيص كامل",
        description:
          "كل شركة فريدة، وكذلك احتياجات الطباعة الخاصة بها. هذه علامتك التجارية، تُطبع بطريقتك الخاصة.",
        altText: "أيقونة أدوات التخصيص تمثل خيارات التخصيص الكاملة",
      },
      {
        title: "دعم احترافي داخلي",
        description: "من الفكرة إلى المنتج النهائي — نحن معك في كل خطوة",
        altText: "أيقونة فريق الدعم تمثل الدعم الاحترافي الداخلي",
      },
      {
        title: "مواد عالية الجودة وآلات حديثة",
        description:
          "نستخدم مواد عالية الجودة وتقنيات طباعة متطورة. ستلاحظ الفرق وتشعر به.",
        altText: "أيقونة آلة الطباعة تمثل المواد عالية الجودة والمعدات الحديثة",
      },
      {
        title: "فريق متعدد اللغات",
        description:
          "فريقنا يتحدث العربية والإنجليزية بطلاقة – نحن نفهم رؤيتك ولغتك",
        altText: "أيقونة الفريق متعدد اللغات تمثل القدرات اللغوية",
      },
    ],
  },
};

export default function DarbPrintClientWrapper() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const t = lang === "ar" ? translations.ar : translations.en;

  // Prepare services data with translations
  const servicesData = t.services.map((service, index) => ({
    ...service,
    image: `/images/services/darbprint/OurServices/S${[3, 1, 2, 4][index]}.webp`,
  }));

  // Prepare features data with translations
  const featuresData = t.features.map((feature, index) => ({
    iconSrc: `/images/services/darbprint/WhyDarbProductions/${index + 1}.svg`,
    ...feature,
  }));

  const heroSectionDATA = {
    backgroundImages: {
      mobile: "/images/darbprint/hero.webp",
      desktop: "/images/darbprint/hero.webp",
      sharpen: "/images/homepage/header/sharpen.png",
    },
    services: [
      {
        id: "printing",
        title: "PRINTING",
        titleAr: "الطباعة",
        image: "/images/darbprint/header/services/1.webp",
        imageAr: "/images/darbprint/header/services/1.webp",
        link: "/printing",
        bgPosition: "center",
      },
      {
        id: "booth-production",
        title: "BOOTH PRODUCTION",
        titleAr: "إنتاج الأجنحة",

        image: "/images/darbprint/header/services/2.webp",
        imageAr: "/images/darbprint/header/services/2.webp",
        link: "/booth-production",
        bgPosition: "center",
      },
      {
        id: "events-management",
        title: "EVENTS MANAGEMENT",
        titleAr: "إدارة الفعاليات",
        image: "/images/darbprint/header/services/3.webp",
        imageAr: "/images/darbprint/header/services/3.webp",
        link: "/events-management",
        bgPosition: "center",
      },
      {
        id: "catering",
        title: "CATERING",
        titleAr: "التموين",
        image: "/images/darbprint/header/services/4.webp",
        imageAr: "/images/darbprint/header/services/4.webp",
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
        title: { en: "Printing", ar: "الطباعة" },
        subtitle: {
          en: "At Darb Productions, we provide innovative printing solutions — from gift items and custom packaging to signage, banners, and stickers.<br>We help you showcase your brand with high-quality materials and professional design.<br>With Darb, every detail makes a lasting impression.",
          ar: "في درب برودكشنز، نقدم حلول طباعة مبتكرة — من الهدايا والتغليف المخصص إلى اللوحات، البنرات، والملصقات.<br> نساعدك في إبراز علامتك التجارية باستخدام خامات عالية الجودة وتصميم احترافي.<br> مع درب، كل تفصيلة تترك انطباعًا يدوم",
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
    <div className="">
      {/* قسم الـ Header */}
      {/* <Header
        title={t.header.title}
        desc={t.header.desc}
        buttonName={t.header.buttonName}
        buttonURL=""
        imageSRC="/images/services/darbprint/header/header2.webp"
        imageSRC2=""
      /> */}
      <DynamicHeroSection {...heroSectionDATA} />

      {/* قسم الخدمات (Our Services) */}
      <OurServices
        title={t.ourServices.title}
        desc={t.ourServices.desc}
        services={servicesData}
        isDecSeperete={true}
        gridCountDesk={4}
        isPNG={true}
        backgroundColor="#0A2A2A"
      />

      {/* قسم الـ Our Online Store */}
      <OurOnlineStore
        title={t.onlineStore.title}
        paragraph={t.onlineStore.paragraph}
        paragraph2={t.onlineStore.paragraph2}
        buttonNAME={t.onlineStore.buttonName}
        ButtonURL={"https://darbprint.com/"}
        imageSRC={
          "/images/services/darbprint/Our Online Store/Our Online Store.webp"
        }
      />

      {/* قسم الـ Why Darb Productions */}
      <WhyDarbProductions features={featuresData} />

      {/* قسم الاتصال contact us */}
      <Contactus />

      {/* قسم الـ Clients */}
      <ClientsSlider />
    </div>
  );
}
