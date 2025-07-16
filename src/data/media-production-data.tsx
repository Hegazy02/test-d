// src\data\media-production-data.tsx
// src\data\media-production-data.tsx
// src\data\media-production-data.tsx
// src\data\media-production-data.tsx
"use client";
import { useTranslation } from "react-i18next";

// Custom hook to handle translations
export const useMediaProductionData = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const getContent = (translations: { en: string; ar: string }) => {
    return lang === "ar" ? translations.ar : translations.en;
  };

  const getTranslatedData = () => {
    return {
      services: translations.services.map((service) => ({
        id: service.id,
        title: getContent(service.title),
        description: getContent(service.description),
        image: service.image,
        alt: getContent(service.alt),
      })),
      features: translations.features.map((feature) => ({
        iconSrc: feature.iconSrc,
        title: getContent(feature.title),
        description: getContent(feature.description),
        altText: getContent(feature.altText),
      })),
      hero: {
        title: getContent(translations.hero.title),
        desc: getContent(translations.hero.desc),
        buttonName: getContent(translations.hero.buttonName),
      },
      services_section: {
        title: getContent(translations.services_section.title),
        desc: getContent(translations.services_section.desc),
        work_with_us: {
          title: getContent(translations.services_section.work_with_us.title),
          paragraph: getContent(
            translations.services_section.work_with_us.paragraph
          ),
          buttonName: getContent(
            translations.services_section.work_with_us.buttonName
          ),
        },
      },
    };
  };

  return {
    lang,
    translations: getTranslatedData(),
  };
};

// src/data/media-production-data.tsx
export const translations = {
  services: [
    {
      id: "corporate-documentaries",
      title: {
        en: "Corporate Documentaries",
        ar: "الأفلام الوثائقية للشركات ",
      },
      description: {
        en: "Telling your company's story with authenticity and depth.",
        ar: "نروي قصة شركتك بأصالة وعمق.",
      },
      image: "/images/media-production/services/1.svg",
      alt: {
        en: "Corporate Documentaries Service",
        ar: "خدمة الأفلام الوثائقية للشركات ",
      },
    },
    {
      id: "podcast-production",
      title: {
        en: "Podcast Production",
        ar: "إنتاج البودكاست",
      },
      description: {
        en: "End-to-end setup and filming for branded business podcasts.",
        ar: "إعداد وتصوير متكامل للبودكاست التجاري.",
      },
      image: "/images/media-production/services/2.svg",
      alt: {
        en: "Podcast Production Service",
        ar: "خدمة إنتاج البودكاست",
      },
    },
    {
      id: "corporate-event-coverage",
      title: {
        en: "Corporate Event Coverage",
        ar: "تغطية الفعاليات",
      },
      description: {
        en: "Capturing key moments from conferences, launches, and more.",
        ar: "توثيق اللحظات الهامة في المؤتمرات والإطلاقات وغيرها.",
      },
      image: "/images/media-production/services/3.svg",
      alt: {
        en: "Corporate Event Coverage Service",
        ar: "خدمة تغطية الفعاليات",
      },
    },
    {
      id: "commercial-production",
      title: {
        en: "Commercial Production",
        ar: "الإنتاج التجاري",
      },
      description: {
        en: "Creating promotional videos that drive visibility and sales.",
        ar: "إنشاء فيديوهات ترويجية تعزز الظهور والمبيعات",
      },
      image: "/images/media-production/services/4.svg",
      alt: {
        en: "Commercial Production Service",
        ar: "خدمة الإنتاج التجاري",
      },
    },
    {
      id: "portrait-photography",
      title: {
        en: "Portrait Photography",
        ar: "تصوير البورتريه",
      },
      description: {
        en: "Professional headshots that reflect leadership and credibility.",
        ar: "صور شخصية احترافية تعكس القيادة والمصداقية.",
      },
      image: "/images/media-production/services/5.svg",
      alt: {
        en: "Portrait Photography Service",
        ar: "خدمة تصوير البورتريه",
      },
    },
    {
      id: "visual-asset-library",
      title: {
        en: "Visual Asset Library Creation",
        ar: "إنشاء مكتبة الأصول البصرية",
      },
      description: {
        en: "Building a custom archive of branded photos and videos.",
        ar: "إنشاء مكتبة مخصصة للصور والفيديوهات الخاصة بالعلامة التجارية.",
      },
      image: "/images/media-production/services/6.svg",
      alt: {
        en: "Visual Asset Library Service",
        ar: "خدمة مكتبة الأصول البصرية",
      },
    },
    {
      id: "ai-content-production",
      title: {
        en: "AI-Enhanced Content Production",
        ar: "إنتاج المحتوى المعزز بالذكاء الاصطناعي",
      },
      description: {
        en: "Using AI to accelerate and elevate your media creation.",
        ar: "استخدام الذكاء الاصطناعي لتسريع وتعزيز إنتاجك الإعلامي",
      },
      image: "/images/media-production/services/7.svg",
      alt: {
        en: "AI Content Production Service",
        ar: "خدمة إنتاج المحتوى المعزز بالذكاء الاصطناعي",
      },
    },
    {
      id: "video-editing",
      title: {
        en: "Professional Video Editing",
        ar: "تحرير الفيديو الاحترافي",
      },
      description: {
        en: "Polished edits that align with your message and goals.",
        ar: "مونتاج إحترافي يتماشى مع رسالتك وأهدافك",
      },
      image: "/images/media-production/services/8.svg",
      alt: {
        en: "Video Editing Service",
        ar: "خدمة تحرير الفيديو",
      },
    },
    {
      id: "corporate-interview",
      title: {
        en: "Corporate Interview",
        ar: "مقابلات الشركات ",
      },
      description: {
        en: "Producing clean, professional interviews with your team.",
        ar: "إنتاج مقابلات إحترافية وواضحة مع فريقك",
      },
      image: "/images/media-production/services/9.svg",
      alt: {
        en: "Corporate Interview Service",
        ar: "خدمة مقابلات الشركات ",
      },
    },
    {
      id: "motion-graphics",
      title: {
        en: "Motion Graphics & Animation",
        ar: "الرسوم المتحركة والمؤثرات الحركية",
      },
      description: {
        en: "Bringing ideas to life with animated visuals and explainer graphics.",
        ar: "إحياء الأفكار من خلال الرسوم المتحركة والرسوم التوضيحية.",
      },
      image: "/images/media-production/services/10.svg",
      alt: {
        en: "Motion Graphics Service",
        ar: "خدمة الرسوم المتحركة والمؤثرات الحركية",
      },
    },
    {
      id: "social-media-production",
      title: {
        en: "Social Media Content Production",
        ar: "إعداد محتوى وسائل التواصل الاجتماعي",
      },
      description: {
        en: "Creating platform-optimized videos for LinkedIn, Instagram, and more.",
        ar: "إنشاء مقاطع فيديو محسّنة للمنصات مثل لينكد إن وإنستغرام والمزيد.",
      },
      image: "/images/media-production/services/Group (1).png",
      alt: {
        en: "Social Media Content Production Service",
        ar: "خدمة إعداد محتوى وسائل التواصل الاجتماعي",
      },
    },
    {
      id: "live-streaming",
      title: {
        en: "Live Streaming",
        ar: "البث المباشر",
      },
      description: {
        en: "Professional multi-camera livestreams for events and corporate sessions.",
        ar: "بث مباشر احترافي متعدد الكاميرات للفعاليات والجلسات المؤسسية.",
      },
      image: "/images/media-production/services/12.svg",
      alt: {
        en: "Live Streaming Service",
        ar: "خدمة البث المباشر",
      },
    },
  ],
  features: [
    {
      iconSrc: "/images/media-production/whydarb/1.svg",
      title: {
        en: "Experienced Professionals",
        ar: "فريق عمل محترف ",
      },
      description: {
        en: "Our team brings years of industry experience to craft videos that resonate with your audience.",
        ar: "يجلب فريقنا سنوات من الخبرة في الصناعة لصنع مقاطع فيديو تتناغم مع جمهورك.",
      },
      altText: {
        en: "Experienced professionals icon",
        ar: "أيقونة المحترفين ذوي الخبرة",
      },
    },
    {
      iconSrc: "/images/media-production/whydarb/2.svg",
      title: {
        en: "High-Quality Production",
        ar: "إنتاج عالي الجودة",
      },
      description: {
        en: "We deliver visually stunning, professionally videos and images that meet the highest standards.",
        ar: "نقدم مقاطع فيديو وصور مذهلة بصريًا واحترافية تلبي أعلى المعايير.",
      },
      altText: {
        en: "High-quality production icon",
        ar: "أيقونة الإنتاج عالي الجودة",
      },
    },
    {
      iconSrc: "/images/media-production/whydarb/3.svg",
      title: {
        en: "Fast Turnaround",
        ar: "تسليم سريع",
      },
      description: {
        en: "We understand deadlines and ensure quick delivery without compromising on quality.",
        ar: "نحرص على الالتزام بالمواعيد ونضمن تسليم سريع دون التأثير على الجودة",
      },
      altText: {
        en: "Fast turnaround icon",
        ar: "أيقونة التحويل السريع",
      },
    },
    {
      iconSrc: "/images/media-production/whydarb/4.svg",
      title: {
        en: "Scalable Solutions",
        ar: "حلول قابلة للتوسع",
      },
      description: {
        en: "From startups to large enterprises, we provide video services that fit every business size and need.",
        ar: "من الشركات الناشئة إلى الشركات الكبيرة، نقدم خدمات الفيديو التي تناسب كل حجم واحتياج تجاري.",
      },
      altText: {
        en: "Scalable solutions icon",
        ar: "أيقونة الحلول القابلة للتوسع",
      },
    },
    {
      iconSrc: "/images/media-production/whydarb/5.svg",
      title: {
        en: "Tailored Service",
        ar: "خدمة مخصصة ",
      },
      description: {
        en: "We customize each project to align with your brand's voice and vision.",
        ar: "نخصص كل مشروع ليتماشى مع صوت ورؤية علامتك التجارية.",
      },
      altText: {
        en: "Tailored service icon",
        ar: "أيقونة الخدمة المخصصة",
      },
    },
    {
      iconSrc: "/images/media-production/whydarb/6.svg",
      title: {
        en: "Advanced Technology",
        ar: "تقنية متقدمة ",
      },
      description: {
        en: "We use the latest Media Production Equipment and innovative technologies, including AI-powered solutions and 3D animation.",
        ar: "نستخدم أحدث معدات الإنتاج الإعلامي والتقنيات المبتكرة، بما في ذلك الحلول المدعومة بالذكاء الاصطناعي والرسوم المتحركة ثلاثية الأبعاد",
      },
      altText: {
        en: "Advanced technology icon",
        ar: "أيقونة التكنولوجيا المتقدمة",
      },
    },
    {
      iconSrc: "/images/media-production/whydarb/7.svg",
      title: {
        en: "Creative Vision",
        ar: "رؤية إبداعية",
      },
      description: {
        en: "Our team brings fresh, creative ideas to every project, pushing the limits of video production.",
        ar: "يقدم فريقنا أفكارًا مبتكرة وجديدة في كل مشروع، متجاوزين حدود إنتاج الفيديو",
      },
      altText: {
        en: "Creative vision icon",
        ar: "أيقونة الرؤية الإبداعية",
      },
    },
    {
      iconSrc: "/images/media-production/whydarb/8.svg",
      title: {
        en: "Commitment to Your Success",
        ar: "الالتزام بنجاحك",
      },
      description: {
        en: "We're dedicated to delivering content that supports your business goals and drives results.",
        ar: "نحن ملتزمون بتقديم محتوى يدعم أهداف عملك ويحقق النتائج.",
      },
      altText: {
        en: "Commitment to your success icon",
        ar: "أيقونة الالتزام بنجاحك",
      },
    },
    {
      iconSrc: "/images/media-production/whydarb/9.svg",
      title: {
        en: "Flexible Revisions",
        ar: "مراجعات مرنة",
      },
      description: {
        en: "We offer flexible revision rounds to ensure the final video aligns with your expectations and vision.",
        ar: "نقدم تعديلات مرنة لضمان توافق الفيديو النهائي مع توقعاتك ورؤيتك",
      },
      altText: {
        en: "Flexible revisions icon",
        ar: "أيقونة المراجعات المرنة",
      },
    },
  ],
  hero: {
    title: {
      en: "Top-Tier Media Production for Business Impact",
      ar: "إنتاج إعلامي متميز لتأثير تجاري",
    },
    desc: {
      en: "We deliver professional media production that elevates your brand — from concept to final cut. Our videos are crafted for corporate needs and marketing goals\n\nWe strike the perfect balance between premium quality and competitive pricing, making top-tier production accessible for businesses of all sizes.",
      ar: "نقدم إنتاجاً إعلامياً احترافياً يرتقي بعلامتك التجارية - من الفكرة إلى المونتاج النهائي. يتم تصميم مقاطع الفيديو الخاصة بنا لتلبية احتياجات الشركات وأهداف التسويق\n\nنحقق التوازن المثالي بين الجودة المتميزة والأسعار التنافسية، مما يجعل الإنتاج عالي المستوى في متناول الشركات بمختلف أحجامها.",
    },
    buttonName: {
      en: "Contact us",
      ar: "اتصل بنا",
    },
  },
  services_section: {
    title: {
      en: "Our Services",
      ar: "خدماتنا",
    },
    desc: {
      en: "We offer professional video editing services that turn your ideas into high-quality, engaging visual content for marketing, education, and social media.",
      ar: "نقدّم خدمات تحرير فيديو احترافية تحوّل أفكارك إلى محتوى بصري عالي الجودة وجذاب، يناسب التسويق والتعليم ووسائل التواصل الاجتماعي",
    },
    work_with_us: {
      title: {
        en: "When you work with us, you're not just getting a video or Photo",
        ar: "معنا، أنت لا تحصل فقط على فيديو أو صورة",
      },
      paragraph: {
        en: "you're getting a tailored, high-quality solution that enhances your brand and message. Here's why businesses choose us",
        ar: " بل على حل مخصص عالي الجودة يعزز علامتك التجارية ورسالتك , هذا سبب اختيار الشركات لنا",
      },
      buttonName: {
        en: "Contact Us",
        ar: "اتصل بنا",
      },
    },
  },
};

// Helper function to get translations for a specific language
export const getTranslationsForLang = (lang: string) => {
  return {
    services: translations.services.map((service) => ({
      id: service.id,
      title: service.title[lang as keyof typeof service.title],
      description:
        service.description[lang as keyof typeof service.description],
      image: service.image,
      alt: service.alt[lang as keyof typeof service.alt],
    })),
    features: translations.features.map((feature) => ({
      iconSrc: feature.iconSrc,
      title: feature.title[lang as keyof typeof feature.title],
      description:
        feature.description[lang as keyof typeof feature.description],
      altText: feature.altText[lang as keyof typeof feature.altText],
    })),
    hero: {
      title:
        translations.hero.title[lang as keyof typeof translations.hero.title],
      desc: translations.hero.desc[lang as keyof typeof translations.hero.desc],
      buttonName:
        translations.hero.buttonName[
          lang as keyof typeof translations.hero.buttonName
        ],
    },
    services_section: {
      title:
        translations.services_section.title[
          lang as keyof typeof translations.services_section.title
        ],
      desc: translations.services_section.desc[
        lang as keyof typeof translations.services_section.desc
      ],
      work_with_us: {
        title:
          translations.services_section.work_with_us.title[
            lang as keyof typeof translations.services_section.work_with_us.title
          ],
        paragraph:
          translations.services_section.work_with_us.paragraph[
            lang as keyof typeof translations.services_section.work_with_us.paragraph
          ],
        buttonName:
          translations.services_section.work_with_us.buttonName[
            lang as keyof typeof translations.services_section.work_with_us.buttonName
          ],
      },
    },
  };
};
