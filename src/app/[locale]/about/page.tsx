import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactPanel } from "@/components/contact-panel";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: Locale }> };

const facts = ["years", "people", "languages", "budget"] as const;
const steps = ["brief", "estimate", "progress", "handover"] as const;

// ЧЕРНОВИК: список технологий собран по брифу («от фронта до бэка, ботов, скриптов»).
// Сверить с Дастаном и оставить только то, с чем он реально работает.
const stack = {
  frontend: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js"],
  backend: ["Node.js", "Python", "PostgreSQL", "REST API"],
  bots: ["Telegram Bot API", "WhatsApp Business API"],
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.about" });

  return pageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <section className="shell pt-10 md:pt-16 lg:pt-20">
        <h1 className="t-meta tracking-wider uppercase">{t("title")}</h1>
        <p className="t-display mt-6 max-w-5xl">{t("statement")}</p>

        <div className="mt-10 grid gap-6 lg:mt-16 lg:grid-cols-12">
          <p className="t-lead lg:col-span-5 lg:col-start-4">{t("p1")}</p>
          <p className="t-lead text-muted lg:col-span-4">{t("p2")}</p>
        </div>
      </section>

      <section aria-labelledby="about-facts" className="shell section">
        <h2 id="about-facts" className="sr-only">
          {t("factsTitle")}
        </h2>
        <dl className="grid grid-cols-2 gap-x-6 border-t border-ink lg:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact}
              className="flex flex-col-reverse justify-end border-b border-line py-6"
            >
              <dt className="mt-2 max-w-48 text-muted">{t(`facts.${fact}.label`)}</dt>
              <dd className="t-display tabular-nums">{t(`facts.${fact}.value`)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        aria-labelledby="about-process"
        className="shell section grid gap-8 lg:grid-cols-12 lg:gap-6"
      >
        <h2 id="about-process" className="t-h2 lg:col-span-4">
          {t("processTitle")}
        </h2>
        <ol className="border-t border-ink lg:col-span-8">
          {steps.map((step, index) => (
            <li
              key={step}
              className="grid gap-x-6 gap-y-1 border-b border-line py-6 sm:grid-cols-[3rem_1fr]"
            >
              <span className="t-meta sm:pt-1.5">0{index + 1}</span>
              <div>
                <h3 className="t-h3">{t(`process.${step}.title`)}</h3>
                <p className="mt-2 max-w-xl text-muted">
                  {t(`process.${step}.text`)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="about-stack"
        className="shell section grid gap-8 lg:grid-cols-12 lg:gap-6"
      >
        <h2 id="about-stack" className="t-h2 lg:col-span-4">
          {t("stackTitle")}
        </h2>
        <dl className="border-t border-ink lg:col-span-8">
          {(Object.keys(stack) as (keyof typeof stack)[]).map((group) => (
            <div
              key={group}
              className="grid gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr]"
            >
              <dt className="t-meta sm:pt-0.5">{t(`stack.${group}`)}</dt>
              <dd>{stack[group].join(", ")}</dd>
            </div>
          ))}
          <div className="grid gap-x-6 gap-y-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr]">
            <dt className="t-meta sm:pt-0.5">{t("stack.launch")}</dt>
            <dd>{t("stack.launchItems")}</dd>
          </div>
        </dl>
      </section>

      <ContactPanel />
    </>
  );
}
