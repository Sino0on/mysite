import { useTranslations } from "next-intl";
import { site } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { Availability } from "./availability";
import { ArrowUpRight } from "./icons";

/**
 * Тёмный блок в конце страницы: два способа написать и текущее время у Дастана.
 * Единственное тёмное пятно на светлой странице — его видно при быстрой прокрутке.
 */
export function ContactPanel() {
  const t = useTranslations();

  return (
    <section className="shell pb-12 md:pb-16 lg:pb-20">
      <div className="grid gap-8 rounded-2xl bg-ink px-6 py-10 text-white md:px-12 md:py-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <h2 className="t-h1">{t("closing.title")}</h2>
          <p className="t-lead mt-4 max-w-xl text-on-ink-muted">
            {t("closing.text")}
          </p>
        </div>

        <div className="flex flex-col justify-end gap-3 lg:col-span-4 lg:col-start-9">
          <Availability className="mb-1 text-on-ink-muted" />
          <a
            href={site.contacts.telegram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {t("closing.telegram")}
            <ArrowUpRight />
            <span className="sr-only">({t("common.newTab")})</span>
          </a>
          <Link
            href="/contact"
            className="btn border-white/40 text-white hover:border-white hover:bg-white/10"
          >
            {t("closing.form")}
          </Link>
        </div>
      </div>
    </section>
  );
}
