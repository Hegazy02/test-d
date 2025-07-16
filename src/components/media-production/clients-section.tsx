// src\components\darbprint\ClientsSlider.jsx
// اريد الذي هنا من تقليب او اي شئ يكون مثله في src\components\homepage\clients-section.tsx
"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

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
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { i18n, t } = useTranslation();
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Client logos data - 60 logos total, 12 per slide
  const clientSlides = [
    // Slide 1 - 12 logos
    Array.from({ length: 12 }, (_, i) => ({
      name: `Logo ${i + 1}`,
      src: `/images/services/darbprint/clients/client (${i + 1}).webp`,
    })),
    // Slide 2 - 12 logos
    Array.from({ length: 12 }, (_, i) => ({
      name: `Logo ${i + 13}`,
      src: `/images/services/darbprint/clients/client (${i + 13}).webp`,
    })),
    // Slide 3 - 12 logos
    Array.from({ length: 12 }, (_, i) => ({
      name: `Logo ${i + 25}`,
      src: `/images/services/darbprint/clients/client (${i + 25}).webp`,
    })),
    // Slide 4 - 12 logos
    Array.from({ length: 12 }, (_, i) => ({
      name: `Logo ${i + 37}`,
      src: `/images/services/darbprint/clients/client (${i + 37}).webp`,
    })),
    // Slide 5 - 12 logos
    Array.from({ length: 12 }, (_, i) => ({
      name: `Logo ${i + 49}`,
      src: `/images/services/darbprint/clients/client (${i + 49}).webp`,
    })),
  ];

  // Start auto-play
  const startAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % clientSlides.length);
    }, 5000);
  };

  // Stop auto-play
  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  // Auto-play effect
  useEffect(() => {
    if (isAutoPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isAutoPlaying, clientSlides.length]);

  // Navigation functions
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % clientSlides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + clientSlides.length) % clientSlides.length,
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Touch/Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (touchStartX.current !== null) {
      touchEndX.current = e.clientX;
    }
  };

  const handleMouseUp = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Render slide content
  const renderSlideContent = (slide, slideIndex) => (
    <div
      key={slideIndex}
      className={`absolute w-full transition-all duration-500 ease-in-out ${
        slideIndex === currentSlide
          ? "opacity-100 translate-x-0"
          : slideIndex < currentSlide
            ? "opacity-0 -translate-x-full"
            : "opacity-0 translate-x-full"
      }`}
      style={{ direction: "ltr" }}
    >
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {slide.map((logo, logoIndex) => {
          const item = (
            <div
              key={logoIndex}
              className="bg-gray-100 rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 flex items-center justify-center h-24 sm:h-32 md:h-28 lg:h-36 transition-transform hover:scale-105"
              style={{ direction: "ltr" }}
            >
              <Image
                src={
                  logo.src ||
                  "/images/services/darbprint/clients/placeholder.svg"
                }
                alt={logo.name}
                width={200}
                height={200}
                className="max-h-12 sm:max-h-14 md:max-h-16 lg:max-h-20 w-auto object-contain pointer-events-none"
                loading="eager"
                draggable={false}
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
                {item}
              </motion.div>
            );
          }

          return item;
        })}
      </div>
    </div>
  );

  // Main render
  const renderContent = () => {
    // دالة لتنظيف قيم الـ CSS
    const cleanCSSValue = (value) => {
      if (!value) return null;

      // إزالة الفاصلة المنقوطة من نهاية القيمة
      const cleaned = value.toString().replace(/;+$/, "").trim();

      // التحقق من صحة اللون
      if (
        cleaned.match(/^#[0-9A-Fa-f]{3,6}$/) ||
        cleaned.match(/^rgb\(/) ||
        cleaned.match(/^rgba\(/) ||
        cleaned.match(/^hsl\(/) ||
        cleaned.match(/^hsla\(/)
      ) {
        return cleaned;
      }

      // إذا كانت القيمة تحتوي على CSS متعدد، استخرج اللون فقط
      const colorMatch = cleaned.match(/#[0-9A-Fa-f]{3,6}/);
      if (colorMatch) {
        return colorMatch[0];
      }

      return cleaned;
    };

    const headerContent = (
      <div className="text-center mb-6 sm:mb-8">
        {badge && (
          <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
            <div
              className="py-1 px-3 text-xs sm:text-sm font-medium"
              style={{
                color: cleanCSSValue("#004B4B"),
                direction: "ltr",
              }}
            >
              {i18n.language === "ar" ? "— عملاؤنا —" : "— Our Clients —"}
            </div>
          </div>
        )}

        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
          style={{ direction: "ltr" }}
        >
          <span
            style={{
              color: cleanCSSValue(titleColor) || "#2F2E0C",
              fontSize: titleSize || "inherit",
            }}
          >
            {title || "Our Clients"}
          </span>
        </h2>

        <p
          className="font-normal"
          style={{
            color: cleanCSSValue(subtitleColor) || "#2F2E0C",
            fontSize: subtitleSize || "1.125rem",
            direction: "ltr",
          }}
        >
          {i18n.language === "ar"
            ? "نفخر بخدمة المؤسسات التي تعتمد علينا للحصول على حلول طباعة عالية الجودة وموثوقة"
            : "We proudly serve organizations that rely on us for high-quality, reliable printing solutions"}
        </p>
      </div>
    );

    const sliderContent = (
      <>
        {/* Slider container */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
          style={{ direction: "ltr", minHeight: "480px" }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="relative h-full">
            {clientSlides.map((slide, slideIndex) =>
              renderSlideContent(slide, slideIndex),
            )}
          </div>
        </div>

        {/* Pagination dots */}
        <div
          className="flex justify-center mt-6 sm:mt-8 gap-2"
          style={{ direction: "ltr" }}
        >
          {clientSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 rounded-full focus:outline-none
                ${
                  currentSlide === index
                    ? "w-8 bg-[#00D1D1]"
                    : "w-2 bg-gray-400 hover:bg-gray-600"
                }
                h-2 
                after:content-[''] after:absolute after:inset-0 after:w-[44px] after:h-[44px] 
                after:rounded-full after:mx-auto after:-top-[18px] after:-left-[18px]
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </>
    );

    if (animation) {
      return (
        <section className="py-8 sm:py-12 md:py-16 bg-white" dir="ltr">
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
        className="py-8 sm:py-12 md:py-16 dark:bg-black bg-white"
        dir="ltr"
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
