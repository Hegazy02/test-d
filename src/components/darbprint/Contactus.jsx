// الinput الخاص ب رقم الهاتف واختيار الدولة جيد هنا
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

const Contactus = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const pathname = usePathname();
  const isRTL = lang === "ar";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    Message: "",
  });
  const [selectedCountry, setSelectedCountry] = useState({
    code: "sa",
    dialCode: "+966",
    name: "Saudi Arabia",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });
  const [errors, setErrors] = useState({});
  const dropdownRef = useRef(null);

  // قائمة الدول مع الأعلام - الدول العربية أولاً ثم باقي دول العالم
  const countries = [
    // الدول العربية أولاً
    { code: "sa", dialCode: "+966", name: "Saudi Arabia" },
    { code: "eg", dialCode: "+20", name: "Egypt" },
    { code: "ae", dialCode: "+971", name: "United Arab Emirates" },
    { code: "kw", dialCode: "+965", name: "Kuwait" },
    { code: "qa", dialCode: "+974", name: "Qatar" },
    { code: "bh", dialCode: "+973", name: "Bahrain" },
    { code: "om", dialCode: "+968", name: "Oman" },
    { code: "jo", dialCode: "+962", name: "Jordan" },
    { code: "lb", dialCode: "+961", name: "Lebanon" },
    { code: "sy", dialCode: "+963", name: "Syria" },
    { code: "iq", dialCode: "+964", name: "Iraq" },
    { code: "ye", dialCode: "+967", name: "Yemen" },
    { code: "ps", dialCode: "+970", name: "Palestine" },
    { code: "ma", dialCode: "+212", name: "Morocco" },
    { code: "dz", dialCode: "+213", name: "Algeria" },
    { code: "tn", dialCode: "+216", name: "Tunisia" },
    { code: "ly", dialCode: "+218", name: "Libya" },
    { code: "sd", dialCode: "+249", name: "Sudan" },
    { code: "so", dialCode: "+252", name: "Somalia" },
    { code: "dj", dialCode: "+253", name: "Djibouti" },
    { code: "km", dialCode: "+269", name: "Comoros" },
    { code: "mr", dialCode: "+222", name: "Mauritania" },

    // باقي دول العالم مرتبة أبجدياً
    { code: "af", dialCode: "+93", name: "Afghanistan" },
    { code: "al", dialCode: "+355", name: "Albania" },
    { code: "ad", dialCode: "+376", name: "Andorra" },
    { code: "ao", dialCode: "+244", name: "Angola" },
    { code: "ag", dialCode: "+1268", name: "Antigua and Barbuda" },
    { code: "ar", dialCode: "+54", name: "Argentina" },
    { code: "am", dialCode: "+374", name: "Armenia" },
    { code: "au", dialCode: "+61", name: "Australia" },
    { code: "at", dialCode: "+43", name: "Austria" },
    { code: "az", dialCode: "+994", name: "Azerbaijan" },
    { code: "bs", dialCode: "+1242", name: "Bahamas" },
    { code: "bd", dialCode: "+880", name: "Bangladesh" },
    { code: "bb", dialCode: "+1246", name: "Barbados" },
    { code: "by", dialCode: "+375", name: "Belarus" },
    { code: "be", dialCode: "+32", name: "Belgium" },
    { code: "bz", dialCode: "+501", name: "Belize" },
    { code: "bj", dialCode: "+229", name: "Benin" },
    { code: "bt", dialCode: "+975", name: "Bhutan" },
    { code: "bo", dialCode: "+591", name: "Bolivia" },
    { code: "ba", dialCode: "+387", name: "Bosnia and Herzegovina" },
    { code: "bw", dialCode: "+267", name: "Botswana" },
    { code: "br", dialCode: "+55", name: "Brazil" },
    { code: "bn", dialCode: "+673", name: "Brunei" },
    { code: "bg", dialCode: "+359", name: "Bulgaria" },
    { code: "bf", dialCode: "+226", name: "Burkina Faso" },
    { code: "bi", dialCode: "+257", name: "Burundi" },
    { code: "cv", dialCode: "+238", name: "Cape Verde" },
    { code: "kh", dialCode: "+855", name: "Cambodia" },
    { code: "cm", dialCode: "+237", name: "Cameroon" },
    { code: "ca", dialCode: "+1", name: "Canada" },
    { code: "cf", dialCode: "+236", name: "Central African Republic" },
    { code: "td", dialCode: "+235", name: "Chad" },
    { code: "cl", dialCode: "+56", name: "Chile" },
    { code: "cn", dialCode: "+86", name: "China" },
    { code: "co", dialCode: "+57", name: "Colombia" },
    { code: "cg", dialCode: "+242", name: "Congo" },
    { code: "cd", dialCode: "+243", name: "Congo (DRC)" },
    { code: "cr", dialCode: "+506", name: "Costa Rica" },
    { code: "ci", dialCode: "+225", name: "Côte d'Ivoire" },
    { code: "hr", dialCode: "+385", name: "Croatia" },
    { code: "cu", dialCode: "+53", name: "Cuba" },
    { code: "cy", dialCode: "+357", name: "Cyprus" },
    { code: "cz", dialCode: "+420", name: "Czech Republic" },
    { code: "dk", dialCode: "+45", name: "Denmark" },
    { code: "dm", dialCode: "+1767", name: "Dominica" },
    { code: "do", dialCode: "+1", name: "Dominican Republic" },
    { code: "ec", dialCode: "+593", name: "Ecuador" },
    { code: "sv", dialCode: "+503", name: "El Salvador" },
    { code: "gq", dialCode: "+240", name: "Equatorial Guinea" },
    { code: "er", dialCode: "+291", name: "Eritrea" },
    { code: "ee", dialCode: "+372", name: "Estonia" },
    { code: "sz", dialCode: "+268", name: "Eswatini" },
    { code: "et", dialCode: "+251", name: "Ethiopia" },
    { code: "fj", dialCode: "+679", name: "Fiji" },
    { code: "fi", dialCode: "+358", name: "Finland" },
    { code: "fr", dialCode: "+33", name: "France" },
    { code: "ga", dialCode: "+241", name: "Gabon" },
    { code: "gm", dialCode: "+220", name: "Gambia" },
    { code: "ge", dialCode: "+995", name: "Georgia" },
    { code: "de", dialCode: "+49", name: "Germany" },
    { code: "gh", dialCode: "+233", name: "Ghana" },
    { code: "gr", dialCode: "+30", name: "Greece" },
    { code: "gd", dialCode: "+1473", name: "Grenada" },
    { code: "gt", dialCode: "+502", name: "Guatemala" },
    { code: "gn", dialCode: "+224", name: "Guinea" },
    { code: "gw", dialCode: "+245", name: "Guinea-Bissau" },
    { code: "gy", dialCode: "+592", name: "Guyana" },
    { code: "ht", dialCode: "+509", name: "Haiti" },
    { code: "hn", dialCode: "+504", name: "Honduras" },
    { code: "hu", dialCode: "+36", name: "Hungary" },
    { code: "is", dialCode: "+354", name: "Iceland" },
    { code: "in", dialCode: "+91", name: "India" },
    { code: "id", dialCode: "+62", name: "Indonesia" },
    { code: "ir", dialCode: "+98", name: "Iran" },
    { code: "ie", dialCode: "+353", name: "Ireland" },
    { code: "il", dialCode: "+972", name: "Israel" },
    { code: "it", dialCode: "+39", name: "Italy" },
    { code: "jm", dialCode: "+1876", name: "Jamaica" },
    { code: "jp", dialCode: "+81", name: "Japan" },
    { code: "kz", dialCode: "+7", name: "Kazakhstan" },
    { code: "ke", dialCode: "+254", name: "Kenya" },
    { code: "ki", dialCode: "+686", name: "Kiribati" },
    { code: "kp", dialCode: "+850", name: "North Korea" },
    { code: "kr", dialCode: "+82", name: "South Korea" },
    { code: "xk", dialCode: "+383", name: "Kosovo" },
    { code: "kg", dialCode: "+996", name: "Kyrgyzstan" },
    { code: "la", dialCode: "+856", name: "Laos" },
    { code: "lv", dialCode: "+371", name: "Latvia" },
    { code: "ls", dialCode: "+266", name: "Lesotho" },
    { code: "lr", dialCode: "+231", name: "Liberia" },
    { code: "li", dialCode: "+423", name: "Liechtenstein" },
    { code: "lt", dialCode: "+370", name: "Lithuania" },
    { code: "lu", dialCode: "+352", name: "Luxembourg" },
    { code: "mg", dialCode: "+261", name: "Madagascar" },
    { code: "mw", dialCode: "+265", name: "Malawi" },
    { code: "my", dialCode: "+60", name: "Malaysia" },
    { code: "mv", dialCode: "+960", name: "Maldives" },
    { code: "ml", dialCode: "+223", name: "Mali" },
    { code: "mt", dialCode: "+356", name: "Malta" },
    { code: "mh", dialCode: "+692", name: "Marshall Islands" },
    { code: "mu", dialCode: "+230", name: "Mauritius" },
    { code: "mx", dialCode: "+52", name: "Mexico" },
    { code: "fm", dialCode: "+691", name: "Micronesia" },
    { code: "md", dialCode: "+373", name: "Moldova" },
    { code: "mc", dialCode: "+377", name: "Monaco" },
    { code: "mn", dialCode: "+976", name: "Mongolia" },
    { code: "me", dialCode: "+382", name: "Montenegro" },
    { code: "mz", dialCode: "+258", name: "Mozambique" },
    { code: "mm", dialCode: "+95", name: "Myanmar" },
    { code: "na", dialCode: "+264", name: "Namibia" },
    { code: "nr", dialCode: "+674", name: "Nauru" },
    { code: "np", dialCode: "+977", name: "Nepal" },
    { code: "nl", dialCode: "+31", name: "Netherlands" },
    { code: "nz", dialCode: "+64", name: "New Zealand" },
    { code: "ni", dialCode: "+505", name: "Nicaragua" },
    { code: "ne", dialCode: "+227", name: "Niger" },
    { code: "ng", dialCode: "+234", name: "Nigeria" },
    { code: "mk", dialCode: "+389", name: "North Macedonia" },
    { code: "no", dialCode: "+47", name: "Norway" },
    { code: "pk", dialCode: "+92", name: "Pakistan" },
    { code: "pw", dialCode: "+680", name: "Palau" },
    { code: "pa", dialCode: "+507", name: "Panama" },
    { code: "pg", dialCode: "+675", name: "Papua New Guinea" },
    { code: "py", dialCode: "+595", name: "Paraguay" },
    { code: "pe", dialCode: "+51", name: "Peru" },
    { code: "ph", dialCode: "+63", name: "Philippines" },
    { code: "pl", dialCode: "+48", name: "Poland" },
    { code: "pt", dialCode: "+351", name: "Portugal" },
    { code: "ro", dialCode: "+40", name: "Romania" },
    { code: "ru", dialCode: "+7", name: "Russia" },
    { code: "rw", dialCode: "+250", name: "Rwanda" },
    { code: "kn", dialCode: "+1869", name: "Saint Kitts and Nevis" },
    { code: "lc", dialCode: "+1758", name: "Saint Lucia" },
    { code: "vc", dialCode: "+1784", name: "Saint Vincent and the Grenadines" },
    { code: "ws", dialCode: "+685", name: "Samoa" },
    { code: "sm", dialCode: "+378", name: "San Marino" },
    { code: "st", dialCode: "+239", name: "São Tomé and Príncipe" },
    { code: "sn", dialCode: "+221", name: "Senegal" },
    { code: "rs", dialCode: "+381", name: "Serbia" },
    { code: "sc", dialCode: "+248", name: "Seychelles" },
    { code: "sl", dialCode: "+232", name: "Sierra Leone" },
    { code: "sg", dialCode: "+65", name: "Singapore" },
    { code: "sk", dialCode: "+421", name: "Slovakia" },
    { code: "si", dialCode: "+386", name: "Slovenia" },
    { code: "sb", dialCode: "+677", name: "Solomon Islands" },
    { code: "za", dialCode: "+27", name: "South Africa" },
    { code: "ss", dialCode: "+211", name: "South Sudan" },
    { code: "es", dialCode: "+34", name: "Spain" },
    { code: "lk", dialCode: "+94", name: "Sri Lanka" },
    { code: "sr", dialCode: "+597", name: "Suriname" },
    { code: "se", dialCode: "+46", name: "Sweden" },
    { code: "ch", dialCode: "+41", name: "Switzerland" },
    { code: "tj", dialCode: "+992", name: "Tajikistan" },
    { code: "tz", dialCode: "+255", name: "Tanzania" },
    { code: "th", dialCode: "+66", name: "Thailand" },
    { code: "tl", dialCode: "+670", name: "Timor-Leste" },
    { code: "tg", dialCode: "+228", name: "Togo" },
    { code: "to", dialCode: "+676", name: "Tonga" },
    { code: "tt", dialCode: "+1868", name: "Trinidad and Tobago" },
    { code: "tr", dialCode: "+90", name: "Turkey" },
    { code: "tm", dialCode: "+993", name: "Turkmenistan" },
    { code: "tv", dialCode: "+688", name: "Tuvalu" },
    { code: "ug", dialCode: "+256", name: "Uganda" },
    { code: "ua", dialCode: "+380", name: "Ukraine" },
    { code: "gb", dialCode: "+44", name: "United Kingdom" },
    { code: "us", dialCode: "+1", name: "United States" },
    { code: "uy", dialCode: "+598", name: "Uruguay" },
    { code: "uz", dialCode: "+998", name: "Uzbekistan" },
    // إصلاح المفاتيح المكررة - إزالة اليمن المكرر
    { code: "vu", dialCode: "+678", name: "Vanuatu" },
    { code: "va", dialCode: "+39", name: "Vatican City" },
    { code: "ve", dialCode: "+58", name: "Venezuela" },
    { code: "vn", dialCode: "+84", name: "Vietnam" },
    { code: "zm", dialCode: "+260", name: "Zambia" },
    { code: "zw", dialCode: "+263", name: "Zimbabwe" },
  ];

  // دالة لعرض العلم بـ CSS - responsive للهواتف
  const getFlagComponent = (countryCode) => (
    <span
      className={`fi fi-${countryCode} inline-block bg-cover bg-center`}
      style={{
        backgroundImage: `url(https://flagcdn.com/24x18/${countryCode}.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "inline-block",
        width:
          typeof window !== "undefined" && window.innerWidth < 640
            ? "clamp(16px, 4vw, 24px)"
            : "20px",
        height:
          typeof window !== "undefined" && window.innerWidth < 640
            ? "clamp(12px, 3vw, 18px)"
            : "15px",
      }}
    ></span>
  );

  // النصوص المترجمة
  const translations = {
    en: {
      heading:
        "We're here to answer your questions and assist you in choosing the best printing solutions.",
      subheading:
        "Whether you have a query about our services or need to discuss a specific project, we're ready to support you every step of the way.",
      formTitle: "Contact us",
      formDescription:
        "Our experts are ready to assist you with a customized printing solution, ensuring a hassle-free experience tailored to your needs.",
      nameLabel: "Name",
      emailLabel: "Email",
      phoneLabel: "Phone Number",
      messageLabel: "Message",
      namePlaceholder: "Enter Your Name",
      emailPlaceholder: "Enter Your Email",
      submitButton: "Contact us",
      submittingButton: "Sending...",
      successMessage:
        "Thank you for your message. We will get back to you soon!",
      errorMessage: "Failed to send message. Please try again later.",
      errors: {
        nameRequired: "Name is required",
        emailRequired: "Email is required",
        messageRequired: "Message is required",
        phoneRequired: "Phone number is required",
      },
    },
    ar: {
      heading:
        "نحن هنا للإجابة على استفساراتك ومساعدتك في اختيار أفضل حلول الطباعة",
      subheading:
        "سواء كان لديك استفسار عن خدماتنا أو تحتاج لمناقشة مشروع معين، نحن جاهزون لدعمك في كل خطوة على الطريق",
      formTitle: "تواصل معنا",
      formDescription:
        "خبراؤنا مستعدون لمساعدتك بحل طباعة مخصص، مما يضمن تجربة خالية من المتاعب مصممة خصيصاً لاحتياجاتك.",
      nameLabel: "الاسم",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "رقم الهاتف",
      messageLabel: "الرسالة",
      namePlaceholder: "أدخل اسمك",
      emailPlaceholder: "أدخل بريدك الإلكتروني",
      submitButton: "تواصل معنا",
      submittingButton: "جاري الإرسال...",
      successMessage: "شكراً لرسالتك. سنتواصل معك قريباً!",
      errorMessage: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى لاحقاً.",
      errors: {
        nameRequired: "الاسم مطلوب",
        emailRequired: "البريد الإلكتروني مطلوب",
        messageRequired: "الرسالة مطلوبة",
        phoneRequired: "رقم الهاتف مطلوب",
      },
    },
  };

  const t = lang === "ar" ? translations.ar : translations.en;

  useEffect(() => {
    console.log("formData", formData);
  }, [formData]);

  useEffect(() => {
    const controller = new AbortController();

    const detectCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/", {
          signal: controller.signal,
        });

        const countryCode = response.data.country_code?.toLowerCase();
        const foundCountry = countries.find(
          (country) => country.code === countryCode
        );

        if (foundCountry) {
          setSelectedCountry(foundCountry);
          setFormData((prev) => ({
            ...prev,
            phone: foundCountry.dialCode,
          }));
        }
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Error detecting country:", error);
        }
      }
    };

    detectCountry();

    return () => controller.abort();
  }, []);

  // إغلاق الـ dropdown عند الضغط خارجه
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    // السماح بالأرقام والمسافات والشرطات فقط
    if (/^[\d\s\-]*$/.test(value) || value === "") {
      // إضافة الرقم الجديد إلى رمز الدولة
      setFormData((prev) => ({
        ...prev,
        phone: selectedCountry.dialCode + value,
      }));

      if (errors.phone) {
        setErrors((prev) => ({
          ...prev,
          phone: "",
        }));
      }
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    const phoneNumber = formData.phone.replace(/^\+?\d+/, "");
    setFormData((prev) => ({
      ...prev,
      phone: country.dialCode + phoneNumber,
    }));
    setIsDropdownOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t.errors.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.errors.emailRequired;
    }

    if (!formData.Message.trim()) {
      newErrors.Message = t.errors.messageRequired;
    }

    if (!formData.phone.trim() || formData.phone === selectedCountry.dialCode) {
      newErrors.phone = t.errors.phoneRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await axios.post("/api/send-email", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.Message,
        tag: `${pathname}`,
      });

      if (response.data.success) {
        setSubmitStatus({
          type: "success",
          message: t.successMessage,
        });
        setFormData({
          name: "",
          email: "",
          phone: selectedCountry.dialCode,
          Message: "",
        });
        setErrors({});
      } else {
        throw new Error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: t.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-section"
      className="w-full  dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C] bg-[#F5F5F5] text-white py-6 sm:py-6 md:py-6 mb-5"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-0 sm:gap-10 lg:gap-12 items-center justify-between">
          {/* Left Column - Text and Image */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
            <div
              className={`space-y-3 sm:space-y-4 max-w-xl mx-auto lg:mx-0 text-center ${isRTL ? "lg:text-right" : "lg:text-left"}`}
            >
              <h2 className="text-xl sm:text-3xl md:text-2xl lg:text-3xl dark:text-white text-black font-bold leading-tight">
                {t.heading}
              </h2>
              <p className="text-xs sm:text-md md:text-lg dark:text-white text-black opacity-90">
                {t.subheading}
              </p>
            </div>

            {/* Responsive Image Container */}
            <div className="relative w-full max-w-[200px] sm:max-w-[350px] md:max-w-[350px] mx-auto lg:mx-0 aspect-square hidden sm:block">
              <Image
                src="/images/services/darbprint/Contactus/image.webp"
                alt="Contact Illustration"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-5/12 xl:w-2/5 px-1">
            <div className="bg-white p-4 sm:p-5 md:p-6 rounded-md shadow-lg text-gray-800">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {t.formTitle}
              </h3>
              <p className="text-gray-600 mb-3 sm:mb-4 text-sm">
                {t.formDescription}
              </p>

              {submitStatus.type && (
                <div
                  className={`mb-3 p-3 rounded-md ${
                    submitStatus.type === "success"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.nameLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004B4B] text-sm ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.emailLabel} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004B4B] text-sm ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                    dir="ltr"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="w-full">
                  <div className="flex relative" ref={dropdownRef}>
                    {/* Country Selector Button */}
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center justify-center px-2 py-2 bg-gray-50 border hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-800 border-gray-300 min-w-[60px] ${
                        isRTL
                          ? "rounded-r-lg border-l-0"
                          : "rounded-l-lg border-r-0"
                      }`}
                    >
                      {getFlagComponent(selectedCountry.code)}
                      <span className="text-xs ml-1">▼</span>
                    </button>

                    {/* Phone Input */}
                    <input
                      type="tel"
                      value={formData.phone.replace(
                        selectedCountry.dialCode,
                        ""
                      )}
                      onChange={handlePhoneNumberChange}
                      placeholder="123456789"
                      className={`flex-1 px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-teal-800 border-gray-300 text-sm ${
                        isRTL
                          ? "rounded-l-lg border-r-0"
                          : "rounded-r-lg border-l-0"
                      }`}
                      dir="ltr"
                    />

                    {/* Dropdown */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-40 overflow-y-auto">
                        {countries.map((country) => (
                          <button
                            key={country.code}
                            type="button"
                            onClick={() => handleCountrySelect(country)}
                            className="w-full px-3 py-2 text-left hover:bg-gray-100 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
                          >
                            {getFlagComponent(country.code)}
                            <span className="text-sm text-gray-600 min-w-[45px]">
                              {country.dialCode}
                            </span>
                            <span className="text-sm flex-1">
                              {country.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="Message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.messageLabel} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="Message"
                    name="Message"
                    value={formData.Message}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#004B4B] text-sm resize-none ${
                      errors.Message ? "border-red-500" : "border-gray-300"
                    }`}
                    dir={lang === "ar" ? "rtl" : "ltr"}
                  ></textarea>
                  {errors.Message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.Message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#004B4B] text-white py-2 px-4 rounded-md transition-colors duration-300 font-medium text-sm ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-[#003B3B]"
                  }`}
                >
                  {isSubmitting ? t.submittingButton : t.submitButton}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contactus;
