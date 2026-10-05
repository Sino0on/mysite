import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

type Input = {
  locale: Locale;
  /** Путь без языка: "" для главной, "/services" и т. д. */
  path: string;
  title: string;
  description: string;
};

/** Заголовок, описание, canonical и hreflang на все три языка. */
export function pageMetadata({ locale, path, title, description }: Input): Metadata {
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
    openGraph: {
      type: "website",
      title,
      description,
      url: `/${locale}${path}`,
      locale,
    },
  };
}
