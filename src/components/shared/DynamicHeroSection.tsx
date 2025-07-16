"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import React from "react";
import useBlogStore from "@/store/store.ts";
import { motion, AnimatePresence } from "framer-motion";
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
      imageHover: "/images/homepage/header/services/اخضر/printing  - green.jpg",
      imageAr: "/images/homepage/header/services/طباعة.webp",
      imageArHover: "/images/homepage/header/services/اخضر/الطباعة  - اخضر.jpg",
      link: "/darbprint",
      bgPosition: "left",
      video: null,
    },
    {
      id: "media-production",
      title: "MEDIA PRODUCTION",
      titleAr: "الإنتاج الإعلامي",
      image: "/images/homepage/header/services/media.webp",
      imageHover: "/images/homepage/header/services/اخضر/media - green.jpg",
      imageAr: "/images/homepage/header/services/اعلامي.webp",
      imageArHover:
        "/images/homepage/header/services/اخضر/انتاج_اعلامي  - اخضر.jpg",
      link: "/media-production",
      bgPosition: "center-left",
      video: null,
    },
    {
      id: "booth-production",
      title: "BOOTH PRODUCTION",
      titleAr: "إنتاج الأجنحة",
      image: "/images/homepage/header/services/booth.webp",
      imageHover: "/images/homepage/header/services/اخضر/booth  - green.jpg",
      imageAr: "/images/homepage/header/services/اجنحة معارض.webp",
      imageArHover:
        "/images/homepage/header/services/اخضر/تصنيع_اجنحة_المعارض - اخضر.jpg",
      link: "/booth-production",
      bgPosition: "center-right",
      video: null,
    },
    {
      id: "events-management",
      title: "EVENTS MANAGEMENT",
      titleAr: "إدارة الفعاليات",
      image: "/images/homepage/header/services/events-management.jpg",
      imageHover: "/images/homepage/header/services/اخضر/events - green.jpg",
      imageAr: "/images/homepage/header/services/فعاليات.webp",
      imageArHover:
        "/images/homepage/header/services/اخضر/ادارة الفعاليات - اخضر.jpg",
      link: "/events-management",
      bgPosition: "right",
      video: null,
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
    video: null,
  },

  {
    id: "events-management",
    title: "EVENTS MANAGEMENT",
    titleAr: "إدارة الفعاليات",
    image: "/images/homepage/header/services/events.webp",
    imageAr: "/images/homepage/header/services/فعاليات.webp",
    link: "/events-management",
    bgPosition: "right",
    video: null,
  },
  {
    id: "printing",
    title: "PRINTING",
    titleAr: "الطباعة",
    image: "/images/homepage/header/services/printing.webp",
    imageAr: "/images/homepage/header/services/طباعة.webp",
    link: "/darbprint",
    bgPosition: "left",
    video: null,
  },
  {
    id: "booth-production",
    title: "BOOTH PRODUCTION",
    titleAr: "تصنيع اجنحة المعارض",
    image: "/images/homepage/header/services/booth.webp",
    imageAr: "/images/homepage/header/services/اجنحة معارض.webp",
    link: "/booth-production",
    bgPosition: "center-right",
    video: null,
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
  const { isUP, toggleIsUP } = useBlogStore();
  const { i18n } = useTranslation();
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const [isPhotoChanged, setisPhotoChanged] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const pathname = usePathname();
  const sliderRef = useRef(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const videoIframeRef = useRef<HTMLIFrameElement>(null);
  const [currentBackgroundImage, setCurrentBackgroundImage] = useState(
    backgroundImages.desktop
  );
  const [hoveredServiceIndex, setHoveredServiceIndex] = useState(null);
  const [currentBackgroundImagemobile, setCurrentBackgroundImagemobile] =
    useState(backgroundImages.mobile);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const lang = i18n.language || "en";
  const isArabic = lang === "ar";
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    sliderRef.current.startX = e.clientX;
  };

  const handleDownButton = (e) => {
    toggleIsUP();
  };
  const handleUpButton = (e) => {
    toggleIsUP();
  };

  // Mobile-specific handlers that don't hide services
  const handleMobileDownButton = (e) => {
    // إذا كان هناك فيديو مفتوح، أوقف الفيديو وأعد الخلفية الافتراضية
    if (activeVideoId) {
      if (videoIframeRef.current) {
        videoIframeRef.current.contentWindow?.postMessage(
          '{"method":"pause"}',
          "*"
        );
      }
      setActiveVideoId(null);
    }
    // دائماً أعد صورة الخلفية الافتراضية
    setCurrentBackgroundImage(backgroundImages.desktop);
    setCurrentBackgroundImagemobile(backgroundImages.mobile);
    // For mobile, we don't want to hide services, just toggle isUP for button state
    toggleIsUP();
  };
  const handleMobileUpButton = (e) => {
    // For mobile, we don't want to hide services, just toggle isUP for button state
    toggleIsUP();
  };

  const handleMouseMove = (e) => {
    if (!sliderRef?.current?.startX || !isDragging) return;

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
  const handleServiceClickWithBg = (service, event, ind) => {
    if (isDragging) {
      event.preventDefault();
      return;
    }
    if (service.video) {
      event.preventDefault();
      setActiveVideoId(service.video);
      setCurrentSlide2(ind);
      setisPhotoChanged(true);
      toggleIsUP(); // Set isUP to true when video is played
      return;
    }
    if (layoutSettings.changeBackgroundPhotoAuto) {
      event.preventDefault();
      const imageSrc = getServiceImage(service, isArabic);
      setCurrentBackgroundImage(imageSrc);
      setActiveVideoId(null); // Reset video when switching to image
      setCurrentSlide2(ind);
      setisPhotoChanged(true);
      return;
    }
    if (onServiceClick) {
      event.preventDefault();
      onServiceClick(service);
    }
  };

  // Update handleServiceClickWithBgmobile to handle video
  const handleServiceClickWithBgmobile = (service, event) => {
    if (isDragging) {
      event.preventDefault();
      return;
    }
    if (service.video) {
      event.preventDefault();
      setActiveVideoId(service.video);
      return;
    }
    if (layoutSettings.changeBackgroundPhotoAuto) {
      event.preventDefault();
      const imageSrc = getServiceImage(service, isArabic);
      setCurrentBackgroundImagemobile(imageSrc);
      setActiveVideoId(null); // Reset video when switching to image
      return;
    }
    if (onServiceClick) {
      event.preventDefault();
      onServiceClick(service);
    }
  };

  // Handle video close
  const handleVideoClose = () => {
    setActiveVideoId(null);
    toggleIsUP(); // Set isUP back to false when video is closed
  };

  // Handle video click to pause
  const handleVideoClick = () => {
    const iframe = videoIframeRef.current;
    if (isVideoPlaying) {
      // إيقاف الفيديو
      iframe.contentWindow?.postMessage('{"method":"pause"}', "*");
      setIsVideoPlaying(false);
    } else {
      // تشغيل الفيديو
      iframe.contentWindow?.postMessage('{"method":"play"}', "*");
      setIsVideoPlaying(true);
    }
  };

  // النقر على صورة sharpen للتحكم في الفيديو
  const handleSharpenClick = () => {
    if (activeVideoId) {
      handleVideoClick();
    }
  };

  // Update handleNextService to handle video
  const handleNextService = () => {
    if (currentSlide2 < services.length - 1) {
      let nextIndex = isPhotoChanged ? currentSlide2 + 1 : currentSlide2;
      setisPhotoChanged(true);
      setCurrentSlide2(nextIndex);
      const nextService = services[nextIndex];
      if (nextService.video) {
        setActiveVideoId(nextService.video);
      } else {
        setCurrentBackgroundImage(getServiceImage(nextService, isArabic));
        setActiveVideoId(null);
      }
    }
  };

  // Update handlePrevService to handle video
  const handlePrevService = () => {
    if (currentSlide2 > 0) {
      const prevIndex = currentSlide2 - 1;
      setCurrentSlide2(prevIndex);
      const prevService = services[prevIndex];
      if (prevService.video) {
        setActiveVideoId(prevService.video);
      } else {
        setCurrentBackgroundImage(getServiceImage(prevService, isArabic));
        setActiveVideoId(null);
      }
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
        {/* {layoutSettings.showSidebar && (
          <AnimatePresence>
            {!isUP && (
              <motion.div
                key="sidebar"
                initial={{ opacity: 0, x: isArabic ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: isArabic ? 300 : -300,
                  transition: { duration: 0.5 },
                }}
                transition={{ duration: 0.5 }}
                className={`absolute ${isArabic ? "right-[6rem] mr-[6rem]" : "left-[6rem]"} top-[8rem] z-[10]  hidden lg:block`}
              >
                <div className="flex items-start">
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

                  <div
                    className={`${isArabic ? "mr-4" : "ml-4"} flex flex-col justify-between h-[60vh]`}
                  >
                    {staticSidebarServices.map((service, index) => {
                      const isActive = isActiveService(service.link);

                      return (
                        <div
                          key={service.id}
                          className="flex-1 flex items-center"
                        >
                          <Link
                            href={service.link}
                            className={`text-white text-sm font-medium whitespace-nowrap transition-colors duration-300 hover:font-bold ${
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
              </motion.div>
            )}
          </AnimatePresence>
        )} */}

        {/* Background images */}
        <div
          className="absolute inset-0 z-0 w-full direction-ltr pointer-events-none"
          dir="ltr"
          style={{
            height: layoutSettings.mobileHeight,
          }}
        >
          {/* Full Screen Video Overlay */}
          {activeVideoId && (
            <div className="absolute inset-0 z-50 bg-black">
              <iframe
                src={`https://player.vimeo.com/video/${activeVideoId}?autoplay=1&title=0&byline=0&portrait=0&fullscreen=1&controls=0&showinfo=0&modestbranding=1&playsinline=1&muted=0&loop=0&color=ffffff&transparent=0&background=1&dnt=1&h=1080&w=1920&player_id=0&app_id=122963`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={services[currentSlide2]?.title || "Service Video"}
                loading="lazy"
                ref={videoIframeRef}
              />
              {/* Transparent overlay to handle clicks */}
              <div
                className="absolute inset-0 z-20 cursor-pointer"
                onClick={handleVideoClick}
                style={{ pointerEvents: "auto" }}
              ></div>
              {/* Sharpen overlay when isUP is false */}
              {!isUP && backgroundImages.sharpen && (
                <div
                  className="absolute inset-0 w-full transition-opacity duration-700 ease-in-out opacity-100"
                  onClick={handleVideoClick}
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
              {/* Close Button */}
              <button
                onClick={handleVideoClose}
                className="absolute top-4 right-4 z-60 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors duration-300"
                aria-label={isArabic ? "إغلاق الفيديو" : "Close Video"}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

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
          {/* الاضاءة الغامقة */}
          {backgroundImages.sharpen && !activeVideoId && (
            <div
              className={`absolute inset-0 w-full direction-ltr transition-opacity duration-700 ease-in-out ${
                isUP ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
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

        {/* الكلام اللي فالنص */}
        <motion.div
          className={`relative  flex flex-col fade-container sm:pointer-events-auto pointer-events-none ${isUP ? "force-opacity-0 absolute inset-0 z-[-1]" : "z-10"}`}
          style={{
            minHeight: layoutSettings.mobileHeight,
            transformOrigin: "top center",
          }}
          initial={{ y: 0, scale: 1 }}
          animate={
            isUP
              ? {
                  y: -100,
                  scale: 0.8,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }
              : {
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: "easeInOut" },
                }
          }
        >
          <div
            className="flex-1 flex items-start sm:items-center justify-start sm:justify-center px-6 sm:px-4 pt-32 sm:pt-0"
            onClick={handleVideoClick}
          >
            <div
              className={`text-white w-full max-w-sm sm:max-w-4xl sm:mx-auto ${
                isArabic
                  ? "text-right sm:text-center"
                  : "text-left sm:text-center"
              } ${customStyles.heroContent || ""}`}
            >
              {layoutSettings.showStats && (
                <div
                  className={`flex flex-col sm:flex-row sm:justify-center gap-1 sm:gap-8 text-sm sm:text-md text-gray-200 ${isArabic ? "text-right sm:text-center" : ""} ${customStyles.stats || ""}`}
                >
                  <div>{translations.stats.years[lang]}</div>
                  <div className={`hidden sm:block w-[2px] bg-gray-400`}></div>
                  <div>{translations.stats.clients[lang]}</div>
                </div>
              )}

              {/* <motion.h1
                className={`whitespace-nowrap ${customStyles.titleSize || "text-xl sm:text-4xl md:text-6xl lg:text-7xl"} font-bold mb-6 sm:mb-3 tracking-wider leading-tight ${isArabic ? "text-right sm:text-center" : ""} ${customStyles.title || ""}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {translations.hero.title[lang]}
              </motion.h1> */}
              <h1
                className={`whitespace-nowrap ${customStyles.titleSize || "text-xl sm:text-4xl md:text-6xl lg:text-7xl"} font-bold mb-6 sm:mb-3 tracking-wider leading-tight ${isArabic ? "text-right sm:text-center" : ""} ${customStyles.title || ""}`}
              >
                {translations.hero.title[lang]}
              </h1>

              <motion.p
                className={`text-lg sm:text-lg md:text-5xl text-white/60 mb-2 sm:mb-3 font-bold ${isArabic ? "text-right sm:text-center" : ""} ${customStyles.subtitleSize || ""} ${customStyles.subtitle || ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {renderMultilineText(translations.hero.subtitle[lang])}
              </motion.p>

              {layoutSettings.showMovingServices &&
                movingServices[lang]?.length > 0 && (
                  <motion.div
                    className={`h-8 sm:h-12 md:h-16 flex items-center ${isArabic ? "justify-start sm:justify-center" : "justify-start sm:justify-center"} mb-8 sm:mb-8`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <motion.span
                      key={currentServiceIndex}
                      className={`text-2xl sm:text-2xl md:text-5xl font-bold tracking-wider bg-[#D4AF37] bg-clip-text text-transparent leading-none py-2 overflow-visible ${customStyles.movingText || ""}`}
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
                    className="bg-gray-200/30 border-2 border-white text-white px-8 py-3 hover:border-gray-300  rounded-md hover:bg-gray-300 hover:text-black transition-all duration-300 font-bold tracking-wider"
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
        </motion.div>
        {/* اب وداون */}
        {!isHomepage && (
          <div className={`relative w-full`} dir="ltr">
            <div
              className={`absolute hidden sm:flex sm:-mt-[25rem] md:-mt-[25rem] ${isArabic ? "ml-15" : "right-20"}  ${activeVideoId ? "text-black" : "text-white"} top-1/2 z-30 `}
            >
              {/*  <div className="absolute h-screen w-full">*/}
              {/* <div className="absolute z-50 right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2"> */}
              {isArabic ? (
                <>
                  {isUP === false && (
                    <button
                      onClick={handleMobileUpButton}
                      className={`flex items-center gap-1 bg-black text-white px-3 py-2 rounded-full text-sm z-[60]`}
                      style={{ pointerEvents: "auto" }}
                    >
                      اظهارها
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                  )}
                  {(isUP === true || isUP === null) && (
                    <button
                      onClick={handleMobileDownButton}
                      className={`flex items-center gap-1 bg-black text-white px-3 py-2 rounded-full text-sm z-[60]`}
                      style={{ pointerEvents: "auto" }}
                    >
                      اخفاءها
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}
                </>
              ) : (
                <>
                  {(isUP === true || isUP === null) && (
                    <button
                      onClick={handleMobileDownButton}
                      className={`flex items-center gap-1 bg-black text-white px-3 py-2 rounded-full text-sm z-[60]`}
                      style={{ pointerEvents: "auto" }}
                    >
                      DOWN
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  )}

                  {isUP === false && (
                    <button
                      onClick={handleMobileUpButton}
                      className={`flex items-center gap-1 bg-black text-white px-3 py-2 rounded-full text-sm z-[60]`}
                      style={{ pointerEvents: "auto" }}
                    >
                      UP
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </section>

      {/* التالي والسابق */}
      {!isHomepage && (
        <div className={`relative w-full`} dir="ltr">
          <div
            className={`absolute hidden sm:flex sm:-mt-[9rem] md:-mt-[11rem] ${isArabic ? "left-0 inset-x-0" : "right-0"} gap-[0.5rem] z-30 px-[1.25rem] w-fit`}
          >
            {isArabic ? (
              <>
                {currentSlide2 < 3 ? (
                  <button
                    onClick={handleNextService}
                    className={`${activeVideoId ? "text-white" : "text-white"}`}
                  >
                    التالي
                  </button>
                ) : (
                  <button
                    disabled
                    className={`text-gray-600 opacity-50 dark:text-gray-500 ${activeVideoId ? "text-white" : ""}`}
                    onClick={handleNextService}
                  >
                    التالي
                  </button>
                )}
                {currentSlide2 > 0 ? (
                  <button
                    onClick={handlePrevService}
                    className={`${activeVideoId ? "text-white" : "text-white"}`}
                  >
                    السابق
                  </button>
                ) : (
                  <button
                    disabled
                    className={`text-gray-600 opacity-50 dark:text-gray-500 ${activeVideoId ? "text-white" : ""}`}
                    onClick={handlePrevService}
                  >
                    السابق
                  </button>
                )}
              </>
            ) : (
              <>
                {currentSlide2 > 0 ? (
                  <button
                    onClick={handlePrevService}
                    className={`${activeVideoId ? "text-white" : "text-white"}`}
                  >
                    PREV
                  </button>
                ) : (
                  <button
                    disabled
                    className={`text-gray-600 opacity-50 dark:text-gray-500 ${activeVideoId ? "text-white" : ""}`}
                    onClick={handlePrevService}
                  >
                    PREV
                  </button>
                )}

                {currentSlide2 < 3 ? (
                  <button
                    onClick={handleNextService}
                    className={`${activeVideoId ? "text-white" : "text-white"}`}
                  >
                    NEXT
                  </button>
                ) : (
                  <button
                    disabled
                    className={`text-gray-600 opacity-50 dark:text-gray-500 ${activeVideoId ? "text-white" : ""}`}
                    onClick={handleNextService}
                  >
                    NEXT
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* التالي والسابق */}
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
                  className={`w-[3rem] h-[3rem] ${activeVideoId ? "text-white" : "text-white"} flex items-center justify-center ${
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
                  className={`w-[3rem] h-[3rem] ${activeVideoId ? "text-white" : "text-white"} flex items-center justify-center   ${
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
                  className={`w-[3rem] h-[3rem] ${activeVideoId ? "text-white" : "text-white"} flex items-center justify-center   ${
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
                  className={`w-[3rem] h-[3rem] ${activeVideoId ? "text-white" : "text-white"} flex items-center justify-center ${
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
      <section
        className={`relative z-20 ${isUP ? "sm:hidden" : ""}`}
        style={{ pointerEvents: "auto" }}
      >
        <motion.div
          className="-mt-[8rem] sm:-mt-24 md:-mt-32"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="w-full max-w-none z-[40]">
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
                      className="aspect-[1.49/1] flex-1 relative "
                    >
                      <Link
                        href={createLocalizedPath(
                          layoutSettings.changeBackgroundPhotoAuto
                            ? "#"
                            : service.link,
                          pathname
                        )}
                        onClick={(e) =>
                          handleServiceClickWithBg(service, e, index)
                        }
                        onMouseEnter={() => setHoveredServiceIndex(index)}
                        onMouseLeave={() => setHoveredServiceIndex(null)}
                        className="relative block w-full h-full group overflow-hidden rounded-lg shadow-lg"
                      >
                        <div className="absolute inset-0 w-full pointer-events-none">
                          {!imageErrors[imageKey] ? (
                            <Image
                              src={
                                isArabic
                                  ? hoveredServiceIndex === index
                                    ? service.imageArHover
                                    : service.imageAr
                                  : hoveredServiceIndex === index
                                    ? service.imageHover
                                    : service.image
                              }
                              alt={isArabic ? service.titleAr : service.title}
                              fill
                              className={`object-cover transition-all duration-500 rounded-lg ${
                                customStyles.servicesCards_White
                                  ? "filter grayscale group-hover:grayscale-0"
                                  : ""
                              }`}
                              quality={80}
                              style={{ objectFit: "cover" }}
                              onError={(e) =>
                                handleImageError(imageKey, e.target.src)
                              }
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-500 text-sm font-medium">
                                {isArabic ? service.titleAr : service.title}
                              </span>
                            </div>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Desktop version - slider */}
            {layoutSettings.desktopServicesAsSlider && (
              <div
                className={`hidden sm:block relative overflow-hidden z-40 px-8 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
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
                          className="flex-shrink-0 z-40"
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
                              handleServiceClickWithBg(service, e, index)
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
                                  className={`object-cover transition-all duration-500  rounded-lg ${
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
                            {/* <div
                              className={`absolute inset-0 bg-[#004B4B]/0 ${isHomepage ? "group-hover:bg-[#004B4B]/10" : ""}  transition-colors duration-300 rounded-lg z-10`}
                            ></div> */}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Mobile UP/DOWN Buttons */}
            {!isHomepage && (
              <div
                className={`relative w-full sm:hidden`}
                dir="ltr"
                style={{ pointerEvents: "auto" }}
              >
                <div
                  className={`absolute ${isArabic ? "right-4" : "left-4"} -mt-[2.5rem] z-[60] flex flex-col items-center space-y-2`}
                >
                  {isArabic ? (
                    <>
                      {isUP === false && (
                        <button
                          onClick={handleMobileUpButton}
                          className={`flex items-center gap-1 bg-black text-white px-3 py-2 rounded-full text-sm z-[60]`}
                          style={{ pointerEvents: "auto" }}
                        >
                          اظهارها بالكامل
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </button>
                      )}
                      {(isUP === true || isUP === null) && (
                        <button
                          onClick={handleMobileDownButton}
                          className={`flex items-center gap-1 bg-black text-white px-3 py-2 rounded-full text-sm z-[60]`}
                          style={{ pointerEvents: "auto" }}
                        >
                          اخفاءها
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {(isUP === true || isUP === null) && (
                        <button
                          onClick={handleMobileDownButton}
                          className={`flex items-center gap-1 bg-black text-white px-3 py-2 rounded-full text-sm z-[60]`}
                          style={{ pointerEvents: "auto" }}
                        >
                          DOWN
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      )}

                      {isUP === false && (
                        <button
                          onClick={handleMobileUpButton}
                          className={`flex items-center gap-1 bg-black text-white px-3 py-2 rounded-full text-sm z-[60]`}
                          style={{ pointerEvents: "auto" }}
                        >
                          UP
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Mobile version - swipeable */}
            <div
              className={`relative overflow-hidden px-8 sm:hidden z-40`}
              ref={sliderRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              dir={isArabic ? "rtl" : "ltr"}
              style={{ pointerEvents: "auto" }}
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
                      className="flex-shrink-0 relative z-30"
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
                        className="relative block w-full aspect-[73/94] group overflow-hidden rounded-lg shadow-lg z-30"
                        onDragStart={(e) => e.preventDefault()}
                        style={{ pointerEvents: "auto" }}
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
                        {/* <div className="absolute inset-0 bg-[#004B4B]/0 group-hover:bg-[#004B4B]/10 transition-colors duration-300 rounded-lg z-10"></div> */}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 pb-16 md:pb-24">
        {/* Space for future content */}
      </div>
    </>
  );
}

export default memo(DynamicHeroSection);
