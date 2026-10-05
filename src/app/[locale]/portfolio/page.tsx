import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactPanel } from "@/components/contact-panel";
import { toCardData } from "@/components/project-card";
import { ProjectGallery } from "@/components/project-gallery";
import { SampleNotice } from "@/components/sample-notice";
import { projects, PROJECTS_ARE_SAMPLES } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.portfolio" });

  return pageMetadata({
    locale,
    path: "/portfolio",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PortfolioPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");

  return (
    <>
      <section className="shell pt-10 pb-8 md:pt-16 lg:pt-20">
        <h1 className="t-display">{t("title")}</h1>
        <p className="t-lead mt-6 max-w-2xl text-muted">{t("lead")}</p>
        {PROJECTS_ARE_SAMPLES && <SampleNotice />}
      </section>

      <ProjectGallery
        projects={projects.map((project) => toCardData(project, locale))}
      />

      <ContactPanel />
    </>
  );
}
