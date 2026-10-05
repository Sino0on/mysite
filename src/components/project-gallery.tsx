"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { categories, type Category } from "@/content/projects";
import { ProjectCard, type ProjectCardData } from "./project-card";

type Filter = "all" | Category;

const PARAM = "type";
const FILTER_CHANGE = "portfolio:filter";

// Фильтр живёт в адресе (?type=bot): ссылкой на «только боты» можно поделиться,
// а в статичном HTML при этом остаются все проекты — для поиска и без JS.
function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(FILTER_CHANGE, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(FILTER_CHANGE, onChange);
  };
}

function readFilter(): Filter {
  const value = new URLSearchParams(window.location.search).get(PARAM);
  return categories.includes(value as Category) ? (value as Category) : "all";
}

function writeFilter(filter: Filter) {
  const url = new URL(window.location.href);
  if (filter === "all") url.searchParams.delete(PARAM);
  else url.searchParams.set(PARAM, filter);
  window.history.replaceState(null, "", url);
  window.dispatchEvent(new Event(FILTER_CHANGE));
}

// Ширина карточек чередуется, чтобы сетка не превращалась в ровную плитку.
const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
];

export function ProjectGallery({ projects }: { projects: ProjectCardData[] }) {
  const t = useTranslations("portfolio");
  const filter = useSyncExternalStore<Filter>(subscribe, readFilter, () => "all");

  const counts = new Map<Filter, number>([["all", projects.length]]);
  for (const { category } of projects) {
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  const filters = (["all", ...categories] as Filter[]).filter((item) =>
    counts.has(item),
  );

  const visible =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    // reducedMotion="user": при системной настройке «уменьшить движение» карточки не ездят.
    <MotionConfig reducedMotion="user">
      <div className="sticky top-16 z-30 border-b border-line bg-paper">
        <div
          role="group"
          aria-label={t("filterLabel")}
          className="shell flex gap-2 overflow-x-auto py-3"
        >
          {filters.map((item) => {
            const active = item === filter;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => writeFilter(item)}
                className={`flex h-10 shrink-0 items-center gap-2 rounded-lg border px-4 font-medium transition-colors duration-200 ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-muted text-ink hover:border-accent hover:bg-accent-soft hover:text-accent-strong"
                }`}
              >
                {t(`filters.${item}`)}
                <span
                  className={`font-mono text-sm tabular-nums ${active ? "" : "text-muted"}`}
                >
                  {counts.get(item)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="shell section">
        <p role="status" className="sr-only">
          {t("shown", { count: visible.length })}
        </p>

        {visible.length === 0 ? (
          <p className="t-lead text-muted">{t("empty")}</p>
        ) : (
          <ul className="relative grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-y-16">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project, index) => (
                <motion.li
                  key={project.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={spans[index % spans.length]}
                >
                  <ProjectCard
                    project={project}
                    heading="h2"
                    sizes="(min-width: 1024px) 58vw, (min-width: 768px) 50vw, 100vw"
                  />
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </MotionConfig>
  );
}
