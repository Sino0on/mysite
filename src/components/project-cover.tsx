import Image from "next/image";
import type { Category } from "@/content/projects";

const ink = "var(--color-ink)";
const paper = "var(--color-paper)";
const accent = "var(--color-accent)";

const frame = {
  fill: paper,
  stroke: ink,
  strokeWidth: 1.5,
} as const;

const stroke = {
  fill: "none",
  stroke: ink,
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Окно браузера: заголовок, абзац, кнопка, картинка, ряд блоков. */
function WebsiteSchematic() {
  return (
    <>
      <rect x="44" y="32" width="232" height="190" rx="10" {...frame} />
      <path d="M44 58h232" {...stroke} />
      <circle cx="60" cy="45" r="3" fill={ink} />
      <circle cx="71" cy="45" r="3" fill={ink} />
      <circle cx="82" cy="45" r="3" fill={ink} />
      <rect x="104" y="39" width="112" height="12" rx="6" fill={ink} opacity=".12" />
      <rect x="64" y="80" width="112" height="10" rx="2" fill={ink} />
      <rect x="64" y="96" width="76" height="10" rx="2" fill={ink} />
      <rect x="64" y="120" width="96" height="4" rx="2" fill={ink} opacity=".25" />
      <rect x="64" y="130" width="80" height="4" rx="2" fill={ink} opacity=".25" />
      <rect x="64" y="146" width="56" height="18" rx="5" fill={accent} />
      <rect x="196" y="80" width="60" height="84" rx="6" fill={ink} opacity=".1" />
      <rect x="64" y="182" width="56" height="30" rx="4" {...stroke} opacity=".3" />
      <rect x="132" y="182" width="56" height="30" rx="4" {...stroke} opacity=".3" />
      <rect x="200" y="182" width="56" height="30" rx="4" {...stroke} opacity=".3" />
    </>
  );
}

/** Переписка: вопрос клиента, ответ бота с кнопками, выбор, подтверждение. */
function BotSchematic() {
  return (
    <>
      <rect x="168" y="22" width="108" height="26" rx="13" fill={ink} />
      <rect x="182" y="33" width="80" height="4" rx="2" fill={paper} opacity=".7" />
      <rect x="44" y="56" width="136" height="26" rx="13" {...frame} />
      <rect x="58" y="67" width="92" height="4" rx="2" fill={ink} opacity=".3" />
      <rect
        x="44"
        y="90"
        width="64"
        height="24"
        rx="6"
        fill="var(--color-accent-soft)"
        stroke={accent}
        strokeWidth="1.5"
      />
      <rect x="59" y="100" width="34" height="4" rx="2" fill={accent} />
      <rect x="116" y="90" width="64" height="24" rx="6" fill={accent} />
      <rect x="131" y="100" width="34" height="4" rx="2" fill="var(--color-white)" />
      <rect x="204" y="124" width="72" height="26" rx="13" fill={ink} />
      <rect x="218" y="135" width="44" height="4" rx="2" fill={paper} opacity=".7" />
      <rect x="44" y="158" width="156" height="26" rx="13" {...frame} />
      <path
        d="m58 171 4 4 8-9"
        fill="none"
        stroke="var(--color-ok-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="78" y="169" width="100" height="4" rx="2" fill={ink} opacity=".3" />
    </>
  );
}

/** Таблица → скрипт → готовый список, внизу часы: запуск по расписанию. */
function ScriptSchematic() {
  return (
    <>
      <rect x="24" y="56" width="68" height="76" rx="8" {...frame} />
      <path d="M24 81h68M24 106h68M47 56v76" {...stroke} opacity=".3" />
      <path d="M100 94h20M114 88l6 6-6 6" {...stroke} />
      <rect x="128" y="48" width="68" height="92" rx="8" fill={ink} />
      <path
        d="m146 84 10 10-10 10"
        fill="none"
        stroke="var(--color-white)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M162 106h16" stroke="var(--color-white)" strokeWidth="2" strokeLinecap="round" />
      <path d="M204 94h20M218 88l6 6-6 6" {...stroke} />
      <rect x="232" y="56" width="68" height="76" rx="8" {...frame} />
      {[74, 94, 114].map((y) => (
        <g key={y}>
          <path
            d={`m243 ${y} 3 3 6-7`}
            fill="none"
            stroke="var(--color-ok-ink)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="260" y={y - 2} width="30" height="4" rx="2" fill={ink} opacity=".3" />
        </g>
      ))}
      <path d="M24 170h276" {...stroke} opacity=".3" strokeDasharray="2 6" />
      <circle cx="162" cy="170" r="10" {...frame} />
      <path d="M162 164v6l4 2" {...stroke} />
    </>
  );
}

/** Админка: боковое меню, заголовок с кнопкой, строки таблицы со статусами. */
function OtherSchematic() {
  return (
    <>
      <rect x="44" y="32" width="232" height="190" rx="10" {...frame} />
      <path d="M104 32v170" {...stroke} />
      <rect x="56" y="52" width="36" height="6" rx="3" fill={ink} />
      <rect x="56" y="74" width="30" height="4" rx="2" fill={ink} opacity=".25" />
      <rect x="56" y="88" width="24" height="4" rx="2" fill={ink} opacity=".25" />
      <rect x="56" y="102" width="32" height="4" rx="2" fill={ink} opacity=".25" />
      <rect x="120" y="50" width="70" height="10" rx="2" fill={ink} />
      <rect x="232" y="48" width="30" height="14" rx="4" fill={accent} />
      {[84, 108, 132, 156, 180].map((y, row) => (
        <g key={y}>
          <path d={`M120 ${y + 14}h142`} {...stroke} opacity=".15" />
          <rect x="120" y={y} width="50" height="4" rx="2" fill={ink} opacity=".3" />
          <rect x="184" y={y} width="30" height="4" rx="2" fill={ink} opacity=".3" />
          {row % 3 === 2 ? (
            <rect x="236" y={y - 2} width="26" height="8" rx="4" {...stroke} opacity=".4" />
          ) : (
            <rect x="236" y={y - 2} width="26" height="8" rx="4" fill="var(--color-ok)" />
          )}
        </g>
      ))}
    </>
  );
}

const schematics: Record<Category, () => React.JSX.Element> = {
  website: WebsiteSchematic,
  bot: BotSchematic,
  script: ScriptSchematic,
  other: OtherSchematic,
};

type Props = {
  category: Category;
  image?: { src: string; alt: string };
  /** Подсказка браузеру, какой ширины картинка нужна (атрибут sizes). */
  sizes: string;
};

/**
 * Обложка проекта 16:10. Если есть скриншот — показывает его.
 * Если нет — рисует схему по типу работы; она декоративная,
 * потому что тип и название написаны текстом рядом.
 */
export function ProjectCover({ category, image, sizes }: Props) {
  const Schematic = schematics[category];

  return (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-sunken transition-colors duration-200 group-hover:border-accent">
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <svg
          viewBox="0 0 320 200"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
          className="size-full"
        >
          <Schematic />
        </svg>
      )}
    </div>
  );
}
