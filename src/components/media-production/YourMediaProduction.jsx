"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import CircularTestimonialsImages from "@/components/ui/circular-testimonials-images";

const translations = {
  title: {
    en: "Your Media Production Partner in Saudi Arabia & the UAE",
    ar: "شريكك في الإنتاج الإعلامي في المملكة العربية السعودية والإمارات",
  },
  description1: {
    en: "Whether you're planning corporate videos, event coverage, branded content, or podcasts — we're here to bring your vision to life.",
    ar: "سواء كنت تخطط لفيديوهات مؤسسية، تغطية فعاليات، محتوى علامتك التجارية، أو بودكاست — نحن هنا لتحقيق رؤيتك على أرض الواقع.",
  },
  description2: {
    en: "Darb Productions is your trusted media partner, offering full production support across Saudi Arabia and United Arab emirates",
    ar: "درب برودكشنز هو شريكك الإعلامي الموثوق، نقدم دعمًا كاملاً للإنتاج في السعودية والإمارات",
  },
  buttonText: {
    en: "Contact us",
    ar: "اتصل بنا",
  },
  imageAlt: {
    en: "Media Production Services",
    ar: "خدمات الإنتاج الإعلامي",
  },
};

const YourMediaProduction = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  // Ensure we have a valid language key
  const validLang = lang === "ar" || lang === "en" ? lang : "en";

  return (
    <div className="dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C] w-full min-h-full sm:min-h-[60vh] flex flex-col md:flex-row bg-[#F5F5F5] gap-4">
      {/* Text Column */}
      <div className="w-full md:w-1/2 flex items-center justify-center order-1 p-6 md:p-10">
        <div className="flex flex-col max-w-[750px] w-full gap-4">
          <h2 className="h2CSS font-bold">{translations.title[validLang]}</h2>
          <p className="text-lg dark:text-white text-gray-500">
            {translations.description1[validLang]}
          </p>
          <p className="text-lg dark:text-white text-gray-500">
            {translations.description2[validLang]}
          </p>
          <Link href="https://darbprint.com/" className="max-w-fit">
            <button
              className="bg-gray-500/20 dark:text-white text-black  hover:text-white hover:bg-gray-500 rounded-2xl 
                        px-5 py-2.5 sm:px-6 sm:py-3 md:px-[3.5rem] md:py-[0.9rem]
                        border-2 border-gray-500/50 max-w-fit  transition
                        font-bold text-sm sm:text-base md:text-xl"
            >
              {translations.buttonText[validLang]}
            </button>
          </Link>
        </div>
      </div>

      {/* Image Column */}
      <div className="w-[66%] max-w-[66%] md:w-1/2 flex items-center justify-center order-2 p-6 md:p-10 mx-auto">
        <CircularTestimonialsImages
          images={[
            {
              src: "/images/media-production/YourMediaProduction/1.webp",
              alt: "Testimonial 1",
            },
            {
              src: "/images/media-production/YourMediaProduction/2.webp",
              alt: "Testimonial 2",
            },
            {
              src: "/images/media-production/YourMediaProduction/3.webp",
              alt: "Testimonial 3",
            },
            {
              src: "/images/media-production/YourMediaProduction/4.webp",
              alt: "Testimonial 4",
            },
            {
              src: "/images/media-production/YourMediaProduction/5.webp",
              alt: "Testimonial 5",
            },
          ]}
          autoplay={true}
        />
      </div>
    </div>
  );
};

export default YourMediaProduction;
