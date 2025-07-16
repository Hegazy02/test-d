"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const translations = {
  title: {
    en: "Behind The Scenes",
    ar: "خلف الكواليس",
  },
  description: {
    en: "Get an exclusive look at the hard work and dedication that goes into our productions",
    ar: "نظرة حصرية على الجهد والتفاني الذي يبذل في انتاجاتنا",
  },
  filterButton: {
    en: "Filter by",
    ar: "تصفية حسب",
  },
  categories: {
    mediaProduction: {
      en: "Media Production",
      ar: "الإنتاج الإعلامي",
    },
    eventsManagement: {
      en: "Events Management",
      ar: "إدارة الفعاليات",
    },
    printing: {
      en: "Printing",
      ar: "الطباعة",
    },
    boothProductions: {
      en: "Booth Productions",
      ar: "تصنيع  أجنحة المعارض",
    },
  },
  imageAlts: {
    // Media Production
    "media-1": {
      en: "Camera operator filming in studio with brick walls",
      ar: "مصور يقوم بالتصوير في استوديو ذو جدران من الطوب",
    },
    // ... add all other image alt translations
  },
};

// تعريف أنواع التصفية
type FilterType =
  | "media-production"
  | "events-management"
  | "printing"
  | "booth-productions";

// تعريف نوع الصورة
interface ImageItem {
  id: string;
  src: string;
  alt: {
    en: string;
    ar: string;
  };
  category: FilterType[];
  gridPosition: {
    colStart: number;
    colSpan: number;
    rowStart?: number;
    rowSpan?: number;
    height: string;
  };
}

export default function BehindTheScenesSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [activeFilter, setActiveFilter] =
    useState<FilterType>("media-production");
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);

  // تحديث الفلاتر لتستخدم الترجمات
  const filters = [
    {
      id: "media-production",
      label: translations.categories.mediaProduction[lang],
    },
    {
      id: "events-management",
      label: translations.categories.eventsManagement[lang],
    },
    {
      id: "printing",
      label: translations.categories.printing[lang],
    },
    {
      id: "booth-productions",
      label: translations.categories.boothProductions[lang],
    },
  ];

  // تعريف جميع الصور مع فئاتها ومواقعها في الشبكة
  const allImages: ImageItem[] = [
    // Media Production Images
    {
      id: "media-1",
      src: "/images/homepage/behind-the-scenes-section/1.webp",
      alt: {
        en: "Camera operator filming in studio with brick walls",
        ar: "مصور يقوم بالتصوير في استوديو ذو جدران من الطوب",
      },
      category: ["media-production"],
      gridPosition: {
        colStart: 1,
        colSpan: 2,
        rowSpan: 2,
        height: "560px",
      },
    },
    {
      id: "media-2",
      src: "/images/homepage/behind-the-scenes-section/2.webp",
      alt: {
        en: "Interview with digital screen background",
        ar: "مقابلة مع خلفية شاشة رقمية",
      },
      category: ["media-production"],
      gridPosition: {
        colStart: 3,
        colSpan: 2,
        height: "275px",
      },
    },
    {
      id: "media-3",
      src: "/images/homepage/behind-the-scenes-section/3.webp",
      alt: {
        en: "Film crew shooting in living room",
        ar: "طاقم التصوير يعمل في غرفة المعيشة",
      },
      category: ["media-production"],
      gridPosition: {
        colStart: 5,
        colSpan: 2,
        height: "275px",
      },
    },
    {
      id: "media-4",
      src: "/images/homepage/behind-the-scenes-section/4.webp",
      alt: {
        en: "Camera operator filming outdoors",
        ar: "مصور يقوم بالتصوير في الهواء الطلق",
      },
      category: ["media-production"],
      gridPosition: {
        colStart: 7,
        colSpan: 4,
        height: "275px",
      },
    },
    {
      id: "media-5",
      src: "/images/homepage/behind-the-scenes-section/5.webp",
      alt: {
        en: "Mobile phone screen displaying video recording",
        ar: "شاشة هاتف محمول تعرض تسجيل فيديو",
      },
      category: ["media-production"],
      gridPosition: {
        colStart: 3,
        colSpan: 4,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "media-6",
      src: "/images/homepage/behind-the-scenes-section/6.webp",
      alt: {
        en: "Production setting with equipment",
        ar: "موقع إنتاج مع المعدات",
      },
      category: ["media-production"],
      gridPosition: {
        colStart: 7,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "media-7",
      src: "/images/homepage/behind-the-scenes-section/7.webp",
      alt: {
        en: "Portrait photography session",
        ar: "جلسة تصوير بورتريه",
      },
      category: ["media-production"],
      gridPosition: {
        colStart: 9,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },

    // Events Management Images
    {
      id: "events-1",
      src: "/images/homepage/behind-the-scenes-section/1.webp",
      alt: {
        en: "Corporate event setup",
        ar: "تجهيز فعالية مؤسسية",
      },
      category: ["events-management"],
      gridPosition: {
        colStart: 1,
        colSpan: 2,
        rowSpan: 2,
        height: "560px",
      },
    },
    {
      id: "events-2",
      src: "/images/homepage/behind-the-scenes-section/2.webp",
      alt: {
        en: "Event filming",
        ar: "تصوير الفعالية",
      },
      category: ["events-management"],
      gridPosition: {
        colStart: 3,
        colSpan: 2,
        height: "275px",
      },
    },
    {
      id: "events-3",
      src: "/images/homepage/behind-the-scenes-section/3.webp",
      alt: {
        en: "Outdoor event filming",
        ar: "تصوير فعالية خارجية",
      },
      category: ["events-management"],
      gridPosition: {
        colStart: 5,
        colSpan: 2,
        height: "275px",
      },
    },
    {
      id: "events-4",
      src: "/images/homepage/behind-the-scenes-section/4.webp",
      alt: {
        en: "Corporate interview",
        ar: "مقابلة مؤسسية",
      },
      category: ["events-management"],
      gridPosition: {
        colStart: 7,
        colSpan: 4,
        height: "275px",
      },
    },
    {
      id: "events-5",
      src: "/images/homepage/behind-the-scenes-section/5.webp",
      alt: {
        en: "Event live streaming",
        ar: "البث المباشر للفعالية",
      },
      category: ["events-management"],
      gridPosition: {
        colStart: 3,
        colSpan: 4,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "events-6",
      src: "/images/homepage/behind-the-scenes-section/6.webp",
      alt: {
        en: "Event photography",
        ar: "تصوير الفعاليات",
      },
      category: ["events-management"],
      gridPosition: {
        colStart: 7,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "events-7",
      src: "/images/homepage/behind-the-scenes-section/7.webp",
      alt: {
        en: "Event production setup",
        ar: "تجهيز إنتاج الفعالية",
      },
      category: ["events-management"],
      gridPosition: {
        colStart: 9,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },

    // Printing Images
    {
      id: "printing-1",
      src: "/images/homepage/behind-the-scenes-section/1.webp",
      alt: {
        en: "Printing press operation",
        ar: "تشغيل المطبعة",
      },
      category: ["printing"],
      gridPosition: {
        colStart: 1,
        colSpan: 2,
        rowSpan: 2,
        height: "560px",
      },
    },
    {
      id: "printing-2",
      src: "/images/homepage/behind-the-scenes-section/2.webp",
      alt: {
        en: "Digital printing",
        ar: "الطباعة الرقمية",
      },
      category: ["printing"],
      gridPosition: {
        colStart: 3,
        colSpan: 2,
        height: "275px",
      },
    },
    {
      id: "printing-3",
      src: "/images/homepage/behind-the-scenes-section/3.webp",
      alt: {
        en: "Large format printing",
        ar: "طباعة التنسيقات الكبيرة",
      },
      category: ["printing"],
      gridPosition: {
        colStart: 5,
        colSpan: 2,
        height: "275px",
      },
    },
    {
      id: "printing-4",
      src: "/images/homepage/behind-the-scenes-section/4.webp",
      alt: {
        en: "Print finishing",
        ar: "التشطيب النهائي للطباعة",
      },
      category: ["printing"],
      gridPosition: {
        colStart: 7,
        colSpan: 4,
        height: "275px",
      },
    },
    {
      id: "printing-5",
      src: "/images/homepage/behind-the-scenes-section/5.webp",
      alt: {
        en: "Print quality control",
        ar: "مراقبة جودة الطباعة",
      },
      category: ["printing"],
      gridPosition: {
        colStart: 3,
        colSpan: 4,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "printing-6",
      src: "/images/homepage/behind-the-scenes-section/6.webp",
      alt: {
        en: "Print materials",
        ar: "مواد الطباعة",
      },
      category: ["printing"],
      gridPosition: {
        colStart: 7,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "printing-7",
      src: "/images/homepage/behind-the-scenes-section/7.webp",
      alt: {
        en: "Print design review",
        ar: "مراجعة تصميم الطباعة",
      },
      category: ["printing"],
      gridPosition: {
        colStart: 9,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },

    // Booth Production Images
    {
      id: "booth-1",
      src: "/images/homepage/behind-the-scenes-section/1.webp",
      alt: {
        en: "Booth construction",
        ar: "بناء المنصة",
      },
      category: ["booth-productions"],
      gridPosition: {
        colStart: 1,
        colSpan: 2,
        rowSpan: 2,
        height: "560px",
      },
    },
    {
      id: "booth-2",
      src: "/images/homepage/behind-the-scenes-section/2.webp",
      alt: {
        en: "Exhibition booth design",
        ar: "تصميم منصة المعرض",
      },
      category: ["booth-productions"],
      gridPosition: {
        colStart: 3,
        colSpan: 2,
        height: "275px",
      },
    },
    {
      id: "booth-3",
      src: "/images/homepage/behind-the-scenes-section/3.webp",
      alt: {
        en: "Booth lighting setup",
        ar: "تركيب إضاءة المنصة",
      },
      category: ["booth-productions"],
      gridPosition: {
        colStart: 5,
        colSpan: 2,
        height: "275px",
      },
    },
    {
      id: "booth-4",
      src: "/images/homepage/behind-the-scenes-section/4.webp",
      alt: {
        en: "Booth graphics installation",
        ar: "تركيب الرسومات في المنصة",
      },
      category: ["booth-productions"],
      gridPosition: {
        colStart: 7,
        colSpan: 4,
        height: "275px",
      },
    },
    {
      id: "booth-5",
      src: "/images/homepage/behind-the-scenes-section/5.webp",
      alt: {
        en: "Booth assembly",
        ar: "تجميع المنصة",
      },
      category: ["booth-productions"],
      gridPosition: {
        colStart: 3,
        colSpan: 4,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "booth-6",
      src: "/images/homepage/behind-the-scenes-section/6.webp",
      alt: {
        en: "Booth materials",
        ar: "مواد المنصة",
      },
      category: ["booth-productions"],
      gridPosition: {
        colStart: 7,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "booth-7",
      src: "/images/homepage/behind-the-scenes-section/7.webp",
      alt: {
        en: "Booth final touches",
        ar: "اللمسات النهائية للمنصة",
      },
      category: ["booth-productions"],
      gridPosition: {
        colStart: 9,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },
  ];

  // تحديث الصور المعروضة عند تغيير الفلتر النشط
  useEffect(() => {
    const newFilteredImages = allImages.filter((image) =>
      image.category.includes(activeFilter),
    );
    setFilteredImages(newFilteredImages);
  }, [activeFilter]);

  // دالة مساعدة لإنشاء أنماط CSS للشبكة
  const getGridStyles = (image: ImageItem) => {
    return {
      gridColumnStart: image.gridPosition.colStart,
      gridColumnEnd: image.gridPosition.colStart + image.gridPosition.colSpan,
      gridRowStart: image.gridPosition.rowStart || "auto",
      gridRowEnd: image.gridPosition.rowSpan
        ? `span ${image.gridPosition.rowSpan}`
        : "auto",
      height: image.gridPosition.height,
    };
  };

  return (
    <section className="dark:bg-black bg-white pb-12">
      <div className="w-full px-[15px] sm:px-0 sm:w-[90%] items-center mx-auto">
        {/* Title and Description */}
        <div className="text-center mb-6 px-4">
          <h2 className="h2CSS mb-2 text-gray-900 dark:text-white">
            {translations.title[lang]}
          </h2>
          <p className="h2-description-text mx-auto dark:text-white">
            {translations.description[lang]}
          </p>
        </div>

        {/* Filter buttons - uncomment if needed */}
        <div className="flex flex-wrap justify-center gap-3 mb-8 px-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as FilterType)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeFilter === filter.id
                  ? "dark:bg-[#2D2D2D] dark:text-white bg-[#00A3A3] dark:hover:bg-gradient-to-t from-[#525252] to-[#2D2D2D] font-bold text-white"
                  : "dark:bg-white dark:text-gray-800 dark:hover:bg-white bg-gray-200 font-bold text-[#00A3A3] hover:bg-[#00A3A3]/40 "
              }`}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-10 gap-3 w-full px-4">
          <AnimatePresence mode="wait">
            {filteredImages.map((image) => (
              <motion.div
                key={image.id}
                style={getGridStyles(image)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="h-full w-full overflow-hidden rounded-lg">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt[lang]}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Grid */}
        <div className="grid grid-cols-2 gap-3 w-full px-4 md:hidden">
          {filteredImages.map((image, index) => {
            const isWide = index % 3 === 0;
            const isTall = index % 5 === 2;

            return (
              <div
                key={image.id}
                className={`overflow-hidden rounded-lg ${
                  isWide ? "col-span-2" : "col-span-1"
                } ${isTall ? "row-span-2" : ""}`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt[lang]}
                  width={400}
                  height={400}
                  className={`w-full rounded-lg ${
                    isWide
                      ? "aspect-video"
                      : isTall
                        ? "aspect-[3/4]"
                        : "aspect-[3/4]"
                  } object-cover`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
