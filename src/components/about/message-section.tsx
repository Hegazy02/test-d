"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MessageSection() {
  const { i18n, t } = useTranslation();
  const isArabic = i18n.language === "ar"; // تحديد إذا كانت اللغة عربية

  return (
    <section
      className="relative overflow-hidden"
      aria-labelledby="message-heading"
      role="region"
    >
      {/* Background Image - Updated positioning */}
      <div
        className={`absolute bottom-[-100px] -z-[1] sm:block ${
          isArabic ? "right-[-100px]" : "left-[-100px]"
        }`}
      >
        <Image
          src="/images/about/message/world.webp"
          alt=""
          width={600}
          height={600}
          className={`object-contain w-full h-full ${
            isArabic ? "scale-x-[-1]" : ""
          }`}
          priority
        />
      </div>
      <div className="py-4 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="max-w-8xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-8">
            {/* Left side: Label and Title */}
            <div className="lg:w-1/3 text-left">
              <motion.div
                className="mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium dark:text-white text-[#004B4B]">
                  {t("aboutUs.our_message_label")}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h2
                  id="message-heading"
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight dark:text-white text-[#004B4B]"
                >
                  {t("aboutUs.our_message_title")}
                </h2>
              </motion.div>
            </div>

            {/* Right side: Message content */}
            <motion.div
              className="lg:w-2/3 border border-gray-500 p-4 sm:p-6 lg:p-8 shadow-lg dark:bg-[#0D0D0D] bg-[#F5F5F5]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="space-y-6 sm:space-y-8">
                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-700 leading-relaxed mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                  viewport={{ once: true, amount: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: t("aboutUs.message_paragraph_1"),
                  }}
                />

                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-700 leading-relaxed mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  viewport={{ once: true, amount: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: t("aboutUs.message_paragraph_2"),
                  }}
                />

                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-700 leading-relaxed mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                  viewport={{ once: true, amount: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: t("aboutUs.message_paragraph_3"),
                  }}
                />

                <motion.p
                  className="text-base sm:text-lg lg:text-xl dark:text-white text-gray-700 leading-relaxed mb-6 sm:mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                  viewport={{ once: true, amount: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: t("aboutUs.message_paragraph_4"),
                  }}
                />

                <motion.p
                  className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 sm:mb-8 italic dark:text-white text-[#004B4B]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                  viewport={{ once: true, amount: 0.5 }}
                  dangerouslySetInnerHTML={{
                    __html: t("aboutUs.message_closing"),
                  }}
                />

                <motion.div
                  className="border-t border-gray-300 pt-4 sm:pt-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                        <Image
                          src="/images/about/Mahmoud.png"
                          alt={t("aboutUs.ceo_name")}
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold dark:text-white text-[#004B4B]">
                          {t("aboutUs.ceo_name")}
                        </h3>
                        <p className="text-sm sm:text-base dark:text-white text-gray-600">
                          {t("aboutUs.ceo_title")}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm sm:text-base dark:text-white text-gray-500">
                        {t("aboutUs.message_date")}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
