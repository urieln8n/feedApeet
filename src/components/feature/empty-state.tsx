import type { ComponentType, ReactNode, SVGProps } from "react";

export function EmptyState({
  icon: EmptyIcon,
  title,
  description,
  action,
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-border px-6 py-12 text-center">
      <EmptyIcon className="size-7 text-muted-foreground" />
      <p className="text-[14px] font-semibold">{title}</p>
      {description ? (
        <p className="max-w-[32ch] text-[13px] text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action}
    </div>
  );
}
