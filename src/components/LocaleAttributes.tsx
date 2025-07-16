"use client";

import { useEffect } from "react";

interface LocaleAttributesProps {
  locale: string;
  dir: string;
}

export function LocaleAttributes({ locale, dir }: LocaleAttributesProps) {
  useEffect(() => {
    // Set the lang and dir attributes on the document element
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return null;
} 