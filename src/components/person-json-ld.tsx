import { getTranslations } from "next-intl/server";
import { site } from "@/config/site";
import type { Locale } from "@/i18n/routing";

// Пока в site.ts стоят условные контакты, в sameAs их не отдаём:
// поисковик склеил бы профиль с чужим аккаунтом.
const profileUrls = Object.values(site.contacts)
  .map(({ href }) => href)
  .filter((href) => !href.includes("your_username") && !href.includes("000000"));

/**
 * Структурированные данные для Google: кто такой Дастан, где он
 * и что делает. Отсюда поисковик берёт «Бишкек, Кыргызстан» и
 * «работает по всему миру», даже если этих слов нет в заголовке.
 */
export async function PersonJsonLd({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale });
  const url = `${site.url}/${locale}`;
  const address = {
    "@type": "PostalAddress",
    addressLocality: "Bishkek",
    addressCountry: "KG",
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: t("common.name"),
        jobTitle: t("common.role"),
        url,
        address,
        knowsLanguage: ["ru", "ky", "en"],
        ...(profileUrls.length > 0 && { sameAs: profileUrls }),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: t("common.name"),
        description: t("meta.home.description"),
        url,
        image: `${url}/opengraph-image`,
        founder: { "@id": `${site.url}/#person` },
        address,
        areaServed: [
          { "@type": "Country", name: "Kyrgyzstan" },
          "Worldwide",
        ],
        priceRange: `$${site.minBudgetUsd}+`,
        knowsAbout: [
          "Web development",
          "Telegram bots",
          "WhatsApp bots",
          "Automation scripts",
          "CRM and ERP systems",
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // "<" экранируется, чтобы строка из переводов не закрыла тег <script>.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
