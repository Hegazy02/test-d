// src/app/[locale]/contact/components/OfficeDetails.tsx
import ContactCard from "./ContactCard";

interface OfficeDetailsProps {
  selectedOffice: string;
  t: any;
  isRTL: boolean;
  setSelectedOffice: (office: string) => void;
}

export default function OfficeDetails({
  selectedOffice,
  t,
  isRTL,
  setSelectedOffice,
}: OfficeDetailsProps) {
  if (!selectedOffice) {
    return (
      <div className="border-t border-gray-200 pt-6">
        <div className="text-center py-16 dark:bg-[#6e6e6e] bg-gray-50 rounded-lg border border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 dark:bg-[#6e6e6e] bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 dark:text-white text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v2a1 1 0 01-1 1H6a1 1 0 01-1-1v-2h10z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold dark:text-white text-gray-900 mb-3">
              {isRTL ? "اختر مكتباً" : "Select an Office"}
            </h3>
            <p className="dark:text-white text-gray-600 mb-8">
              {isRTL
                ? "انقر على أحد المكاتب أعلاه لعرض تفاصيل الاتصال"
                : "Click on one of the offices above to view contact details"}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setSelectedOffice("uae")}
                className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <img
                  src="/images/contact/uae.png"
                  alt="UAE Flag"
                  className="w-6 h-4 object-cover rounded"
                />
                {isRTL ? "مكتب الإمارات" : "UAE Office"}
              </button>
              <button
                onClick={() => setSelectedOffice("ksa")}
                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <img
                  src="/images/contact/sa.webp"
                  alt="Saudi Arabia Flag"
                  className="w-6 h-4 object-cover rounded"
                />
                {isRTL ? "مكتب السعودية" : "KSA Office"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const officeData = selectedOffice === "uae" ? t.offices.uae : t.offices.ksa;
  const flagSrc =
    selectedOffice === "uae"
      ? "/images/contact/uae.png"
      : "/images/contact/sa.webp";
  const flagAlt = selectedOffice === "uae" ? "UAE Flag" : "Saudi Arabia Flag";

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="dark:bg-black bg-white rounded-lg p-8 dark:border-0 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
          <img
            src={flagSrc}
            alt={flagAlt}
            className="w-12 h-8 object-cover rounded"
          />
          <div>
            <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-1">
              {officeData.title}
            </h3>
            <p className="dark:text-white text-gray-600">
              {officeData.location}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ContactCard
            type="email"
            title={isRTL ? "البريد الإلكتروني" : "Email Address"}
            value={officeData.email}
            action={`mailto:${officeData.email}`}
            actionText={isRTL ? "انقر للإرسال" : "Click to send email"}
            colorClass="blue"
          />

          <ContactCard
            type="phone"
            title={isRTL ? "رقم الهاتف" : "Phone Number"}
            value={officeData.phone}
            action={`tel:${officeData.phone}`}
            actionText={isRTL ? "انقر للاتصال" : "Click to call"}
            colorClass="green"
          />

          <ContactCard
            type="address"
            title={isRTL ? "العنوان" : "Office Address"}
            value={officeData.address}
            action="https://maps.app.goo.gl/AuCN3ApFXCS2SwxWA?g_st=com.google.maps.preview.copy"
            actionText={isRTL ? "انقر لعرض الخريطة" : "Click to view on map"}
            colorClass="red"
          />
        </div>
      </div>
    </div>
  );
}
