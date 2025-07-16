"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Page } from "@/lib/getWebsiteData";

interface PageRedirectProps {
  page: Page & { isRedirected?: boolean; originalPage?: Page };
}

export default function PageRedirect({ page }: PageRedirectProps) {
  const router = useRouter();

  useEffect(() => {
    if (page.isRedirected && page.originalPage?.RedirectPage) {
      // Find the target page slug
      const targetSlug = page.slug;

      // Perform the redirect
      router.push(`/${targetSlug}`);
    }
  }, [page, router]);

  return null; // This component doesn't render anything
}
