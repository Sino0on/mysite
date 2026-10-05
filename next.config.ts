import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Для Docker-образа (см. Dockerfile) Next собирает .next/standalone —
  // самодостаточную папку с server.js. Локальный `npm run start` это не затрагивает.
  output: process.env.DOCKER_BUILD ? "standalone" : undefined,

  // В родительской папке лежит чужой package-lock.json — без этих строк
  // Next принимает за корень проекта её, а не эту папку.
  turbopack: { root: __dirname },
  outputFileTracingRoot: __dirname,
};

export default withNextIntl(nextConfig);
