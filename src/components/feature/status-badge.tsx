import { Badge } from "@/components/ui/badge";
import { CheckIcon, PercentIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type PartnerStatusTone = "active" | "pending" | "inactive";

const STATUS_LABEL: Record<PartnerStatusTone, string> = {
  active: "Verificado",
  pending: "Pendiente",
  inactive: "Inactivo",
};

const STATUS_CLASS: Record<PartnerStatusTone, string> = {
  active: "bg-brand-soft text-brand-strong",
  pending: "bg-gold-soft text-gold-text",
  inactive: "bg-muted text-muted-foreground",
};

export function StatusBadge({ status }: { status: PartnerStatusTone }) {
  return (
    <Badge className={cn("border-transparent", STATUS_CLASS[status])}>
      {status === "active" ? <CheckIcon className="size-3" /> : null}
      {STATUS_LABEL[status]}
    </Badge>
  );
}

export function SavingsBadge({ percentage }: { percentage: number }) {
  return (
    <Badge className="border-transparent bg-gold-soft font-mono text-gold-text tabular-nums">
      <PercentIcon className="size-3" />-{percentage}%
    </Badge>
  );
}

export function FoundingPartnerBadge() {
  return (
    <Badge className="border-transparent bg-brand-soft text-brand-strong">
      Partner fundador
    </Badge>
  );
}
