// src/components/events-management/EventsContent.tsx
import HeroSection from "@/components/darbprint/header";
import ClientsSection from "@/components/homepage/clients-section";
import dynamic from "next/dynamic";
import OurServices from "@/components/homepage/services-section";
import OurServices2 from "@/components/darbprint/OurServices";
import { servicesEVENTS } from "@/data/servicesData";
import DynamicHeroSection from "@/components/shared/DynamicHeroSection";
import { TestimonialSlider } from "@/components/shared/testimonial-slider";

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
      title: "Corporate Event Management",
      desc: "We plan and execute corporate events from start to finish — including conferences, internal gatherings, brand activations, and more.\n\nOur team ensures every detail is handled professionally, delivering seamless experiences that reflect your brand's standards and objectives.\n\nFrom concept to execution — trusted by leading brands in Saudi Arabia and the UAE.",
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
      },
      {
        id: 2,
        name: "Rich Khun",
        company: "Hustle Ninjas",
        logo: "/images/events-management/case/2.png",
        quote:
          '"I really appreciate working with Printify on my brand. Afro Unicorn was only supposed to be my design on a white shirt. It is so much more. Printify allows me the time to run the business and not work in the business."',
      },
      {
        id: 3,
        name: "Rich Khun",
        company: "Hustle Ninjas",
        logo: "/images/events-management/case/3.png",
        quote:
          '"Printify helped me start a completely hands-off revenue stream. When you spot a niche that you want to enter quickly, you don\'t have to worry about buying stock or equipment."',
      },
    ],
    services: {
      title: "Our Services",
      desc: "We deliver end-to-end corporate event management services that help brands connect, engage, and leave a lasting impression through seamless planning and flawless execution.",
      items: [
        {
          id: "event-execution",
          title: "End-to-End Event Execution",
          description:
            "Full operational management — from setup to teardown, ensuring every detail runs smoothly.",
        },
        {
          id: "event-planning",
          title: "Event Concept & Planning",
          description:
            "Developing creative ideas that align with your business objectives.",
        },
        {
          id: "guest-experience",
          title: "Guest Experience Design",
          description:
            "We design smooth, engaging event journeys — from guest arrival to exit — ensuring every detail enhances comfort, flow, and brand connection.",
        },
      ],
    },
    lookingToHost: {
      title: "Looking to Host a Memorable Corporate Event?",
      paragraph:
        "Whether you're planning a high-level conference, internal gathering, or brand activation — we handle every detail from concept to execution, ensuring a seamless and impactful experience for your audience.",
      paragraph2: "Let's bring your next event to life",
      buttonName: "Contact us",
    },
    features: [
      {
        title: "Deep expertise in brand-focused content",
        description:
          "We focus on creating content that aligns perfectly with your brand voice and goals.",
      },
      {
        title: "End-to-End Event Management",
        description:
          "From planning to on-site coordination, our in-house team ensures every detail is flawlessly handled.",
      },
      {
        title: "Custom Concepts Aligned with Your Brand",
        description:
          "We design events that reflect your brand identity, culture, and goals.",
      },
      {
        title: "Fast & Reliable Execution",
        description:
          "Tight timeline? No problem — we deliver professional results without compromise.",
      },
      {
        title: "Flexible Planning & Real-Time Support",
        description:
          "We adjust as needed and stay responsive throughout every phase of your event.",
      },
      {
        title: "Scalable for Any Event Size",
        description:
          "From intimate boardroom sessions to large-scale summits — we scale to fit your needs.",
      },
    ],
    howWeMakeItHappen: {
      title: "How We Make It Happen",
      desc: "Our event execution process is built around your objectives — streamlined, structured, and ready to perform at any scale.",
      items: [
        {
          id: "brief-goal-alignment",
          title: "Brief & Goal Alignment",
          description: "Understand your objectives, audience, and event scope.",
        },
        {
          id: "concept-planning",
          title: "Concept & Planning",
          description:
            "Develop the event theme, experience design, and detailed action plan.",
        },
        {
          id: "budgeting",
          title: "Budgeting",
          description:
            "Filming, lighting, and capturing content with high production value.",
        },
        {
          id: "production-setup",
          title: "Production & Setup",
          description:
            "Handling staging, branding, A/V, printing, and on-site preparation.",
        },
        {
          id: "event-day-execution",
          title: "Event Day Execution",
          description: "Event Day Execution",
        },
        {
          id: "wrap-up-reporting",
          title: "Wrap-Up & Reporting",
          description:
            "Dismantling, content delivery, and post-event performance review.",
        },
      ],
    },
  },
  ar: {
    hero: {
      title: "إدارة الأحداث المؤسسية",
    },
    testimonials: [
      {
        id: 1,
        name: "سامي مصطفى",
        company: "هاسل نينجاز",
        logo: "/images/events-management/case/1.png",
        quote:
          '"لا أحتاج إلى استثمار المال الذي لا يمكنني خسارته في عملي. مع برينتيفاي، أدفع فقط رسوم التنفيذ، والباقي كله ربح."',
      },
      {
        id: 2,
        name: "ريتش كون",
        company: "هاسل نينجاز",
        second_image: "/images/booth-production/case/stcImage.png",
        logo: "/images/booth-production/case/stc.png",
        quote:
          '"أقدر العمل مع برينتيفاي على علامتي التجارية. كان من المفترض أن يكون أفرو يونيكورن مجرد تصميمي على قميص أبيض. إنه أكثر من ذلك بكثير. يتيح لي برينتيفاي الوقت لإدارة العمل وليس العمل في العمل."',
      },
      {
        id: 3,
        name: "ريتش كون",
        company: "هاسل نينجاز",
        logo: "/images/booth-production/case/ACWA_Power_logo-white 1.png",
        quote:
          '"ساعدني برينتيفاي في بدء مصدر دخل بدون تدخل يدوي تمامًا. عندما تجد مجالًا تريد دخوله بسرعة، لا داعي للقلق بشأن شراء المخزون أو المعدات."',
      },
    ],
    hero: {
      title: "إدارة الأحداث المؤسسية",
      desc: "نخطط وننفذ الأحداث المؤسسية من البداية إلى النهاية — بما في ذلك المؤتمرات والاجتماعات الداخلية وتفعيل العلامة التجارية والمزيد.\n\nيضمن فريقنا التعامل مع كل التفاصيل بمهنية، مما يوفر تجارب سلسة تعكس معايير وأهداف علامتك التجارية.\n\nمن المفهوم إلى التنفيذ — موثوق به من قبل العلامات التجارية الرائدة في المملكة العربية السعودية والإمارات العربية المتحدة.",
      buttonName: "تواصل معنا",
    },
    services: {
      title: "خدماتنا",
      desc: "نقدم خدمات إدارة الأحداث المؤسسية الشاملة التي تساعد العلامات التجارية على التواصل والمشاركة وترك انطباع دائم من خلال التخطيط السلس والتنفيذ الخالي من العيوب.",
      items: [
        {
          id: "event-execution",
          title: "تنفيذ متكامل للفعاليات ",
          description:
            "دارة كاملة — من الاعداد حتى مرحلة الانتهاء، مع ضمان تنفيذ كل تفصيلة بدقة",
        },
        {
          id: "event-planning",
          title: "تصميم وتخطيط الفعالية",
          description: "تطوير أفكار إبداعية تتوافق مع أهداف عملك",
        },
        {
          id: "guest-experience",
          title: "تصميم تجربة الضيوف",
          description:
            "نصمم تجربة ضيوف سلسة وجذابة — من الوصول إلى المغادرة — مع ضمان أن كل تفصيل يعزز الراحة والانسيابية والارتباط بالعلامة التجارية",
        },
      ],
    },
    lookingToHost: {
      title: "هل تبحث عن تنظيم فعالية شركات لا تُنسى؟",
      paragraph:
        "سواء كنتم تخططون لمؤتمر رفيع المستوى، تجمع داخلي، أو حملة لتنشيط العلامة التجارية، نتولى إدارة كافة التفاصيل من الفكرة وحتى التنفيذ، لضمان تجربة متكاملة وذات أثر مميز لجمهوركم.",
      paragraph2: "  دعونا نُحيي فعاليتكم القادمة",
      buttonName: "تواصل معنا",
    },
    features: [
      {
        title: "خبرة واسعة في المحتوى الموجه للعلامات التجارية",
        description:
          "نركّز على إنشاء محتوى يتماشى تمامًا مع صوت وأهداف علامتك التجارية.",
      },
      {
        title: "إدارة متكاملة للفعاليات",
        description:
          "من التخطيط إلى التنسيق في الموقع، يضمن فريقنا الداخلي التعامل مع كل تفصيلة بدقة واحترافية",
      },
      {
        title: "تصاميم مخصصة متوافقة مع هوية علامتك التجارية",
        description:
          "نصمم فعاليات تعكس هوية علامتك التجارية، ثقافتها، وأهدافها.",
      },
      {
        title: "تنفيذ سريع وموثوق ",
        description:
          "المهلة الزمنية ضيقة؟ لا تقلق — نحن نُنفّذ نتائج احترافية دون أي تنازل عن الجودة",
      },
      {
        title: "تخطيط مرن ودعم فوري ",
        description:
          "نقوم بالتعديل حسب الحاجة ونبقى متواجدين  طوال مراحل فعاليتك.",
      },
      {
        title: "قابل للتوسع",
        description:
          "من اجتماعات الإدارة الصغيرة إلى المؤتمرات الكبرى — نحن نوفّر حلولًا قابلة للتوسع لتلبية احتياجاتك.",
      },
    ],
    howWeMakeItHappen: {
      title: "كيف نُنفّذ رؤيتك",
      desc: "عملية تنفيذ فعالياتنا مبنية على أهدافك — منظمة، مرتبة، وقادرة على التنفيذ بكفاءة مهما كان حجم الحدث.",
      items: [
        {
          id: "brief-goal-alignment",
          title: "الموجز ومواءمة الأهداف",
          description: "فهم أهدافك وجمهورك ونطاق الحدث.",
        },
        {
          id: "concept-planning",
          title: "المفهوم والتخطيط",
          description: "تطوير موضوع الحدث وتصميم التجربة وخطة العمل التفصيلية.",
        },
        {
          id: "budgeting",
          title: "وضع الميزانية",
          description: "التصوير والإضاءة والتقاط المحتوى بقيمة إنتاجية عالية.",
        },
        {
          id: "production-setup",
          title: "الإنتاج والإعداد",
          description:
            "التعامل مع المسرح والعلامة التجارية والصوت والصورة والطباعة والتحضير في الموقع.",
        },
        {
          id: "event-day-execution",
          title: "تنفيذ يوم الحدث",
          description: "تنفيذ يوم الحدث",
        },
        {
          id: "wrap-up-reporting",
          title: "الختام والتقرير",
          description: "التفكيك وتسليم المحتوى ومراجعة الأداء بعد الحدث.",
        },
      ],
    },
  },
};

interface EventsContentProps {
  language: string;
}

const EventsContent = ({ language }: EventsContentProps) => {
  const lang = language === "ar" ? "ar" : "en";
  const t = translations[lang];

  const services = t.services.items.map((item, index) => ({
    ...item,
    image: `/images/events-management/services/${index + 1}.svg`,
    alt: `${item.title} Icon`,
  }));

  const features = t.features.map((feature, index) => ({
    iconSrc: `/images/events-management/whydarb/why (${index + 1}).svg`,
    title: feature.title,
    description: feature.description,
    altText: `${feature.title} icon`,
  }));

  const HowWeMakeItHappenDATA = translations.en.howWeMakeItHappen.items.map(
    (enItem, index) => {
      const arItem = translations.ar.howWeMakeItHappen.items[index];
      return {
        id: enItem.id,
        image: `/images/events-management/HowWeMakeItHappen/${index + 1}.webp`,
        alt: {
          en: `${enItem.title} Service`,
          ar: `${arItem.title} خدمة`,
        },
        title: {
          en: enItem.title,
          ar: arItem.title,
        },
        // تحويل description إلى features
        features: {
          en: enItem.description ? [enItem.description] : [],
          ar: arItem.description ? [arItem.description] : [],
        },
      };
    }
  );
  const testimonialsData = t.testimonials.map((testimonial, index) => ({
    ...testimonial,
    color: ["bg-emerald-200", "bg-amber-100", "bg-purple-100"][index],
    textColor: ["text-emerald-800", "text-amber-800", "text-purple-800"][index],
  }));
  const heroSectionDATA = {
    backgroundImages: {
      mobile: "/images/events-management/header/header.webp",
      desktop: "/images/events-management/header/header.webp",
      sharpen: "/images/homepage/header/sharpen.png",
    },
    services: [
      {
        id: "printing",
        title: "PRINTING",
        titleAr: "الطباعة",
        image: "/images/events-management/header/services/1.webp",
        imageAr: "/images/events-management/header/services/1.webp",
        link: "/printing",
        bgPosition: "center",
      },
      {
        id: "booth-production",
        title: "BOOTH PRODUCTION",
        titleAr: "إنتاج الأجنحة",

        image: "/images/events-management/header/services/2.webp",
        imageAr: "/images/events-management/header/services/2.webp",
        link: "/booth-production",
        bgPosition: "center",
      },
      {
        id: "events-management",
        title: "EVENTS MANAGEMENT",
        titleAr: "إدارة الفعاليات",
        image: "/images/events-management/header/services/3.webp",
        imageAr: "/images/events-management/header/services/3.webp",
        link: "/events-management",
        bgPosition: "center",
      },
      {
        id: "catering",
        title: "CATERING",
        titleAr: "التموين",
        image: "/images/events-management/header/services/4.webp",
        imageAr: "/images/events-management/header/services/4.webp",
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
        title: { en: "Events management", ar: "ادارة الفعاليات" },
        subtitle: {
          en: "At Darb Productions, we deliver seamless corporate event experiences — from planning to full execution.<br>We provide LED screens, pro sound systems, stage & lighting design, and exceptional guest management.<br>Your vision, brought to life with precision and impact.",
          ar: "في درب برودكشنز، نقدم تجربة متكاملة للفعاليات المؤسسية — من التخطيط وحتى التنفيذ الكامل.<br> نوفر شاشات LED، أنظمة صوت احترافية، تصميم إضاءة ومنصات، إلى جانب إدارة متميزة للضيوف.<br> رؤيتك تتحقق بدقة وتأثير",
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
        <DynamicHeroSection {...heroSectionDATA} />
        {/* <HeroSection
          title={t.hero.title}
          desc={t.hero.desc}
          buttonName={t.hero.buttonName}
          buttonURL=""
          imageSRC="/images/events-management/header/header (1).webp"
          imageSRC2="/images/events-management/header/header (2).webp"
        /> */}

        {/* Original OurServices2 - Keep for comparison */}
        <OurServices2
          title={t.services.title}
          desc={t.services.desc}
          services={services}
          gridCountDesk={3}
          isDecSeperete={true}
          isPNG={true}
          isEvent={true}
          backgroundColor="#0A2A2A"
        />

        {/* قسم الـ Looking to Host */}
        <LookingtoHost
          title={t.lookingToHost.title}
          paragraph={t.lookingToHost.paragraph}
          paragraph2={t.lookingToHost.paragraph2}
          buttonNAME={t.lookingToHost.buttonName}
          ButtonURL={"https://darbprint.com/"}
          imageSRC={"/images/events-management/LookingtoHost/base.webp"}
        />

        {/* WhyDarbProductions */}
        <WhyDarbProductions features={features} />

        {/* قسم الاتصال contact us */}
        <Contactus />

        {/* Original OurServices - Keep for comparison */}
        <OurServices
          title={{
            en: "How We Make It Happen",
            ar: "كيف نُنفّذ رؤيتك",
          }}
          desc={{
            en: "Our event execution process is built around your objectives — streamlined, structured, and ready to perform at any scale.",
            ar: "عملية تنفيذ فعالياتنا مبنية على أهدافك — منظمة، مرتبة، وقادرة على التنفيذ بكفاءة مهما كان حجم الحدث.",
          }}
          services={servicesEVENTS}
          gridCountDesk={3}
          isDecSeperete={true}
        />
        <TestimonialSlider testimonials={testimonialsData} />

        {/* Clients Section */}
        <ClientsSection />
      </main>
    </div>
  );
};

export default EventsContent;
