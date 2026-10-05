import { Resend } from "resend";
import type { Order } from "./order-schema";

// Уведомление читает Дастан, поэтому оно всегда на русском,
// на каком бы языке ни был открыт сайт.
const typeLabels: Record<Order["projectType"], string> = {
  website: "Сайт",
  bot: "Бот",
  script: "Скрипт",
  other: "Другое",
};

const budgetLabels: Record<Order["budget"], string> = {
  small: "$100–300",
  medium: "$300–1 000",
  large: "от $1 000",
  unknown: "не определён",
};

function orderText(order: Order) {
  return [
    "Новая заявка с сайта",
    "",
    `Имя: ${order.name}`,
    `Email: ${order.email}`,
    `Тип: ${typeLabels[order.projectType]}`,
    `Бюджет: ${budgetLabels[order.budget]}`,
    `Язык сайта: ${order.locale}`,
    "",
    order.message,
  ].join("\n");
}

async function sendToTelegram(token: string, chatId: string, text: string) {
  const response = await fetch(
    `https://api.telegram.org/bot${token}/sendMessage`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        link_preview_options: { is_disabled: true },
      }),
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Telegram ${response.status}: ${await response.text()}`);
  }
}

async function sendEmail(apiKey: string, to: string, order: Order, text: string) {
  const { error } = await new Resend(apiKey).emails.send({
    // onboarding@resend.dev работает без своего домена, но доставляет
    // только на почту владельца аккаунта Resend — для заявок этого хватает.
    from: process.env.ORDER_EMAIL_FROM ?? "Заявки с сайта <onboarding@resend.dev>",
    to,
    replyTo: order.email,
    subject: `Заявка: ${typeLabels[order.projectType]} — ${order.name}`,
    text,
  });

  if (error) throw new Error(`Resend: ${error.message}`);
}

export type DeliveryOutcome = "delivered" | "failed" | "not_configured";

/**
 * Отправляет заявку во все настроенные каналы.
 * Заявка считается доставленной, если сработал хотя бы один.
 */
export async function deliverOrder(order: Order): Promise<DeliveryOutcome> {
  const {
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID,
    RESEND_API_KEY,
    ORDER_EMAIL_TO,
  } = process.env;

  const text = orderText(order);
  const channels: Promise<void>[] = [];

  if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
    channels.push(sendToTelegram(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, text));
  }
  if (RESEND_API_KEY && ORDER_EMAIL_TO) {
    channels.push(sendEmail(RESEND_API_KEY, ORDER_EMAIL_TO, order, text));
  }

  if (channels.length === 0) {
    console.error(
      "Заявка не отправлена: не заданы ни TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID, ни RESEND_API_KEY + ORDER_EMAIL_TO.",
    );
    return "not_configured";
  }

  const results = await Promise.allSettled(channels);
  for (const result of results) {
    if (result.status === "rejected") console.error(result.reason);
  }

  return results.some((result) => result.status === "fulfilled")
    ? "delivered"
    : "failed";
}
