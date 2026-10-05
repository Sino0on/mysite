# Сайт-портфолио Дастана Кубанова

Next.js 16 (App Router, TypeScript) · Tailwind CSS 4 · next-intl (RU / KG / EN) · React Hook Form + Zod · Resend · Motion.

## Запуск

```bash
npm install
cp .env.example .env.local   # переменные описаны внутри файла
npm run dev                  # http://localhost:3000
```

Остальные команды: `npm run build`, `npm run start`, `npm run lint`, `npm run typecheck`.

## Где что менять

| Что | Файл |
| --- | --- |
| Контакты, часы «на связи» | `src/config/site.ts` |
| Кейсы портфолио | `src/content/projects.ts` |
| Все тексты интерфейса | `messages/ru.json`, `messages/ky.json`, `messages/en.json` |
| Список технологий на «Обо мне» | `src/app/[locale]/about/page.tsx` |
| Цвета, шрифты, размеры | `src/app/globals.css` |

Ключи в трёх файлах `messages/` должны совпадать. Типы берутся из `ru.json`: если в коде есть ключ, которого нет в русском файле, `npm run typecheck` упадёт.

## Как добавить кейс

1. В `src/content/projects.ts` добавьте объект в массив `projects`: `slug`, `category` (`website` / `bot` / `script` / `other`), год, стек и тексты на трёх языках.
2. Скриншот положите в `public/projects/<slug>.jpg` (пропорция 16:10, ширина от 1600 px) и укажите его в поле `image` вместе с описанием `alt`. Без `image` обложку рисует схема по типу работы.
3. `featured: true` выводит кейс на главную. Сетка рассчитана на 3–4 таких кейса.

Страница кейса, фильтр и карта сайта подхватят новый проект сами.

## Заявки

Форма на `/contact` отправляет `POST /api/order`. Сервер проверяет данные той же Zod-схемой, что и форма (`src/lib/order-schema.ts`), и шлёт заявку в Telegram и на почту (`src/lib/deliver-order.ts`).

Достаточно настроить один канал. Если не настроен ни один, сервер отвечает 503, а форма показывает ссылку на Telegram и не стирает введённый текст.

## Перед запуском

- [ ] Реальные контакты в `src/config/site.ts` (сейчас там `@your_username` и `+996 000 000 000`).
- [ ] Реальные кейсы в `src/content/projects.ts`, после этого `PROJECTS_ARE_SAMPLES = false` — плашка «это образцы» исчезнет.
- [ ] Дастан вычитал тексты: «Обо мне», описания услуг, «Как идёт работа», список технологий.
- [ ] Носитель языка проверил `messages/ky.json` и кыргызские тексты кейсов.
- [ ] В `.env` на сервере заданы `NEXT_PUBLIC_SITE_URL` (боевой адрес с `https://`) и переменные Telegram и/или Resend.
- [ ] Тестовая заявка с боевого сайта дошла в Telegram и на почту.

## Деплой на свой сервер (Docker)

На сервере нужны git, Docker и плагин Compose.

```bash
git clone <адрес-репозитория> dastan-portfolio
cd dastan-portfolio
cp .env.example .env            # впишите адрес сайта и токены
docker compose up -d --build
```

Файл `.env` в репозиторий не попадает: он создаётся на сервере один раз и переживает `git pull`.

Контейнер слушает только `127.0.0.1:3000`, наружу его отдаёт nginx: `proxy_pass http://127.0.0.1:3000;`. Другой порт задаётся переменной `APP_PORT` в `.env`.

| Задача | Команда |
| --- | --- |
| Выкатить новую версию кода | `git pull && docker compose up -d --build` |
| Применить новые токены из `.env` | `docker compose up -d` |
| Применить новый `NEXT_PUBLIC_SITE_URL` | `docker compose up -d --build` — адрес вшивается при сборке |
| Посмотреть логи | `docker compose logs -f web` |
| Проверить состояние | `docker compose ps` — в колонке STATUS должно быть `healthy` |

Сборке образа нужен доступ в интернет: она скачивает npm-пакеты и шрифт Geist с Google Fonts.

Проект без изменений работает и на Vercel: режим `standalone` включается только внутри Dockerfile.
