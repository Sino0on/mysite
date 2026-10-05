import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactPanel } from "@/components/contact-panel";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { ProjectCover } from "@/components/project-cover";
import { getProject, projects } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map(({ slug }) => ({ locale, slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    locale,
    path: `/portfolio/${slug}`,
    title: project.title[locale],
    description: project.summary[locale],
  });
}

export default async function CasePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) notFound();

  const t = await getTranslations();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <>
      <article>
        <header className="shell pt-8 md:pt-12">
          <Link href="/portfolio" className="link-arrow link-arrow-back">
            <ArrowLeft />
            {t("case.back")}
          </Link>
          <h1 className="t-display mt-8 max-w-4xl">{project.title[locale]}</h1>
          <p className="t-lead mt-6 max-w-2xl text-muted">
            {project.summary[locale]}
          </p>
        </header>

        <div className="shell section grid gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <ProjectCover
              category={project.category}
              image={
                project.image && {
                  src: project.image.src,
                  alt: project.image.alt[locale],
                }
              }
              sizes="(min-width: 1024px) 66vw, 100vw"
            />
          </div>

          <dl className="self-start border-t border-ink lg:col-span-4">
            <div className="flex gap-4 border-b border-line py-4">
              <dt className="t-meta w-20 flex-none">{t("case.category")}</dt>
              <dd>{t(`categories.${project.category}`)}</dd>
            </div>
            <div className="flex gap-4 border-b border-line py-4">
              <dt className="t-meta w-20 flex-none">{t("case.year")}</dt>
              <dd className="tabular-nums">{project.year}</dd>
            </div>
            <div className="flex gap-4 border-b border-line py-4">
              <dt className="t-meta w-20 flex-none">{t("case.stack")}</dt>
              <dd>{project.stack.join(", ")}</dd>
            </div>
            {project.url && (
              <div className="flex gap-4 border-b border-line py-4">
                <dt className="t-meta w-20 flex-none">{t("case.link")}</dt>
                <dd>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-arrow"
                  >
                    {t("case.open")}
                    <ArrowUpRight />
                    <span className="sr-only">({t("common.newTab")})</span>
                  </a>
                </dd>
              </div>
            )}
          </dl>
        </div>

        <div className="shell pb-12 md:pb-16 lg:pb-20">
          <section className="grid gap-x-6 gap-y-2 border-t border-ink py-8 lg:grid-cols-12">
            <h2 className="t-meta lg:col-span-3">{t("case.task")}</h2>
            <p className="t-lead max-w-2xl lg:col-span-8">{project.task[locale]}</p>
          </section>

          <section className="grid gap-x-6 gap-y-2 border-t border-line py-8 lg:grid-cols-12">
            <h2 className="t-meta lg:col-span-3">{t("case.done")}</h2>
            <ol className="max-w-2xl lg:col-span-8">
              {project.done[locale].map((step, index) => (
                <li
                  key={step}
                  className="flex gap-4 border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0"
                >
                  <span className="t-meta flex-none pt-1">0{index + 1}</span>
                  <span className="t-lead">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="grid gap-x-6 gap-y-2 border-t border-line py-8 lg:grid-cols-12">
            <h2 className="t-meta lg:col-span-3">{t("case.result")}</h2>
            <p className="t-lead max-w-2xl font-medium lg:col-span-8">
              {project.result[locale]}
            </p>
          </section>

          <nav
            aria-label={t("case.next")}
            className="grid gap-x-6 gap-y-2 border-t border-ink pt-8 lg:grid-cols-12"
          >
            <p className="t-meta lg:col-span-3">{t("case.next")}</p>
            <Link
              href={`/portfolio/${next.slug}`}
              className="group t-h2 transition-colors duration-200 hover:text-accent lg:col-span-8 [&>svg]:ml-3 [&>svg]:inline [&>svg]:transition-transform [&>svg]:duration-200 hover:[&>svg]:translate-x-1"
            >
              {next.title[locale]}
              <ArrowRight />
            </Link>
          </nav>
        </div>
      </article>

      <ContactPanel />
    </>
  );
}
