import { defineRouting } from "next-intl/routing";

// Кыргызский — "ky" по ISO 639-1: так его присылает браузер в Accept-Language
// и так его ждут поисковики в hreflang. В переключателе он подписан "KG".
export const routing = defineRouting({
  locales: ["ru", "ky", "en"],
  defaultLocale: "ru",
});

export type Locale = (typeof routing.locales)[number];
