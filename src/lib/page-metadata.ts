import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

type Input = {
  locale: Locale;
  /** Путь без языка: "" для главной, "/services" и т. д. */
  path: string;
  title: string;
  description: string;
  /** false — страница не попадает в поиск (например, кейсы-образцы). */
  indexable?: boolean;
};

// Open Graph ждёт локаль с регионом: по ней Telegram, WhatsApp и Facebook
// понимают язык превью.
export const ogLocales: Record<Locale, string> = {
  ru: "ru_RU",
  ky: "ky_KG",
  en: "en_US",
};

/** Заголовок, описание, canonical и hreflang на все три языка. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  indexable = true,
}: Input): Metadata {
  const languages: Record<string, string> = {
    "x-default": `/${routing.defaultLocale}${path}`,
  };
  for (const item of routing.locales) {
    languages[item] = `/${item}${path}`;
  }

  return {
    title,
    description,
    alternates: { canonical: `/${locale}${path}`, languages },
    robots: indexable ? undefined : { index: false, follow: true },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}${path}`,
      // openGraph страницы целиком заменяет родительский, поэтому картинку
      // из [locale]/opengraph-image.tsx приходится указывать явно.
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630 }],
      locale: ogLocales[locale],
      alternateLocale: routing.locales
        .filter((item) => item !== locale)
        .map((item) => ogLocales[item]),
    },
  };
}
