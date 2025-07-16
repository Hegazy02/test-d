"use client";
import Image from "next/image";
import React from "react";
import { useTranslation } from "react-i18next";

const WhyDarbProductions = ({ features }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // النصوص المترجمة
  const translations = {
    en: {
      title: "Why Darb Productions?",
      subtitle: "Practical Booth Solutions That Deliver Results on the Ground",
    },
    ar: {
      title: "لماذا درب برودكشنز ؟",
      subtitle: "تنفيذ احترافي للفعاليات يُحوّل رؤيتك إلى واقع",
    },
  };

  const t = lang === "ar" ? translations.ar : translations.en;

  return (
    <section className="py-4 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8 w-full dark:bg-black bg-white px-8 sm:px-0 sm:mx-0">
      <div className="max-w-7xl mx-auto ">
        <header className="text-center mb-10 sm:mb-16">
          <h2 className="h2CSS mb-2">{t.title}</h2>
          <p className="h2-description-text">{t.subtitle}</p>
        </header>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 sm:gap-x-10 lg:gap-x-16 gap-y-5 sm:gap-y-8 mt-8 sm:mt-16">
          {features.map((feature, index) => (
            <article key={index} className="flex flex-col items-start">
              <div className="mb-4 sm:mb-6">
                <Image
                  src={feature.iconSrc || "/placeholder.svg"}
                  alt={feature.altText}
                  width={72}
                  height={72}
                  className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-[72px] lg:h-[72px] dark:invert"
                />
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold dark:text-white text-[#2F2E0C] mb-2 sm:mb-4">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-md dark:text-white text-[#2F2E0C] leading-relaxed">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default WhyDarbProductions;
