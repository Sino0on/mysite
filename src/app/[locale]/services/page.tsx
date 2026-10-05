import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { BotDemo } from "@/components/bot-demo";
import { ContactPanel } from "@/components/contact-panel";
import { ArrowRight, Check } from "@/components/icons";
import { categories, projects, type Category } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: Locale }> };

const siteTypes = ["landing", "multipage", "shop", "cabinet"] as const;
const siteIncludes = ["responsive", "form", "languages", "hosting", "seo"] as const;
const botScenarios = ["booking", "orders", "faq", "mailing", "alerts"] as const;
const scriptTasks = ["parsing", "reports", "sync", "files", "api"] as const;
const otherItems = ["admin", "integrations", "legacy", "migration", "speed"] as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.services" });

  return pageMetadata({
    locale,
    path: "/services",
    title: t("title"),
    description: t("description"),
  });
}

function ServiceHeader({ category }: { category: Category }) {
  const t = useTranslations("services");

  return (
    <header>
      <p className="t-meta">0{categories.indexOf(category) + 1}</p>
      <h2 id={`${category}-title`} className="t-h1 mt-2">
        {t(`${category}.title`)}
      </h2>
      <p className="t-lead mt-4 max-w-2xl">{t(`${category}.text`)}</p>
    </header>
  );
}

function WorksLink({ category }: { category: Category }) {
  const t = useTranslations("services");
  if (!projects.some((project) => project.category === category)) return null;

  return (
    <Link href={`/portfolio?type=${category}`} className="link-arrow mt-8">
      {t("works")}
      <ArrowRight />
    </Link>
  );
}

/** Сайты: слева — какие бывают, справа — что входит в работу. */
function WebsiteSection() {
  const t = useTranslations("services.website");

  return (
    <section id="website" aria-labelledby="website-title">
      <ServiceHeader category="website" />

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-6">
        <div>
          <h3 className="t-meta">{t("typesTitle")}</h3>
          <dl className="mt-3 border-t border-ink">
            {siteTypes.map((type) => (
              <div key={type} className="border-b border-line py-4">
                <dt className="font-semibold">{t(`types.${type}.name`)}</dt>
                <dd className="mt-1 text-muted">{t(`types.${type}.text`)}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="t-meta">{t("includesTitle")}</h3>
          <ul className="mt-3 border-t border-ink">
            {siteIncludes.map((item) => (
              <li key={item} className="flex gap-3 border-b border-line py-4">
                <span className="mt-1 flex-none text-ok-ink">
                  <Check />
                </span>
                {t(`includes.${item}`)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <WorksLink category="website" />
    </section>
  );
}

/** Боты: слева — переписка, в которую можно нажать, справа — сценарии. */
function BotSection() {
  const t = useTranslations("services.bot");

  return (
    <section id="bot" aria-labelledby="bot-title">
      <ServiceHeader category="bot" />

      <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-6">
        <BotDemo />

        <div>
          <h3 className="t-meta">{t("scenariosTitle")}</h3>
          <ul className="mt-3 border-t border-ink">
            {botScenarios.map((scenario) => (
              <li key={scenario} className="border-b border-line py-4">
                {t(`scenarios.${scenario}`)}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-muted">{t("platforms")}</p>
        </div>
      </div>

      <WorksLink category="bot" />
    </section>
  );
}

/** Скрипты: вывод терминала во всю ширину, под ним — задачи в две колонки. */
function ScriptSection() {
  const t = useTranslations("services");

  return (
    <section id="script" aria-labelledby="script-title">
      <ServiceHeader category="script" />

      <figure className="mt-8 overflow-hidden rounded-2xl bg-ink text-white">
        <figcaption className="t-meta border-b border-white/15 px-4 py-3 text-on-ink-muted sm:px-6">
          {t("example")}: {t("script.demoCaption")}
        </figcaption>
        <pre className="px-4 py-5 font-mono text-sm leading-6 break-words whitespace-pre-wrap sm:px-6">
          <code>
            <span className="text-on-ink-muted">$</span> python sync_prices.py
            {"\n"}
            <span className="text-on-ink-muted">→</span> {t("script.demo.line1")}
            {"\n"}
            <span className="text-on-ink-muted">→</span> {t("script.demo.line2")}
            {"\n"}
            <span className="text-on-ink-muted">→</span> {t("script.demo.line3")}
            {"\n"}
            <span className="text-ok">✓</span> {t("script.demo.done")}
          </code>
        </pre>
      </figure>

      <h3 className="t-meta mt-10">{t("script.tasksTitle")}</h3>
      <ul className="mt-3 grid border-t border-ink sm:grid-cols-2 sm:gap-x-6">
        {scriptTasks.map((task) => (
          <li key={task} className="border-b border-line py-4">
            {t(`script.tasks.${task}`)}
          </li>
        ))}
      </ul>

      <WorksLink category="script" />
    </section>
  );
}

/** Остальное: простой список и приглашение спросить про свою задачу. */
function OtherSection() {
  const t = useTranslations("services.other");

  return (
    <section id="other" aria-labelledby="other-title">
      <ServiceHeader category="other" />

      <ul className="mt-8 grid border-t border-ink sm:grid-cols-2 sm:gap-x-6">
        {otherItems.map((item) => (
          <li key={item} className="border-b border-line py-4">
            {t(`items.${item}`)}
          </li>
        ))}
      </ul>

      <p className="mt-8 flex flex-wrap items-baseline gap-x-2">
        <span className="font-semibold">{t("ask")}</span>
        <Link href="/contact" className="link-arrow">
          {t("askLink")}
          <ArrowRight />
        </Link>
      </p>

      <div>
        <WorksLink category="other" />
      </div>
    </section>
  );
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <>
      <section className="shell pt-10 md:pt-16 lg:pt-20">
        <h1 className="t-display">{t("title")}</h1>
        <p className="t-lead mt-6 max-w-2xl text-muted">{t("lead")}</p>
      </section>

      <div className="shell section grid gap-10 lg:grid-cols-12 lg:gap-6">
        <nav aria-label={t("navLabel")} className="min-w-0 lg:col-span-3">
          <ol className="-mx-4 flex gap-2 overflow-x-auto px-4 lg:sticky lg:top-24 lg:mx-0 lg:block lg:border-t lg:border-ink lg:px-0">
            {categories.map((category, index) => (
              <li key={category} className="shrink-0 lg:border-b lg:border-line">
                <a
                  href={`#${category}`}
                  className="flex h-10 items-center gap-3 rounded-lg border border-muted px-4 transition-colors duration-200 hover:border-accent hover:text-accent lg:h-12 lg:rounded-none lg:border-0 lg:px-0"
                >
                  <span className="t-meta">0{index + 1}</span>
                  {t(`${category}.title`)}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="min-w-0 space-y-16 lg:col-span-9 lg:space-y-24">
          <WebsiteSection />
          <BotSection />
          <ScriptSection />
          <OtherSection />
        </div>
      </div>

      <ContactPanel />
    </>
  );
}
