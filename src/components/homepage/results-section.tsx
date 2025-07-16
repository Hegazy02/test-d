"use client";

import { useEffect } from "react";
import { Play } from "lucide-react";
import { useAppStore } from "@/store/use-app-store";
import { useTranslation } from "react-i18next";

const videos = [
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

const filters = [
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

const translations = {
  heading: {
    en: "We've been Driving Business Results",
    ar: "نحقق نتائج أعمال ملموسة ",
  },
  subheading: {
    en: "With production services for top brands since 2011",
    ar: "من خلال خدمات الإنتاج لأكبر العلامات التجارية منذ عام 2011",
  },
  videos: {
    "Absher Whistle": { ar: "أبشر" },
    AlbidiaBank: { ar: "بنك البلاد" },
    Expro: { ar: "إكسبرو" },
    "McDonald's": { ar: "ماكدونالدز" },
    AcwaPower: { ar: "أكوا باور" },
    TPAC: { ar: "تيباك" },
    Tadawul: { ar: "تداول" },
    Zakah: { ar: "الزكاة" },
    STC: { ar: "الاتصالات السعودية" },
    Aramco: { ar: "أرامكو" },
    Taawonya: { ar: "التعاونية" },
    Sports: { ar: "الرياضة" },
  },
};

export default function ResultsSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const { activeVideoId, setActiveVideoId, currentFilter, setCurrentFilter } =
    useAppStore();

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
          name: translations.videos[video.title]?.[lang] || video.title,
          url: `https://vimeo.com/${video.id}`,
          thumbnailUrl: video.thumbnail,
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
  }, [lang]);

  const filteredVideos = videos.filter((video) =>
    currentFilter === "media-production"
      ? true
      : video.category === currentFilter,
  );

  // Localize video titles
  const localizedVideos = filteredVideos.map((video) => ({
    ...video,
    title: translations.videos[video.title]?.[lang] || video.title,
  }));

  return (
    <section className="pb-16" aria-labelledby="results-heading" dir={"ltr"}>
      <div className="container px-4 sm:px-6 text-center mb-10">
        <h2 id="results-heading" className="h2CSS mb-2 text-gray-900">
          {translations.heading[lang]}
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-md">
          {translations.subheading[lang]}
        </p>
      </div>

      <div className="container px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 force-ltr">
        {localizedVideos.map((video) => (
          <div
            key={video.id}
            className="relative aspect-video rounded-md overflow-hidden border border-gray-200 bg-gray-50 force-ltr"
          >
            {activeVideoId === video.id ? (
              <iframe
                src={`https://player.vimeo.com/video/${video.id}?autoplay=1&title=0&byline=0&portrait=0`}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={video.title}
                loading="lazy"
              ></iframe>
            ) : (
              <div
                className="absolute inset-0 cursor-pointer group w-full"
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
                <div className="w-full h-full bg-gray-200">
                  <img
                    src={video.thumbnail}
                    alt={`${video.title} thumbnail`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors w-full">
                  <div className="bg-black/50 rounded-full p-3 transform transition-transform group-hover:scale-110">
                    <Play className="h-8 w-8 text-white" fill="white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 w-full">
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
