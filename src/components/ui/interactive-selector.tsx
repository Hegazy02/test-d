"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Video, ChevronLeft, ChevronRight, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const InteractiveSelector = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  const videos = [
    {
      id: "682332585",
      title: "Absher",
      titleAr: "أبشر",
      icon: "/images/Results/icons/absher.webp",
      thumbnail: "/images/Results/new/Abshe.jpeg",
      category: "events-management",
    },
    {
      id: "682332427",
      title: "Albilad Bank",
      titleAr: "بنك البلاد",
      icon: "/images/Results/icons/بنك البلاد.webp",
      thumbnail: "/images/Results/new/AlbidiaBan.jpeg",
      category: "events-management",
    },
    {
      id: "713308855",
      title: "Expro",
      titleAr: "إكسبرو",
      icon: "/images/Results/icons/expro.webp",
      thumbnail: "/images/Results/new/Expr.jpeg",
      category: "events-management",
    },
    {
      id: "383758022",
      title: "McDonald's",
      titleAr: "ماكدونالدز",
      icon: "/images/Results/icons/mac.webp",
      thumbnail: "/images/Results/new/McDonald_.jpeg",
      category: "media-production",
    },
    {
      id: "778239939",
      title: "ACWA Power",
      titleAr: "أكوا باور",
      icon: "/images/Results/icons/acwa power.webp",
      thumbnail: "/images/Results/new/AcwaPowe.jpeg",
      category: "media-production",
    },
    {
      id: "587933499",
      title: "Performing Arts",
      titleAr: "تي باك",
      icon: "/images/Results/icons/performing arts.webp",
      thumbnail: "/images/Results/new/TheaterandPerformingArtsCommission.jpg",
      category: "media-production",
    },
    {
      id: "532827819",
      title: "Tadawul",
      titleAr: "تداول",
      icon: "/images/Results/icons/تداول.webp",
      thumbnail: "/images/Results/new/Tadawul.jpg",
      category: "events-management",
    },
    {
      id: "478491757",
      title: "Zakah",
      titleAr: "الزكاة",
      icon: "/images/Results/icons/الزكاة.webp",
      thumbnail: "/images/Results/new/Zaka.jpeg",
      category: "media-production",
    },
    {
      id: "478496462",
      title: "STC",
      titleAr: "إس تي سي",
      icon: "/images/Results/icons/stc.webp",
      thumbnail: "/images/Results/new/ST.jpeg",
      category: "media-production",
    },
    {
      id: "379438132",
      title: "Aramco",
      titleAr: "أرامكو",
      icon: "/images/Results/icons/ارامكو.webp",
      thumbnail: "/images/Results/new/Aramc.jpeg",
      category: "media-production",
    },
    {
      id: "379438311",
      title: "Taawonya",
      titleAr: "التعاونية",
      icon: "/images/Results/icons/التعاونية.webp",
      thumbnail: "/images/Results/new/Taawony.jpeg",
      category: "events-management",
    },
    {
      id: "778240217",
      title: "Sports For All",
      titleAr: "الرياضة للجميع",
      icon: "/images/Results/icons/الرياضة للجميع.webp",
      thumbnail: "/images/Results/new/Sport.jpeg",
      category: "booth-productions",
    },
  ];

  const translations = {
    heading: {
      en: "We've been Driving Business Results",
      ar: "نحن نقود نتائج الأعمال",
    },
    subheading: {
      en: "With production services for top brands since 2011",
      ar: "مع خدمات الإنتاج لأفضل العلامات التجارية منذ عام 2011",
    },
    videos: {
      "Absher Whistle": { ar: "صافرة أبشر" },
      AlbidiaBank: { ar: "بنك البلاد" },
      Expro: { ar: "إكسبرو" },
      "McDonald's": { ar: "ماكدونالدز" },
      AcwaPower: { ar: "أكوا باور" },
      TPAC: { ar: "تي باك" },
      Tadawul: { ar: "تداول" },
      Zakah: { ar: "الزكاة" },
      STC: { ar: "إس تي سي" },
      Aramco: { ar: "أرامكو" },
      Taawonya: { ar: "التعاونية" },
      Sports: { ar: "الرياضة" },
    },
  };

  const getTitle = (video: any) => {
    if (lang === "ar") {
      return (
        video.titleAr || translations.videos[video.title]?.ar || video.title
      );
    }
    return video.title;
  };

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const handleOptionClick = (index: number) => {
    // Prevent click if user was scrolling
    if (isScrolling) return;

    if (index !== activeIndex) {
      // Stop any currently playing video
      if (activeVideoId) {
        setActiveVideoId(null);
      }
      setActiveIndex(index);

      // Scroll the active card into view
      setTimeout(() => {
        scrollToCard(index);
      }, 500);
    } else {
      // If clicking the same card and video is playing, stop it
      if (activeVideoId) {
        setActiveVideoId(null);
      }
    }
  };

  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cards = container.children;

      if (cards[index]) {
        const card = cards[index] as HTMLElement;

        // ⚫ الحساب الأفقي (X): تمركز البطاقة أفقياً داخل العنصر
        const cardLeft = card.offsetLeft;
        const cardWidth = card.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollLeft = cardLeft - containerWidth / 2 + cardWidth / 2;

        // ⚫ الحساب العمودي (Y): تمرير النافذة لجعل البطاقة في وسط الشاشة
        const cardRect = card.getBoundingClientRect();
        const cardCenterY =
          cardRect.top +
          window.scrollY -
          window.innerHeight / 2 +
          cardRect.height / 2;

        // ✅ تمرير العنصر أفقيًا
        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });

        // ✅ تمرير الصفحة عموديًا
        window.scrollTo({
          top: cardCenterY,
          behavior: "smooth",
        });
      }
    }
  };

  const handleVideoPlay = (videoId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveVideoId(videoId);
  };

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    videos.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons(); // Initial check

      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
      };
    }
  }, []);

  // Add touch scrolling and mouse drag support (removed mouse wheel)
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isScrolling = false;
    let startX = 0;
    let scrollLeft = 0;

    // Touch events for mobile swiping
    const handleTouchStart = (e: TouchEvent) => {
      isScrolling = true;
      startX = e.touches[0].pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) return;
      e.preventDefault();
      const x = e.touches[0].pageX - container.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
      isScrolling = false;
    };

    // Mouse drag events for desktop
    const handleMouseDown = (e: MouseEvent) => {
      isScrolling = true;
      container.style.cursor = "grabbing";
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isScrolling) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      isScrolling = false;
      container.style.cursor = "grab";
    };

    const handleMouseLeave = () => {
      isScrolling = false;
      container.style.cursor = "grab";
    };

    // Add event listeners (removed wheel event)
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Set initial cursor
    container.style.cursor = "grab";

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Calculate dimensions based on screen size
  const getCardDimensions = (isActive: boolean) => {
    // اجعل الارتفاع ثابت في كل الحالات، لكن العرض يتغير حسب isActive
    return {
      width: isActive ? "min(70vw, 700px)" : "min(20vw, 200px)",
      height: "min(51.6vw, 516px)",
      aspectRatio: isActive ? "1.57/1" : "5748/14867",
    };
  };

  return (
    <div
      className={`relative w-full font-sans text-white py-8 ${lang === "ar" ? "rtl" : "ltr"}`}
    >
      {/* Header Section */}
      <div
        className={`container px-4 sm:px-6 text-center mb-10 ${lang === "ar" ? "font-arabic" : ""}`}
      >
        <h2 className="heading font-bold mb-2 dark:text-white text-gray-900">
          {translations.heading[lang]}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto dark:text-white subheading">
          {translations.subheading[lang]}
        </p>
      </div>

      {/* Video Section Container */}
      <div className="relative w-full">
        {/* Options Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-auto overflow-y-hidden scrollbar-hide px-4"
          style={{
            height: "min(51.6vw, 516px)",
            gap: "16px",
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
            userSelect: "none", // Prevent text selection during drag
            direction: lang === "ar" ? "rtl" : "ltr",
          }}
        >
          {videos.map((video, index) => {
            const isActive = activeIndex === index;
            const dimensions = getCardDimensions(isActive);

            return (
              <div
                key={index}
                className={`
                  option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out rounded-lg flex-shrink-0
                  ${isActive ? "active" : ""}
                `}
                style={{
                  backgroundImage:
                    activeVideoId === video.id
                      ? "none"
                      : `url('${video.thumbnail}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backfaceVisibility: "hidden",
                  opacity: animatedOptions.includes(index) ? 1 : 0,
                  transform: animatedOptions.includes(index)
                    ? "translateX(0)"
                    : "translateX(-60px)",
                  width: dimensions.width,
                  height: dimensions.height,
                  aspectRatio: dimensions.aspectRatio,
                  backgroundColor: "transparent",
                  zIndex: isActive ? 10 : 1,
                  willChange:
                    "width, height, box-shadow, background-size, background-position",
                  cursor:
                    activeVideoId === video.id && isActive
                      ? "default"
                      : "pointer",
                }}
                onClick={
                  activeVideoId === video.id && isActive
                    ? undefined
                    : () => handleOptionClick(index)
                }
              >
                {/* Video Player - Fills entire card */}
                {activeVideoId === video.id && isActive && (
                  <div className="absolute inset-0 z-20 w-full h-full rounded-lg overflow-hidden">
                    <iframe
                      src={`https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0&controls=1&color=000000&transparent=0`}
                      className="w-full h-full"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={getTitle(video)}
                      style={{
                        border: "none",
                        pointerEvents: "auto",
                      }}
                    />
                  </div>
                )}

                {/* Play Button - Only show on active panel when no video is playing */}
                {isActive && activeVideoId !== video.id && (
                  <div
                    className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 hover:bg-black/30 transition-colors cursor-pointer rounded-lg w-full"
                    onClick={(e) => handleVideoPlay(video.id, e)}
                  >
                    <div className="bg-black/50 rounded-full p-3 sm:p-4 transform transition-transform hover:scale-110 ">
                      <Play
                        className="h-8 w-8 sm:h-12 sm:w-12 text-white"
                        fill="white"
                      />
                    </div>
                  </div>
                )}

                {/* Shadow effect - Hide when video is playing */}
                {activeVideoId !== video.id && (
                  <div
                    className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out rounded-b-lg h-full  w-full"
                    style={{
                      bottom: isActive ? "0" : "-40px",
                      boxShadow: isActive
                        ? "inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000"
                        : "inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000",
                    }}
                  />
                )}

                {/* Label with icon - Hide when video is playing */}
                {activeVideoId !== video.id && (
                  <div className="label absolute left-0 right-0  bottom-3 sm:bottom-5 flex items-center justify-center z-2 pointer-events-none w-full">
                    <div className="relative w-full h-[2.5rem] sm:w-full sm:h-[2.5rem]">
                      <Image
                        src={video.icon}
                        alt={getTitle(video)}
                        fill
                        className="object-contain"
                        priority={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation Arrows */}
      <div className="flex items-center justify-center mt-8 gap-4">
        {/* Previous Button */}
        <button
          onClick={() => scroll("left")}
          className={`dark:bg-white/50 dark:hover:bg-white/70 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all duration-300 ${
            canScrollLeft ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>

        {/* Next Button */}
        <button
          onClick={() => scroll("right")}
          className={`dark:bg-white/50 dark:hover:bg-white/70 bg-black/50 hover:bg-black/70 rounded-full p-3 transition-all duration-300 ${
            canScrollRight ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>
      </div>

      {/* CSS Animations and Scrollbar Hide */}
      <style jsx>{`
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .font-arabic {
          font-family: "Arial", "Tahoma", sans-serif;
        }
      `}</style>
    </div>
  );
};

export default InteractiveSelector;
