"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { createLocalizedPath } from "../Nav";

export default function HeroSection() {
  const { i18n, t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const handleContactClick = () => {
    router.push(createLocalizedPath("/contact", pathname));
  };
  return (
    <section
      className="relative min-h-[50vh] py-8 sm:py-16 md:py-20 lg:py-32 flex items-center justify-center force-ltr dark:bg-[#1C1C1C] bg-[#004B4B]"
      role="banner"
      aria-labelledby="hero-title"
      dir="ltr"
    >
      <BackgroundGradientAnimation
        size="300px"
        blendingValue="soft-light"
        containerClassName="absolute inset-0 z-0"
        interactive={true}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>

      {/* Content container */}
      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          {/* Main heading */}
          <motion.h1
            id="hero-title"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t("aboutUs.hero_title")}
          </motion.h1>

          {/* Description paragraph */}
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-4 sm:mb-6 max-w-3xl mx-auto leading-relaxed"
            role="text"
            aria-describedby="hero-title"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            dangerouslySetInnerHTML={{ __html: t("aboutUs.hero_description") }}
          />

          {/* CTA Button */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Button
              size="lg"
              className="bg-white text-[#004B4B] hover:bg-gray-100 focus:bg-gray-100 font-semibold px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg rounded-lg transition-all duration-300 transform hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#004B4B]"
              aria-label={`${t("aboutUs.join_us")} - Learn more about our services`}
              onClick={handleContactClick}
            >
              {t("aboutUs.join_us")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
