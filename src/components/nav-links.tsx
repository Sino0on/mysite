"use client";

import { useTranslations } from "next-intl";
import { navItems } from "@/config/nav";
import { Link, usePathname } from "@/i18n/navigation";

function useIsCurrent() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

/** Ссылки в шапке на десктопе: синяя черта 2px выезжает на наведение и стоит на текущей странице. */
export function HeaderNavLinks() {
  const t = useTranslations("nav");
  const isCurrent = useIsCurrent();

  return (
    <ul className="flex h-16 items-stretch gap-8">
      {navItems.map(({ key, href }) => {
        const current = isCurrent(href);
        return (
          <li key={key} className="flex">
            <Link
              href={href}
              aria-current={current ? "page" : undefined}
              className={`relative flex items-center transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:bg-accent after:transition-transform after:duration-200 hover:text-ink hover:after:scale-x-100 ${
                current
                  ? "text-ink after:scale-x-100"
                  : "text-muted after:scale-x-0"
              }`}
            >
              {t(key)}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Те же ссылки в мобильном меню: крупные, во всю ширину, с номером раздела. */
export function MenuNavLinks({ onNavigate }: { onNavigate: () => void }) {
  const t = useTranslations("nav");
  const isCurrent = useIsCurrent();

  return (
    <ul>
      {navItems.map(({ key, href }, index) => {
        const current = isCurrent(href);
        return (
          <li key={key} className="border-b border-line">
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className="flex items-baseline gap-4 py-4"
            >
              <span className="t-meta">0{index + 1}</span>
              <span className={`t-h2 ${current ? "text-accent" : ""}`}>
                {t(key)}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
