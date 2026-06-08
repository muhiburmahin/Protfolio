"use client";

import { useEffect, useState } from "react";

/** True when user has scrolled past the hero edge (pill → solid bar). */
export function useNavbarScroll(threshold = 15) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { isScrolled };
}
