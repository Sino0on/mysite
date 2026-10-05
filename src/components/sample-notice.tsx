import { useTranslations } from "next-intl";
import { Alert } from "./icons";

/** Напоминание, что кейсы — образцы. Показывается, пока PROJECTS_ARE_SAMPLES = true. */
export function SampleNotice() {
  const t = useTranslations("portfolio");

  return (
    <p className="mt-6 flex max-w-2xl items-start gap-2 rounded-lg border border-dashed border-muted px-4 py-3 text-sm text-muted">
      <span className="mt-0.5 flex-none">
        <Alert />
      </span>
      {t("sampleNotice")}
    </p>
  );
}
