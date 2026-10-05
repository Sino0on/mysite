// Именно "* as z": так сборщик выкидывает неиспользуемые части Zod.
import * as z from "zod";
import { categories } from "@/content/projects";
import { routing } from "@/i18n/routing";

export const projectTypes = categories;
export const budgets = ["small", "medium", "large", "unknown"] as const;

// Сообщения об ошибках — ключи из messages/*.json (form.errors.*),
// чтобы одна схема работала и в форме на трёх языках, и на сервере.
export type OrderErrorKey =
  | "nameShort"
  | "nameLong"
  | "emailInvalid"
  | "typeRequired"
  | "budgetRequired"
  | "messageShort"
  | "messageLong";

const error = (key: OrderErrorKey) => ({ error: key });

export const orderSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, error("nameShort"))
    .max(80, error("nameLong")),
  email: z
    .string()
    .trim()
    .max(254, error("emailInvalid"))
    .pipe(z.email(error("emailInvalid"))),
  projectType: z.enum(projectTypes, error("typeRequired")),
  budget: z.enum(budgets, error("budgetRequired")),
  message: z
    .string()
    .trim()
    .min(20, error("messageShort"))
    .max(2000, error("messageLong")),
  // Ловушка для ботов: человек это поле не видит и оставляет пустым.
  company: z.string().optional(),
});

export const orderRequestSchema = orderSchema.extend({
  locale: z.enum(routing.locales),
});

export type OrderFormValues = z.input<typeof orderSchema>;
export type Order = z.output<typeof orderRequestSchema>;
