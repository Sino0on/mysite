import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Запрос без префикса языка уходит на язык браузера (Accept-Language),
// выбор в переключателе запоминается в cookie.
export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
