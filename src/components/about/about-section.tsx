"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection() {
  const { i18n, t } = useTranslation();

  return (
    <section className="py-10 " aria-labelledby="about-heading" role="region">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Main heading */}
          <motion.div
            className="text-center mb-8 sm:mb-10 md:mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 dark:text-white text-[#004B4B]"
            >
              {t("aboutUs.about_company")}
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl dark:text-white text-gray-700 font-medium">
              {t("aboutUs.company_values")}
            </p>
          </motion.div>

          {/* Three sections */}
          <div className="space-y-10 sm:space-y-12 lg:space-y-16">
            {/* Beginning section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl dark:text-white text-[#004B4B] font-bold mb-4 sm:mb-6">
                {t("aboutUs.beginning_title")}
              </h3>
              <p
                className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: t("aboutUs.beginning_description"),
                }}
              />
            </motion.div>

            {/* Present section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white text-[#004B4B] mb-4 sm:mb-6">
                {t("aboutUs.present_title")}
              </h3>
              <p
                className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: t("aboutUs.present_description"),
                }}
              />
            </motion.div>

            {/* Future section */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 dark:text-white text-[#004B4B] sm:mb-6">
                {t("aboutUs.future_title")}
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  viewport={{ once: true, amount: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: t("aboutUs.future_description_1"),
                  }}
                />
                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                  viewport={{ once: true, amount: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: t("aboutUs.future_description_2"),
                  }}
                />
                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-600 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                  viewport={{ once: true, amount: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: t("aboutUs.future_description_3"),
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
