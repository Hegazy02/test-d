"use client";

import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

export default function VisionSection() {
  const { i18n, t } = useTranslation();

  return (
    <section className="py-10 dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C] bg-[#F5F5F5]">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Vision Logos */}
            <motion.div
              className="order-2 lg:order-1 flex justify-center lg:justify-start mt-8 lg:mt-0"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
                {/* Saudi Vision 2030 Logo */}
                <div className="flex items-center justify-center h-[200px]">
                  <div className="relative w-full h-full max-w-[250px] sm:max-w-[300px]">
                    <img
                      src="/images/about/Saudi_Vision_2030_logo.svg.png"
                      alt="Saudi Vision 2030 Logo - Kingdom of Saudi Arabia"
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* UAE Vision Logo */}
                <div className="flex items-center justify-center h-[200px]">
                  <div className="relative w-full h-full max-w-[250px] sm:max-w-[300px]">
                    <img
                      src="/images/about/WE_THE_UAE- 1.png"
                      alt="UAE Vision Logo - United Arab Emirates"
                      className="object-contain w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side - Content */}
            <div className="order-1 lg:order-2">
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8  leading-tight dark:text-white text-[#004B4B]"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {t("aboutUs.vision_2030_title")}
              </motion.h2>

              <div className="space-y-4 sm:space-y-6">
                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {t("aboutUs.vision_description_1")}
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {t("aboutUs.vision_description_2")}
                </motion.p>

                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-700 leading-relaxed"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {t("aboutUs.vision_description_3")}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
