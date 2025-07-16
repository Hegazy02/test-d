"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function OurServices({
  title,
  desc,
  services,
  isDecSeperete,
  gridCountDesk,
  isPNG,
  isEvent = false,
  isMedia = false,
  backgroundColor,
}) {
  return (
    <section
      aria-labelledby="services-heading"
      className="dark:bg-black bg-white mb-10 px-[7px] sm:px-6 lg:px-8 "
    >
      <div className="container mx-auto">
        {/* Heading with semantic markup for SEO */}

        <header className="text-center mx-auto mb-4 md:mb-8 max-w-[1070px] ">
          {/* للكمبيوتر */}
          <h2
            id="services-heading"
            className={`text-[28px] sm:text-[36px] md:text-[46px] leading-tight md:leading-[52px] tracking-[0.92px] dark:text-white text-[#2F2E0C] mt-5 sm:mt-5  ${isDecSeperete === true ? "hidden" : "hidden sm:block"}`}
          >
            <span className="font-bold heading">{title}</span>{" "}
            <span className="font-normal dark:text-white text-[#2F2E0C] subheading">
              {desc}
            </span>
          </h2>
          {/* للتليفون */}
          <h2
            id="services-heading"
            className={`text-[28px] dark:text-white text-[#2F2E0C] mt-5 sm:mt-5 ${isDecSeperete === true ? "" : "sm:hidden leading-tight md:leading-[52px] tracking-[0.92px]"}`}
          >
            <div className="font-bold h2CSS">{title}</div>
            <div
              className={`${isDecSeperete === true ? "h2-description-text2" : "h2-description-text"}`}
            >
              {desc}
            </div>
          </h2>
        </header>

        {/* Service cards grid with the same responsive layout */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-${gridCountDesk} gap-4 md:gap-8 lg:gap-10`}
        >
          {services.map((service) => (
            <Card
              key={service.id}
              className="group relative bg-white dark:bg-[#343434] shadow-lg flex flex-col border-0 rounded-none z-5 h-auto sm:h-full"
            >
              {/* ✅ Hover Mask Overlay يغطي الكارد بالكامل */}
              <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none">
                <Image
                  src="/mediaservicesmask.webp"
                  alt="Hover Mask"
                  fill
                  className="object-cover"
                />
                <Image
                  src="/mediaservicesmask.webp"
                  alt="Hover Mask"
                  fill
                  className="object-cover"
                />
              </div>

              {/* ✅ المحتوى الرئيسي للكارد */}
              <div className="flex flex-col sm:flex-row relative h-auto sm:h-[60%]">
                <div className="w-full sm:w-[70%] p-0 m-0 flex flex-col ">
                  <div className="w-full h-auto sm:h-[70%] flex items-center justify-start sm:ml-5 p-4 ">
                    <div className="hidden sm:block relative sm:w-[80px] sm:h-[100px] z-50 ">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.alt}
                        fill
                        className="object-contain dark:filter dark:invert dark:brightness-0 brightness-0"
                        priority={true}
                        quality={75}
                      />
                    </div>
                    <div className="relative sm:hidden z-50 w-full h-auto p-10 mb-10">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.alt}
                        fill
                        className="object-contain dark:filter dark:invert dark:brightness-0 brightness-0"
                        priority={true}
                        quality={75}
                      />
                    </div>
                  </div>
                  <div className="h-auto sm:h-[30%] flex items-center px-2 z-40">
                    <h3 className="text-sm sm:text-lg font-bold text-[#2F2E0C] dark:text-white ml-2 ">
                      <span className=" z-40"> {service.title}</span>
                    </h3>
                  </div>
                </div>
                <div className="hidden sm:block sm:w-[30%] bg-white dark:bg-[#343434]" />
              </div>

              <div className="p-4 h-auto sm:h-[40%] relative z-40">
                <p className="text-sm sm:text-md text-[#2F2E0C] dark:text-white leading-relaxed z-40">
                  <span className=" z-40">{service.description}</span>
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
