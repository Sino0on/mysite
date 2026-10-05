"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const options = ["today", "tomorrow", "other"] as const;
type Option = (typeof options)[number];

const bubble = "max-w-[85%] rounded-2xl px-4 py-2";
const fromUser = `${bubble} self-end rounded-br-sm bg-ink text-white`;
const fromBot = `${bubble} self-start rounded-bl-sm border border-line bg-paper`;

/**
 * Переписка с ботом, в которую можно нажать: посетитель выбирает время
 * и видит, что бот ответит. Объясняет услугу быстрее, чем абзац текста.
 */
export function BotDemo() {
  const t = useTranslations("services");
  const [choice, setChoice] = useState<Option | null>(null);

  return (
    <figure className="rounded-2xl border border-line bg-surface p-4 sm:p-6">
      <figcaption className="t-meta">
        {t("example")}: {t("bot.demoCaption")}
      </figcaption>

      <ol aria-live="polite" className="mt-4 flex min-h-64 flex-col gap-2">
        <li className={fromUser}>
          <span className="sr-only">{t("bot.demo.userLabel")}: </span>
          {t("bot.demo.user")}
        </li>
        <li className={fromBot}>
          <span className="sr-only">{t("bot.demo.botLabel")}: </span>
          {t("bot.demo.bot")}
        </li>

        {choice === null ? (
          <li className="flex flex-wrap gap-2">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setChoice(option)}
                className="h-10 rounded-lg border border-accent bg-accent-soft px-3 text-sm font-medium text-accent-strong transition-colors duration-200 hover:bg-accent hover:text-white"
              >
                {t(`bot.demo.options.${option}`)}
              </button>
            ))}
          </li>
        ) : (
          <>
            <li className={`appear ${fromUser}`}>
              <span className="sr-only">{t("bot.demo.userLabel")}: </span>
              {t(`bot.demo.options.${choice}`)}
            </li>
            {/* Ответ бота появляется с паузой 0.3 с — как в настоящей переписке. */}
            <li className={`appear [animation-delay:0.3s] ${fromBot}`}>
              <span className="sr-only">{t("bot.demo.botLabel")}: </span>
              {t(`bot.demo.replies.${choice}`)}
            </li>
          </>
        )}
      </ol>

      <p className="mt-4 text-sm text-muted">
        {choice === null ? (
          t("bot.demo.hint")
        ) : (
          <button
            type="button"
            onClick={() => setChoice(null)}
            className="text-accent underline decoration-1 underline-offset-4 transition-colors duration-200 hover:text-accent-strong"
          >
            {t("bot.demo.restart")}
          </button>
        )}
      </p>
    </figure>
  );
}
