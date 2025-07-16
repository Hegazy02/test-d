"use client";

import { useTranslation } from "react-i18next";

import { motion } from "framer-motion";
import { useState } from "react";

export default function TeamSection() {
  const { i18n, t } = useTranslation();
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleImageError = (memberName: string) => {
    setImageErrors((prev) => ({ ...prev, [memberName]: true }));
  };

  const teamMembers = [
    {
      name: "Mahmoud Elrantissi",
      title: "Chief Executive",
      key: "mahmoud",
    },
    {
      name: "Ayhma Troudi",
      title: "Managing Director",
      key: "ayhma",
    },
    {
      name: "Ayman Hnydi",
      title: "Business Development Manager",
      key: "ayman",
    },
    {
      name: "Samar Tellawi",
      title: "Head of Post Production",
      key: "samar",
    },
    {
      name: "Housam Elrantissi",
      title: "Film Maker",
      key: "housam",
    },
    {
      name: "Sarah Symeh",
      title: "Client Service",
      key: "sarah",
    },
    {
      name: "Marwa Olwan",
      title: "Marketing Specialist",
      key: "marwa",
    },
    {
      name: "Yasmin Ahmed",
      title: "Administrative Assistant",
      key: "yasmin",
    },
    {
      name: "Mohammed Eldouse",
      title: "Graphic Designer",
      key: "mohammed_eldouse",
    },
    {
      name: "Mohammed Qana",
      title: "Full Stack Developer",
      key: "mohammed_qana",
    },
    {
      name: "Houssam Ahmed",
      title: "Mobile App Developer",
      key: "houssam_ahmed",
    },
  ];

  return (
    <section
      className="py-10 bg-white"
      aria-labelledby="team-heading"
      role="region"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Top label */}
          <motion.div
            className="flex justify-center mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <span
              className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium"
              style={{ color: "#004B4B" }}
            >
              — Our Team —
            </span>
          </motion.div>

          {/* Section heading and description */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <motion.h2
              id="team-heading"
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 sm:mb-6"
              style={{ color: "#004B4B" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Meet Our Creative Team
            </motion.h2>
            <motion.p
              className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Our talented team of professionals brings creativity, expertise,
              and passion to every project we undertake.
            </motion.p>
          </div>

          {/* Team Grid - Responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6 sm:gap-8">
            {teamMembers.map((member, index) => (
              <motion.article
                key={member.key}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.1 * index,
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <div
                  className="relative mb-4 sm:mb-6 mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-52 md:h-52 lg:w-56 lg:h-56 overflow-hidden rounded-2xl"
                  style={{ backgroundColor: "#004B4B" }}
                >
                  {imageErrors[member.key] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <div className="text-center">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 bg-gray-300 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Photo not available
                        </p>
                      </div>
                    </div>
                  ) : (
                    <img
                      src="/images/about/ourteam/image.webp"
                      alt={`Portrait of ${member.name}, ${member.title}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={() => handleImageError(member.key)}
                      width="224"
                      height="224"
                    />
                  )}
                </div>
                <h3
                  className="text-base sm:text-lg font-bold mb-1 sm:mb-2"
                  style={{ color: "#004B4B" }}
                >
                  {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {member.title}
                </p>
              </motion.article>
            ))}
          </div>

          {/* Additional team info */}
          <motion.div
            className="mt-12 sm:mt-16 md:mt-20 text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true, amount: 0.5 }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
}
