// src/app/layout.tsx (Root Layout - محدث)
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import { SetDefaultDark } from "@/components/SetDefaultDark";
// src/app/[locale]/layout.jsx (Locale Layout - بدون html/body)
import ClientLayout from "./[locale]/ClientLayout";
import { LocaleAttributes } from "@/components/LocaleAttributes";

// export const metadata = {
//   icons: {
//     icon: "/favicon.ico",
//   },
// };
export async function generateMetadata({ params }) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: isArabic
      ? "Darb Productions - إنتاج الوسائط وإدارة الفعاليات"
      : "Darb Productions - Media Production & Event Management",
    description: isArabic
      ? "Darb Productions تساعد العلامات التجارية على الإبداع من خلال خدمات إنتاج الوسائط وإدارة الفعاليات والطباعة وإنتاج الأجنحة."
      : "Darb Productions helps brands come to life through media production, event management, printing, and booth production services.",
    keywords: isArabic
      ? [
          "إنتاج الوسائط",
          "إدارة الفعاليات",
          "الطباعة",
          "إنتاج الأجنحة",
          "السعودية",
          "الإمارات",
        ]
      : [
          "media production",
          "event management",
          "printing",
          "booth production",
          "Saudi Arabia",
          "UAE",
        ],
    metadataBase: new URL("https://www.darbproductions.com"),
    alternates: {
      canonical: locale === "ar" ? "/ar" : "/",
      languages: {
        "en-US": "/",
        "ar-SA": "/ar",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SA" : "en_US",
      url: `"https://www.darbproductions.com"+${locale == "ar" ? "/ar" : ""} `,
      title: isArabic
        ? "Darb Productions - إنتاج الوسائط وإدارة الفعاليات"
        : "Darb Productions - Media Production & Event Management",
      description: isArabic
        ? "Darb Productions تساعد العلامات التجارية على الإبداع من خلال خدمات إنتاج الوسائط وإدارة الفعاليات والطباعة وإنتاج الأجنحة."
        : "Darb Productions helps brands come to life through media production, event management, printing, and booth production services.",
      siteName: "Darb Productions",
      images: [
        {
          url: "https://www.darbproductions.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isArabic ? "Darb Productions" : "Darb Productions",
        },
      ],
    },
  };
}

export default async function RootLayout({ children, params }) {
  const locale = params.locale || "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html className="dark" data-theme="dark" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className="antialiased transition-colors duration-300"
        suppressHydrationWarning
      >
        <SetDefaultDark />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          themes={["dark", "light", "system"]}
        >
          {/* <LocaleAttributes locale={locale} dir={dir} /> */}
          {/* <ClientLayout locale={locale}>{children}</ClientLayout> */}
          {/* {children} */}
          <LocaleAttributes locale={locale} dir={dir} />
          <div lang={locale} dir={dir}>
            <ClientLayout locale={locale}>{children}</ClientLayout>
          </div>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
