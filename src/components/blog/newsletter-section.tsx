"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";

// Translations
const translations = {
  en: {
    title: "Subscribe to Our Newsletter",
    subtitle:
      "Stay updated with the latest insights, trends, and news from the world of media production and events",
    emailPlaceholder: "Your email address",
    subscribeButton: "Subscribe",
    privacyText:
      "By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.",
    successMessage:
      "Thank you for subscribing! You'll receive our latest updates.",
    errorMessage: "Please enter a valid email address.",
  },
  ar: {
    title: "اشترك في نشرتنا الإخبارية",
    subtitle:
      "ابق على اطلاع بآخر الرؤى والاتجاهات والأخبار من عالم الإنتاج الإعلامي والفعاليات",
    emailPlaceholder: "عنوان بريدك الإلكتروني",
    subscribeButton: "اشترك",
    privacyText:
      "بالاشتراك، فإنك توافق على سياسة الخصوصية الخاصة بنا وتوافق على تلقي التحديثات من شركتنا.",
    successMessage: "شكراً لك على الاشتراك! ستتلقى آخر التحديثات لدينا.",
    errorMessage: "يرجى إدخال عنوان بريد إلكتروني صحيح.",
  },
};

interface NewsletterSectionProps {
  isRTL?: boolean;
  lang?: "en" | "ar";
}

export default function NewsletterSection({
  isRTL,
  lang,
}: NewsletterSectionProps) {
  const { i18n } = useTranslation();
  const currentLang = lang || i18n?.language || "en";
  const t = currentLang === "ar" ? translations.ar : translations.en;
  const currentIsRTL = isRTL !== undefined ? isRTL : currentLang === "ar";

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null,
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setMessage(t.errorMessage);
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    setMessageType(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically send the email to your newsletter service
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      setMessage(t.successMessage);
      setMessageType("success");
      setEmail("");
    } catch (error) {
      setMessage(t.errorMessage);
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="py-16 dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C] bg-[#004B4B] text-white"
      dir={currentIsRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className={`text-2xl md:text-3xl font-bold mb-4 ${
              currentIsRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            {t.title}
          </h2>
          <p
            className={`text-lg opacity-90 mb-8 ${
              currentIsRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            {t.subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto ${
              currentIsRTL ? "sm:flex-row-reverse" : ""
            }`}
          >
            <Input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 ${
                currentIsRTL ? "text-right" : "text-left"
              }`}
              dir={currentIsRTL ? "rtl" : "ltr"}
              required
              disabled={isSubmitting}
            />
            <Button
              type="submit"
              className="bg-[#D4B82C] hover:bg-[#c5aa28] text-[#004B4B] font-medium whitespace-nowrap"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-[#004B4B] border-t-transparent rounded-full animate-spin"></div>
                  {t.subscribeButton}
                </div>
              ) : (
                t.subscribeButton
              )}
            </Button>
          </form>

          {/* Success/Error Message */}
          {message && (
            <div
              className={`mt-4 p-3 rounded-lg ${
                messageType === "success"
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
            >
              <p className="text-sm">{message}</p>
            </div>
          )}

          <p
            className={`text-xs opacity-70 mt-4 ${
              currentIsRTL ? "text-right" : "text-left"
            } md:text-center`}
          >
            {t.privacyText}
          </p>
        </div>
      </div>
    </section>
  );
}
