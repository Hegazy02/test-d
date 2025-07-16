"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppStore } from "@/store/use-app-store";
import { motion, AnimatePresence } from "framer-motion";

// تعريف أنواع التصفية
type FilterType =
  | "media-production"
  | "events-management"
  | "printing"
  | "booth-productions"
  | "all";

// تعريف بنية الصورة
interface ImageItem {
  id: string;
  src: string;
  alt: string;
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
  const { language } = useAppStore();
  const [activeFilter, setActiveFilter] =
    useState<FilterType>("media-production");
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);

  // تعريف أزرار التصفية
  const filters: { id: FilterType; label: string }[] = [
    {
      id: "media-production",
      label: language === "en" ? "Media Production" : "الإنتاج الإعلامي",
    },
    {
      id: "events-management",
      label: language === "en" ? "Events Management" : "إدارة الفعاليات",
    },
    { id: "printing", label: language === "en" ? "Printing" : "الطباعة" },
    {
      id: "booth-productions",
      label: language === "en" ? "Booth Productions" : "إنتاج المنصات",
    },
  ];

  // تعريف جميع الصور مع فئاتها ومواقعها في الشبكة
  const allImages: ImageItem[] = [
    // صور فئة الإنتاج الإعلامي
    {
      id: "media-1",
      src: "/images/homepage/behind-the-scenes-section/1.webp",
      alt: "Camera operator filming in studio with brick walls",
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
      alt: "Interview with digital screen background",
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
      alt: "Film crew shooting in living room",
      category: ["media-production"],
      gridPosition: {
        colStart: 5,
        colSpan: 3,
        height: "275px",
      },
    },
    {
      id: "media-4",
      src: "/images/homepage/behind-the-scenes-section/4.webp",
      alt: "Camera operator filming outdoors",
      category: ["media-production"],
      gridPosition: {
        colStart: 8,
        colSpan: 5,
        height: "275px",
      },
    },
    {
      id: "media-5",
      src: "/images/homepage/behind-the-scenes-section/5.webp",
      alt: "Mobile phone screen displaying video recording",
      category: ["media-production"],
      gridPosition: {
        colStart: 3,
        colSpan: 5,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "media-6",
      src: "/images/homepage/behind-the-scenes-section/6.webp",
      alt: "Production setting with equipment",
      category: ["media-production"],
      gridPosition: {
        colStart: 8,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "media-7",
      src: "/images/homepage/behind-the-scenes-section/7.webp",
      alt: "Portrait photography session",
      category: ["media-production"],
      gridPosition: {
        colStart: 10,
        colSpan: 3,
        rowStart: 2,
        height: "275px",
      },
    },

    // صور فئة إدارة الفعاليات
    {
      id: "events-1",
      src: "/images/homepage/behind-the-scenes-section/1.webp",
      alt: "Corporate event setup",
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
      alt: "Event filming",
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
      alt: "Outdoor event filming",
      category: ["events-management"],
      gridPosition: {
        colStart: 5,
        colSpan: 3,
        height: "275px",
      },
    },
    {
      id: "events-4",
      src: "/images/homepage/behind-the-scenes-section/4.webp",
      alt: "Corporate interview",
      category: ["events-management"],
      gridPosition: {
        colStart: 8,
        colSpan: 5,
        height: "275px",
      },
    },
    {
      id: "events-5",
      src: "/images/homepage/behind-the-scenes-section/5.webp",
      alt: "Event live streaming",
      category: ["events-management"],
      gridPosition: {
        colStart: 3,
        colSpan: 5,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "events-6",
      src: "/images/homepage/behind-the-scenes-section/6.webp",
      alt: "Event photography",
      category: ["events-management"],
      gridPosition: {
        colStart: 8,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "events-7",
      src: "/images/homepage/behind-the-scenes-section/7.webp",
      alt: "Event production setup",
      category: ["events-management"],
      gridPosition: {
        colStart: 10,
        colSpan: 3,
        rowStart: 2,
        height: "275px",
      },
    },

    // صور فئة الطباعة
    {
      id: "printing-1",
      src: "/images/homepage/behind-the-scenes-section/1.webp",
      alt: "Printing press operation",
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
      alt: "Digital printing",
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
      alt: "Large format printing",
      category: ["printing"],
      gridPosition: {
        colStart: 5,
        colSpan: 3,
        height: "275px",
      },
    },
    {
      id: "printing-4",
      src: "/images/homepage/behind-the-scenes-section/4.webp",
      alt: "Print finishing",
      category: ["printing"],
      gridPosition: {
        colStart: 8,
        colSpan: 5,
        height: "275px",
      },
    },
    {
      id: "printing-5",
      src: "/images/homepage/behind-the-scenes-section/5.webp",
      alt: "Print quality control",
      category: ["printing"],
      gridPosition: {
        colStart: 3,
        colSpan: 5,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "printing-6",
      src: "/images/homepage/behind-the-scenes-section/6.webp",
      alt: "Print materials",
      category: ["printing"],
      gridPosition: {
        colStart: 8,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "printing-7",
      src: "/images/homepage/behind-the-scenes-section/7.webp",
      alt: "Print design review",
      category: ["printing"],
      gridPosition: {
        colStart: 10,
        colSpan: 3,
        rowStart: 2,
        height: "275px",
      },
    },

    // صور فئة إنتاج المنصات
    {
      id: "booth-1",
      src: "/images/homepage/behind-the-scenes-section/1.webp",
      alt: "Booth construction",
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
      alt: "Exhibition booth design",
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
      alt: "Booth lighting setup",
      category: ["booth-productions"],
      gridPosition: {
        colStart: 5,
        colSpan: 3,
        height: "275px",
      },
    },
    {
      id: "booth-4",
      src: "/images/homepage/behind-the-scenes-section/4.webp",
      alt: "Booth graphics installation",
      category: ["booth-productions"],
      gridPosition: {
        colStart: 8,
        colSpan: 5,
        height: "275px",
      },
    },
    {
      id: "booth-5",
      src: "/images/homepage/behind-the-scenes-section/5.webp",
      alt: "Booth assembly",
      category: ["booth-productions"],
      gridPosition: {
        colStart: 3,
        colSpan: 5,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "booth-6",
      src: "/images/homepage/behind-the-scenes-section/6.webp",
      alt: "Booth materials",
      category: ["booth-productions"],
      gridPosition: {
        colStart: 8,
        colSpan: 2,
        rowStart: 2,
        height: "275px",
      },
    },
    {
      id: "booth-7",
      src: "/images/homepage/behind-the-scenes-section/7.webp",
      alt: "Booth final touches",
      category: ["booth-productions"],
      gridPosition: {
        colStart: 10,
        colSpan: 3,
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
    <section className="bg-white py-12 text-[#474747]">
      <div className="w-full px-[15px] sm:px-0 sm:w-[90%] items-center mx-auto ">
        {/* العنوان والوصف */}
        <div className="text-center mb-6 px-4">
          <h2 className="h2CSS mb-2">Behind The Scenes</h2>
          <p className="h2-description-text mx-auto">
            Get an exclusive look at the hard work and dedication that goes into
            our productions
          </p>
        </div>

        {/* أزرار التصفية */}
        {/* <div className="flex flex-wrap justify-center gap-3 mb-8 px-4">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                activeFilter === filter.id
                  ? "bg-[#00A3A3] font-bold text-white"
                  : "bg-gray-200 font-bold text-[#00A3A3] hover:bg-[#00A3A3]/40"
              }`}
              aria-pressed={activeFilter === filter.id}
            >
              {filter.label}
            </button>
          ))}
        </div> */}

        <div className="hidden md:grid grid-cols-12 gap-3 w-full px-4">
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
                    alt={image.alt}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* شبكة الصور البسيطة على الجوال - صورتان في كل صف */}
        <div className="grid grid-cols-2 gap-3 w-full px-4 md:hidden">
          {filteredImages.map((image, index) => {
            // تحديد الصور التي ستشغل عمودين بناءً على موقعها
            const isWide = index % 3 === 0; // كل 4 صور تأخذ صورة واحدة عرض كامل
            const isTall = index % 5 === 2; // بعض الصور تأخذ ارتفاع أكبر

            return (
              <div
                key={image.id}
                className={`overflow-hidden rounded-lg ${
                  isWide ? "col-span-2" : "col-span-1"
                } ${isTall ? "row-span-2" : ""}`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className={`w-full ${
                    isWide
                      ? "aspect-video"
                      : isTall
                        ? "aspect-[3/4]"
                        : "aspect-square"
                  } object-cover `}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
