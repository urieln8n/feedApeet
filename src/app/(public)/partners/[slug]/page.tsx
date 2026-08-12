import { notFound } from "next/navigation";
import { OfferCard } from "@/components/feature/offer-card";
import { EmptyState } from "@/components/feature/empty-state";
import { StatusBadge, FoundingPartnerBadge } from "@/components/feature/status-badge";
import { PercentIcon } from "@/components/icons";
import { findCategory } from "@/lib/fixtures/categories";
import { findPartner, offersForPartner } from "@/lib/fixtures/partners";

export default async function PartnerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = findPartner(slug);

  if (!partner) {
    notFound();
  }

  const category = findCategory(partner.categoryId);
  const partnerOffers = offersForPartner(partner.id);

  return (
    <div>
      <div className="border-b border-border px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 sm:flex-row sm:items-start">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-[24px] font-bold text-brand-strong">
            {partner.logoInitial}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-[24px] font-bold">{partner.name}</h1>
              <StatusBadge status={partner.status} />
              {partner.isFoundingPartner ? <FoundingPartnerBadge /> : null}
            </div>
            <p className="mt-1 text-[13px] text-muted-foreground">
              {category?.name ?? "Sin categoría"} · {partner.city}
            </p>
            <p className="mt-3 max-w-[60ch] text-[14.5px] text-muted-foreground">
              {partner.longDescription}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
        <h2 className="mb-4 text-[15px] font-semibold">Ofertas activas</h2>
        {partnerOffers.length === 0 ? (
          <EmptyState
            icon={PercentIcon}
            title="Sin ofertas activas ahora mismo"
            description="Vuelve pronto — este partner suele publicar descuentos nuevos."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {partnerOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} partner={partner} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
