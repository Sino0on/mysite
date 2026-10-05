import { notFound } from "next/navigation";

// Любой неизвестный адрес внутри языка получает переведённую страницу 404
// с шапкой и футером, а не стандартную заглушку Next.js.
export default function UnknownPage() {
  notFound();
}
