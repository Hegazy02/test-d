// src/components/about/StatsBar.tsx
"use client";

import { useState, useEffect, useRef } from "react";

export default function StatsBar() {
  const [counts, setCounts] = useState({
    years: 0,
    clients: 0,
    projects: 0,
  });

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const targetCounts = {
    years: 14,
    clients: 500,
    projects: 3000,
  };

  const duration = 2000; // 2 seconds for the animation
  const frameRate = 60; // 60 FPS
  const totalFrames = duration / (1000 / frameRate);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startCounting();
        }
      },
      {
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  const startCounting = () => {
    let frame = 0;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setCounts({
        years: Math.floor(targetCounts.years * easeOutQuart),
        clients: Math.floor(targetCounts.clients * easeOutQuart),
        projects: Math.floor(targetCounts.projects * easeOutQuart),
      });

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        // Ensure we reach the exact target numbers
        setCounts(targetCounts);
      }
    };

    requestAnimationFrame(animate);
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 flex items-center justify-center"
    >
      {/* الخط الخلفي */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-500 z-10 transform -translate-y-1/2" />

      {/* المستطيل الرئيسي */}
      <div className="relative z-20 w-[65%] dark:bg-gradient-to-r from-[#0C2B2A] to-[#1C1C1C] bg-[#f5f5f5] dark:text-white text-black py-8 px-4 shadow-lg flex flex-col sm:flex-row justify-around items-center gap-6 text-center">
        {/* العنصر 1 */}
        <div className="transform transition-all duration-1000 ease-out">
          <h3 className="text-3xl lg:text-5xl font-bold text-[#004B4B] dark:text-white transition-all duration-500">
            {formatNumber(counts.years)}
            <span
              className={`text-xl align-top transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "0.5s" }}
            >
              +
            </span>
          </h3>
          <p
            className="text-sm lg:text-lg mt-1 opacity-0 transition-opacity duration-1000 delay-300"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            Years
          </p>
        </div>

        {/* العنصر 2 */}
        <div
          className="hidden sm:block h-[100px] lg:h-[200px] w-[1px] bg-gray-400 opacity-0 transition-opacity duration-1000 delay-500"
          style={{ opacity: isVisible ? 1 : 0 }}
        />

        <div className="transform transition-all duration-1000 ease-out">
          <h3 className="text-3xl lg:text-5xl font-bold text-[#004B4B] dark:text-white transition-all duration-500">
            {formatNumber(counts.clients)}
            <span
              className={`text-xl align-top transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "1s" }}
            >
              +
            </span>
          </h3>
          <p
            className="text-sm lg:text-lg mt-1 opacity-0 transition-opacity duration-1000 delay-600"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            Clients Served
          </p>
        </div>

        {/* العنصر 3 */}
        <div
          className="hidden sm:block h-[100px] lg:h-[200px] w-[1px] bg-gray-400 opacity-0 transition-opacity duration-1000 delay-700"
          style={{ opacity: isVisible ? 1 : 0 }}
        />

        <div className="transform transition-all duration-1000 ease-out dark:text-white">
          <h3 className="text-3xl lg:text-5xl font-bold text-[#004B4B] dark:text-white transition-all duration-500">
            {formatNumber(counts.projects)}
            <span
              className={`text-xl align-top transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: "1.5s" }}
            >
              +
            </span>
          </h3>
          <p
            className="text-sm lg:text-lg mt-1 opacity-0 transition-opacity duration-1000 delay-900"
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            Projects
          </p>
        </div>
      </div>

      {/* CSS for enhanced animations */}
      <style jsx>{`
        @keyframes countUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        /* Smooth number transitions */
        h3 {
          transition: all 0.1s ease-out;
        }

        /* Hover effects */
        div > div:hover h3 {
          transform: scale(1.05);
          text-shadow: 0 0 20px rgba(0, 75, 75, 0.3);
        }

        /* Dark mode hover effect */
        .dark div > div:hover h3 {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </section>
  );
}
