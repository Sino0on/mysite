import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Availability } from "@/components/availability";
import { ArrowUpRight } from "@/components/icons";
import { OrderForm } from "@/components/order-form";
import { site, type ContactChannel } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/page-metadata";

type Props = { params: Promise<{ locale: Locale }> };

const channels = Object.keys(site.contacts) as ContactChannel[];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta.contact" });

  return pageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="shell grid gap-12 pt-10 pb-12 md:pt-16 md:pb-16 lg:grid-cols-12 lg:gap-6 lg:pt-20 lg:pb-20">
      <div className="lg:col-span-5">
        <h1 className="t-display">{t("contact.title")}</h1>
        <p className="t-lead mt-6 max-w-md text-muted">{t("contact.lead")}</p>
        <Availability className="mt-6" />

        <h2 className="t-meta mt-10">{t("contact.channelsTitle")}</h2>
        <ul className="mt-3 border-t border-ink">
          {channels.map((channel) => (
            <li key={channel} className="border-b border-line">
              <a
                href={site.contacts[channel].href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-4"
              >
                <span>
                  <span className="t-h3 block transition-colors duration-200 group-hover:text-accent">
                    {t(`contact.channels.${channel}.name`)}
                  </span>
                  <span className="t-meta block">
                    {site.contacts[channel].label} ·{" "}
                    {t(`contact.channels.${channel}.note`)}
                  </span>
                </span>
                <span className="flex-none text-muted transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent">
                  <ArrowUpRight />
                </span>
                <span className="sr-only">({t("common.newTab")})</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <section
        aria-labelledby="order-form-title"
        className="rounded-2xl border border-line bg-surface p-6 md:p-8 lg:col-span-6 lg:col-start-7"
      >
        <h2 id="order-form-title" className="t-h2">
          {t("contact.formTitle")}
        </h2>
        <p className="mt-2 text-muted">{t("contact.formNote")}</p>
        <div className="mt-8">
          <OrderForm />
        </div>
      </section>
    </div>
  );
}
