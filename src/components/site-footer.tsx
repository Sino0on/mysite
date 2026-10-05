import { useTranslations } from "next-intl";
import { navItems } from "@/config/nav";
import { site, type ContactChannel } from "@/config/site";
import { Link } from "@/i18n/navigation";
import { Availability } from "./availability";
import { ArrowUpRight } from "./icons";
import { LocaleSwitcher } from "./locale-switcher";

const channels = Object.keys(site.contacts) as ContactChannel[];

export function SiteFooter() {
  const t = useTranslations();

  return (
    <footer className="border-t border-line bg-sunken">
      <div className="shell grid gap-10 py-12 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <p className="font-semibold tracking-tight">{t("common.name")}</p>
          <p className="mt-2 max-w-sm text-muted">{t("footer.about")}</p>
          <Availability className="mt-6" />
        </div>

        <nav aria-label={t("footer.navTitle")} className="md:col-span-3 md:col-start-7">
          <h2 className="t-meta">{t("footer.navTitle")}</h2>
          <ul className="mt-2">
            {navItems.map(({ key, href }) => (
              <li key={key}>
                <Link
                  href={href}
                  className="inline-flex h-10 items-center transition-colors duration-200 hover:text-accent"
                >
                  {t(`nav.${key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="t-meta">{t("footer.contactsTitle")}</h2>
          <ul className="mt-2">
            {channels.map((channel) => (
              <li key={channel}>
                <a
                  href={site.contacts[channel].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 transition-colors duration-200 hover:text-accent"
                >
                  {t(`contact.channels.${channel}.name`)}
                  <ArrowUpRight />
                  <span className="sr-only">({t("common.newTab")})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-4">
          <p className="t-meta">
            {t("footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
}
