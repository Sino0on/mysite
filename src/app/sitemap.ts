import type { MetadataRoute } from "next";
import { navItems } from "@/config/nav";
import { site } from "@/config/site";
import { projects, PROJECTS_ARE_SAMPLES } from "@/content/projects";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...navItems.map(({ href }) => href),
    // Страницы кейсов-образцов закрыты от индексации — в карте их тоже нет.
    ...(PROJECTS_ARE_SAMPLES ? [] : projects.map(({ slug }) => `/portfolio/${slug}`)),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((item) => [item, `${site.url}/${item}${path}`]),
        ),
      },
    })),
  );
}
