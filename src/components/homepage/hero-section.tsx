"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";
import { createLocalizedPath } from "../Nav";

// تعريف الخدمات الأربع مع الروابط
const services = [
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
];

// خدمات النص المتحرك
const movingServices = {
  en: ["MEDIA PRODUCTION", "EVENTS MANAGEMENT", "PRINTING", "BOOTH PRODUCTION"],
  ar: ["الإنتاج الإعلامي", "إدارة الفعاليات", "الطباعة", "إنتاج الأجنحة"],
};

// Arabic translations object
const translations = {
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
};
// Helper function to get the correct service image with fallback
const getServiceImage = (service, isArabic) => {
  // Try to use Arabic image first if available and in Arabic mode
  if (isArabic && service.imageAr) {
    return service.imageAr;
  }
  // Fallback to English image
  return service.image || "/placeholder.svg";
};

function HeroSection() {
  const { i18n } = useTranslation();
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isDragging, setIsDragging] = useState(false);
  const [imageErrors, setImageErrors] = useState({}); // Track image loading errors
  const pathname = usePathname();
  const sliderRef = useRef(null);
  const autoSlideRef = useRef(null);

  const lang = i18n.language || "en";
  const isArabic = lang === "ar";

  // Handle image loading errors
  const handleImageError = (imageKey, originalSrc) => {
    console.log(`Image failed to load: ${originalSrc}`);
    setImageErrors((prev) => ({ ...prev, [imageKey]: true }));
  };

  // تأثير النص المتحرك
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex(
        (prev) => (prev + 1) % movingServices[lang].length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [lang]);

  // Auto-slide functionality for services
  useEffect(() => {
    if (!isDragging) {
      autoSlideRef.current = setInterval(() => {
        setCurrentSlide((prev) => {
          const nextSlide = prev + direction;

          // Check if we need to reverse direction
          if (nextSlide >= services.length - 1) {
            setDirection(-1);
            return services.length - 1;
          } else if (nextSlide <= 0) {
            setDirection(1);
            return 0;
          }

          return nextSlide;
        });
      }, 3000);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [direction, isDragging]);

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setIsDragging(true);
    const touch = e.touches[0];
    sliderRef.current.startX = touch.clientX;
  };

  // استبدل دالة handleTouchMove الحالية بهذه:

  const handleTouchMove = (e) => {
    if (!sliderRef.current.startX) return;

    const touch = e.touches[0];
    const diff = sliderRef.current.startX - touch.clientX;

    // Add some resistance to the swipe
    if (Math.abs(diff) > 50) {
      if (isArabic) {
        // في العربية: عكس المنطق
        if (diff < 0 && currentSlide < services.length - 1) {
          // السحب لليمين = الانتقال للشريحة التالية
          setCurrentSlide((prev) => prev + 1);
          sliderRef.current.startX = null;
        } else if (diff > 0 && currentSlide > 0) {
          // السحب لليسار = الانتقال للشريحة السابقة
          setCurrentSlide((prev) => prev - 1);
          sliderRef.current.startX = null;
        }
      } else {
        // في الإنجليزية: المنطق الطبيعي
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

  // فحص إذا كان المسار نشط
  const isActiveService = (servicePath) => {
    return pathname.includes(servicePath.replace("/", ""));
  };

  return (
    <>
      <section
        className={`relative overflow-hidden`}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {/* الخط الجانبي مع قائمة الخدمات - مخفي على الموبايل */}
        <div
          className={`absolute ${isArabic ? "right-[6rem] mr-[6rem]" : "left-[6rem]"} top-[8rem] z-40 hidden lg:block`}
        >
          <div className="flex items-start">
            {/* الخط العمودي */}
            <div className="w-1 h-[60vh] bg-white/30 relative">
              {/* أجزاء الخط الأخضر للصفحات النشطة */}
              {services.map((service, index) => {
                const isActive = isActiveService(service.link);
                const segmentHeight =
                  (70 *
                    (typeof window !== "undefined"
                      ? window.innerHeight
                      : 800)) /
                  100 /
                  services.length;
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

            {/* أسماء الخدمات */}
            <div
              className={`${isArabic ? "mr-4" : "ml-4"} flex flex-col justify-between h-[50vh] mt-10`}
            >
              {services.map((service, index) => {
                const isActive = isActiveService(service.link);

                return (
                  <Link
                    key={service.id}
                    href={createLocalizedPath(service.link, pathname)}
                    className={`text-white text-sm font-medium whitespace-nowrap transition-colors duration-300 hover:text-[#004B4B] ${isActive ? "text-[#004B4B]" : ""}`}
                  >
                    {isArabic ? service.titleAr : service.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* خلفية دبي - طبقات متعددة */}
        <div
          className="absolute inset-0 z-0 w-full direction-ltr"
          dir="ltr"
          style={{
            height: "95vh", // للشاشات الصغيرة
          }}
        >
          {/* الصورة الأساسية للموبايل - 95% من الشاشة */}
          <div
            className="absolute inset-0 sm:hidden w-full direction-ltr"
            dir="ltr"
          >
            <div className="relative w-full h-[95vh] direction-ltr" dir="ltr">
              <Image
                src="/images/homepage/header/basemobile.webp"
                alt="Dubai Skyline Mobile"
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
                  console.log(
                    "Background mobile image failed to load:",
                    e.target.src
                  );
                  handleImageError("mobile-bg", e.target.src);
                }}
              />
            </div>
          </div>

          {/* الصورة الأساسية للديسكتوب - ملء الشاشة */}
          <div
            className="hidden sm:block w-full absolute inset-0"
            dir="ltr"
            style={{
              height: "100vh", // للشاشات الكبيرة
            }}
          >
            <Image
              src="/images/homepage/header/base.webp"
              alt="Dubai Skyline Desktop"
              fill
              className=""
              priority
              quality={90}
              style={{
                objectFit: "cover",
              }}
              onError={(e) => {
                console.log(
                  "Background desktop image failed to load:",
                  e.target.src
                );
                handleImageError("desktop-bg", e.target.src);
              }}
            />
          </div>

          {/* الصورة العلوية (sharpen.png) */}
          <div
            className="absolute inset-0 w-full direction-ltr"
            dir="ltr"
            style={{
              height: "inherit",
            }}
          >
            <Image
              src="/images/homepage/header/sharpen.png"
              alt="Dubai Skyline Enhanced"
              fill
              className="object-cover"
              priority
              quality={90}
              style={{
                objectFit: "cover",
              }}
              onError={(e) => {
                console.log("Sharpen image failed to load:", e.target.src);
                handleImageError("sharpen-bg", e.target.src);
              }}
            />
          </div>

          {/* تأثير الظل الأبيض من الأسفل إلى الأعلى */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/80 via-white/40 to-transparent pointer-events-none z-10 w-full"></div>
        </div>

        {/* المحتوى الرئيسي */}
        <div
          className="relative z-20 flex flex-col"
          style={{ minHeight: "95vh" }}
        >
          {/* القسم العلوي - النص الرئيسي */}
          <div className="flex-1 flex items-start sm:items-center justify-start sm:justify-center px-6 sm:px-4 pt-32 sm:pt-0">
            <div
              className={`text-white w-full max-w-sm sm:max-w-4xl sm:mx-auto ${isArabic ? "text-right sm:text-center" : "text-left sm:text-center"}`}
            >
              {/* الإحصائيات */}
              <div
                className={`flex flex-col sm:flex-row sm:justify-center gap-1 sm:gap-8 mb-8 sm:mb-8 text-sm sm:text-md text-gray-200 opacity-70 ${isArabic ? "text-right sm:text-center" : ""}`}
              >
                <div>{translations.stats.years[lang]}</div>

                {/* خط فاصل بين النصوص في الشاشات الكبيرة */}
                <div className="hidden sm:block w-[2px] bg-gray-400 opacity-50"></div>

                <div>{translations.stats.clients[lang]}</div>
              </div>

              {/* العنوان الرئيسي */}
              <motion.h1
                className={`whitespace-nowrap text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-6 tracking-wider leading-tight ${isArabic ? "text-right sm:text-center" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {translations.hero.title[lang]}
              </motion.h1>

              {/* النص الوسطى */}
              <motion.p
                className={`text-lg sm:text-lg md:text-5xl text-white/60 mb-2 sm:mb-4 font-bold ${isArabic ? "text-right sm:text-center" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {translations.hero.subtitle[lang]}
              </motion.p>

              {/* النص المتحرك */}
              <motion.div
                className={`h-8 sm:h-12 md:h-16 flex items-center ${isArabic ? "justify-end sm:justify-center" : "justify-start sm:justify-center"} mb-8 sm:mb-8`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.span
                  key={currentServiceIndex}
                  className="text-2xl sm:text-2xl md:text-5xl font-bold tracking-wider bg-gradient-to-t from-[#01656b] to-[#02A5AF] bg-clip-text text-transparent leading-none py-2 overflow-visible"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {movingServices[lang][currentServiceIndex]}
                </motion.span>
              </motion.div>

              {/* الأزرار */}
              <motion.div
                className={`flex flex-col gap-3 sm:flex-row sm:gap-4 ${isArabic ? "justify-end sm:justify-center" : "justify-start sm:justify-center"} items-stretch sm:items-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Button
                  asChild
                  className="bg-gray-200/30 border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-all duration-300 font-bold tracking-wider"
                >
                  <Link href={createLocalizedPath("/contact", pathname)}>
                    {translations.hero.callButton[lang]}
                  </Link>
                </Button>
                <Button
                  asChild
                  className="bg-white text-black px-8 py-3 rounded-md hover:bg-[#004B4B] hover:text-white transition-all duration-300  font-bold tracking-wider"
                >
                  <Link href={createLocalizedPath("/about", pathname)}>
                    {translations.hero.infoButton[lang]}
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className=" relative">
        {/* الخدمات الأربع - تمتد عبر حدود القسم */}
        <div className="relative -mt-[15rem] sm:-mt-24 md:-mt-32 z-30">
          <div className="w-full max-w-none">
            {/* Desktop version */}
            <div
              className={`hidden sm:flex justify-between items-center gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8 ${isArabic ? "flex-row-reverse" : ""}`}
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
                      href={createLocalizedPath(service.link, pathname)}
                      className="relative block w-full h-full group overflow-hidden rounded-lg shadow-lg"
                    >
                      {/* صورة الخلفية */}
                      <div className="absolute inset-0 z-0 w-full">
                        {!imageErrors[imageKey] ? (
                          <Image
                            src={imageSrc}
                            alt={isArabic ? service.titleAr : service.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-lg "
                            quality={80}
                            style={{ objectFit: "cover" }}
                            onError={(e) => {
                              console.log(
                                `Service image failed to load: ${e.target.src}`
                              );
                              handleImageError(imageKey, e.target.src);
                            }}
                          />
                        ) : (
                          // Fallback placeholder
                          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500 text-sm font-medium">
                              {isArabic ? service.titleAr : service.title}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* تأثير الهوفر */}
                      <div className="absolute inset-0 bg-[#004B4B]/0 group-hover:bg-[#004B4B]/10 transition-colors duration-300 rounded-lg z-10"></div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile version - swipeable */}
            <div
              className="sm:hidden relative overflow-hidden px-4"
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
                        href={createLocalizedPath(service.link, pathname)}
                        className="relative block w-full aspect-[73/94] group overflow-hidden rounded-lg shadow-lg"
                      >
                        {/* صورة الخلفية */}
                        <div className="absolute inset-0 z-0 w-full">
                          {!imageErrors[imageKey] ? (
                            <Image
                              src={imageSrc}
                              alt={isArabic ? service.titleAr : service.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-lg"
                              quality={80}
                              style={{ objectFit: "cover" }}
                              onError={(e) => {
                                console.log(
                                  `Mobile service image failed to load: ${e.target.src}`
                                );
                                handleImageError(imageKey, e.target.src);
                              }}
                            />
                          ) : (
                            // Fallback placeholder
                            <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center p-4">
                              <span className="text-gray-500 text-sm font-medium text-center">
                                {isArabic ? service.titleAr : service.title}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* تأثير الهوفر */}
                        <div className="absolute inset-0 bg-[#004B4B]/0 group-hover:bg-[#004B4B]/10 transition-colors duration-300 rounded-lg z-10"></div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* مساحة إضافية للمحتوى المستقبلي */}
        <div className="container mx-auto px-4 pb-16 md:pb-24">
          {/* يمكنك إضافة محتوى هنا لاحقاً */}
        </div>
      </section>
    </>
  );
}

export default memo(HeroSection);
