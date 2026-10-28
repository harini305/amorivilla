export function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.17-1.5A9.92 9.92 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.16l-.3-.18-3.07.89.9-3-.2-.31a8.2 8.2 0 1 1 6.87 3.76Zm4.5-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.15.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.47a.9.9 0 0 0-.66.31 2.77 2.77 0 0 0-.87 2.06 4.8 4.8 0 0 0 1 2.55 11 11 0 0 0 4.2 3.71c1.56.68 2.18.73 2.96.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.07.15-1.18-.07-.1-.23-.17-.48-.29Z"
      />
    </svg>
  );
}

export function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" {...props}>
      <path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false" {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

const line = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" };

export function BedIcon(props) {
  return (
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true" focusable="false" {...props}>
      <path {...line} d="M4 24V9M4 18h24v6M28 18v-3a3 3 0 0 0-3-3H14v6M7.5 15.5a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
    </svg>
  );
}

export function GuestsIcon(props) {
  return (
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true" focusable="false" {...props}>
      <path {...line} d="M12 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 26c0-4.4 3.6-8 8-8s8 3.6 8 8M21 8.3a4 4 0 0 1 0 6.4M23 18.5c3 1 5 3.9 5 7.5" />
    </svg>
  );
}

export function StaffIcon(props) {
  return (
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true" focusable="false" {...props}>
      <path {...line} d="M16 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM7 27c0-5 4-9 9-9s9 4 9 9M13 18.5l3 4 3-4" />
    </svg>
  );
}

export function PinIcon(props) {
  return (
    <svg viewBox="0 0 32 32" width="34" height="34" aria-hidden="true" focusable="false" {...props}>
      <path {...line} d="M16 28s9-8.2 9-15a9 9 0 0 0-18 0c0 6.8 9 15 9 15Z" />
      <circle {...line} cx="16" cy="13" r="3.2" />
    </svg>
  );
}

export function LeafIcon(props) {
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true" focusable="false" {...props}>
      <path {...line} d="M7 25C7 13 14 6 26 6c0 12-7 19-19 19ZM7 25l12-12M13 19h5M16 16v-4" />
    </svg>
  );
}

export function NavigateIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" {...props}>
      <path fill="currentColor" d="M12 2 5 21l7-4 7 4-7-19Z" />
    </svg>
  );
}

export function CloseIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false" {...props}>
      <path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

// Small gold ornament for dividers: a line, a sprig, a line.
export function Ornament({ className = "" }) {
  return (
    <span className={`ornament ${className}`} aria-hidden="true">
      <span className="ornament__line" />
      <svg viewBox="0 0 40 16" width="40" height="16">
        <path d="M20 13c0-5 3-8 8-9-1 5-4 8-8 9Zm0 0c0-5-3-8-8-9 1 5 4 8 8 9Zm0 0V3" fill="none" stroke="currentColor" strokeWidth="1.1" />
        <circle cx="5" cy="8" r="1.3" fill="currentColor" />
        <circle cx="35" cy="8" r="1.3" fill="currentColor" />
      </svg>
      <span className="ornament__line" />
    </span>
  );
}
