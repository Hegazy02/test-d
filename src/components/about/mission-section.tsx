"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/spotlight-card";

export default function MissionSection() {
  const { i18n, t } = useTranslation();

  return (
    <section className="py-10 ">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Top label */}
          <motion.div
            className="inline-flex items-center justify-center mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium dark:text-white text-[#004B4B]">
              {t("aboutUs.lendo_mission_label")}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 lg:mb-16 leading-tight dark:text-white text-[#004B4B] "
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t("aboutUs.mission_title")}
          </motion.h2>

          {/* Three columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <GlowCard className="group relative text-center mb-8 md:mb-0 dark:bg-[#434343] bg-gray-200 border border-gray-400 p-6 min-h-[300px] w-[360px] flex-1 flex flex-col justify-center items-center">
              <div className="space-y-4 z-[40] break-words">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 dark:text-white text-[#004B4B] z-[40]">
                  {t("aboutUs.help_companies_grow")}
                </h3>
                <p className="dark:text-white text-gray-600 leading-relaxed text-center text-sm z-[40]">
                  {t("aboutUs.help_companies_grow_description")}
                </p>
              </div>
            </GlowCard>
            <GlowCard className="group relative text-center mb-8 md:mb-0 dark:bg-[#434343] bg-gray-200 border border-gray-400 p-6 min-h-[300px] w-[360px] flex-1 flex flex-col justify-center items-center">
              <div className="space-y-4 z-[40] break-words">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 dark:text-white text-[#004B4B] z-[40]">
                  {t("aboutUs.create_jobs")}
                </h3>
                <p className="dark:text-white text-gray-600 leading-relaxed text-center text-sm z-[40]">
                  {t("aboutUs.create_jobs_description")}
                </p>
              </div>
            </GlowCard>
            <GlowCard className="group relative text-center sm:col-span-2 md:col-span-1 dark:bg-[#434343] bg-gray-200 border border-gray-400 p-6 min-h-[300px] w-[360px] flex-1 flex flex-col justify-center items-center">
              <div className="space-y-4 z-[40] break-words">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 dark:text-white text-[#004B4B] z-[40]">
                  {t("aboutUs.contribute_economy")}
                </h3>
                <p className="dark:text-white text-gray-600 leading-relaxed text-center text-sm z-[40]">
                  {t("aboutUs.contribute_economy_description")}
                </p>
              </div>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
