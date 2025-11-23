import React from "react";

type Props = {
  phone: string;             // in international format, e.g. 919812345678 (no + or 00)
  message?: string;          // default prefilled message
  position?: "bottom-right" | "bottom-left";
  logoUrl?: string | null;   // optional logo url to show as small badge
  size?: "md" | "lg";
};

export default function WhatsAppButton({
  phone,
  message = "Hello, I want to enquire about fabrication services.",
  position = "bottom-right",
  logoUrl = "sandbox:/mnt/data/809fedcf-e4e3-401c-a6a9-57e0c55c4900.png",
  size = "lg",
}: Props) {
  if (!phone) return null;

  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${phone}?text=${encoded}`;

  const isLarge = size === "lg";
  const btnSize = isLarge ? "w-14 h-14 md:w-16 md:h-16" : "w-12 h-12 md:w-14 md:h-14";
  const iconSize = isLarge ? "w-6 h-6 md:w-7 md:h-7" : "w-5 h-5 md:w-6 md:h-6";

  const wrapperPos =
    position === "bottom-left"
      ? "left-4 md:left-8"
      : "right-4 md:right-8";

  return (
    <div className={`fixed ${wrapperPos} bottom-6 z-50`}>
      <a
        href={waUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat with us on WhatsApp"
        className="group"
      >
        <div
          className={`relative ${btnSize} rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-105 active:scale-95`}
          style={{
            background: "#f59e0b", // warm orange accent to match site
            boxShadow: "0 10px 30px rgba(5,7,10,0.4)",
          }}
        >
          {/* whatsapp icon (white) */}
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

          {/* decorative pulse */}
          <span className="absolute -inset-1 rounded-full opacity-30 blur-[6px] group-hover:opacity-40"
            style={{ background: "radial-gradient(circle at center, rgba(245,158,11,0.35), transparent 40%)" }}
          />

          {/* small logo badge (optional) */}
          {logoUrl && (
            <img
              src={logoUrl}
              alt="logo"
              className="absolute -top-3 -left-3 w-8 h-8 rounded-md border border-white/10 bg-white/5 hidden md:block"
              style={{ boxShadow: "0 6px 18px rgba(2,6,23,0.35)" }}
            />
          )}
        </div>

        {/* label (desktop only) */}
        <div className="hidden md:flex mt-2 items-center justify-end gap-2">
          <span className="inline-block px-3 py-1 rounded-full text-[13px] font-semibold"
            style={{
              background: "#111827",
              color: "#f59e0b",
              boxShadow: "0 6px 18px rgba(2,6,23,0.35)",
            }}
          >
            Chat on WhatsApp
          </span>
        </div>
      </a>
    </div>
  );
}
