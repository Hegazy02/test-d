"use client";

import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";

export default function InvestorsSection() {
  const { i18n, t } = useTranslation();

  return (
    <section className="py-10 bg-white">
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
            <span
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium"
              style={{ color: "#004B4B" }}
            >
              {t("aboutUs.our_investors_label")}
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 leading-tight"
            style={{ color: "#004B4B" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t("aboutUs.investors_title")}
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 md:mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {t("aboutUs.investors_subtitle")}
          </motion.p>

          {/* Investors Grid with Full-Height Dividers - Desktop version */}
          <motion.div
            className="hidden sm:block max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="grid grid-cols-4 relative min-h-[250px] sm:min-h-[300px]">
              {/* Vertical dividers that span full height */}
              <motion.div
                className="absolute left-1/4 top-0 bottom-0 w-px bg-gray-300"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                viewport={{ once: true }}
                style={{ transformOrigin: "center top" }}
              ></motion.div>
              <motion.div
                className="absolute left-2/4 top-0 bottom-0 w-px bg-gray-300"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                viewport={{ once: true }}
                style={{ transformOrigin: "center top" }}
              ></motion.div>
              <motion.div
                className="absolute left-3/4 top-0 bottom-0 w-px bg-gray-300"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
                viewport={{ once: true }}
                style={{ transformOrigin: "center top" }}
              ></motion.div>

              {/* Top Row - 4 columns */}
              <motion.div
                className="flex items-center justify-center py-6 sm:py-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="text-center">
                  <div
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2"
                    style={{ color: "#004B4B" }}
                  >
                    {t("aboutUs.company_500")}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-center py-6 sm:py-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="text-center">
                  <div
                    className="text-lg sm:text-xl lg:text-2xl font-bold mb-1"
                    style={{ color: "#004B4B" }}
                  >
                    {t("aboutUs.derayah")}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">
                    {t("aboutUs.ventures")}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-center py-6 sm:py-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="text-center">
                  <div
                    className="text-lg sm:text-xl lg:text-2xl font-bold mb-1"
                    style={{ color: "#004B4B" }}
                  >
                    {t("aboutUs.seedra")}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">
                    {t("aboutUs.ventures")}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center justify-center py-6 sm:py-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.1 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="text-center">
                  <div
                    className="text-lg sm:text-xl lg:text-2xl font-bold mb-1"
                    style={{ color: "#004B4B" }}
                  >
                    {t("aboutUs.shorooq")}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">
                    {t("aboutUs.partners")}
                  </div>
                </div>
              </motion.div>

              {/* Bottom Row - 2 columns centered */}
              <motion.div
                className="col-start-2 flex items-center justify-center py-6 sm:py-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="text-center">
                  <div className="text-base sm:text-lg text-gray-600 mb-1">
                    {t("aboutUs.sanabil_investments")}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 uppercase tracking-wider">
                    {t("aboutUs.investment_company")}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="col-start-3 flex items-center justify-center py-6 sm:py-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 1.3 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-400 rounded-full mr-2"></div>
                    <div
                      className="text-base sm:text-lg lg:text-xl font-bold"
                      style={{ color: "#004B4B" }}
                    >
                      {t("aboutUs.abventures")}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Mobile version - stacked grid */}
          <div className="sm:hidden grid grid-cols-1 gap-6">
            {[
              { name: "company_500", delay: 0.8 },
              { name: "derayah", subtext: "ventures", delay: 0.9 },
              { name: "seedra", subtext: "ventures", delay: 1.0 },
              { name: "shorooq", subtext: "partners", delay: 1.1 },
              {
                name: "sanabil_investments",
                subtext: "investment_company",
                delay: 1.2,
              },
              { name: "abventures", delay: 1.3 },
            ].map((investor, index) => (
              <motion.div
                key={investor.name}
                className="py-4"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: investor.delay,
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="text-center">
                  {investor.name === "company_500" ? (
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: "#004B4B" }}
                    >
                      {t(`aboutUs.${investor.name}`)}
                    </div>
                  ) : investor.name === "abventures" ? (
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-6 h-6 border-2 border-gray-400 rounded-full mr-2"></div>
                      <div
                        className="text-base font-bold"
                        style={{ color: "#004B4B" }}
                      >
                        {t(`aboutUs.${investor.name}`)}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="text-lg font-bold mb-1"
                        style={{ color: "#004B4B" }}
                      >
                        {t(`aboutUs.${investor.name}`)}
                      </div>
                      {investor.subtext && (
                        <div className="text-xs text-gray-600 uppercase tracking-wider">
                          {t(`aboutUs.${investor.subtext}`)}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
