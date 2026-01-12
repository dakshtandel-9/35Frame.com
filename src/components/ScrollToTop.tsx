import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures SPA navigation behaves like traditional pages:
 * - New routes open at the top
 * - Hash links (/#contact) scroll to the target section
 */
export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    const { hash } = location;

    if (hash) {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        // Wait a tick for route content to paint
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname, location.hash]);

  return null;
}
