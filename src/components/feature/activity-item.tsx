import { BagIcon, HeartIcon, StarIcon } from "@/components/icons";
import { formatEur } from "@/lib/utils";
import type { ActivityEvent } from "@/lib/fixtures/types";

const ICON_BY_TYPE = {
  compra: BagIcon,
  donacion: HeartIcon,
  score: StarIcon,
} as const;

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
});

export function ActivityItem({ event }: { event: ActivityEvent }) {
  const EventIcon = ICON_BY_TYPE[event.type];

  return (
    <li className="flex items-start gap-3 py-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
        <EventIcon className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13.5px] font-medium">{event.label}</p>
        <p className="text-[12px] text-muted-foreground">{event.detail}</p>
      </div>
      <div className="shrink-0 text-right">
        {event.amount ? (
          <p className="font-mono text-[13px] font-semibold tabular-nums">
            {formatEur(event.amount)}
          </p>
        ) : null}
        <p className="text-[11px] text-muted-foreground">
          {dateFormatter.format(new Date(event.date))}
        </p>
      </div>
    </li>
  );
}

export function ActivityList({ events }: { events: ActivityEvent[] }) {
  return (
    <ul className="divide-y divide-border">
      {events.map((event) => (
        <ActivityItem key={event.id} event={event} />
      ))}
    </ul>
  );
}
