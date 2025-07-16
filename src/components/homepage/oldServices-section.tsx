"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

interface TranslatedContent {
  en: string;
  ar: string;
}

interface Service {
  id: string;
  image: string;
  alt: TranslatedContent;
  title: TranslatedContent;
  description: TranslatedContent;
  features: {
    en: string[];
    ar: string[];
  };
}

interface ServicesSectionProps {
  title: String;
  desc: String;
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
  const lang = i18n.language;

  return (
    <section
      aria-labelledby="services-heading"
      className=" mb-10 px-[7px] sm:px-6 lg:px-8"
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
            <span className="font-bold text-gray-900">{title[lang]}</span>{" "}
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
          className={`grid grid-cols-1 ${getGridCols(gridCountDesk)} gap-3 md:gap-8 lg:gap-10`}
        >
          {services.map((service) => (
            <Card
              key={service.id}
              className="dark:bg-[#363636] bg-white shadow-md h-full flex flex-col border-0 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 p-0"
            >
              {/* ✅ الصورة تلامس حافة الكارد من الأعلى وارتفاعها متغير حسب مقاس الصورة */}
              <div className="w-full relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden m-0 p-0">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.alt[lang]}
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain max-w-full"
                  priority={true}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* ✅ محتوى البطاقة تحت الصورة */}
              <CardContent className="p-4 sm:p-5 flex-grow m-0">
                <h3 className="text-lg sm:text-xl font-bold dark:text-white text-[#2F2E0C] mb-3">
                  {service.title[lang]}
                </h3>
                {service.description && (
                  <p className="text-sm sm:text-base dark:text-gray-300 text-[#2F2E0C] leading-relaxed mb-4">
                    {service.description[lang]}
                  </p>
                )}
                {service.features && (
                  <ul className="list-disc px-5 space-y-2 text-sm dark:text-gray-300 text-[#2F2E0C]">
                    {service.features[lang].map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
