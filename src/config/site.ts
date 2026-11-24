export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  minBudgetUsd: 100,

  contacts: {
    telegram: {
      label: "@sino0on",
      href: "https://t.me/sino0on",
    },
    whatsapp: {
      label: "+996 707 945 462",
      href: "https://wa.me/996707945462",
    },
    instagram: {
      label: "@dastan.it",
      href: "https://instagram.com/dastan.it",
    },
  },

  // Часы, в которые Дастан на связи. По ним считается статус рядом с часами.
  availability: {
    timeZone: "Asia/Bishkek",
    fromHour: 10,
    toHour: 20,
  },
} as const;

export type ContactChannel = keyof typeof site.contacts;
