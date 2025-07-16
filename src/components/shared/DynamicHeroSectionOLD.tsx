"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import React from "react";
import { createLocalizedPath } from "../Nav";

// Default props structure for reference
const defaultProps = {
  // Background images
  backgroundImages: {
    mobile: "/images/homepage/header/basemobile.webp",
    desktop: "/images/homepage/header/base.webp",
    sharpen: "/images/homepage/header/sharpen.png",
  },

  // Services data
  services: [
    {
      id: "printing",
      title: "PRINTING",
      titleAr: "الطباعة",
      image: "/images/homepage/header/services/printing.webp",
      imageAr: "/images/homepage/header/services/طباعة.webp",
      link: "/darbprint",
      bgPosition: "left",
    },
    {
      id: "media-production",
      title: "MEDIA PRODUCTION",
      titleAr: "الإنتاج الإعلامي",
      image: "/images/homepage/header/services/media.webp",
      imageAr: "/images/homepage/header/services/اعلامي.webp",
      link: "/media-production",
      bgPosition: "center-left",
    },
    {
      id: "booth-production",
      title: "BOOTH PRODUCTION",
      titleAr: "إنتاج الأجنحة",
      image: "/images/homepage/header/services/booth.webp",
      imageAr: "/images/homepage/header/services/اجنحة معارض.webp",
      link: "/booth-production",
      bgPosition: "center-right",
    },
    {
      id: "events-management",
      title: "EVENTS MANAGEMENT",
      titleAr: "إدارة الفعاليات",
      image: "/images/homepage/header/services/events.webp",
      imageAr: "/images/homepage/header/services/فعاليات.webp",
      link: "/events-management",
      bgPosition: "right",
    },
  ],

  // Moving services text
  movingServices: {
    en: [
      "MEDIA PRODUCTION",
      "EVENTS MANAGEMENT",
      "PRINTING",
      "BOOTH PRODUCTION",
    ],
    ar: ["الإنتاج الإعلامي", "إدارة الفعاليات", "الطباعة", "إنتاج الأجنحة"],
  },

  // Translations
  translations: {
    stats: {
      years: { en: "14+ Years", ar: "14+ سنة" },
      clients: { en: "500+ Clients Served", ar: "+500 عميل تم خدمتهم " },
    },
    hero: {
      title: { en: "DARB PRODUCTIONS", ar: "درب بــرودكشــنـز" },
      subtitle: { en: "Your trusted partner in", ar: "شريكك الموثوق في" },
      callButton: { en: "CALL US", ar: "اتصل بنا" },
      infoButton: { en: "MORE INFO", ar: "المزيد" },
    },
  },

  // Company info for structured data
  companyInfo: {
    name: "Darb Productions",
    description:
      "Media production, event management, printing, and booth production services",
    url: "https://www.darbproductions.com",
    logo: "https://www.darbproductions.com/images/LOGO.svg",
    socialLinks: [
      "https://www.linkedin.com/company/darb-productions/",
      "https://vimeo.com/darbpro",
    ],
  },

  // Button links
  buttonLinks: {
    contact: "/contact",
    about: "/about",
  },

  // Animation settings
  animationSettings: {
    textChangeInterval: 3000,
    autoSlideInterval: 3000,
    swipeThreshold: 50,
  },

  // Layout settings
  layoutSettings: {
    showSidebar: true,
    showStats: true,
    showButtons: true,
    changeBackgroundPhotoAuto: false,
    mobileHeight: "95vh",
    desktopHeight: "100vh",
    showMovingServices: true,
    desktopServicesAsSlider: false,
  },
};

// Helper function to get the correct service image with fallback
const getServiceImage = (service, isArabic) => {
  if (isArabic && service.image_ar) {
    return service.image_ar;
  }
  return service.image || "/placeholder.svg";
};

// دالة مساعدة لتحويل النص إلى عناصر مع <br />
function renderMultilineText(text: string) {
  // استبدل كل أنواع الفواصل بفاصل موحد
  return text.split(/<br\s*\/?>|&#10;|\\n|\n/gi).map((line, idx, arr) =>
    idx < arr.length - 1 ? (
      <React.Fragment key={idx}>
        {line}
        <br />
      </React.Fragment>
    ) : (
      line
    )
  );
}

// ثابتة للخط الجانبي فقط
const staticSidebarServices = [
  {
    id: "media-production",
    title: "MEDIA PRODUCTION",
    titleAr: "الإنتاج الإعلامي",
    image: "/images/homepage/header/services/media.webp",
    imageAr: "/images/homepage/header/services/اعلامي.webp",
    link: "/media-production",
    bgPosition: "center-left",
  },

  {
    id: "events-management",
    title: "EVENTS MANAGEMENT",
    titleAr: "إدارة الفعاليات",
    image: "/images/homepage/header/services/events.webp",
    imageAr: "/images/homepage/header/services/فعاليات.webp",
    link: "/events-management",
    bgPosition: "right",
  },
  {
    id: "printing",
    title: "PRINTING",
    titleAr: "الطباعة",
    image: "/images/homepage/header/services/printing.webp",
    imageAr: "/images/homepage/header/services/طباعة.webp",
    link: "/darbprint",
    bgPosition: "left",
  },
  {
    id: "booth-production",
    title: "BOOTH PRODUCTION",
    titleAr: "تصنيع اجنحة المعارض",
    image: "/images/homepage/header/services/booth.webp",
    imageAr: "/images/homepage/header/services/اجنحة معارض.webp",
    link: "/booth-production",
    bgPosition: "center-right",
  },
];

function DynamicHeroSection({
  backgroundImages = defaultProps.backgroundImages,
  services = defaultProps.services,
  movingServices = defaultProps.movingServices,
  translations = defaultProps.translations,
  companyInfo = defaultProps.companyInfo,
  buttonLinks = defaultProps.buttonLinks,
  animationSettings = defaultProps.animationSettings,
  layoutSettings = defaultProps.layoutSettings,
  customStyles = {},
  numbersIsOn = true,
  onServiceClick = null,
  onButtonClick = null,
  isHomepage = false,
}) {
  const { i18n } = useTranslation();
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const pathname = usePathname();
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(
    backgroundImages.desktop
  );
  const [currentBackgroundImagemobile, setCurrentBackgroundImagemobile] =
    useState(backgroundImages.mobile);

  const lang = i18n.language || "en";
  const isArabic = lang === "ar";
  const handleMouseDown = (e) => {
    setIsDragging(true);
    sliderRef.current.startX = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!sliderRef.current.startX || !isDragging) return;

    const diff = sliderRef.current.startX - e.clientX;

    if (Math.abs(diff) > animationSettings.swipeThreshold) {
      if (isArabic) {
        if (diff < 0 && currentSlide < services.length - 4) {
          setCurrentSlide((prev) => prev + 1);
        } else if (diff > 0 && currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
        }
      } else {
        if (diff > 0 && currentSlide < services.length - 4) {
          setCurrentSlide((prev) => prev + 1);
        } else if (diff < 0 && currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
        }
      }
      sliderRef.current.startX = null;
      setIsDragging(false);
    }
  };
  const handleMouseUp = () => {
    setIsDragging(false);
    sliderRef.current.startX = null;
  };

  // Handle image loading errors
  const handleImageError = (imageKey, originalSrc) => {
    console.log(`Image failed to load: ${originalSrc}`);
    setImageErrors((prev) => ({ ...prev, [imageKey]: true }));
  };

  // Handle service click
  const handleServiceClick = (service, event) => {
    if (onServiceClick) {
      event.preventDefault();
      onServiceClick(service);
    }
  };

  // Handle button click
  const handleButtonClick = (buttonType, href, event) => {
    if (onButtonClick) {
      event.preventDefault();
      onButtonClick(buttonType, href);
    }
  };
  const visibleCards = 4;
  const totalCards = services.length;
  const maxSlide = Math.max(0, totalCards - visibleCards);

  // Handle service click with background change
  const handleServiceClickWithBg = (service, event) => {
    if (isDragging) {
      event.preventDefault();
      return;
    }
    if (layoutSettings.changeBackgroundPhotoAuto) {
      event.preventDefault();
      const imageSrc = getServiceImage(service, isArabic);
      setCurrentBackgroundImage(imageSrc);
      return;
    }

    if (onServiceClick) {
      event.preventDefault();
      onServiceClick(service);
    }
  };

  const handleServiceClickWithBgmobile = (service, event) => {
    if (isDragging) {
      event.preventDefault();
      return;
    }
    if (layoutSettings.changeBackgroundPhotoAuto) {
      event.preventDefault();
      const imageSrc = getServiceImage(service, isArabic);
      setCurrentBackgroundImagemobile(imageSrc);
      return;
    }

    if (onServiceClick) {
      event.preventDefault();
      onServiceClick(service);
    }
  };

  // Moving text effect
  useEffect(() => {
    if (!movingServices[lang]) return;

    const interval = setInterval(() => {
      setCurrentServiceIndex(
        (prev) => (prev + 1) % movingServices[lang].length
      );
    }, animationSettings.textChangeInterval);
    return () => clearInterval(interval);
  }, [lang, movingServices, animationSettings.textChangeInterval]);

  // Auto-slide functionality for services
  useEffect(() => {
    const shouldAutoSlide = layoutSettings.desktopServicesAsSlider
      ? services.length > 4
      : services.length > 1;

    if (!isDragging && shouldAutoSlide) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = prev + direction;
          const maxSlides = layoutSettings.desktopServicesAsSlider
            ? services.length - 4
            : services.length - 1;

          if (nextSlide >= maxSlides) {
            setDirection(-1);
            return maxSlides;
          } else if (nextSlide <= 0) {
            setDirection(1);
            return 0;
          }

          return nextSlide;
        });
      }, animationSettings.autoSlideInterval);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [
    direction,
    isDragging,
    services.length,
    animationSettings.autoSlideInterval,
    layoutSettings.desktopServicesAsSlider,
  ]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    sliderRef.current.startX = touch.clientX;
  };

  const handleTouchMove = (e) => {
    if (!sliderRef.current.startX) return;

    const touch = e.touches[0];
    const diff = sliderRef.current.startX - touch.clientX;

    if (Math.abs(diff) > animationSettings.swipeThreshold) {
      if (isArabic) {
        if (diff < 0 && currentSlide < services.length - 1) {
          setCurrentSlide((prev) => prev + 1);
          sliderRef.current.startX = null;
        } else if (diff > 0 && currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
          sliderRef.current.startX = null;
        }
      } else {
        if (diff > 0 && currentSlide < services.length - 1) {
          setCurrentSlide((prev) => prev + 1);
          sliderRef.current.startX = null;
        } else if (diff < 0 && currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
          sliderRef.current.startX = null;
        }
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    sliderRef.current.startX = null;
  };

  // Add structured data for SEO
  useEffect(() => {
    if (!companyInfo) return;

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: companyInfo.name,
      description: companyInfo.description,
      url: companyInfo.url,
      logo: companyInfo.logo,
      sameAs: companyInfo.socialLinks,
    });
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.head.removeChild(script);
      }
    };
  }, [companyInfo]);

  // Check if service path is active
  const isActiveService = (servicePath) => {
    return pathname.includes(servicePath.replace("/", ""));
  };

  return (
    <>
      <section
        className={`relative overflow-hidden ${customStyles.section || ""}`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* Side navigation with services list */}
        {layoutSettings.showSidebar && (
          <div
            className={`absolute ${isArabic ? "right-[6rem] mr-[6rem]" : "left-[6rem]"} top-[8rem] z-40 hidden lg:block`}
          >
            <div className="flex items-start">
              {/* خط التقدم */}
              <div className="w-1 h-[60vh] bg-white/30 relative">
                {staticSidebarServices.map((service, index) => {
                  const isActive = isActiveService(service.link);
                  const segmentHeight =
                    (60 *
                      (typeof window !== "undefined"
                        ? window.innerHeight
                        : 800)) /
                    100 /
                    staticSidebarServices.length;
                  const topPosition = index * segmentHeight;

                  return isActive ? (
                    <motion.div
                      key={service.id}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      className="absolute w-1 bg-[#004B4B]"
                      style={{
                        top: `${topPosition}px`,
                        height: `${segmentHeight}px`,
                      }}
                    />
                  ) : null;
                })}
              </div>

              {/* روابط الخدمات */}
              <div
                className={`${isArabic ? "mr-4" : "ml-4"} flex flex-col justify-between h-[60vh]`}
              >
                {staticSidebarServices.map((service, index) => {
                  const isActive = isActiveService(service.link);

                  return (
                    <div key={service.id} className="flex-1 flex items-center">
                      <Link
                        href={createLocalizedPath(service.link, pathname)}
                        className={`text-white text-sm font-medium whitespace-nowrap transition-colors duration-300 hover:text-[#004B4B] ${
                          isActive ? "text-[#004B4B]" : ""
                        } ${customStyles.sidebarLink || ""}`}
                      >
                        {isArabic ? service.titleAr : service.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Background images */}
        <div
          className="absolute inset-0 z-0 w-full direction-ltr"
          dir="ltr"
          style={{
            height: layoutSettings.mobileHeight,
          }}
        >
          <div
            className="absolute inset-0 sm:hidden w-full direction-ltr"
            dir="ltr"
          >
            <div
              className={`relative w-full direction-ltr`}
              dir="ltr"
              style={{ height: layoutSettings.mobileHeight }}
            >
              <Image
                src={currentBackgroundImagemobile || "/placeholder.svg"}
                alt="Background Mobile"
                fill
                className="object-cover direction-ltr"
                dir="ltr"
                priority
                quality={90}
                style={{
                  objectFit: "cover",
                  direction: "ltr",
                }}
                onError={(e) => {
                  handleImageError("mobile-bg", e.target.src);
                }}
              />
            </div>
          </div>

          <div
            className="hidden sm:block w-full absolute inset-0"
            dir="ltr"
            style={{
              height: layoutSettings.desktopHeight,
            }}
          >
            <Image
              src={currentBackgroundImage || "/placeholder.svg"}
              alt="Background Desktop"
              fill
              className=""
              priority
              quality={90}
              style={{
                objectFit: "cover",
              }}
              onError={(e) => {
                handleImageError("desktop-bg", e.target.src);
              }}
            />
          </div>

          {backgroundImages.sharpen && (
            <div
              className="absolute inset-0 w-full direction-ltr"
              dir="ltr"
              style={{
                height: "inherit",
              }}
            >
              <Image
                src={backgroundImages.sharpen || "/placeholder.svg"}
                alt="Background Enhanced"
                fill
                className="object-cover"
                priority
                quality={90}
                style={{
                  objectFit: "cover",
                }}
                onError={(e) => {
                  handleImageError("sharpen-bg", e.target.src);
                }}
              />
            </div>
          )}

          <div
            className="absolute inset-x-0 bottom-0 h-1/2 
  bg-gradient-to-t from-white/80 via-white/40 to-transparent 
  dark:from-black/80 dark:via-black/40 dark:to-transparent 
  pointer-events-none z-10 w-full"
          ></div>
        </div>

        <div
          className="relative z-20 flex flex-col"
          style={{ minHeight: layoutSettings.mobileHeight }}
        >
          <div className="flex-1 flex items-start sm:items-center justify-start sm:justify-center px-6 sm:px-4 pt-32 sm:pt-0">
            <div
              className={`text-white w-full max-w-sm sm:max-w-4xl sm:mx-auto ${isArabic ? "text-right sm:text-center" : "text-left sm:text-center"} ${customStyles.heroContent || ""}`}
            >
              {/* {layoutSettings.showStats && (
                <div
                  className={`flex flex-col sm:flex-row sm:justify-center gap-1 sm:gap-8 mb-8 sm:mb-8 text-sm sm:text-md text-gray-200 opacity-70 ${isArabic ? "text-right sm:text-center" : ""} ${customStyles.stats || ""}`}
                >
                  <div>{translations.stats.years[lang]}</div>
                  <div className="hidden sm:block w-[2px] bg-gray-400 opacity-50"></div>
                  <div>{translations.stats.clients[lang]}</div>
                </div>
              )} */}

              <motion.h1
                className={`whitespace-nowrap ${customStyles.titleSize || "text-xl sm:text-4xl md:text-6xl lg:text-7xl"} font-bold mb-6 sm:mb-6 tracking-wider leading-tight ${isArabic ? "text-right sm:text-center" : ""} ${customStyles.title || ""}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {translations.hero.title[lang]}
              </motion.h1>

              <motion.p
                className={`text-lg sm:text-lg md:text-5xl text-white/60 mb-2 sm:mb-4 font-bold ${isArabic ? "text-right sm:text-center" : ""} ${customStyles.subtitleSize || ""} ${customStyles.subtitle || ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {renderMultilineText(translations.hero.subtitle[lang])}
              </motion.p>

              {layoutSettings.showMovingServices &&
                movingServices[lang] &&
                movingServices[lang].length > 0 && (
                  <motion.div
                    className={`h-8 sm:h-12 md:h-16 flex items-center ${isArabic ? "justify-end sm:justify-center" : "justify-start sm:justify-center"} mb-8 sm:mb-8`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <motion.span
                      key={currentServiceIndex}
                      className={`text-2xl sm:text-2xl md:text-5xl font-bold tracking-wider bg-gradient-to-t from-[#01656b] to-[#02A5AF] bg-clip-text text-transparent leading-none py-2 overflow-visible ${customStyles.movingText || ""}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                    >
                      {movingServices[lang][currentServiceIndex]}
                    </motion.span>
                  </motion.div>
                )}

              {layoutSettings.showButtons && (
                <motion.div
                  className={`flex flex-col gap-3 sm:flex-row sm:gap-4 ${isArabic ? "justify-end sm:justify-center" : "justify-start sm:justify-center"} items-stretch sm:items-center ${customStyles.buttons || ""}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <Button
                    asChild
                    className="bg-gray-200/30 border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-all duration-300 font-bold tracking-wider"
                  >
                    <Link
                      href={createLocalizedPath(buttonLinks.contact, pathname)}
                      onClick={(e) =>
                        handleButtonClick("contact", buttonLinks.contact, e)
                      }
                    >
                      {translations.hero.callButton[lang]}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    className="bg-white text-black px-8 py-3 rounded-md hover:bg-[#004B4B] hover:text-white transition-all duration-300 font-bold tracking-wider"
                  >
                    <Link
                      href={createLocalizedPath(buttonLinks.about, pathname)}
                      onClick={(e) =>
                        handleButtonClick("about", buttonLinks.about, e)
                      }
                    >
                      {translations.hero.infoButton[lang]}
                    </Link>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {services.length > 4 && (
        <div className={` relative w-full`} dir="ltr">
          <div
            className={`absolute 
        hidden sm:flex 
        sm:-mt-[9rem] md:-mt-[11rem] 
          ${isArabic ? "left-0 inset-x-0" : "right-0"}
        gap-[0.5rem] 
        z-50 
        px-[1.25rem] 
        w-fit`}
          >
            {isArabic && (
              <>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      Math.min(services.length - 4, prev + 1)
                    )
                  }
                  disabled={currentSlide === services.length - 4}
                  className={`w-[3rem] h-[3rem] text-white flex items-center justify-center ${
                    currentSlide === services.length - 4
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {isArabic ? "التالي" : "NEXT"}
                </button>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentSlide === 0}
                  className={`w-[3rem] h-[3rem] text-white flex items-center justify-center   ${
                    currentSlide === 0
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {isArabic ? "السابق" : "PREV"}
                </button>
              </>
            )}

            {!isArabic && (
              <>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) => Math.max(0, prev - 1))
                  }
                  disabled={currentSlide === 0}
                  className={`w-[3rem] h-[3rem] text-white flex items-center justify-center   ${
                    currentSlide === 0
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {isArabic ? "السابق" : "PREV"}
                </button>
                <button
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      Math.min(services.length - 4, prev + 1)
                    )
                  }
                  disabled={currentSlide === services.length - 4}
                  className={`w-[3rem] h-[3rem] text-white flex items-center justify-center ${
                    currentSlide === services.length - 4
                      ? "opacity-40 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  {isArabic ? "التالي" : "NEXT"}
                </button>
              </>
            )}
          </div>
        </div>
      )}
      {/* Services section */}
      <section className="relative">
        <div className=" -mt-[8rem] sm:-mt-24 md:-mt-32 ">
          <div className="w-full max-w-none">
            {/* Desktop version - regular grid */}
            {!layoutSettings.desktopServicesAsSlider && (
              <div
                className={`hidden sm:flex justify-between items-center gap-4 md:gap-6 lg:gap-8 px-8 ${isArabic ? "flex-row-reverse" : ""}`}
              >
                {services.map((service, index) => {
                  const imageSrc = getServiceImage(service, isArabic);
                  const imageKey = `desktop-service-${service.id}-${lang}`;

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                      className="aspect-[1.49/1] flex-1 relative z-40"
                    >
                      <Link
                        href={createLocalizedPath(
                          layoutSettings.changeBackgroundPhotoAuto
                            ? "#"
                            : service.link,
                          pathname
                        )}
                        onClick={(e) => handleServiceClickWithBg(service, e)}
                        className="relative block w-full h-full group overflow-hidden rounded-lg shadow-lg"
                      >
                        <div className="absolute inset-0 z-0 w-full">
                          {!imageErrors[imageKey] ? (
                            <Image
                              src={imageSrc || "/placeholder.svg"}
                              alt={isArabic ? service.titleAr : service.title}
                              fill
                              className={`object-cover transition-all duration-500 group-hover:scale-110 rounded-lg ${
                                customStyles.servicesCards_White
                                  ? "filter grayscale group-hover:grayscale-0"
                                  : ""
                              }`}
                              quality={80}
                              style={{ objectFit: "cover" }}
                              onError={(e) => {
                                handleImageError(imageKey, e.target.src);
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-500 text-sm font-medium">
                                {isArabic ? service.titleAr : service.title}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-[#004B4B]/0 group-hover:bg-[#004B4B]/10 transition-colors duration-300 rounded-lg z-10"></div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Desktop version - slider */}
            {layoutSettings.desktopServicesAsSlider && (
              <div
                className={`hidden sm:block relative overflow-hidden px-8 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                ref={sliderRef}
                dir={isArabic ? "rtl" : "ltr"}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div
                  className="relative"
                  style={{
                    width: "100%",
                    maxWidth: "calc(100vw - 4rem)",
                  }}
                >
                  <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{
                      transform: `translateX(${isArabic ? currentSlide * 12.5 : -currentSlide * 12.5}%)`,
                      direction: isArabic ? "rtl" : "ltr",
                      gap: "1rem",
                      width: "fit-content",
                    }}
                  >
                    {services.map((service, index) => {
                      const imageSrc = getServiceImage(service, isArabic);
                      const imageKey = `desktop-slider-service-${service.id}-${lang}`;

                      return (
                        <motion.div
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.8,
                            delay: 0.8 + index * 0.1,
                          }}
                          className="flex-shrink-0"
                          style={{
                            width: "calc((100vw - 6rem - 3rem) / 4)",
                            minWidth: "calc((100vw - 6rem - 3rem) / 4)",
                            maxWidth: "calc((100vw - 6rem - 3rem) / 4)",
                          }}
                        >
                          <Link
                            href={createLocalizedPath(
                              layoutSettings.changeBackgroundPhotoAuto
                                ? "#"
                                : service.link,
                              pathname
                            )}
                            onClick={(e) =>
                              handleServiceClickWithBg(service, e)
                            }
                            onDragStart={(e) => e.preventDefault()} // ✅ أضف هذا السطر
                            className="relative block w-full aspect-[1.49/1] group overflow-hidden rounded-lg shadow-lg"
                          >
                            {numbersIsOn == true && (
                              <div className="absolute bottom-4 right-4 z-20 text-white px-3 py-1 rounded-full text-md font-bold">
                                {(index + 1).toString().padStart(2, "0")}
                              </div>
                            )}

                            <div className="absolute inset-0 z-0 w-full">
                              {!imageErrors[imageKey] ? (
                                <Image
                                  src={imageSrc || "/placeholder.svg"}
                                  alt={
                                    isArabic ? service.titleAr : service.title
                                  }
                                  fill
                                  className={`object-cover transition-all duration-500 group-hover:scale-110 rounded-lg ${
                                    customStyles.servicesCards_White
                                      ? "filter grayscale group-hover:grayscale-0"
                                      : ""
                                  }`}
                                  quality={80}
                                  style={{ objectFit: "cover" }}
                                  onError={(e) => {
                                    handleImageError(imageKey, e.target.src);
                                  }}
                                />
                              ) : (
                                <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                                  <span className="text-gray-500 text-sm font-medium">
                                    {isArabic ? service.titleAr : service.title}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="absolute inset-0 bg-[#004B4B]/0 group-hover:bg-[#004B4B]/10 transition-colors duration-300 rounded-lg z-10"></div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile version - swipeable */}
            <div
              className={`relative overflow-hidden px-8 sm:hidden`}
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              dir={isArabic ? "rtl" : "ltr"}
            >
              <div
                className="flex transition-transform duration-300 ease-out gap-3"
                style={{
                  transform: `translateX(${isArabic ? currentSlide * 65 : -currentSlide * 65}%)`,
                  direction: isArabic ? "rtl" : "ltr",
                }}
              >
                {services.map((service, index) => {
                  const imageSrc = getServiceImage(service, isArabic);
                  const imageKey = `mobile-service-${service.id}-${lang}`;

                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                      className="flex-shrink-0"
                      style={{ width: "65%" }}
                    >
                      <Link
                        href={createLocalizedPath(
                          layoutSettings.changeBackgroundPhotoAuto
                            ? "#"
                            : service.link,
                          pathname
                        )}
                        onClick={(e) =>
                          handleServiceClickWithBgmobile(service, e)
                        }
                        className="relative block w-full aspect-[73/94] group overflow-hidden rounded-lg shadow-lg"
                        onDragStart={(e) => e.preventDefault()}
                      >
                        {numbersIsOn == true && (
                          <div className="absolute bottom-4 right-4 z-20 text-white px-3 py-1 rounded-full text-md font-bold">
                            {(index + 1).toString().padStart(2, "0")}
                          </div>
                        )}

                        <div className="absolute inset-0 z-0 w-full">
                          {!imageErrors[imageKey] ? (
                            <Image
                              src={imageSrc || "/placeholder.svg"}
                              alt={isArabic ? service.titleAr : service.title}
                              fill
                              className={`object-cover transition-all duration-500 group-hover:scale-110 rounded-lg ${
                                customStyles.servicesCards_White
                                  ? "filter grayscale group-hover:grayscale-0"
                                  : ""
                              }`}
                              quality={80}
                              style={{ objectFit: "cover" }}
                              onError={(e) => {
                                handleImageError(imageKey, e.target.src);
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center p-4">
                              <span className="text-gray-500 text-sm font-medium text-center">
                                {isArabic ? service.titleAr : service.title}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-[#004B4B]/0 group-hover:bg-[#004B4B]/10 transition-colors duration-300 rounded-lg z-10"></div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-16 md:pb-24">
          {/* Space for future content */}
        </div>
      </section>
    </>
  );
}

export default memo(DynamicHeroSection);
