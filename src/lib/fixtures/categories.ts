import type { Category } from "./types";

export const categories: Category[] = [
  { id: "cat-alimentacion", name: "Alimentación", slug: "alimentacion", kind: "producto" },
  { id: "cat-veterinario", name: "Veterinario", slug: "veterinario", kind: "servicio" },
  { id: "cat-seguros", name: "Seguros", slug: "seguros", kind: "servicio" },
  { id: "cat-accesorios", name: "Accesorios y juguetes", slug: "accesorios", kind: "producto" },
  { id: "cat-grooming", name: "Peluquería y grooming", slug: "grooming", kind: "servicio" },
  { id: "cat-hospedaje", name: "Residencias y hospedaje", slug: "hospedaje", kind: "servicio" },
  { id: "cat-adiestramiento", name: "Adiestramiento", slug: "adiestramiento", kind: "servicio" },
];

export function findCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}
