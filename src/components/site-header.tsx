import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileMenu } from "./mobile-menu";
import { HeaderNavLinks } from "./nav-links";

export function SiteHeader() {
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="shell flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-semibold tracking-tight transition-colors duration-200 hover:text-accent"
        >
          {t("common.name")}
        </Link>

        <nav aria-label={t("nav.label")} className="hidden md:block">
          <HeaderNavLinks />
        </nav>

        <div className="hidden md:block">
          <LocaleSwitcher />
        </div>

        <MobileMenu />
      </div>
    </header>
  );
}
