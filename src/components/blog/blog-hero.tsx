"use client";

import { Button } from "@/components/ui/button";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { createLocalizedPath } from "@/components/Nav";
// Translations
const translations = {
  en: {
    title: "Darb Productions Blog",
    subtitle:
      "Insights, news, and stories from the world of media production, events, and creative services",
    latestArticles: "Latest Articles",
    subscribeNewsletter: "Subscribe to Newsletter",
  },
  ar: {
    title: "مدونة درب للإنتاج",
    subtitle:
      "رؤى وأخبار وقصص من عالم الإنتاج الإعلامي والفعاليات والخدمات الإبداعية",
    latestArticles: "أحدث المقالات",
    subscribeNewsletter: "اشترك في النشرة الإخبارية",
  },
};

export default function BlogHero() {
  const router = useRouter();
  const { i18n } = useTranslation();
  const pathname = usePathname();

  const lang = i18n?.language || "en";
  const t = lang === "ar" ? translations.ar : translations.en;
  const isRTL = lang === "ar";

  const scrollToNewsletter = (e: React.MouseEvent) => {
    e.preventDefault();
    const newsletterSection = document.getElementById("newsletter");
    if (newsletterSection) {
      window.scrollTo({
        top: newsletterSection.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="relative dark:bg-[#1C1C1C] bg-[#004B4B] text-white py-[10rem] flex items-center justify-center overflow-hidden"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* خلفية متحركة بدلاً من الصورة */}
      <BackgroundGradientAnimation
        size="300px"
        blendingValue="soft-light"
        containerClassName="absolute inset-0 z-0"
        interactive={true}
      />

      {/* المحتوى */}
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-3xl mx-auto text-center`}>
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center`}
          >
            {t.title}
          </h1>
          <p className={`text-lg md:text-lg opacity-90 mb-6 text-center`}>
            {t.subtitle}
          </p>
          <div className={`flex flex-wrap justify-center gap-3`}>
            <Button
              className="dark:bg-[#434343] dark:hover:bg-white bg-[#D4B82C] hover:bg-[#c5aa28] dark:hover:text-black dark:text-white text-[#004B4B] font-medium"
              onClick={() =>
                router.push(createLocalizedPath("/latest-blogs", pathname))
              }
            >
              {t.latestArticles}
            </Button>
            <Button
              variant="outline"
              className="hover:border-white dark:bg-white dark:hover:text-white dark:text-black dark:hover:bg-[#434343] bg-[#004B4B] dark:text-black hover:bg-[#326e6e]"
              onClick={scrollToNewsletter}
            >
              {t.subscribeNewsletter}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
