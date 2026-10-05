import { deliverOrder } from "@/lib/deliver-order";
import { orderRequestSchema } from "@/lib/order-schema";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = orderRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "invalid_order" }, { status: 422 });
  }

  // Заполненная ловушка — это бот. Отвечаем «ок», чтобы он не подбирал поля.
  if (parsed.data.company) {
    return Response.json({ ok: true });
  }

  const outcome = await deliverOrder(parsed.data);
  if (outcome === "delivered") {
    return Response.json({ ok: true });
  }

  return Response.json(
    { error: outcome },
    { status: outcome === "not_configured" ? 503 : 502 },
  );
}
