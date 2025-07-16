// يمكنك إنشاء هذا المكون في أي ملف (مثلاً components/SetDefaultDark.tsx)
"use client";
import { useEffect } from "react";

export function SetDefaultDark() {
  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("theme")) {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return null;
}
