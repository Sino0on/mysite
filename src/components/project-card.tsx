import { useTranslations } from "next-intl";
import type { Category, Project } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { ArrowRight } from "./icons";
import { ProjectCover } from "./project-cover";

/** Проект на одном языке — столько, сколько нужно карточке. */
export type ProjectCardData = {
  slug: string;
  category: Category;
  year: number;
  title: string;
  summary: string;
  image?: { src: string; alt: string };
};

export function toCardData(project: Project, locale: Locale): ProjectCardData {
  return {
    slug: project.slug,
    category: project.category,
    year: project.year,
    title: project.title[locale],
    summary: project.summary[locale],
    image: project.image && {
      src: project.image.src,
      alt: project.image.alt[locale],
    },
  };
}

type Props = {
  project: ProjectCardData;
  /** Уровень заголовка зависит от того, под каким заголовком стоит карточка. */
  heading: "h2" | "h3";
  sizes: string;
};

/**
 * Вся карточка — одна ссылка (растянутый ::after у заголовка),
 * поэтому с клавиатуры это одна остановка, а не три.
 */
export function ProjectCard({ project, heading: Heading, sizes }: Props) {
  const t = useTranslations("categories");

  return (
    <article className="group relative">
      <ProjectCover
        category={project.category}
        image={project.image}
        sizes={sizes}
      />
      <p className="t-meta mt-4">
        {t(project.category)} · {project.year}
      </p>
      <Heading className="t-h3 mt-1">
        <Link
          href={`/portfolio/${project.slug}`}
          className="transition-colors duration-200 after:absolute after:inset-0 group-hover:text-accent [&>svg]:ml-2 [&>svg]:inline [&>svg]:transition-transform [&>svg]:duration-200 group-hover:[&>svg]:translate-x-1"
        >
          {project.title}
          <ArrowRight />
        </Link>
      </Heading>
      <p className="mt-2 max-w-prose text-muted">{project.summary}</p>
    </article>
  );
}
