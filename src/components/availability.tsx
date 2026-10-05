"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { site } from "@/config/site";

const { timeZone, fromHour, toHour } = site.availability;

const clock = new Intl.DateTimeFormat("en-GB", {
  timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

function subscribe(onTick: () => void) {
  const timer = setInterval(onTick, 15_000);
  return () => clearInterval(timer);
}

const readClock = () => clock.format(new Date());
const noClockOnServer = () => null;

/**
 * Текущее время у Дастана и статус «на связи / отвечу позже».
 * Клиенту из другого часового пояса это сразу говорит, когда ждать ответа.
 */
export function Availability({ className = "" }: { className?: string }) {
  const t = useTranslations("availability");
  const time = useSyncExternalStore(subscribe, readClock, noClockOnServer);

  const hour = time === null ? null : Number(time.slice(0, 2));
  const online = hour !== null && hour >= fromHour && hour < toHour;

  return (
    <p className={`t-meta flex flex-wrap items-center gap-x-2 ${className}`}>
      {/* Статус читается и без цвета: закрашенная точка против пустой + текст. */}
      <span
        aria-hidden
        className={`size-2 rounded-full ${online ? "bg-ok" : "border border-current"}`}
      />
      <span>{t("time", { time: time ?? "--:--" })}</span>
      {time !== null && (
        <span>· {online ? t("online") : t("offline", { hour: fromHour })}</span>
      )}
    </p>
  );
}
