"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
const darkModeLogoMap = {
  "Logo 5": "/images/services/darbprint/clients/بنك الجزيرة.webp",
  "Logo 10": "/images/services/darbprint/clients/اكسبرو.webp",
  "Logo 12": "/images/services/darbprint/clients/نيوم.webp",
  "Logo 17": "/images/services/darbprint/clients/ارامكوا.png",
  "Logo 35": "/images/services/darbprint/clients/شركة الوعلان.png",
  "Logo 39": "/images/services/darbprint/clients/تداول.png",
  "Logo 40": "/images/services/darbprint/clients/الصافي.webp",
  "Logo 46": "/images/services/darbprint/clients/فورد.png",
  "Logo 52": "/images/services/darbprint/clients/مستشفى الملك فيصل.png",
  "Logo 56": "/images/services/darbprint/clients/نادي الاتحاد.png",
  "Logo 60": "/images/services/darbprint/clients/التعاونية.png",
};

const lightModeLogoMap = {
  "Logo 61":
    "/images/services/darbprint/clients/371ebc95-b6fa-4db7-a516-611617264-01.webp",
  "Logo 62":
    "/images/services/darbprint/clients/371ebc95-b6fa-4db7-a516-611617264-02-2.webp",
  "Logo 63":
    "/images/services/darbprint/clients/371ebc95-b6fa-4db7-a516-611617264-03.webp",
  "Logo 64":
    "/images/services/darbprint/clients/371ebc95-b6fa-4db7-a516-611617264-04.webp",
};

const ClientsSlider = ({
  titleColor,
  subtitleColor,
  subtitleSize,
  titleSize,
  animation = false,
  badge = false,
  title,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(16);
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { theme } = useTheme();
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";

  // Touch/Mouse tracking refs
  const containerRef = useRef(null);
  const startX = useRef(null);
  const currentX = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    // دالة لتحديد عدد الكروت حسب حجم الشاشة
    const updateCardsPerSlide = () => {
      if (window.innerWidth < 640) {
        setCardsPerSlide(12); // أقل من sm
      } else {
        setCardsPerSlide(16); // sm وما فوق
      }
    };
    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  // Client logos data - 60 logos total
  const allClients = Array.from({ length: 64 }, (_, i) => ({
    name: `Logo ${i + 1}`,
    src: `/images/services/darbprint/clients/client (${i + 1}).webp`,
  }));

  // تقسيمهم إلى سلايدات حسب cardsPerSlide
  const clientSlides = [];
  for (let i = 0; i < allClients.length; i += cardsPerSlide) {
    clientSlides.push(allClients.slice(i, i + cardsPerSlide));
  }

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      if (isRTL) {
        // For RTL: go backwards
        setCurrentSlide((prev) =>
          prev === 0 ? clientSlides.length - 1 : prev - 1
        );
      } else {
        // For LTR: go forwards
        setCurrentSlide((prev) =>
          prev === clientSlides.length - 1 ? 0 : prev + 1
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [clientSlides.length, isRTL]);

  // Manual navigation
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Calculate transform based on direction
  const getTransform = () => {
    if (isRTL) {
      return `translateX(${currentSlide * 100}%)`;
    }
    return `translateX(-${currentSlide * 100}%)`;
  };

  // Touch/Mouse event handlers
  const handleStart = (clientX) => {
    startX.current = clientX;
    currentX.current = clientX;
    isDragging.current = true;
  };

  const handleMove = (clientX) => {
    if (!isDragging.current) return;
    currentX.current = clientX;
  };

  const handleEnd = () => {
    if (!isDragging.current) return;

    const diff = startX.current - currentX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swiped left
        if (isRTL) {
          setCurrentSlide((prev) =>
            prev === 0 ? clientSlides.length - 1 : prev - 1
          );
        } else {
          setCurrentSlide((prev) =>
            prev === clientSlides.length - 1 ? 0 : prev + 1
          );
        }
      } else {
        // Swiped right
        if (isRTL) {
          setCurrentSlide((prev) =>
            prev === clientSlides.length - 1 ? 0 : prev + 1
          );
        } else {
          setCurrentSlide((prev) =>
            prev === 0 ? clientSlides.length - 1 : prev - 1
          );
        }
      }
    }

    isDragging.current = false;
    startX.current = null;
    currentX.current = null;
  };

  // Touch events
  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };
  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();
  const handleMouseLeave = () => handleEnd();

  // Render slide content

  const renderSlide = (slide, slideIndex) => {
    const isDark = theme === "dark";
    // عدل الكلاسات لتكون ديناميكية حسب cardsPerSlide
    const gridClass =
      cardsPerSlide === 12
        ? "grid grid-cols-3 grid-rows-4 gap-2"
        : "grid grid-cols-4 grid-rows-4 gap-2 sm:gap-2 md:gap-2";
    const slideContent = (
      <div key={slideIndex} className="w-full flex-shrink-0">
        <div className={gridClass}>
          {slide.map((logo, logoIndex) => {
            // Handle special logos 61-64 for light mode only
            let logoSrc;
            if (
              logo.name === "Logo 61" ||
              logo.name === "Logo 62" ||
              logo.name === "Logo 63" ||
              logo.name === "Logo 64"
            ) {
              // For logos 61-64, use special images only in light mode
              logoSrc = isDark
                ? logo.src // Use regular client image in dark mode
                : lightModeLogoMap[logo.name]; // Use special image in light mode
            } else {
              // For other logos, use dark mode alternatives only in dark mode
              logoSrc =
                isDark && darkModeLogoMap[logo.name]
                  ? darkModeLogoMap[logo.name]
                  : logo.src ||
                    "/images/services/darbprint/clients/placeholder.svg";
            }

            const logoElement = (
              <div
                key={logoIndex}
                className="group bg-gray-100 dark:bg-[#494949] rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 flex items-center justify-center h-24 sm:h-32 md:h-24 lg:h-36"
              >
                <Image
                  src={logoSrc}
                  alt={logo.name}
                  width={200}
                  height={200}
                  className={`max-h-12 md:max-h-14 lg:max-h-16 w-auto object-contain ${
                    (logo.name === "Logo 61" ||
                      logo.name === "Logo 62" ||
                      logo.name === "Logo 63" ||
                      logo.name === "Logo 64") &&
                    !isDark
                      ? ""
                      : "dark:invert dark:brightness-0"
                  }`}
                  loading="eager"
                />
              </div>
            );

            if (animation && slideIndex === currentSlide) {
              return (
                <motion.div
                  key={logoIndex}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: logoIndex * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {logoElement}
                </motion.div>
              );
            }

            return logoElement;
          })}
        </div>
      </div>
    );

    return slideContent;
  };

  // Main render
  const renderContent = () => {
    const { theme } = useTheme();
    const pathname =
      typeof window !== "undefined" ? window.location.pathname : "/";

    const isDark = theme === "dark";

    const headerContent = (
      <div className="text-center mb-4">
        {badge && (
          <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
            <div className="py-1 px-3 text-xs sm:text-sm font-medium dark:text-[#fff] text-[#004B4B]">
              {i18n.language === "ar" ? "— عملاءنا —" : "— Our Clients —"}
            </div>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl heading font-bold mb-2 dark:text-[#fff] text-[#2F2E0C]">
          <span>{i18n.language === "ar" ? "عملاءنا" : "Our Clients"}</span>
        </h2>

        <p className="font-normal dark:text-[#fff] text-[#2F2E0C] subheading">
          {i18n.language === "ar"
            ? "تنال خدماتنا ثقة الـمؤسسات التي تعتمد علينا في تقديم إنتاج إعلامي مؤثر وموثوق."
            : "We proudly serve organizations that rely on us for high-quality, reliable printing solutions"}
        </p>
      </div>
    );

    const sliderContent = (
      <>
        <div
          ref={containerRef}
          className="relative overflow-hidden active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: getTransform(),
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            {clientSlides.map((slide, slideIndex) =>
              renderSlide(slide, slideIndex)
            )}
          </div>
        </div>

        {/* Pagination dots */}
        <div
          className="flex justify-center mt-6 sm:mt-8 gap-2"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {clientSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all rounded-full focus:outline-none
      ${currentSlide === index ? "w-8 bg-[#00D1D1]" : "w-2 bg-gray-800 dark:bg-white"}
      h-2 
      after:content-[''] after:absolute after:inset-0 after:w-[44px] after:h-[44px] after:rounded-full after:mx-auto after:-top-[21px] 
      ${isRTL ? "after:-right-[21px]" : "after:-left-[21px]"}
    `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </>
    );

    if (animation) {
      return (
        <section
          className={
            (pathname !== "/"
              ? "py-8 sm:py-12 md:py-16"
              : "pb-8 sm:pb-12 md:pb-16") + " bg-white"
          }
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {headerContent}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              {sliderContent}
            </motion.div>
          </div>
        </section>
      );
    }

    return (
      <section
        className={
          (pathname !== "/" ? "py-8 sm:py-12 " : "pb-8 sm:pb-12 md:pb-16") +
          " dark:bg-black bg-white"
        }
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4">
          {headerContent}
          {sliderContent}
        </div>
      </section>
    );
  };

  return renderContent();
};

export default ClientsSlider;
