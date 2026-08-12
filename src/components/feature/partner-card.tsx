import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRightIcon } from "@/components/icons";
import { FoundingPartnerBadge } from "@/components/feature/status-badge";
import type { Category, Offer, Partner } from "@/lib/fixtures/types";

export function PartnerCard({
  partner,
  category,
  featuredOffer,
}: {
  partner: Partner;
  category?: Category;
  featuredOffer?: Offer;
}) {
  return (
    <Link href={`/partners/${partner.slug}`} className="block">
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-soft text-[15px] font-bold text-brand-strong">
              {partner.logoInitial}
            </div>
            <div className="min-w-0">
              <p className="truncate text-[15px] font-semibold">
                {partner.name}
              </p>
              <p className="truncate text-[12px] text-muted-foreground">
                {category?.name ?? "Sin categoría"} · {partner.city}
              </p>
            </div>
          </div>

          {featuredOffer ? (
            <p className="border-t border-dashed border-border pt-3 text-[13px] text-muted-foreground">
              {featuredOffer.title}
            </p>
          ) : null}

          <div className="mt-auto flex items-center justify-between pt-1">
            {partner.isFoundingPartner ? (
              <FoundingPartnerBadge />
            ) : (
              <span />
            )}
            <ChevronRightIcon className="size-4 text-muted-foreground" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
