"use client";

import { useEffect, useId, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { site } from "@/config/site";
import {
  budgets,
  orderSchema,
  projectTypes,
  type OrderErrorKey,
  type OrderFormValues,
} from "@/lib/order-schema";
import { Alert, ArrowUpRight, Check, Close } from "./icons";

type Status =
  | { kind: "idle" }
  | { kind: "sent"; email: string }
  | { kind: "failed" };

const TOAST_LIFETIME_MS = 8000;

function FieldError({ id, text }: { id: string; text?: string }) {
  if (!text) return null;
  return (
    <p id={id} className="mt-2 flex items-start gap-2 text-sm text-error">
      <span className="mt-0.5 flex-none">
        <Alert />
      </span>
      {text}
    </p>
  );
}

export function OrderForm() {
  const t = useTranslations("form");
  const locale = useLocale();
  const id = useId();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    // Поле проверяется, когда из него вышли, и дальше — на каждый ввод.
    mode: "onTouched",
  });

  useEffect(() => {
    if (status.kind !== "sent") return;
    const timer = setTimeout(() => setStatus({ kind: "idle" }), TOAST_LIFETIME_MS);
    return () => clearTimeout(timer);
  }, [status]);

  async function submit(values: OrderFormValues) {
    setStatus({ kind: "idle" });
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
      if (!response.ok) throw new Error(`Order request failed: ${response.status}`);
      setStatus({ kind: "sent", email: values.email.trim() });
      reset();
    } catch {
      setStatus({ kind: "failed" });
    }
  }

  const errorText = (key?: string) =>
    key ? t(`errors.${key as OrderErrorKey}`) : undefined;

  const describedBy = (field: keyof OrderFormValues, extra?: string) =>
    [errors[field] ? `${id}-${field}-error` : null, extra]
      .filter(Boolean)
      .join(" ") || undefined;

  return (
    <>
      <form onSubmit={handleSubmit(submit)} noValidate className="grid gap-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className="mb-2 block text-sm font-medium">
              {t("name")}
            </label>
            <input
              id={`${id}-name`}
              type="text"
              autoComplete="name"
              required
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy("name")}
              className="field"
              {...register("name")}
            />
            <FieldError id={`${id}-name-error`} text={errorText(errors.name?.message)} />
          </div>

          <div>
            <label htmlFor={`${id}-email`} className="mb-2 block text-sm font-medium">
              {t("email")}
            </label>
            <input
              id={`${id}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              aria-invalid={Boolean(errors.email)}
              aria-describedby={describedBy("email")}
              className="field"
              {...register("email")}
            />
            <FieldError id={`${id}-email-error`} text={errorText(errors.email?.message)} />
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-projectType`} className="mb-2 block text-sm font-medium">
            {t("projectType")}
          </label>
          <select
            id={`${id}-projectType`}
            defaultValue=""
            required
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={describedBy("projectType")}
            className="field"
            {...register("projectType")}
          >
            <option value="" disabled>
              {t("projectTypePlaceholder")}
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {t(`types.${type}`)}
              </option>
            ))}
          </select>
          <FieldError
            id={`${id}-projectType-error`}
            text={errorText(errors.projectType?.message)}
          />
        </div>

        <fieldset aria-describedby={describedBy("budget")}>
          <legend className="mb-2 text-sm font-medium">{t("budget")}</legend>
          <div className="flex flex-wrap gap-2">
            {budgets.map((budget) => (
              <label key={budget} className="cursor-pointer">
                <input
                  type="radio"
                  value={budget}
                  required
                  className="peer sr-only"
                  {...register("budget")}
                />
                <span className="flex h-12 items-center rounded-lg border border-muted bg-surface px-4 font-mono text-sm transition-colors duration-200 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-bright hover:border-accent">
                  {t(`budgets.${budget}`)}
                </span>
              </label>
            ))}
          </div>
          <FieldError id={`${id}-budget-error`} text={errorText(errors.budget?.message)} />
        </fieldset>

        <div>
          <label htmlFor={`${id}-message`} className="mb-2 block text-sm font-medium">
            {t("message")}
          </label>
          <textarea
            id={`${id}-message`}
            rows={5}
            required
            aria-invalid={Boolean(errors.message)}
            aria-describedby={describedBy("message", `${id}-message-hint`)}
            className="field min-h-32 resize-y"
            {...register("message")}
          />
          <p id={`${id}-message-hint`} className="mt-2 text-sm text-muted">
            {t("messageHint")}
          </p>
          <FieldError id={`${id}-message-error`} text={errorText(errors.message?.message)} />
        </div>

        <div aria-hidden className="absolute -left-[9999px]">
          <label>
            {t("company")}
            <input type="text" tabIndex={-1} autoComplete="off" {...register("company")} />
          </label>
        </div>

        {status.kind === "failed" && (
          <div
            role="alert"
            className="rounded-lg border border-error bg-surface p-4 text-error"
          >
            <p className="flex items-start gap-2">
              <span className="mt-1 flex-none">
                <Alert />
              </span>
              {t("failure")}
            </p>
            <a
              href={site.contacts.telegram.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow mt-2 ml-6"
            >
              {t("failureLink")}
              <ArrowUpRight />
            </a>
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
          {isSubmitting ? t("submitting") : t("submit")}
        </button>
      </form>

      {/* Область объявлений стоит в DOM всегда — так скринридер зачитает появившийся текст. */}
      <div
        role="status"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-end"
      >
        {status.kind === "sent" && (
          <div className="appear pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg bg-ok-ink p-4 text-white">
            <span className="mt-1 flex-none">
              <Check />
            </span>
            <p className="flex-1">{t("success", { email: status.email })}</p>
            <button
              type="button"
              onClick={() => setStatus({ kind: "idle" })}
              aria-label={t("dismiss")}
              className="-m-2 flex size-10 flex-none items-center justify-center rounded-lg transition-colors duration-200 hover:bg-white/15"
            >
              <Close />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
