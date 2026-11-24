import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import { routing, type Locale } from "@/i18n/routing";

// Картинка превью, когда ссылку на сайт кидают в Telegram, WhatsApp или LinkedIn.
// Шрифт не подключаем: встроенный в next/og Geist уже знает кириллицу и ң, ө, ү.

export const alt = "Dastan Kubanov";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const host = new URL(site.url).host;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fafafa",
          color: "#1a1a1a",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#666666",
          }}
        >
          <span>{t("og.place")}</span>
          <span>{host}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, lineHeight: 1, letterSpacing: -4 }}>
            {t("common.name")}
          </div>
          <div style={{ marginTop: 32, fontSize: 44, color: "#666666" }}>
            {t("og.services")}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "4px solid #1a1a1a",
            paddingTop: 24,
            fontSize: 28,
          }}
        >
          <span>{t("og.remote")}</span>
          <span style={{ color: "#2563eb" }}>
            {t("og.budget", { budget: site.minBudgetUsd })}
          </span>
        </div>
      </div>
    ),
    size,
  );
}
