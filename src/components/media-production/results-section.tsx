"use client";

import { useEffect } from "react";
import { Play } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { useTranslation } from "react-i18next";

interface Video {
  id: string;
  title: string;
  thumbnail: string; // إضافة مسار الصورة المحلية
  category:
    | "media-production"
    | "events-management"
    | "printing"
    | "booth-productions";
}

const videos: Video[] = [
  {
    id: "682332585",
    title: "Absher Whistle",
    thumbnail: "/images/Results/new/Abshe.jpeg",
    category: "events-management",
  },
  {
    id: "682332427",
    title: "AlbidiaBank",
    thumbnail: "/images/Results/new/AlbidiaBan.jpeg",
    category: "events-management",
  },
  {
    id: "713308855",
    title: "Expro",
    thumbnail: "/images/Results/new/Expr.jpeg",
    category: "events-management",
  },
  {
    id: "383758022",
    title: "McDonald's",
    thumbnail: "/images/Results/new/McDonald_.jpeg",
    category: "media-production",
  },
  {
    id: "778239939",
    title: "AcwaPower",
    thumbnail: "/images/Results/new/AcwaPowe.jpeg",
    category: "media-production",
  },
  {
    id: "587933499",
    title: "TPAC",
    thumbnail: "/images/Results/new/TheaterandPerformingArtsCommission.jpg",
    category: "media-production",
  },
  {
    id: "532827819",
    title: "Tadawul",
    thumbnail: "/images/Results/new/Tadawul.jpg",
    category: "events-management",
  },
  {
    id: "478491757",
    title: "Zakah",
    thumbnail: "/images/Results/new/Zaka.jpeg",
    category: "media-production",
  },
  {
    id: "478496462",
    title: "STC",
    thumbnail: "/images/Results/new/ST.jpeg",
    category: "media-production",
  },
  {
    id: "379438132",
    title: "Aramco",
    thumbnail: "/images/Results/new/Aramc.jpeg",
    category: "media-production",
  },
  {
    id: "379438311",
    title: "Taawonya",
    thumbnail: "/images/Results/new/Taawony.jpeg",
    category: "events-management",
  },
  {
    id: "778240217",
    title: "Sports",
    thumbnail: "/images/Results/new/Sport.jpeg",
    category: "booth-productions",
  },
];

type FilterType =
  | "media-production"
  | "events-management"
  | "printing"
  | "booth-productions";

const filters: { id: FilterType; label: { en: string; ar: string } }[] = [
  {
    id: "media-production",
    label: { en: "Media Production", ar: "إنتاج إعلامي" },
  },
  {
    id: "events-management",
    label: { en: "Events Management", ar: "إدارة الفعاليات" },
  },
  { id: "printing", label: { en: "Printing", ar: "طباعة" } },
  {
    id: "booth-productions",
    label: { en: "Booth Productions", ar: "إنتاج الأكشاك" },
  },
];

export default function ResultsSection() {
  const {
    activeVideoId,
    setActiveVideoId,
    currentFilter,
    setCurrentFilter,
    language,
  } = useAppStore();
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://player.vimeo.com";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: videos.map((video, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoObject",
          name: video.title,
          url: `https://vimeo.com/${video.id}`,
          thumbnailUrl: video.thumbnail, // استخدام الصورة المحلية
          uploadDate: "2023-01-01T00:00:00Z",
          publisher: {
            "@type": "Organization",
            name: "Darb Productions",
            logo: {
              "@type": "ImageObject",
              url: "https://www.darbproductions.com/images/LOGO.svg",
            },
          },
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  const filteredVideos = videos.filter((video) =>
    currentFilter === "media-production"
      ? true
      : video.category === currentFilter,
  );

  return (
    <section className="py-16" aria-labelledby="results-heading">
      <div className="container px-4 sm:px-6 text-center mb-10">
        <h2 id="results-heading" className="h2CSS mb-2">
          {i18n.language === "en"
            ? "We've been Driving Business Results"
            : "نحقق نتائج أعمال ملموسة "}
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto h2-description-text">
          {i18n.language === "en"
            ? "With production services for top brands since 2011"
            : "من خلال خدمات الإنتاج لأكبر العلامات التجارية منذ عام 2011"}
        </p>

        {/* <div className="flex flex-wrap justify-center gap-3 mb-8 mt-6">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setCurrentFilter(filter.id);
                setActiveVideoId(null);
              }}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                currentFilter === filter.id
                  ? "bg-[#00A3A3] font-bold text-white"
                  : "bg-gray-200 font-bold text-[#00A3A3] hover:bg-[#00A3A3]/40"
              }`}
              aria-pressed={currentFilter === filter.id}
            >
              {i18n.language === "en" ? filter.label.en : filter.label.ar}
            </button>
          ))}
        </div> */}
      </div>

      <div className="containerr px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 force-ltr">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="relative aspect-video rounded-md overflow-hidden border border-gray-200 bg-gray-50 force-ltr"
          >
            {activeVideoId === video.id ? (
              <iframe
                src={`https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={video.title}
                loading="lazy"
              ></iframe>
            ) : (
              <div
                className="absolute inset-0 cursor-pointer group"
                onClick={() => setActiveVideoId(video.id)}
                role="button"
                aria-label={`Play ${video.title} video`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveVideoId(video.id);
                  }
                }}
              >
                {/* استخدام الصورة المحلية بدلاً من Vimeo thumbnail */}
                <div className="w-full h-full bg-gray-200">
                  <img
                    src={video.thumbnail}
                    alt={`${video.title} thumbnail`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="bg-black/50 rounded-full p-3 transform transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </div>
                </div>

                {/* Video title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                  <h3 className="text-white text-sm font-medium">
                    {video.title}
                  </h3>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
