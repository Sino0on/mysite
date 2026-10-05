"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Availability } from "./availability";
import { LocaleSwitcher } from "./locale-switcher";
import { MenuNavLinks } from "./nav-links";

export function MobileMenu() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="t-meta h-10 min-w-24 rounded-lg border border-muted px-4 text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
      >
        {open ? t("close") : t("menu")}
      </button>

      {open && (
        <div
          id={panelId}
          className="menu-panel absolute inset-x-0 top-16 max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-line bg-paper"
        >
          <div className="shell pb-6">
            <nav aria-label={t("label")}>
              <MenuNavLinks onNavigate={() => setOpen(false)} />
            </nav>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <LocaleSwitcher />
              <Availability />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
