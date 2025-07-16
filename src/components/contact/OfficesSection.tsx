// src/app/[locale]/contact/components/OfficesSection.tsx
"use client";

import OfficeCard from "./OfficeCard";
import OfficeDetails from "./OfficeDetails";

interface OfficesSectionProps {
  t: any;
  isRTL: boolean;
  selectedOffice: string;
  setSelectedOffice: (office: string) => void;
}

export default function OfficesSection({
  t,
  isRTL,
  selectedOffice,
  setSelectedOffice,
}: OfficesSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-6">
        {t.offices.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <OfficeCard
          office="uae"
          data={t.offices.uae}
          isSelected={selectedOffice === "uae"}
          onSelect={() => setSelectedOffice("uae")}
          imageSrc="/images/contact/uaeimage.webp"
          imageAlt="UAE Office"
        />

        <OfficeCard
          office="ksa"
          data={t.offices.ksa}
          isSelected={selectedOffice === "ksa"}
          onSelect={() => setSelectedOffice("ksa")}
          imageSrc="/images/contact/saudiimage.webp"
          imageAlt="KSA Office"
        />
      </div>

      <OfficeDetails
        selectedOffice={selectedOffice}
        t={t}
        isRTL={isRTL}
        setSelectedOffice={setSelectedOffice}
      />
    </section>
  );
}
