import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

// Translations
const translations = {
  en: {
    stayUpdated: "Stay Updated",
    subtitle:
      "Subscribe to our newsletter to receive the latest articles and updates directly in your email",
    emailPlaceholder: "Your email address",
    subscribe: "Subscribe",
    privacyText:
      "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.",
  },
  ar: {
    stayUpdated: "ابق على اطلاع",
    subtitle:
      "اشترك في نشرتنا الإخبارية لتلقي أحدث المقالات والتحديثات مباشرة في بريدك الإلكتروني",
    emailPlaceholder: "عنوان بريدك الإلكتروني",
    subscribe: "اشترك",
    privacyText:
      "بالاشتراك، فإنك توافق على سياسة الخصوصية الخاصة بنا وتوافق على تلقي التحديثات من شركتنا.",
  },
};

export default function NewsletterSection() {
  const { i18n } = useTranslation();
  const lang = i18n?.language || "en";
  const t = lang === "ar" ? translations.ar : translations.en;
  const isRTL = lang === "ar";

  return (
    <section className="py-16 bg-[#004B4B] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              isRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            {t.stayUpdated}
          </h2>

          <p
            className={`text-lg opacity-90 mb-8 ${
              isRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            {t.subtitle}
          </p>

          <form
            className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto ${
              isRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            <Input
              type="email"
              placeholder={t.emailPlaceholder}
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 ${
                isRTL ? "text-right" : "text-left"
              }`}
              required
            />
            <Button className="bg-[#D4B82C] hover:bg-[#c5aa28] text-[#004B4B] font-medium whitespace-nowrap">
              {t.subscribe}
            </Button>
          </form>

          <p
            className={`text-xs opacity-70 mt-4 ${
              isRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            {t.privacyText}
          </p>
        </div>
      </div>

      {/* Decorative elements - positioned based on direction */}
      <div
        className={`absolute top-0 w-64 h-64 bg-[#D4B82C]/10 rounded-full -translate-y-1/2 ${
          isRTL ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
        }`}
      ></div>
      <div
        className={`absolute bottom-0 w-96 h-96 bg-[#D4B82C]/5 rounded-full translate-y-1/2 ${
          isRTL ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
        }`}
      ></div>
    </section>
  );
}
