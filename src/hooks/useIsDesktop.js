import { useState, useEffect } from "react";

/**
 * Custom hook to detect desktop viewport (>=768px)
 * @returns {boolean} isDesktop
 */
export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Initialize
    const mql = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mql.matches);

    // Listen to changes
    const handler = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}
