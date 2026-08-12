import { ArrowRightIcon, LeafIcon } from "@/components/icons";
import { cn, formatEur } from "@/lib/utils";

/**
 * La pieza central del pilar "impacto muy visible": conecta lo que gastó
 * el usuario con el impacto real que generó esa actividad. Con datos de
 * ejemplo hoy — misma forma cuando se conecte computeUserImpactSummary()
 * a compras reales de Supabase.
 */
export function ImpactFlow({
  spentLabel,
  spentValue,
  impactLabel,
  impactValue,
  size = "lg",
}: {
  spentLabel: string;
  spentValue: number;
  impactLabel: string;
  impactValue: number;
  size?: "lg" | "sm";
}) {
  const isLg = size === "lg";

  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-3 rounded-xl border border-brand-soft bg-brand-soft/40 sm:flex-row sm:items-center",
        isLg ? "p-5 sm:gap-5 sm:p-6" : "p-3.5 sm:gap-3.5",
      )}
    >
      <div className="flex-1">
        <p
          className={cn(
            "text-muted-foreground",
            isLg ? "text-[12.5px]" : "text-[11px]",
          )}
        >
          {spentLabel}
        </p>
        <p
          className={cn(
            "font-mono font-semibold tabular-nums text-foreground",
            isLg ? "text-[26px]" : "text-[17px]",
          )}
        >
          {formatEur(spentValue)}
        </p>
      </div>

      <ArrowRightIcon
        className={cn(
          "shrink-0 rotate-90 text-brand sm:rotate-0",
          isLg ? "size-5" : "size-4",
        )}
      />

      <div className="flex-1">
        <p
          className={cn(
            "flex items-center gap-1.5 text-muted-foreground",
            isLg ? "text-[12.5px]" : "text-[11px]",
          )}
        >
          <LeafIcon
            className={cn("text-brand", isLg ? "size-3.5" : "size-3")}
          />
          {impactLabel}
        </p>
        <p
          className={cn(
            "font-mono font-semibold tabular-nums text-brand-strong",
            isLg ? "text-[26px]" : "text-[17px]",
          )}
        >
          {formatEur(impactValue)}
        </p>
      </div>
    </div>
  );
}
