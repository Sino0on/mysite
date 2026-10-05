// Все иконки декоративные: смысл несёт текст рядом, поэтому aria-hidden.

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function ArrowRight() {
  return (
    <svg {...base}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowLeft() {
  return (
    <svg {...base}>
      <path d="M13.5 8h-11M7 3.5 2.5 8 7 12.5" />
    </svg>
  );
}

export function ArrowUpRight() {
  return (
    <svg {...base}>
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
}

export function Check() {
  return (
    <svg {...base}>
      <path d="m3 8.5 3.5 3.5L13 4.5" />
    </svg>
  );
}

export function Alert() {
  return (
    <svg {...base}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.75v3.75M8 11.25v.01" />
    </svg>
  );
}

export function Close() {
  return (
    <svg {...base}>
      <path d="m3.5 3.5 9 9M12.5 3.5l-9 9" />
    </svg>
  );
}
