// components/Nav.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { FaBars } from "react-icons/fa";
import useBlogStore from "@/store/store.ts";
import {
  ChevronDown,
  ChevronUp,
  Home,
  Briefcase,
  Info,
  Mail,
  Video,
  Calendar,
  Printer,
  Layout,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import useIsDesktop from "../hooks/useIsDesktop";

const serviceDropdown = [
  {
    label: { en: "Media Production", ar: "الإنتاج الإعلامي" },
    path: "/media-production",
    icon: <Video className="h-5 w-5" />,
  },
  {
    label: { en: "Events Management", ar: "إدارة الفعاليات" },
    path: "/events-management",
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    label: { en: "Printing", ar: "الطباعة" },
    path: "/darbprint",
    icon: <Printer className="h-5 w-5" />,
  },
  {
    label: { en: "Booth Productions", ar: "إنتاج المعارض" },
    path: "/booth-production",
    icon: <Layout className="h-5 w-5" />,
  },
];

const navLinks = [
  {
    path: "/",
    label: { en: "Home", ar: "الرئيسية" },
    icon: <Home className="h-5 w-5" />,
  },
  {
    path: "/services",
    label: { en: "Services", ar: "خدماتنا" },
    icon: <Briefcase className="h-5 w-5" />,
    hasDropdown: true,
  },
  {
    path: "/about",
    label: { en: "About", ar: "عن الشركة" },
    icon: <Info className="h-5 w-5" />,
  },
  {
    path: "/contact",
    label: { en: "Contact Us", ar: "تواصل معنا" },
    icon: <Mail className="h-5 w-5" />,
  },
];
const supportedLocales = ["en", "ar"];

export const createLocalizedPath = (path,pathname) => {
  // Remove any existing locale prefix from the path
  const pathParts = path.split("/").filter(Boolean);
  if (supportedLocales.includes(pathParts[0])) pathParts.shift();

  // Detect if the current route is localized
  const currentPathParts = pathname.split("/").filter(Boolean);
  const isCurrentLocalized = supportedLocales.includes(currentPathParts[0]);
  const currentLocale = isCurrentLocalized ? currentPathParts[0] : null;

  if (isCurrentLocalized) {
    return `/${currentLocale}${path === "/" ? "" : "/" + pathParts.join("/")}`;
  } else {
    // Default route: do not add locale prefix
    return path;
  }
};
export default function Nav() {
  const router = useRouter();
  const { isUP } = useBlogStore();
  const params = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const pathname = usePathname();
  const { i18n, t } = useTranslation();
  const servicesRef = useRef();
  const isDesktop = useIsDesktop();
  const currentLocale = params?.locale || "en";
  const i18nLocale = i18n.language || currentLocale;

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    document.documentElement.dir = currentLocale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = currentLocale;
  }, [currentLocale]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const getCurrentPathWithoutLocale = () => {
    const pathParts = pathname.split("/").filter(Boolean);
    if (pathParts[0] === currentLocale) pathParts.shift();
    return "/" + pathParts.join("/");
  };

  // دالة لتحديد ما إذا كنا في الصفحة الرئيسية
  const isHomePage = () => {
    const currentPathWithoutLocale = getCurrentPathWithoutLocale();
    return currentPathWithoutLocale === "/";
  };

  // دالة لتحديد لون النص والعناصر
  const getTextColor = () => {
    const currentPathWithoutLocale = getCurrentPathWithoutLocale();
    if (
      currentPathWithoutLocale === "/contact" &&
      resolvedTheme === "light" &&
      !isScrolled
    ) {
      return "text-black";
    }
    return "text-white";
  };

  const getLogoFilter = () => {
    const currentPathWithoutLocale = getCurrentPathWithoutLocale();
    if (
      currentPathWithoutLocale === "/contact" &&
      resolvedTheme === "light" &&
      !isScrolled
    ) {
      return ""; // لا تضف أي فلتر، الشعار يبقى أسود
    }
    return "filter brightness-0 invert"; // الشعار أبيض
  };
  // دالة لتحديد فلتر الشعار

  const handleChangeLanguage = () => {
    const newLocale = currentLocale === "ar" ? "" : "ar";
    // Remove any existing locale prefix from the current path
    const pathParts = pathname.split("/").filter(Boolean);
    if (supportedLocales.includes(pathParts[0])) pathParts.shift();
    let newPath;
    if (newLocale) {
      newPath = `/${newLocale}${pathParts.length ? "/" + pathParts.join("/") : ""}`;
    } else {
      newPath = `/${pathParts.join("/")}`;
    }
    if (newPath === "/") newPath = "/"; // Home
    document.cookie = `i18next-lang=${newLocale}; path=/; max-age=${365 * 24 * 60 * 60}`;
    router.push(newPath);
  };

  const closedropdown = () => setIsServicesOpen(false);

  const goto = (path) => {
    if (path === "/services") return;
    const localizedPath = createLocalizedPath(path,pathname);
    router.push(localizedPath);
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  function getButtonClass(path) {
    const currentPathWithoutLocale = getCurrentPathWithoutLocale();
    const isActive =
      path === currentPathWithoutLocale ||
      (currentPathWithoutLocale.startsWith(path) && path !== "/");

    const textColor = getTextColor();

    return `cursor-pointer relative text-md transition-all ${textColor} before:content-[''] before:absolute before:left-[-2px] before:top-[100%] before:h-[4px] before:bg-[#ffffff] before:transform before:w-[100%] before:z-[-1] ${
      isActive
        ? ""
        : "before:scale-x-0 before:origin-" +
          (currentLocale === "ar" ? "right" : "left") +
          " before:transition-all before:duration-300 before:ease-in-out hover:before:scale-x-100"
    }`;
  }

  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      animate={
        isUP && !isScrolled ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }
      }
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? resolvedTheme === "dark"
            ? "dark:bg-gradient-to-r from-[#1B2F2E] to-[#1C1C1C]"
            : "bg-[#004B4B]"
          : "bg-transparent"
      } transition-all duration-1000`}
    >
      <div
        className={`container mx-auto flex items-center justify-between ${
          isScrolled ? "h-[70px]" : "h-[85px]"
        } transition-all duration-500 px-4 sm:px-6`}
      >
        {/* الشعار */}
        <Link
          href={createLocalizedPath("/",pathname)}
          className="flex items-center max-h-15"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, y: isScrolled ? -5 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src="/images/LOGO.svg"
              alt="Logo"
              width={140}
              height={70}
              style={{ width: "140px", height: "70px" }}
              className={getLogoFilter()}
            />
          </motion.div>
        </Link>

        {/* حاوية للأزرار والشعار على اليمين */}
        <div className="flex items-center gap-4">
          {/* الأزرار */}
          <div className="hidden md:flex items-center">
            {navLinks.map((link, index) => (
              <div key={link.path} className="flex items-center">
                <div
                  className="relative"
                  ref={link.hasDropdown && isDesktop ? servicesRef : null}
                >
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`${getButtonClass(
                          link.path
                        )} px-4 flex items-center `}
                      >
                        <span className="font-medium">
                          {link.label[i18nLocale]}
                        </span>
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform" />
                      </button>
                      {isServicesOpen && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                          {serviceDropdown.map((item, index) => (
                            <Link
                              key={item.path + index}
                              href={createLocalizedPath(item.path,pathname)}
                              onClick={closedropdown}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              {item.label[i18nLocale]}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={createLocalizedPath(link.path,pathname)}
                      className={`${getButtonClass(
                        link.path
                      )} px-4 flex items-center cursor-pointer`}
                    >
                      <span className="font-medium">
                        {link.label[i18nLocale]}
                      </span>
                    </Link>
                  )}
                </div>

                {/* إضافة الخط الفاصل بجانب الزر (ليس تحته) */}
                {index < navLinks.length - 1 && (
                  <div
                    className={`${getTextColor()} opacity-50 select-none px-2`}
                  >
                    |
                  </div>
                )}
              </div>
            ))}
            <div className={`${getTextColor()} opacity-50 select-none px-2`}>
              |
            </div>
          </div>

          {/* زر اللغة وأيقونة الموبايل على اليسار */}
          <div className="flex items-center gap-4">
            <motion.button
              className={`hidden md:block text-md font-arabic-regular ${getTextColor()}`}
              onClick={handleChangeLanguage}
            >
              {i18nLocale === "en" ? "العربية" : "EN"}
            </motion.button>

            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open menu"
              className={`md:hidden ${
                isScrolled
                  ? "text-gray-100"
                  : !isHomePage()
                    ? "dark:text-white text-[#004B4B]"
                    : "text-white"
              } text-3xl`}
            >
              <FaBars />
            </motion.button>
          </div>
        </div>
      </div>

      {/* قائمة الموبايل */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              transition={{ duration: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-30 md:hidden h-full"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{
                x: currentLocale === "ar" ? "100%" : "-100%",
                opacity: 0.9,
              }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x: currentLocale === "ar" ? "100%" : "-100%",
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
              transition={{
                type: "tween",
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className={`fixed top-0 ${
                currentLocale === "ar" ? "right-0" : "left-0"
              } bottom-0 h-screen w-[85%] max-w-[320px] dark:bg-[#1C1C1C] bg-white shadow-2xl md:hidden z-40 flex flex-col`}
              dir={currentLocale === "ar" ? "rtl" : "ltr"}
            >
              <div className="p-4 flex justify-end">
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="h-5 w-5 text:black dark:text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-6  space-y-2 flex flex-col justify-between">
                <div className="space-y-3">
                  {navLinks.map((link) => (
                    <button
                      key={link.path}
                      onClick={() => {
                        goto(link.path);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full ${currentLocale === "ar" ? "text-right mr-10" : "text-left ml-10"} rounded-lg text-lg text:black dark:text-white hover:bg-[#E6F0F0] hover:text-black transition-colors font-medium`}
                    >
                      {link.label[i18nLocale]}
                    </button>
                  ))}
                  <div className={` border-b border-gray-600`}> </div>

                  {[
                    { label: { en: "About Us", ar: "من نحن" }, path: "/about" },
                    {
                      label: { en: "Contact Us", ar: "تواصل معنا" },
                      path: "/contact",
                    },
                    {
                      label: { en: "Services", ar: "الخدمات" },
                      path: "/services",
                    },
                  ].map((link) => (
                    <button
                      key={link.path}
                      onClick={() => {
                        goto(link.path);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full  ${currentLocale === "en" ? "text-left ml-10" : "text-right mr-10"} rounded-lg text-sm text:black dark:text-white hover:bg-[#E6F0F0] hover:text-black transition-colors font-medium`}
                    >
                      {link.label[i18nLocale]}
                    </button>
                  ))}
                  <button
                    className={`w-full  ${currentLocale === "en" ? "text-left ml-10" : "text-right mr-10"} font-['DIN_Next_LT_Arabic'] rounded-lg text-sm text:black dark:text-white hover:bg-[#E6F0F0] hover:text-black transition-colors font-medium`}
                    onClick={handleChangeLanguage}
                  >
                    {i18nLocale === "en" ? "العربية" : "English"}
                  </button>
                  {mounted && (
                    <button
                      onClick={() => {
                        const newTheme =
                          resolvedTheme === "dark" ? "light" : "dark";

                        // حفظ التفضيل في localStorage
                        localStorage.theme = newTheme;

                        // تحديث كلاس HTML
                        const html = document.documentElement;
                        html.classList.toggle("dark", newTheme === "dark");

                        // تحديث data-theme
                        html.setAttribute("data-theme", newTheme);

                        // تحديث حالة الثيم داخل التطبيق (عبر next-themes أو مشابه)
                        setTheme(newTheme);
                      }}
                      className={`w-full  ${currentLocale === "en" ? "text-left ml-10" : "text-right mr-10"} rounded-lg text-lg text:black dark:text-white hover:bg-[#E6F0F0] hover:text-black transition-colors font-medium`}
                      aria-label="Toggle theme"
                    >
                      {resolvedTheme === "dark" ? (
                        <Sun className="w-5 h-5" />
                      ) : (
                        <Moon className="w-5 h-5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
