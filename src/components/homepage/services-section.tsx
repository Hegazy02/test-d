"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useTheme } from "next-themes"; // Add this import at the top

interface TranslatedContent {
  en: string;
  ar: string;
}

interface Service {
  id: string;
  image: string;
  imageDark?: string; // Optional dark mode image
  imageLight?: string; // Optional light mode image
  alt: TranslatedContent;
  title: TranslatedContent;
  description: TranslatedContent;
  features?: {
    en: string[];
    ar: string[];
  };
}

interface ServicesSectionProps {
  title: TranslatedContent;
  desc: TranslatedContent;
  services: Service[];
  isDecSeperete: boolean;
  gridCountDesk: number;
}

const getGridCols = (cols: number | undefined) => {
  switch (cols) {
    case 2:
      return "md:grid-cols-2";
    case 3:
      return "md:grid-cols-3";
    case 4:
      return "md:grid-cols-4";
    default:
      return "md:grid-cols-3";
  }
};

export default function ServicesSection({
  title,
  desc,
  isDecSeperete,
  services,
  gridCountDesk,
}: ServicesSectionProps) {
  const { i18n } = useTranslation();
  const { theme } = useTheme(); // Add this hook
  const lang = i18n.language;

  return (
    <section
      aria-labelledby="services-heading"
      className="mb-10 px-[7px] sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <header className="text-center mx-auto mb-4 md:mb-8 max-w-[1070px]">
          <h2
            id="services-heading"
            className={`text-[28px] sm:text-[36px] md:text-[46px] leading-tight md:leading-[52px] tracking-[0.92px] mt-5 sm:mt-5 ${
              isDecSeperete === true ? "hidden" : "hidden sm:block"
            }`}
            style={{
              fontSize: "clamp(1rem, 2vw, 3rem)",
              lineHeight: "clamp(2rem, 4vw, 4.5rem)",
            }}
          >
            <span className="font-bold dark:text-white text-gray-900">
              {title[lang]}
            </span>{" "}
            <span className="font-normal h2-description-text2">
              {desc[lang]}
            </span>
          </h2>

          <h2
            id="services-heading"
            className={`text-[28px] mt-5 sm:mt-5 ${
              isDecSeperete === true
                ? ""
                : "sm:hidden leading-tight md:leading-[52px] tracking-[0.92px]"
            }`}
          >
            <div className="font-bold h2CSS">{title[lang]}</div>
            <div
              className={`${
                isDecSeperete === true
                  ? "h2-description-text2"
                  : "h2-description-text"
              }`}
            >
              {desc[lang]}
            </div>
          </h2>
        </header>

        <div
          className={`grid grid-cols-1 ${getGridCols(gridCountDesk)} gap-13 md:gap-10 lg:gap-13 mt-20`}
        >
          {services.map((service) => {
            return (
              <Card
                key={service.id}
                className="group border dark:border-gray-200/50 border-gray-200/50 dark:bg-[#494949] bg-[#D3D3D3]/31 rounded-none flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 relative transition-opacity duration-1000
    h-auto sm:h-full"
              >
                {/* Main Image Container - On top of background */}
                <div className=" top-0 mx-auto -mt-[2rem] z-10">
                  {/* Card Container */}
                  <div className="w-16 h-16 sm:w-[82px] sm:h-[82px] rounded-xl dark:bg-[#051719] bg-[#DFDFDF] flex items-center justify-center border border-[#3E5D63] overflow-hidden relative">
                    {/* Mask background image - Positioned absolutely */}
                    <Image
                      src="/images/Mask group.png"
                      alt="Mask Background"
                      fill
                      className="object-cover z-0"
                    />

                    {/* Foreground image - Logo/Icon */}
                    <div className="relative w-[80%] h-[80%] p-2 z-10">
                      <Image
                        src={
                          // Check for theme-specific images first
                          theme === "dark"
                            ? service.imageDark || service.image // Use dark image or fallback to default
                            : service.imageLight || service.image // Use light image or fallback to default
                        }
                        alt={service.alt[lang]}
                        fill
                        className="object-contain dark:hidden" // Only show in light mode
                      />
                      <Image
                        src={
                          service.imageDark || service.image // Use dark image or fallback to default
                        }
                        alt={service.alt[lang]}
                        fill
                        className="object-contain hidden dark:block" // Only show in dark mode
                      />
                    </div>
                  </div>
                </div>
                {/* Hover Mask Overlay */}
                <Image
                  src="/services_mask.webp"
                  alt="Hover Mask"
                  fill
                  className="object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />

                <CardContent className="p-6 sm:p-8 flex flex-col justify-start text-center mt-[40px] z-20 flex-grow-0 sm:flex-grow">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold dark:text-white  text-black mb-4 leading-tight ">
                    {service.title[lang]}
                  </h3>

                  {/* Description */}
                  {service.description && (
                    <p className="dark:text-white text-gray-900 text-sm sm:text-base leading-relaxed mb-4">
                      {service.description[lang]}
                    </p>
                  )}

                  {/* Features List */}
                  {service?.features && service.features[lang]?.length > 0 && (
                    <ul className="text-gray-400 text-xs sm:text-sm space-y-2 mt-auto">
                      {service.features[lang].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-teal-400 mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
                {/* Hover Mask Overlay */}
                <Image
                  src="/services_mask.webp"
                  alt="Hover Mask"
                  fill
                  className="object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
