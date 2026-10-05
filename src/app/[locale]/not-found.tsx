import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <section className="shell section">
      <p className="t-meta">404</p>
      <h1 className="t-display mt-4">{t("title")}</h1>
      <p className="t-lead mt-6 text-muted">{t("text")}</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          {t("home")}
        </Link>
        <Link href="/portfolio" className="btn btn-secondary">
          {t("portfolio")}
        </Link>
      </div>
    </section>
  );
}
