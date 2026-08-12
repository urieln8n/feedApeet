import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

export function ImpactStat({
  icon: StatIcon,
  label,
  value,
  sublabel,
  tone = "brand",
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  sublabel?: string;
  tone?: "brand" | "gold";
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div
        className={cn(
          "mb-3 flex size-8 items-center justify-center rounded-md",
          tone === "brand"
            ? "bg-brand-soft text-brand-strong"
            : "bg-gold-soft text-gold-text",
        )}
      >
        <StatIcon className="size-[17px]" />
      </div>
      <p className="font-mono text-[22px] leading-none font-semibold tabular-nums">
        {value}
      </p>
      <p className="mt-1.5 text-[12.5px] font-medium text-foreground">
        {label}
      </p>
      {sublabel ? (
        <p className="mt-0.5 text-[11.5px] text-muted-foreground">
          {sublabel}
        </p>
      ) : null}
    </div>
  );
}
