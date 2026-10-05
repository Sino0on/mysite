export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  minBudgetUsd: 100,

  // ЗАМЕНИТЬ ПЕРЕД ЗАПУСКОМ: сейчас здесь условные контакты.
  contacts: {
    telegram: {
      label: "@your_username",
      href: "https://t.me/your_username",
    },
    whatsapp: {
      label: "+996 000 000 000",
      href: "https://wa.me/996000000000",
    },
    instagram: {
      label: "@your_username",
      href: "https://instagram.com/your_username",
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
