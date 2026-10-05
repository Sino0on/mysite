import type { MetadataRoute } from "next";
import { navItems } from "@/config/nav";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...navItems.map(({ href }) => href),
    ...projects.map(({ slug }) => `/portfolio/${slug}`),
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
