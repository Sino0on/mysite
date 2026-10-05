# syntax=docker/dockerfile:1

FROM node:24-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# 1. Зависимости отдельным слоем: он пересобирается, только когда меняется package-lock.json.
FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci

# 2. Сборка.
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Адрес сайта попадает в canonical, hreflang и sitemap во время сборки,
# поэтому он нужен здесь, а не при запуске контейнера.
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV DOCKER_BUILD=1
RUN npm run build

# 3. Запуск: в итоговом образе только server.js и файлы, которые ему нужны.
FROM base AS runner
ENV NODE_ENV=production
# Docker сам выставляет HOSTNAME в id контейнера — сервер слушал бы только его.
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]
