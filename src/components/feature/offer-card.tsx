import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, LeafIcon, PercentIcon } from "@/components/icons";
import { estimateOfferImpact } from "@/lib/domain/impact-summary";
import { formatEur } from "@/lib/utils";
import type { Offer, Partner } from "@/lib/fixtures/types";

function DiscountValue({ offer }: { offer: Offer }) {
  if (offer.discountType === "percentage" && offer.discountValue) {
    return (
      <p className="font-mono text-[28px] leading-none font-semibold tabular-nums text-brand-strong">
        {offer.discountValue}
        <span className="text-[15px] font-sans font-medium text-muted-foreground">
          % dto.
        </span>
      </p>
    );
  }
  if (offer.discountType === "fixed" && offer.discountValue) {
    return (
      <p className="font-mono text-[28px] leading-none font-semibold tabular-nums text-brand-strong">
        {formatEur(offer.discountValue)}
        <span className="text-[15px] font-sans font-medium text-muted-foreground">
          {" "}
          dto.
        </span>
      </p>
    );
  }
  return (
    <p className="flex items-center gap-1.5 text-[15px] font-semibold text-brand-strong">
      <PercentIcon className="size-4" />
      Oferta especial
    </p>
  );
}

export function OfferCard({
  offer,
  partner,
}: {
  offer: Offer;
  partner: Partner;
}) {
  const estimatedImpact = estimateOfferImpact(
    offer.averageTicket,
    offer.commissionRate,
  );

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <DiscountValue offer={offer} />
        <div>
          <p className="text-[14.5px] font-semibold">{offer.title}</p>
          <p className="mt-0.5 text-[13px] text-muted-foreground">
            {offer.description}
          </p>
        </div>
        <p className="text-[11.5px] text-muted-foreground">{offer.terms}</p>

        <div className="flex items-center gap-1.5 rounded-md bg-brand-soft/50 px-3 py-2 text-[12px] text-brand-strong">
          <LeafIcon className="size-3.5 shrink-0" />
          Compra media aquí genera ≈{" "}
          <span className="font-mono font-semibold tabular-nums">
            {formatEur(estimatedImpact)}
          </span>{" "}
          de impacto
        </div>

        <Button
          className="mt-1 w-full"
          render={
            <a href={partner.websiteUrl} target="_blank" rel="noreferrer" />
          }
        >
          Usar oferta
          <ArrowRightIcon className="size-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
