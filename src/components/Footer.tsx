"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { createLocalizedPath } from "./Nav";

const footerContent = {
  services: {
    title: {
      en: "Our Services",
      ar: "خدماتنا",
    },
    items: [
      {
        en: "Media Production",
        ar: "الإنتاج الإعلامي",
        href: "/media-production",
      },
      {
        en: "Events Management",
        ar: "إدارة الفعاليات",
        href: "/events-management",
      },
      {
        en: "Printing",
        ar: "الطباعة",
        href: "/darbprint",
      },
      {
        en: "Booth Productions",
        ar: "إنتاج المعارض",
        href: "/booth-production",
      },
    ],
  },
  quickLinks: {
    title: {
      en: "Quick Links",
      ar: "روابط سريعة",
    },
    items: [
      // {
      //   en: "Blogs",
      //   ar: "المدونة",
      //   href: "/blogs",
      // },
      {
        en: "About us",
        ar: "من نحن",
        href: "/about",
      },
      {
        en: "Contact us",
        ar: "تواصل معنا",
        href: "/contact",
      },
    ],
  },
  contact: {
    title: {
      en: "Contact Us",
      ar: "اتصل بنا",
    },
    email: "البريد الإلكتروني",
    location: {
      en: "Location on Google Maps",
      ar: "الموقع على خرائط جوجل",
    },
  },
};

const Footer = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isRTL = lang === "ar";
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params?.locale || "en";
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* Desktop Footer */}
      <div className="hidden md:block">
        <footer className="dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C] bg-[#F5F5F5] dark:text-white text-black py-10 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Services Column */}
              <div>
                <h3 className="text-lg font-bold uppercase mb-6">
                  {footerContent.services.title[lang]}
                </h3>
                <ul className="space-y-3 text-sm">
                  {footerContent.services.items.map((service, index) => (
                    <li key={index}>
                      <Link
                        href={createLocalizedPath(service.href, pathname)}
                        className="hover:underline"
                      >
                        {service[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links Column */}
              <div>
                <h3 className="text-lg font-bold uppercase mb-6">
                  {footerContent.quickLinks.title[lang]}
                </h3>
                <ul className="space-y-3 text-sm">
                  {footerContent.quickLinks.items.map((link, index) => (
                    <li key={index}>
                      <Link href={createLocalizedPath(link.href,pathname)} className="hover:underline">
                        {link[lang]}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Column */}
              <div>
                <h3 className="text-lg font-bold uppercase mb-6 ">
                  {footerContent.contact.title[lang]}
                </h3>
                <ul className="space-y-3 text-sm">
                  <li>
                    <span>
                      {lang === "ar" ? "البريد الإلكتروني: " : "Email: "}
                    </span>
                    <a
                      href="mailto:hello@darbproductions.com"
                      className="hover:underline text-md md:text-md"
                    >
                      hello@darbproductions.com
                    </a>
                  </li>

                  <li
                    className={`flex flex-row items-center gap-1  ${isRTL ? "justify-end" : "justify-start"} `}
                  >
                    <div
                      className={`hover:underline cursor-pointer ${isRTL ? "force-ltr" : "hidden"}`}
                      onClick={() =>
                        window.open("http://wa.me/97143430487", "_blank")
                      }
                    >
                      {lang === "ar" ? "\u200E+971 43430487" : "+971 43430487"}{" "}
                      {/* إضافة LRM للعربية */}
                    </div>
                    <span className="font-semibold force-rtl">
                      {lang === "ar" ? "الإمارات: " : "UAE: "}
                    </span>
                    <div
                      className={`hover:underline cursor-pointer ${isRTL ? "hidden" : ""}`}
                      onClick={() =>
                        window.open("http://wa.me/97143430487", "_blank")
                      }
                    >
                      {lang === "ar" ? "\u200E+971 43430487" : "+971 43430487"}{" "}
                      {/* إضافة LRM للعربية */}
                    </div>
                  </li>

                  <li>
                    <a
                      href="https://maps.google.com/?q=Darb+Productions+UAE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {footerContent.contact.location[lang]}
                    </a>
                  </li>
                  <li
                    className={`flex flex-row items-center gap-1 ${isRTL ? "justify-end" : "justify-start"} `}
                  >
                    <div
                      className={`hover:underline cursor-pointer ${isRTL ? "force-ltr" : "hidden"}`}
                      onClick={() =>
                        window.open("http://wa.me/966505502047", "_blank")
                      }
                    >
                      {lang === "ar"
                        ? "\u200E+966 50 550 2047"
                        : "+966 50 550 2047"}{" "}
                      {/* إضافة LRM للعربية */}
                    </div>
                    <span className="font-semibold force-rtl">
                      {lang === "ar" ? "السعودية: " : "KSA: "}
                    </span>
                    <div
                      className={`hover:underline cursor-pointer ${isRTL ? "hidden" : ""}`}
                      onClick={() =>
                        window.open("http://wa.me/966505502047", "_blank")
                      }
                    >
                      {lang === "ar"
                        ? "\u200E+966 50 550 2047"
                        : "+966 50 550 2047"}{" "}
                      {/* إضافة LRM للعربية */}
                    </div>
                  </li>
                  <li>
                    <a
                      href="https://maps.google.com/?q=Darb+Productions+KSA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {footerContent.contact.location[lang]}
                    </a>
                  </li>

                  {/* Social Media Icons */}
                  <li className="flex space-x-4 mt-4">
                    <a
                      href="https://www.linkedin.com/company/darb-productions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Image
                        src="/images/footer/linkedin.svg"
                        alt="LinkedIn"
                        width={24}
                        height={24}
                        className={`hover:opacity-80 transition-opacity ${resolvedTheme === "dark" ? "" : "invert"}`}
                      />
                    </a>
                    <a
                      href="https://vimeo.com/darbpro"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Vimeo"
                    >
                      <Image
                        src="/images/footer/vemio.svg"
                        alt="Vimeo"
                        width={24}
                        height={24}
                        className={`hover:opacity-80 transition-opacity ${resolvedTheme === "dark" ? "" : "invert"}`}
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/darb.productions"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* dark light mode */}
          {mounted && !isMobile && (
            <button
              onClick={() => {
                const newTheme = resolvedTheme === "dark" ? "light" : "dark";
                localStorage.theme = newTheme;
                const html = document.documentElement;
                html.classList.toggle("dark", newTheme === "dark");
                html.setAttribute("data-theme", newTheme);
                setTheme(newTheme);
              }}
              className={`absolute top-10 right-20 z-50 p-2 rounded-full transition-colors ${
                resolvedTheme === "light" ? "bg-white" : " bg-[#171717] "
              }`}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Image
                  src="/images/main/nav/dark.png"
                  alt="Light mode icon"
                  width={24}
                  height={24}
                  className="invert-0" // لا تعكس في الوضع الداكن
                />
              ) : (
                <Image
                  src="/images/main/nav/dark.png"
                  alt="Dark mode icon"
                  width={24}
                  height={24}
                  className="invert" // تجعل الصورة سوداء
                />
              )}
            </button>
          )}
        </footer>
      </div>

      {/* Mobile Footer */}
      <div className="block md:hidden">
        <footer className="dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C] bg-[#004B4B] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-6">
              {/* Services and Quick Links Row */}
              <div className="flex space-x-4">
                {/* Services Column */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold uppercase mb-4">
                    {footerContent.services.title[lang]}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {footerContent.services.items.map((service, index) => (
                      <li key={index}>
                        <Link href={createLocalizedPath(service.href,pathname)} className="hover:underline">
                          {service[lang]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Links Column */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold uppercase mb-4">
                    {footerContent.quickLinks.title[lang]}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {footerContent.quickLinks.items.map((link, index) => (
                      <li key={index}>
                        <Link href={createLocalizedPath(link.href,pathname)} className="hover:underline">
                          {link[lang]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Contact Column */}
              <div>
                <h3 className="text-lg font-bold uppercase mb-4">
                  {footerContent.contact.title[lang]}
                </h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <span>
                      {lang === "ar" ? "البريد الإلكتروني: " : "Email: "}
                    </span>
                    <a
                      href="mailto:hello@darbproductions.com"
                      className="hover:underline text-md"
                    >
                      hello@darbproductions.com
                    </a>
                  </li>
                  <li
                    className={`flex flex-row items-center gap-1  ${isRTL ? "justify-end" : "justify-start"} `}
                  >
                    <div
                      className={`hover:underline cursor-pointer ${isRTL ? "force-ltr" : "hidden"}`}
                      onClick={() =>
                        window.open("http://wa.me/97143430487", "_blank")
                      }
                    >
                      {lang === "ar" ? "\u200E+971 43430487" : "+971 43430487"}{" "}
                      {/* إضافة LRM للعربية */}
                    </div>
                    <span className="font-semibold force-rtl">
                      {lang === "ar" ? "الإمارات: " : "UAE: "}
                    </span>
                    <div
                      className={`hover:underline cursor-pointer ${isRTL ? "hidden" : ""}`}
                      onClick={() =>
                        window.open("http://wa.me/97143430487", "_blank")
                      }
                    >
                      {lang === "ar" ? "\u200E+971 43430487" : "+971 43430487"}{" "}
                      {/* إضافة LRM للعربية */}
                    </div>
                  </li>
                  <li>
                    <a
                      href="https://maps.google.com/?q=Darb+Productions+UAE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {footerContent.contact.location[lang]}
                    </a>
                  </li>
                  <li
                    className={`flex flex-row items-center gap-1 ${isRTL ? "justify-end" : "justify-start"} `}
                  >
                    <div
                      className={`hover:underline cursor-pointer ${isRTL ? "force-ltr" : "hidden"}`}
                      onClick={() =>
                        window.open("http://wa.me/966505502047", "_blank")
                      }
                    >
                      {lang === "ar"
                        ? "\u200E+966 50 550 2047"
                        : "+966 50 550 2047"}{" "}
                      {/* إضافة LRM للعربية */}
                    </div>
                    <span className="font-semibold force-rtl">
                      {lang === "ar" ? "السعودية: " : "KSA: "}
                    </span>
                    <div
                      className={`hover:underline cursor-pointer ${isRTL ? "hidden" : ""}`}
                      onClick={() =>
                        window.open("http://wa.me/966505502047", "_blank")
                      }
                    >
                      {lang === "ar"
                        ? "\u200E+966 50 550 2047"
                        : "+966 50 550 2047"}{" "}
                      {/* إضافة LRM للعربية */}
                    </div>
                  </li>
                  <li>
                    <a
                      href="https://maps.google.com/?q=Darb+Productions+KSA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {footerContent.contact.location[lang]}
                    </a>
                  </li>

                  {/* Social Media Icons */}
                  <li className="flex space-x-4 mt-4">
                    <a
                      href="https://www.linkedin.com/company/darb-productions/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                    >
                      <Image
                        src="/images/footer/linkedin.svg"
                        alt="LinkedIn"
                        width={24}
                        height={24}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </a>
                    <a
                      href="https://vimeo.com/darbpro"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Vimeo"
                    >
                      <Image
                        src="/images/footer/vemio.svg"
                        alt="Vimeo"
                        width={24}
                        height={24}
                        className="hover:opacity-80 transition-opacity"
                      />
                    </a>
                    <a
                      href="https://www.instagram.com/darb.productions"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
