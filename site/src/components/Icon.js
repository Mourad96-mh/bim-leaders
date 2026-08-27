// Lightweight inline SVG icons. Stroke uses currentColor.

export function Icon({ name, size = 28 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    // ---- Construction / BTP ----
    case "building":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M5 21V7l7-4 7 4v14" />
          <path d="M9 21v-4h6v4" />
          <path d="M9 9h.01M12 9h.01M15 9h.01M9 13h.01M12 13h.01M15 13h.01" />
        </svg>
      );
    case "renovate":
      return (
        <svg {...common}>
          <path d="M3 21h18" />
          <path d="M4 21V10l8-6 8 6v11" />
          <path d="M14 21v-6h4v6" />
          <path d="M8.5 12.5l2 2 4-4" />
        </svg>
      );
    case "ruler":
      return (
        <svg {...common}>
          <path d="M3 8.5 8.5 3 21 15.5 15.5 21 3 8.5Z" />
          <path d="M7 7l2 2M10 10l1.5 1.5M13 13l2 2M9 5l1.2 1.2" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" />
          <path d="M9 11l1.5 1.5L13 10M9 16h6" />
        </svg>
      );
    case "handshake":
      return (
        <svg {...common}>
          <path d="M11 17l-2 2a1.4 1.4 0 0 1-2-2l1-1" />
          <path d="M8 16a1.4 1.4 0 0 1-2-2l2-2" />
          <path d="M6 12a1.4 1.4 0 0 1-2-2l3-3 4 1 3-2" />
          <path d="M13 5l4-1 3 3v5l-4 4-3-3" />
          <path d="M11 15l2 2" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path d="M15 6a4 4 0 0 0-5 5L4 17l3 3 6-6a4 4 0 0 0 5-5l-2.5 2.5L13 10l1.5-2.5L15 6Z" />
        </svg>
      );
    case "helmet":
      return (
        <svg {...common}>
          <path d="M3 17a9 9 0 0 1 18 0" />
          <path d="M2.5 17h19a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-19a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1Z" />
          <path d="M9 9V6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" />
          <path d="M12 5v-.5" />
        </svg>
      );
    case "crane":
      return (
        <svg {...common}>
          <path d="M6 21V5M6 5h12M6 5 3 8M6 8h5M11 5v3" />
          <path d="M18 5v3M18 8v2M16.5 10h3l-1.5 2.5L16.5 10Z" />
          <path d="M4 21h4" />
        </svg>
      );
    // ---- Values / generic ----
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 5 6v5c0 4 3 7 7 9 4-2 7-5 7-9V6Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    // ---- Contact / social ----
    case "phone":
      return (
        <svg {...common}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.8.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-1.9-1.2 7.3 7.3 0 0 1-1.3-1.7c-.1-.2 0-.4.1-.5l.4-.4.2-.4v-.4l-.8-1.9c-.2-.5-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3c-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6c.1.2 1.8 2.7 4.3 3.8a14 14 0 0 0 1.4.5c.6.2 1.2.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.2Z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "facebook":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M14 9V7c0-1 .3-1.5 1.5-1.5H17V2.6C16.5 2.5 15.5 2.4 14.6 2.4c-2.4 0-4 1.4-4 4.1V9H8v3h2.6v9h3.4v-9h2.4l.4-3H14Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
      );
    case "linkedin":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
          <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.5h3.3V21H3.3V8.5Zm5.4 0h3.16v1.7h.05c.44-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.9V21h-3.3v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9V21H8.7V8.5Z" />
        </svg>
      );
    // ---- Lots techniques (métiers BIM Leaders) ----
    case "bolt":
      return (
        <svg {...common}>
          <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
        </svg>
      );
    case "wind":
      return (
        <svg {...common}>
          <path d="M3 8h11a3 3 0 1 0-3-3" />
          <path d="M3 13h15a3 3 0 1 1-3 3" />
          <path d="M3 18h8" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <path d="M12 3 6 12h3l-3 5h12l-3-5h3L12 3Z" />
          <path d="M12 17v4" />
        </svg>
      );
    case "road":
      return (
        <svg {...common}>
          <path d="M5 21 8 3M19 21 16 3" />
          <path d="M12 4v3M12 10.5v3M12 17v3" />
        </svg>
      );

    // ---- BIM ----
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
        </svg>
      );
    case "alert":
      return (
        <svg {...common}>
          <path d="M10.3 3.9 2.4 17a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
          <path d="M12 9v4M12 17h.01" />
        </svg>
      );
    case "calculator":
      return (
        <svg {...common}>
          <rect x="4" y="2" width="16" height="20" rx="2" />
          <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h4" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );

    // ---- Valeurs / à propos ----
    case "badge":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="6" />
          <path d="m8.5 14-1 7 4.5-2.5L16.5 21l-1-7" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 3v18M7 21h10" />
          <path d="M4 8h16M4 8l-2 6h4l-2-6Zm16 0-2 6h4l-2-6Z" />
        </svg>
      );
    case "team":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
          <path d="M16.5 5.5a3.2 3.2 0 0 1 0 6M18 20a6.4 6.4 0 0 0-2.2-4.8" />
        </svg>
      );

    // ---- Dashboard ----
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z" />
        </svg>
      );
    case "trash":
      return (
        <svg {...common}>
          <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
          <path d="M10 11v5M14 11v5" />
        </svg>
      );
    case "upload":
      return (
        <svg {...common}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M7 9l5-5 5 5M12 4v12" />
        </svg>
      );
    case "image":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.5" />
          <path d="m21 16-5-5L5 20" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="m16 17 5-5-5-5M21 12H9" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common}>
          <path d="M3 12h5l2 3h4l2-3h5" />
          <path d="M5.5 5h13l2.5 7v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7l2.5-7Z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      );
    case "download":
      return (
        <svg {...common}>
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="m7 10 5 5 5-5M12 15V3" />
        </svg>
      );

    default:
      return null;
  }
}
