// src/app/[locale]/contact/components/ContactForm.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { countries } from "./countries";

interface ContactFormProps {
  t: any;
  isRTL: boolean;
  selectedOffice: string;
}

export default function ContactForm({
  t,
  isRTL,
  selectedOffice,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [selectedCountry, setSelectedCountry] = useState({
    code: "sa",
    dialCode: "+966",
    name: "Saudi Arabia",
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getFlagComponent = (countryCode: string) => (
    <span
      className="inline-block bg-cover bg-center"
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
    />
  );

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
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // السماح بالأرقام والمسافات والشرطات فقط
    if (/^[\d\s\-]*$/.test(value) || value === "") {
      // إضافة الرقم الجديد إلى رمز الدولة
      setFormData((prev) => ({
        ...prev,
        phone: selectedCountry.dialCode + value,
      }));
    }
  };

  const handleCountrySelect = (country: typeof selectedCountry) => {
    setSelectedCountry(country);
    const phoneNumber = formData.phone.replace(/^\+?\d+/, "");
    setFormData((prev) => ({
      ...prev,
      phone: country.dialCode + phoneNumber,
    }));
    setIsDropdownOpen(false);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t.form.errors.nameRequired;
    }

    if (!formData.email.trim()) {
      newErrors.email = t.form.errors.emailRequired;
    }

    if (!formData.message.trim()) {
      newErrors.message = t.form.errors.messageRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
        message: formData.message,
        tag: "Contact Us page",
        office: selectedOffice,
      });

      if (response.data.success) {
        setSubmitStatus({
          type: "success",
          message: t.form.messages.success,
        });
        setFormData({
          name: "",
          email: "",
          phone: selectedCountry.dialCode,
          message: "",
        });
        setErrors({});
      } else {
        throw new Error(response.data.message || "Failed to send message");
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: t.form.messages.error,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-6">
        {t.form.title}
      </h2>

      {submitStatus.type && (
        <div
          className={`mb-6 p-4 rounded-md ${
            submitStatus.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
          role="alert"
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full space-y-6">
        {/* Name Field */}
        <div className="w-full">
          <Label
            htmlFor="name"
            className="block dark:text-white text-gray-900 font-medium mb-2 text-sm sm:text-base"
          >
            {t.form.labels.name}
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder={t.form.placeholders.name}
            className={`w-full h-12 sm:h-14 px-3 sm:px-4 border border-gray-300 rounded-lg sm:rounded-xl dark:bg-[#434343] bg-white focus:border-gray-300 focus:ring-0 text-sm sm:text-base ${
              errors.name ? "border-red-500" : ""
            } ${isRTL ? "text-right" : "text-left"}`}
            dir={isRTL ? "rtl" : "ltr"}
            required
          />
          {errors.name && (
            <p className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="w-full">
          <Label
            htmlFor="email"
            className="block dark:text-white text-gray-900 font-medium mb-2 text-sm sm:text-base"
          >
            {t.form.labels.email}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={t.form.placeholders.email}
            className={`w-full h-12 sm:h-14 px-3 sm:px-4 border border-gray-300 rounded-lg sm:rounded-xl dark:bg-[#434343] bg-white focus:border-gray-300 focus:ring-0 text-left text-sm sm:text-base ${
              errors.email ? "border-red-500" : ""
            }`}
            dir="ltr"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="w-full">
          <Label className="block dark:text-white text-gray-900 font-medium mb-2 text-sm sm:text-base">
            {t.form.labels.phone}
          </Label>
          <div className="flex relative" ref={dropdownRef}>
            {/* Country Selector Button */}
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center justify-center px-3 py-2 dark:bg-[#434343] bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-teal-800 border-gray-300 min-w-[65px] ${
                isRTL ? "rounded-r-lg border-l-0" : "rounded-l-lg border-r-0"
              }`}
            >
              {getFlagComponent(selectedCountry.code)}
              <span className="text-xs ml-1">▼</span>
            </button>

            {/* Phone Input */}
            <input
              type="tel"
              value={formData.phone.replace(selectedCountry.dialCode, "")}
              onChange={handlePhoneNumberChange}
              placeholder="123456789"
              className={`flex-1 px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-teal-800 border-gray-300 h-12 sm:h-14 text-sm sm:text-base ${
                isRTL ? "rounded-l-lg border-r-0" : "rounded-r-lg border-l-0"
              }`}
              dir="ltr"
            />

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 dark:bg-[#434343]  bg-white border border-gray-300 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
                {countries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className="w-full px-3 py-2 text-left flex items-center space-x-3 border-b hover:bg-gray-400 border-gray-100 last:border-b-0"
                  >
                    {getFlagComponent(country.code)}
                    <span className="text-sm dark:text-white text-gray-600 min-w-[45px]">
                      {country.dialCode}
                    </span>
                    <span className="text-sm flex-1">{country.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="w-full">
          <Label
            htmlFor="message"
            className="block dark:text-white text-gray-900 font-medium mb-2 text-sm sm:text-base"
          >
            {t.form.labels.message}
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder={t.form.placeholders.message}
            className={`w-full min-h-24 sm:min-h-36 px-3 sm:px-4 py-3 border border-gray-300 rounded-lg sm:rounded-xl dark:bg-[#434343] bg-white focus:border-gray-300 focus:ring-0 resize-none text-sm sm:text-base ${
              errors.message ? "border-red-500" : ""
            } ${isRTL ? "text-right" : "text-left"}`}
            dir={isRTL ? "rtl" : "ltr"}
            required
          />
          {errors.message && (
            <p className="text-red-500 text-xs sm:text-sm mt-1" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full dark:bg-[#434343] bg-teal-800 hover:bg-teal-900 text-gray-100 font-bold py-3 sm:py-4 px-4 rounded-lg sm:rounded-xl transition-colors text-sm sm:text-base ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? t.form.buttons.submitting : t.form.buttons.submit}
          </Button>
        </div>
      </form>
    </section>
  );
}
