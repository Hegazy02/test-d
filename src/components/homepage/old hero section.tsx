"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/use-app-store";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { createLocalizedPath } from "../Nav";

// تعريف بيانات الأيقونات
// استبدل تعريف serviceIcons بهذا:
const serviceIcons = [
  {
    id: "corporate-events",
    title: {
      en: "Corporate Events",
      ar: "تجهيز الفعاليات",
    },
    image: "/images/homepage/header/flyitems (4).webp",
    alt: "Corporate Events Icon",
    position: { top: "10%", left: "0%" },
    animationDelay: 0,
    subtitle: "",
  },
  {
    id: "media-production",
    title: {
      en: "Media Production",
      ar: "الإنتاج الإعلامي",
    },
    image: "/images/homepage/header/flyitems (2).webp",
    alt: "Media Production Icon",
    position: { top: "1%", right: "1%" },
    animationDelay: 0.5,
    subtitle: "",
  },
  {
    id: "booth-production",
    title: {
      en: "Booth Production",
      ar: "إنتاج المنصات",
    },
    image: "/images/homepage/header/flyitems (1).webp",
    alt: "Booth Production Icon",
    position: { bottom: "1%", left: "1%" },
    animationDelay: 0.3,
    subtitle: "",
  },
  {
    id: "printing",
    title: {
      en: "Printing",
      ar: "الطباعة",
    },
    image: "/images/homepage/header/flyitems (3).webp",
    alt: "Printing Icon",
    position: { bottom: "1%", right: "1%" },
    animationDelay: 0.7,
    subtitle: "",
  },
];

function HeroSection() {
  const { language } = useAppStore();
  const { i18n, t } = useTranslation();
  const pathname = usePathname();

  // للنص المتحرك في H1
  const [titleNumber, setTitleNumber] = useState(0);
  const titles =
    i18n.language === "en"
      ? [
          "media production",
          "event management",
          "printing services",
          "booth production",
          "brand solutions",
        ]
      : [
          "الإنتاج الإعلامي",
          "إدارة الفعاليات",
          "خدمات الطباعة",
          "إنتاج المنصات",
          "حلول العلامة التجارية",
        ];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  // إضافة بيانات هيكلية لتحسين SEO
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Darb Productions",
      description:
        "Media production, event management, printing, and booth production services",
      url: "https://www.darbproductions.com",
      logo: "https://www.darbproductions.com/images/LOGO.svg",
      sameAs: [
        "https://www.linkedin.com/company/darb-productions/",
        "https://vimeo.com/darbpro",
      ],
    });
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // تأثيرات الحركة للنص
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // تأثيرات الحركة للصورة الرئيسية
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2,
      },
    },
  };

  // تأثيرات الطفو للأيقونات
  const floatingVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: (delay: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5 + delay,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    float: (delay: number) => ({
      y: [0, -15, 0],
      x: [0, 7, 0],
      transition: {
        y: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 8 + delay,
          ease: "easeInOut",
          repeatType: "reverse",
        },
        x: {
          repeat: Number.POSITIVE_INFINITY,
          duration: 10 + delay,
          ease: "easeInOut",
          repeatType: "reverse",
        },
      },
    }),
  };

  return (
    <section
      className="py-12 md:py-16 lg:py-20 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* 1. قسم الصورة والأيقونات: يظهر فوق على الجوال */}
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-full order-1 md:order-2">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate="visible"
            variants={imageVariants}
          >
            <Image
              src="/images/homepage/header/base.webp"
              alt="Media Production Team at Darb Productions"
              width={500}
              height={400}
              className="object-contain"
              priority
              quality={70}
              fetchPriority="high"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>

          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-full">
            {serviceIcons.map((icon, index) => {
              const isHorizontal = index === 0;
              return (
                <motion.div
                  key={icon.id}
                  style={icon.position}
                  className="absolute"
                  custom={icon.animationDelay}
                  initial="initial"
                  animate={["animate", "float"]}
                  variants={floatingVariants}
                >
                  <motion.div
                    className={`bg-gray-100/70 rounded-3xl shadow-md hover:shadow-lg bg-opacity-10 border-3 border-white ${
                      isHorizontal
                        ? "w-[calc(4vw+110px)] md:w-[calc(6vw+70px)]"
                        : "w-[calc(4vw+60px)] md:w-[calc(4vw+50px)]"
                    }`}
                    style={{ padding: "calc(0.5vw + 1px)" }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow:
                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      transition: { duration: 0.5 },
                    }}
                  >
                    {isHorizontal ? (
                      <div className="flex items-center space-x-4">
                        <Image
                          src={icon.image || "/placeholder.svg"}
                          alt={icon.alt}
                          className="object-contain"
                          style={{
                            width: "calc(1vw + 30px)",
                            aspectRatio: "1 / 1",
                          }}
                          width={100}
                          height={100}
                          priority
                          quality={70}
                          fetchPriority="high"
                        />
                        <div className="flex flex-col">
                          <p className="font-bold text-black text-[calc(0.5vw+8px)] md:text-[calc(0.4vw+6px)]">
                            {icon.title[i18n.language] || icon.title.en}
                          </p>
                          <p className="font-bold text-black text-[calc(0.5vw+8px)] md:text-[calc(0.4vw+6px)]">
                            {icon.subtitle}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Image
                          src={icon.image || "/placeholder.svg"}
                          alt={icon.alt}
                          className="object-contain"
                          style={{
                            width: "calc(1vw + 40px)",
                            aspectRatio: "1 / 1",
                          }}
                          width={100}
                          height={100}
                          priority
                          quality={70}
                          fetchPriority="high"
                        />
                        <p className="mt-2 font-bold text-black text-center text-[calc(0.5vw+6px)] md:text-[calc(0.4vw+6px)]">
                          {icon.title[i18n.language] || icon.title.en}
                        </p>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. قسم النص: يظهر تحت على الجوال */}
        <motion.div
          animate="visible"
          variants={textVariants}
          className="space-y-4 md:space-y-6 order-2 md:order-1"
        >
          {/* H1 مع الأنيميشن الجديد */}
          <div className="w-full">
            {/* عنوان Darb Productions */}
            <h1
              id="hero-heading"
              className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight ${
                i18n.language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {i18n.language === "en" ? "Darb Productions" : "درب للإنتاج"}
            </h1>

            {/* الجملة الوسطى */}
            <p
              className={`text-gray-700 text-xl max-w-md font-normal leading-relaxed mt-3 ${
                i18n.language === "ar" ? "text-right" : "text-left"
              }`}
            >
              {i18n.language === "en"
                ? "helps brands come to life through:"
                : "تساعد العلامات التجارية على الظهور من خلال:"}
            </p>

            {/* النص المتحرك - Always LTR */}
            <div className={`flex items-start mt-4 justify-start`}>
              <span className="relative flex overflow-hidden min-h-[2rem] md:min-h-[2.5rem] lg:min-h-[3rem] w-full max-w-md justify-start">
                {titles.map((title, index) => (
                  <motion.span
                    key={`${index}-${title}-${language}`}
                    className="absolute font-bold text-[#823548] text-lg md:text-xl lg:text-2xl whitespace-nowrap "
                    initial={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </div>
          </div>

          {/* الزر */}
          <motion.div
            className="pt-4 flex items-start justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              asChild
              className="bg-[#823548] text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-[2.5rem] md:py-[1.5rem] rounded-sm w-fit hover:bg-[#682a39] transition font-bold"
              aria-label={i18n.language === "en" ? "Contact Us" : "اتصل بنا"}
            >
              <Link href={createLocalizedPath("/contact", pathname)}>
                {i18n.language === "en" ? "Contact Us" : "اتصل بنا"}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(HeroSection);
