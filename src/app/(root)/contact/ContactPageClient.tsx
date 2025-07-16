// src/app/[locale]/contact/ContactPageClient.tsx
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactHeader from "@/components/contact/ContactHeader";
import OfficesSection from "@/components/contact/OfficesSection";
import ContactForm from "@/components/contact/ContactForm";
import { translations } from "@/app/[locale]/contact/data/translations";

interface ContactPageClientProps {
  locale: string;
}

export default function ContactPageClient({ locale }: ContactPageClientProps) {
  const { i18n } = useTranslation();
  const lang = i18n?.language || locale || "en";
  const t = lang === "ar" ? translations.ar : translations.en;
  const isRTL = lang === "ar";

  const [selectedOffice, setSelectedOffice] = useState("ksa");

  return (
    <div className="min-h-screen  mt-10" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-10 py-16">
        {/* Page Header */}
        <ContactHeader title={t.page.title} subtitle={t.page.subtitle} />

        {/* Our Offices Section */}
        <OfficesSection
          t={t}
          isRTL={isRTL}
          selectedOffice={selectedOffice}
          setSelectedOffice={setSelectedOffice}
        />

        {/* Contact Form Section */}
        <ContactForm t={t} isRTL={isRTL} selectedOffice={selectedOffice} />
      </div>
    </div>
  );
}
