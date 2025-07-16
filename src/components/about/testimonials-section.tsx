///// src\components\about\testimonials-section.tsx

"use client";

import {
  TestimonialsColumn,
  testimonials,
} from "@/components/ui/testimonials-columns-1";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export default function TestimonialsSection() {
  const { i18n, t } = useTranslation();

  return (
    <section
      className="py-4 sm:py-6 md:py-8 bg-white relative overflow-hidden"
      style={{ maxHeight: "90vh", height: "90vh" }}
      aria-labelledby="testimonials-heading"
      role="region"
    >
      <div className="container z-10 mx-auto px-4 sm:px-6 h-full flex flex-col">
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto flex-shrink-0">
          {/* Top label - No border, bilingual */}
          <motion.div
            className="flex justify-center mb-2 sm:mb-3 md:mb-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div
              className="py-1 px-3 text-xs sm:text-sm font-medium"
              style={{ color: "#004B4B" }}
            >
              {i18n.language === "ar"
                ? "— شهادات العملاء —"
                : "— Client Testimonials —"}
            </div>
          </motion.div>

          {/* Main heading - Bilingual */}
          <motion.h2
            id="testimonials-heading"
            className="text-xl sm:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mt-2 text-center leading-tight"
            style={{ color: "#004B4B" }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {i18n.language === "ar"
              ? "ماذا يقول عملاؤنا"
              : "What Our Clients Say"}
          </motion.h2>

          {/* Subtitle - Bilingual */}
          <motion.p
            className="text-center mt-2 opacity-75 text-gray-600 text-sm sm:text-base max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {i18n.language === "ar"
              ? "اكتشف تجارب عملائنا وشهاداتهم حول جودة خدماتنا الإبداعية والإنتاجية"
              : "Discover our clients' experiences and testimonials about the quality of our creative and production services"}
          </motion.p>
        </div>

        {/* Testimonials Columns - Motion Animation */}
        <motion.div
          className="flex justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 md:mt-8 flex-grow overflow-hidden relative"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
            maxHeight: "60vh",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </motion.div>
      </div>
    </section>
  );
}

///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
///// src\components\about\testimonials-section.tsx
