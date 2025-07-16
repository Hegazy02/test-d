"use client";
import type React from "react";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

type Testimonial = {
  id: number;
  name: string;
  nameAr?: string;
  company: string;
  companyAr?: string;
  logo: string;
  second_image?: string; // إضافة الخاصية الجديدة
  quote: string;
  quoteAr?: string;
  color: string;
  textColor: string;
};

// Translation object for static text
const translations = {
  en: {
    title: "Case Studies",
    subtitle: "From Brief to Bravo: Event Case Studies",
    boothTitle: "Success Stories",
    boothSubtitle:
      "From Planning to Execution: Success Stories from Our Events",
    previousSlide: "Previous slide",
    nextSlide: "Next slide",
    goToSlide: "Go to slide",
  },
  ar: {
    title: "من التخطيط إلى التنفيذ: قصص نجاح من فعالياتنا",
    subtitle: "",
    boothTitle: "قصص نجاح",
    boothSubtitle: "من التخطيط إلى التنفيذ: قصص نجاح من فعالياتنا",
    previousSlide: "الشريحة السابقة",
    nextSlide: "الشريحة التالية",
    goToSlide: "انتقل إلى الشريحة",
  },
};

export function TestimonialSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const { i18n } = useTranslation();
  const pathname = usePathname();
  const lang = i18n.language;
  const isArabic = lang === "ar";

  // Check if we're on booth-production page
  const isBoothProduction =
    pathname === "/ar/booth-production" || pathname === "/en/booth-production";

  const t = isArabic ? translations.ar : translations.en;

  // Get the appropriate title and subtitle based on the page
  const getTitle = () => {
    if (isBoothProduction) {
      return isArabic ? t.boothTitle : t.boothTitle;
    }
    return t.title;
  };

  const getSubtitle = () => {
    if (isBoothProduction) {
      return isArabic ? t.boothSubtitle : t.boothSubtitle;
    }
    return t.subtitle;
  };

  // Check if screen is mobile
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      goToNext();
    } else if (touchEndX.current - touchStartX.current > 50) {
      goToPrev();
    }
    setIsAutoPlaying(true);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying]);

  // Render single testimonial card
  const renderTestimonialCard = (testimonialItem: Testimonial) => (
    <div
      className="dark:bg-[#404040] bg-white rounded-lg flex flex-col aspect-square w-full"
      style={{ direction: "ltr" }}
    >
      <div
        className="flex dark:bg-[#404040]"
        style={{ height: "50%", direction: "ltr" }}
      >
        {/* Left part - Logo */}
        <div className="w-1/2 p-0 m-0 dark:bg-[#404040] flex items-center justify-center">
          <div className="w-[80%] h-[80%] relative dark:bg-[#404040]">
            <Image
              src={testimonialItem.logo}
              alt={`${isArabic && testimonialItem.companyAr ? testimonialItem.companyAr : testimonialItem.company} logo`}
              fill
              style={{ objectFit: "contain" }}
              className="p-0 m-0 dark:invert brightness-0"
            />
          </div>
        </div>

        {/* Right part - Either second image or name/company */}
        <div
          className={`w-1/2 flex items-center justify-center ${testimonialItem.color}`}
        >
          {testimonialItem.second_image ? (
            // If second_image exists, show the image
            <div className="w-full h-full relative">
              <Image
                src={testimonialItem.second_image}
                alt={`${isArabic && testimonialItem.companyAr ? testimonialItem.companyAr : testimonialItem.company} second image`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          ) : (
            // If no second_image, show the original name/company content
            <div className="text-left px-2" style={{ direction: "ltr" }}>
              <h3
                className={`font-bold ${testimonialItem.textColor} ${isArabic ? "font-arabic" : ""} text-sm sm:text-base`}
              >
                {isArabic && testimonialItem.nameAr
                  ? testimonialItem.nameAr
                  : testimonialItem.name}
                ,
              </h3>
              <p
                className={`${testimonialItem.textColor} ${isArabic ? "font-arabic" : ""} text-xs sm:text-sm`}
              >
                {isArabic && testimonialItem.companyAr
                  ? testimonialItem.companyAr
                  : testimonialItem.company}
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Bottom half - Quote */}
      <div
        className="p-4 overflow-auto dark:bg-[#404040] bg-gray-50"
        style={{ height: "50%", direction: "ltr" }}
      >
        <p
          className={`dark:text-white text-gray-700 text-xs sm:text-sm text-left ${isArabic ? "font-arabic" : ""}`}
        >
          {isArabic && testimonialItem.quoteAr
            ? testimonialItem.quoteAr
            : testimonialItem.quote}
        </p>
      </div>
    </div>
  );

  return (
    <section className="py-16 dark:bg-[#1C1C1C]  bg-white" dir="ltr">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={`heading font-bold dark:text-white text-[#333] mb-2 ${isArabic ? "font-arabic" : ""}`}
            style={{ direction: "ltr" }}
          >
            {getTitle()}
          </h2>

          {getSubtitle() && (
            <p
              className={`subheading dark:text-white text-[#333] ${isArabic ? "font-arabic" : ""}`}
              style={{ direction: "ltr" }}
            >
              {getSubtitle()}
            </p>
          )}
        </div>
        <div
          className="relative max-w-6xl mx-auto"
          style={{ direction: "ltr" }}
        >
          <div
            className="relative overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ direction: "ltr" }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                direction: "ltr",
              }}
            >
              {testimonials.map((testimonial, mainIndex) => (
                <div
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                >
                  {isMobile ? (
                    // Mobile view - single card
                    <div className="max-w-[320px] mx-auto">
                      {renderTestimonialCard(testimonial)}
                    </div>
                  ) : (
                    // Desktop view - 3 cards
                    <div
                      className="grid grid-cols-1 md:grid-cols-3 gap-6"
                      style={{ direction: "ltr" }}
                    >
                      {Array.from({ length: 3 }).map((_, idx) => {
                        const index = (mainIndex + idx) % testimonials.length;
                        const testimonialItem = testimonials[index];
                        return (
                          <div key={testimonialItem.id}>
                            {renderTestimonialCard(testimonialItem)}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Arrows - Hidden on mobile */}
          <button
            onClick={goToPrev}
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 
                       flex items-center justify-center rounded-full 
                       bg-gray-200 hover:bg-gray-300 text-gray-700 z-10
                       hidden sm:flex"
            style={{
              left: "-0.5rem",
              right: "auto",
            }}
            aria-label={t.previousSlide}
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 
                       flex items-center justify-center rounded-full 
                       bg-gray-200 hover:bg-gray-300 text-gray-700 z-10
                       hidden sm:flex"
            style={{
              right: "-0.5rem",
              left: "auto",
            }}
            aria-label={t.nextSlide}
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </button>
          {/* Pagination Dots */}
          <div
            className="flex justify-center mt-6 sm:mt-8"
            style={{ direction: "ltr" }}
          >
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 sm:w-3 sm:h-3 mx-1 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-gray-600 w-6 sm:w-8 "
                    : "bg-gray-300"
                )}
                aria-label={`${t.goToSlide} ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
