import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BagIcon,
  HeartIcon,
  LeafIcon,
  PawIcon,
  PinIcon,
  ShieldIcon,
  UsersIcon,
} from "@/components/icons";
import { ImpactFlow } from "@/components/feature/impact-flow";

const PILLARS = [
  { icon: LeafIcon, label: "Impacto" },
  { icon: ShieldIcon, label: "Confianza" },
  { icon: PawIcon, label: "Animales" },
  { icon: UsersIcon, label: "Comunidad" },
  { icon: BagIcon, label: "Marketplace" },
];

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <section className="mx-auto max-w-2xl text-center">
        <p className="mb-4 text-[12px] font-semibold tracking-wide text-brand uppercase">
          Comunidad e impacto animal
        </p>
        <h1 className="text-[32px] leading-tight font-bold text-balance sm:text-[40px]">
          Tu amor por los animales, convertido en impacto real
        </h1>
        <p className="mt-4 text-[15.5px] text-muted-foreground">
          No venimos a que ganes dinero. Compra en partners con descuento,
          dona a casos verificados, y mira exactamente a dónde llega cada
          euro.
        </p>

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button size="lg" render={<Link href="/partners" />}>
            <BagIcon className="size-4" />
            Explorar el marketplace
          </Button>
          <Button
            size="lg"
            variant="secondary"
            render={<Link href="/refugios" />}
          >
            <PinIcon className="size-4" />
            Ver refugios
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {PILLARS.map((pillar) => (
            <span
              key={pillar.label}
              className="inline-flex items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1 text-[12px] font-semibold text-brand-strong"
            >
              <pillar.icon className="size-3.5" />
              {pillar.label}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-14 max-w-md">
        <ImpactFlow
          spentLabel="Ejemplo: compra en un partner"
          spentValue={47.9}
          impactLabel="impacto generado"
          impactValue={2.01}
        />
        <p className="mt-3 text-center text-[12px] text-muted-foreground">
          Cifras de ejemplo — verás las tuyas reales en tu dashboard
        </p>
      </section>

      <section className="mt-16 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5">
          <BagIcon className="size-5 text-brand" />
          <p className="mt-3 text-[14.5px] font-semibold">
            Compra donde ya compras
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Partners con descuento en alimentación, veterinario, seguros y
            más.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <HeartIcon className="size-5 text-brand" />
          <p className="mt-3 text-[14.5px] font-semibold">
            Dona con transparencia
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Cada caso muestra su objetivo, lo recaudado y evidencia real.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-card p-5">
          <LeafIcon className="size-5 text-brand" />
          <p className="mt-3 text-[14.5px] font-semibold">
            Sigue tu impacto
          </p>
          <p className="mt-1 text-[13px] text-muted-foreground">
            Tu dashboard muestra cuánto ahorraste y cuánto impacto generaste.
          </p>
        </div>
      </section>
    </div>
  );
}
