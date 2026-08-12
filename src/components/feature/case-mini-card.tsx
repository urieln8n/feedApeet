import { Card, CardContent } from "@/components/ui/card";
import { formatEur } from "@/lib/utils";
import type { FeaturedCase } from "@/lib/fixtures/types";

const STATUS_LABEL: Record<FeaturedCase["status"], string> = {
  en_proceso: "En proceso",
  objetivo_cumplido: "Objetivo cumplido",
  en_ejecucion: "En ejecución",
};

export function CaseMiniCard({ item }: { item: FeaturedCase }) {
  const pct = Math.min(
    100,
    Math.round((item.raisedAmount / item.goalAmount) * 100),
  );

  return (
    <Card>
      <CardContent className="flex flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold">
              {item.title}
            </p>
            <p className="truncate text-[12px] text-muted-foreground">
              {item.shelterName}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-[10.5px] font-medium text-brand-strong">
            {STATUS_LABEL[item.status]}
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-brand"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex items-center justify-between font-mono text-[11.5px] tabular-nums text-muted-foreground">
          <span>
            {formatEur(item.raisedAmount)} de {formatEur(item.goalAmount)}
          </span>
          <span>{pct}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
