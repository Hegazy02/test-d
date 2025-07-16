"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {createLocalizedPath} from "@/components/Nav";
import { usePathname } from "next/navigation";

const translations = {
  heading: {
    en: "Darb News",
    ar: "آخر الأخبار ",
  },
  subheading: {
    en: "The latest updates and news about Darb Productions",
    ar: "أحدث الأخبار والإنجازات من درب برودكشنز ",
  },
  seeMoreButton: {
    en: "See more",
    ar: "شاهد المزيد",
  },
  newsItems: [
    {
      en: "Darb Productions held the opening event for the Business Outsourcing Center.",
      ar: "درب للإنتاج تنظم حفل افتتاح مركز الأعمال للتعهيد.",
    },
    {
      en: "Darb Productions Implemented the live broadcast of the listing of Americana simultaneously between Saudi Arabia and UAE",
      ar: "درب للإنتاج تنفذ البث المباشر لإدراج أمريكانا بين السعودية والإمارات",
    },
    {
      en: "Darb Productions Provides the media coverage of the first Saudi Accountants Conference",
      ar: "درب للإنتاج تقدم التغطية الإعلامية لمؤتمر المحاسبين السعوديين الأول",
    },
  ],
};

export default function NewsSection() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isArabic = lang === "ar";
  const pathname = usePathname();

  const newsItems = [
    {
      id: 1,
      image: "/images/homepage/news/2.webp",
      title: translations.newsItems[0][lang],
      link: "/news/business-outsourcing-center",
    },
    {
      id: 2,
      image: "/images/homepage/news/3.webp",
      title: translations.newsItems[1][lang],
      link: "/news/americana-listing",
    },
    {
      id: 3,
      image: "/images/homepage/news/1.webp",
      title: translations.newsItems[2][lang],
      link: "/news/saudi-accountants-conference",
    },
  ];

  return (
    <section className="dark:bg-black bg-white">
      <div className="px-[30px] sm:container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="h2CSS mb-2 dark:text-white text-gray-900">
            {translations.heading[lang]}
          </h2>
          <p className="h2-description-text">{translations.subheading[lang]}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {newsItems.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="mt-4">
                <p className="dark:text-white text-[#004549] font-medium leading-tight text-sm">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* زر شاهد المزيد في منتصف الشاشة وتحت الكروت مباشرة */}
        <div className="flex justify-center mt-8">
          <Button
            asChild
            className="dark:bg-[#575757] dark:border-1 border-[#8c8c8c] dark:text-white bg-[#00A3A3] dark:hover:bg-gradient-to-t from-[#525252] to-[#2D2D2D] font-bold text-white px-10 rounded-none"
          >
            <Link href={createLocalizedPath("/blogs",pathname)}>
              {translations.seeMoreButton[lang]}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
