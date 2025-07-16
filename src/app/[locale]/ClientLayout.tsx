// app/[locale]/ClientLayout.tsx
"use client";

import React, { useCallback, useRef } from "react";
import Nav from "@/components/Nav";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { I18nProvider } from "../I18nProvider";
import { loadBlogsData } from "@/lib/loadBlogs";

interface RedirectData {
  shouldRedirect: boolean;
  targetSlug?: string;
}

// Cache for storing redirect results
const redirectCache = new Map<string, RedirectData>();
// Track checked pages
const checkedPages = new Set<string>();
// Track failed requests
const failedRequests = new Set<string>();

export default function ClientLayout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname?.includes("/login");
  const [isRedirecting, setIsRedirecting] = React.useState(false);
  const requestInProgress = useRef(false);

  // Load blogs when component mounts
  React.useEffect(() => {
    loadBlogsData();
  }, []);

  const checkRedirect = useCallback(async () => {
    // Extract page name from pathname, removing locale prefix
    const pathParts = pathname?.split("/").filter(Boolean) || [];
    const pageName = pathParts.length > 1 ? pathParts[1] : "home";

    // Skip if page was already checked or failed before
    if (checkedPages.has(pageName) || failedRequests.has(pageName)) {
      return;
    }

    // Prevent concurrent requests
    if (requestInProgress.current) {
      return;
    }

    if (!isLoginPage && !isRedirecting) {
      try {
        setIsRedirecting(true);
        requestInProgress.current = true;

        // Check cache first
        let redirectData = redirectCache.get(pageName);

        // If not in cache, fetch from API
        if (!redirectData) {
          const response = await fetch(
            `/api/redirect/check?pageName=${encodeURIComponent(pageName)}`,
            {
              signal: AbortSignal.timeout(5000), // 5 second timeout
            },
          );

          if (!response.ok) {
            failedRequests.add(pageName); // Mark as failed
            throw new Error("Failed to check redirect");
          }

          const data = (await response.json()) as RedirectData;
          redirectData = data;
          redirectCache.set(pageName, data);
        }

        checkedPages.add(pageName);

        if (redirectData?.shouldRedirect && redirectData.targetSlug) {
          router.push(`/${locale}/${redirectData.targetSlug}`);
        }
      } catch (error) {
        // Only log once and mark as failed
        if (!failedRequests.has(pageName)) {
          console.error("Error checking redirect for:", pageName);
          failedRequests.add(pageName);
        }
      } finally {
        setIsRedirecting(false);
        requestInProgress.current = false;
      }
    }
  }, [pathname, isLoginPage, router, isRedirecting, locale]);

  React.useEffect(() => {
    checkRedirect();
  }, [checkRedirect]);

  return (
    <I18nProvider locale={locale}>
      <div className="max-w-screen">
        <Toaster />
        {!isLoginPage && <Nav />}
        {children}
        <Footer />
      </div>
    </I18nProvider>
  );
}
