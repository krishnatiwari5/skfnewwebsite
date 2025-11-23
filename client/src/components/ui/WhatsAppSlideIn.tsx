// components/WhatsAppSlideIn.tsx
import React, { useEffect, useState, useRef } from "react";

type Props = {
  phone: string;                 // international format, e.g. 919812345678 (no +)
  message?: string;              // prefilled message
  threshold?: number;            // show after scrolling this many pixels (default 300)
  position?: "bottom-right" | "bottom-left";
  size?: "md" | "lg";
  logoUrl?: string | null;       // optional logo badge URL (NOT used by default to avoid center shift)
  delayMs?: number;              // delay before showing after threshold (ms)
};

export default function WhatsAppSlideIn({
  phone,
  message = "Hi, I want a quote for fabrication services (grills/gates/sheds).",
  threshold = 300,
  position = "bottom-right",
  size = "lg",
  logoUrl = null, // set to null to avoid overlapping the icon and shifting the center
  delayMs = 120,
}: Props) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY || 0;
      if (y > threshold) {
        if (!visible) {
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          timeoutRef.current = window.setTimeout(() => setVisible(true), delayMs);
        }
      } else {
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        setVisible(false);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [threshold, delayMs, visible]);

  if (!phone) return null;
  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  const isLarge = size === "lg";
  const btnSize = isLarge ? "w-14 h-14 md:w-16 md:h-16" : "w-12 h-12 md:w-14 md:h-14";
  const iconSize = isLarge ? "w-6 h-6 md:w-7 md:h-7" : "w-5 h-5 md:w-6 md:h-6";

  const wrapperPos = position === "bottom-left" ? "left-4 md:left-8" : "right-4 md:right-8";

  return (
    <div
      aria-hidden={!visible}
      className={`fixed ${wrapperPos} bottom-6 z-50 pointer-events-none`}
      style={{ transition: "transform 360ms cubic-bezier(.2,.9,.2,1), opacity 260ms ease" }}
    >
      <div
        className={`transform ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
        style={{ transitionProperty: "transform, opacity" }}
      >
        {/* IMPORTANT: single flex-col container so button + label share same horizontal center */}
        <div className="flex flex-col items-center pointer-events-auto">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="group"
          >
            <div
              className={`${btnSize} rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-105 active:scale-95`}
              style={{
                background: "#f59e0b",
                boxShadow: "0 12px 28px rgba(4,6,12,0.45)",
              }}
            >
              {/* MAIN WHATSAPP ICON (big circle) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className={`${iconSize} inline-block`}
                aria-hidden="true"
              >
                <path d="M20.52 3.48A11.85 11.85 0 0 0 12 .06C5.45.06.12 5.39.12 11.95c0 2.12.55 4.18 1.6 6.03L.02 24l6.2-1.61A11.84 11.84 0 0 0 12 23.94h.01c6.55 0 11.88-5.33 11.88-11.89 0-3.17-1.23-6.16-3.37-8.47zM12 21.1c-1.71 0-3.38-.46-4.85-1.33l-.34-.2-3.68.96.99-3.46-.22-.35A8.06 8.06 0 0 1 3.9 11.95c0-4.5 3.66-8.16 8.19-8.16 4.51 0 8.16 3.66 8.16 8.17 0 4.51-3.65 8.17-8.15 8.17z"/>
                <path d="M17.3 14.04c-.27-.14-1.6-.78-1.85-.87-.25-.09-.43-.14-.61.14-.17.27-.67.87-.82 1.04-.15.17-.3.2-.57.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.59-1.5-1.86-.15-.27-.02-.41.12-.55.12-.12.27-.3.41-.45.14-.15.18-.25.27-.42.09-.17.04-.32-.02-.45-.07-.12-.61-1.47-.84-2.01-.22-.52-.45-.45-.61-.46l-.52-.01c-.17 0-.45.06-.69.31-.25.25-.96.94-.96 2.29 0 1.35.99 2.66 1.13 2.85.14.2 1.95 3.01 4.73 4.2 3.3 1.41 3.3 0 3.89-.49.19-.16 1.06-1.02 1.22-1.8.15-.78.15-1.43.11-1.56-.04-.13-.15-.2-.42-.34z"/>
              </svg>
            </div>
          </a>

          {/* DESKTOP LABEL: the text sits DIRECTLY under the main icon and is centered */}
          <div className="hidden md:flex mt-3">
            <span
              className="inline-block px-4 py-2 rounded-full text-[13px] font-semibold text-center"
              style={{
                background: "#0b1220",
                color: "#f59e0b",
                boxShadow: "0 10px 28px rgba(2,6,23,0.45)",
              }}
            >
              Chat on WhatsApp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
