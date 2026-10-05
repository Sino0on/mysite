import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Availability } from "@/components/availability";
import { ContactPanel } from "@/components/contact-panel";
import { ArrowRight } from "@/components/icons";
import { ProjectCard, toCardData } from "@/components/project-card";
import { SampleNotice } from "@/components/sample-notice";
import {
  categories,
  featuredProjects,
  projects,
  PROJECTS_ARE_SAMPLES,
} from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: Locale }> };

const facts = ["experience", "format", "budget", "languages"] as const;

// Избранные работы стоят не ровной плиткой: широкая, узкая со сдвигом вниз, и наоборот.
const featuredLayout = [
  "lg:col-span-7",
  "lg:col-span-5 lg:mt-24",
  "lg:col-span-5",
  "lg:col-span-7 lg:mt-24",
];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.home" });

  return {
    ...pageMetadata({
      locale,
      path: "",
      title: t("title"),
      description: t("description"),
    }),
    title: { absolute: t("title") },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  return (
    <>
      <section className="shell pt-10 pb-12 md:pt-16 md:pb-16 lg:pt-20">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="t-meta tracking-wider uppercase">{t("eyebrow")}</p>
          <Availability />
        </div>

        <h1 className="t-display mt-6 max-w-5xl lg:mt-8">
          {t("titleLead")}{" "}
          <span className="text-muted">{t("titleRest")}</span>
        </h1>

        <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-12 lg:gap-6">
          <p className="t-lead lg:col-span-6 lg:col-start-7">{t("lead")}</p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:items-end">
            <Link href="/contact" className="btn btn-primary">
              {t("ctaPrimary")}
            </Link>
            <Link href="/portfolio" className="btn btn-secondary">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-x-6 border-t border-ink lg:mt-16 lg:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact} className="border-b border-line py-4">
              <dt className="t-meta">{t(`facts.${fact}.term`)}</dt>
              <dd className="mt-1 font-medium">{t(`facts.${fact}.value`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="home-services" className="shell section">
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <h2 id="home-services" className="t-h2 lg:col-span-5">
            {t("services.title")}
          </h2>
          <p className="max-w-md text-muted lg:col-span-6 lg:col-start-7 lg:self-end">
            {t("services.note")}
          </p>
        </div>

        <ol className="mt-8 border-t border-ink lg:mt-12">
          {categories.map((category, index) => (
            <li key={category} className="border-b border-line">
              <Link
                href={`/services#${category}`}
                className="group grid gap-x-6 gap-y-2 py-6 transition-colors duration-200 hover:bg-surface lg:grid-cols-12 lg:items-baseline lg:py-8"
              >
                <span className="t-meta lg:col-span-1">0{index + 1}</span>
                <span className="t-h1 transition-colors duration-200 group-hover:text-accent lg:col-span-5">
                  {t(`services.items.${category}.title`)}
                </span>
                <span className="max-w-xl text-muted lg:col-span-5">
                  {t(`services.items.${category}.text`)}
                </span>
                <span className="hidden justify-end text-muted transition duration-200 group-hover:translate-x-1 group-hover:text-accent lg:col-span-1 lg:flex">
                  <ArrowRight />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="home-featured" className="shell section">
        <h2 id="home-featured" className="t-h2">
          {t("featured.title")}
        </h2>
        {PROJECTS_ARE_SAMPLES && <SampleNotice />}

        <ul className="mt-8 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:mt-12 lg:grid-cols-12">
          {featuredProjects.map((project, index) => (
            <li
              key={project.slug}
              className={featuredLayout[index % featuredLayout.length]}
            >
              <ProjectCard
                project={toCardData(project, locale)}
                heading="h3"
                sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
              />
            </li>
          ))}
          <li className="md:self-center lg:col-span-5 lg:col-start-8">
            <p className="t-lead">
              {t("featured.allNote", { count: projects.length })}
            </p>
            <Link href="/portfolio" className="link-arrow mt-4">
              {t("featured.all")}
              <ArrowRight />
            </Link>
          </li>
        </ul>
      </section>

      <ContactPanel />
    </>
  );
}
