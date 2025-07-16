"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { usePathname, useRouter } from "next/navigation";
import { createLocalizedPath } from "../Nav";

const translations = {
  title: {
    en: "About us",
    ar: "عن الشركة",
  },
  paragraphs: {
    p1: {
      en: "Founded in 2011 in Riyadh, Darb Productions began as a specialized media production house. Over the years, we have grown and expanded to adapt to changes in the market, evolving into a comprehensive media solutions provider.",
      ar: "تأسست درب برودكشنز عام 2011 في الرياض، كمؤسسة متخصصة في إنتاج الفيديو. ومع مرور السنوات، وسّعت الشركة نطاق خدماتها لتواكب احتياجات السوق المتزايدة، متحوّلة إلى مزود خدمات متكامل يشمل: إنتاج الوسائط الإعلامية، إدارة الفعاليات والمؤتمرات، حلول الطباعة، وتصميم وتنفيذ الأجنحة المخصصة للمعارض.",
    },
    p2: {
      en: "Our services now include media production, event management, printing solutions, and custom exhibition booth fabrication. In 2018, the company opened a branch in Dubai, United Arab Emirates, to better serve clients across the Gulf region.",
      ar: "وفي نهاية عام 2019، افتتحت الشركة فرعًا لها في دبي، الإمارات العربية المتحدة، في خطوة استراتيجية شكلت محطة جديدة في مسيرتها الإقليمية.",
    },
    p3: {
      en: "Continuing its growth, Darb Productions launched its team in Jeddah, confirming its ability to service high-profile, fully customized print solutions with greater efficiency and control.",
      ar: "واستمرارًا في النمو، أطلقت درب برودكشنز منشأتها الخاصة للطباعة الداخلية عام 2024، مما عزز قدرتها على تقديم حلول طباعة عالية الجودة ومخصصة بكفاءة وتحكّم أكبر.",
    },
    p4: {
      en: "After a clear vision and a commitment to excellence, Darb Productions has become one of the most trusted production partners in both Saudi Arabia and the UAE.",
      ar: "برؤية واضحة والتزام ثابت بالتميّز، تواصل درب برودكشنز خدمة أبرز العلامات التجارية في منطقة الخليج، واضعة هدفها أن تكون الشريك الإنتاجي الموثوق به في كل من السعودية والإمارات.",
    },
  },
  button: {
    en: "Read more",
    ar: "اقرأ المزيد",
  },
  imageAlt: {
    en: "Darb Productions Office",
    ar: "مكتب درب للإنتاج",
  },
};

export default function AboutSection() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const lang = i18n.language;

  return (
    <section className="py-6 sm:py-16 px-[7px] sm:px-0 sm:mx-0">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="h2CSS dark:text-white text-gray-700">
            {translations.title[lang]}
          </h2>
          <p className="dark:text-white text-gray-700">
            {translations.paragraphs.p1[lang]}
          </p>
          <p className="dark:text-white text-gray-700">
            {translations.paragraphs.p2[lang]}
          </p>
          <p className="dark:text-white text-gray-700">
            {translations.paragraphs.p3[lang]}
          </p>
          <p className="dark:text-white text-gray-700">
            {translations.paragraphs.p4[lang]}
          </p>
          <Button
            variant="outline"
            className="bg-gray-500/20 text-black dark:text-white  hover:text-white cursor-pointer
            px-5 py-2.5 sm:px-6 sm:py-3 md:px-[2.5rem] md:py-[1.5rem] 
            rounded-lg w-fit hover:bg-gray-500 transition 
            font-bold border-2 border-gray-500/50 "
            onClick={() => router.push(createLocalizedPath("/about", pathname))}
          >
            {translations.button[lang]}
          </Button>
        </div>
        <div className="relative h-[400px]">
          <Image
            src="/images/homepage/aboutus/base.webp"
            alt={translations.imageAlt[lang]}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}
