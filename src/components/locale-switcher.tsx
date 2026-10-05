"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// В Кыргызстане язык привычно подписывают "KG", хотя код локали — "ky".
const shortLabels: Record<Locale, string> = { ru: "RU", ky: "KG", en: "EN" };

/**
 * Три языка видны сразу — выпадающий список прятал бы их за лишним кликом.
 */
export function LocaleSwitcher() {
  const t = useTranslations("locale");
  const current = useLocale();
  const pathname = usePathname();

  return (
    // Группа, а не <nav>: переключатель стоит и в шапке, и в футере,
    // а два одинаковых ориентира путают навигацию скринридера.
    <div role="group" aria-label={t("label")}>
      <ul className="flex items-center gap-1">
        {routing.locales.map((locale) => {
          const active = locale === current;
          return (
            <li key={locale}>
              <Link
                href={pathname}
                locale={locale}
                hrefLang={locale}
                aria-current={active ? "true" : undefined}
                className={`t-meta flex h-10 min-w-10 items-center justify-center rounded-lg px-2 transition-colors duration-200 ${
                  active
                    ? "bg-ink text-white"
                    : "text-muted hover:bg-accent-soft hover:text-accent-strong"
                }`}
              >
                {shortLabels[locale]}
                <span className="sr-only">, {t(locale)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
