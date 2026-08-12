import Link from "next/link";
import { PageHeader } from "@/components/feature/page-header";
import { ImpactFlow } from "@/components/feature/impact-flow";
import { ImpactStat } from "@/components/feature/impact-stat";
import { ActivityList } from "@/components/feature/activity-item";
import { CaseMiniCard } from "@/components/feature/case-mini-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BagIcon, LeafIcon, PawIcon, StarIcon } from "@/components/icons";
import { computeUserImpactSummary } from "@/lib/domain/impact-summary";
import {
  activityFeed,
  confirmedPurchases,
  featuredCampaigns,
  featuredCases,
} from "@/lib/fixtures/dashboard";
import { formatEur } from "@/lib/utils";

export default function DashboardPage() {
  const summary = computeUserImpactSummary(confirmedPurchases);

  return (
    <div>
      <PageHeader
        eyebrow="Tu impacto"
        title="Hola, Andrés"
        description="Esto es lo que tu actividad en FeedAPet ha generado hasta ahora."
      />

      <div className="flex flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8">
        <ImpactFlow
          spentLabel={`Has comprado en ${summary.purchaseCount} partners`}
          spentValue={summary.totalSpent}
          impactLabel="has generado de impacto"
          impactValue={summary.totalImpactGenerated}
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <ImpactStat
            icon={BagIcon}
            label="Ahorro total"
            value={formatEur(summary.totalSavings)}
            sublabel="gracias a ofertas de partners"
          />
          <ImpactStat
            icon={LeafIcon}
            label="Comisión generada"
            value={formatEur(summary.totalCommissionGenerated)}
            sublabel="financia operación + fondo de impacto"
          />
          <ImpactStat
            icon={StarIcon}
            label="Impact Score"
            value="Guardián"
            sublabel="nivel 3 de 5 · sigue participando"
            tone="gold"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">
                Actividad reciente
              </h2>
            </div>
            <Card>
              <CardContent>
                <ActivityList events={activityFeed} />
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">
                Casos que necesitan ayuda
              </h2>
              <Link
                href="/refugios"
                className="text-[12.5px] font-medium text-brand hover:underline"
              >
                Ver todos
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              {featuredCases.map((item) => (
                <CaseMiniCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-3 text-[15px] font-semibold">
              Campañas activas
            </h2>
            <div className="flex flex-col gap-3">
              {featuredCampaigns.map((campaign) => (
                <Card key={campaign.id}>
                  <CardContent className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[13.5px] font-semibold">
                        {campaign.title}
                      </p>
                      <p className="text-[12px] text-muted-foreground">
                        Patrocinada por {campaign.sponsorName} ·{" "}
                        {campaign.shelterCount} refugios
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-gold-soft px-2.5 py-1 text-[11px] font-semibold text-gold-text">
                      Activa
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="border-brand-soft bg-brand-soft/40">
            <CardContent className="flex flex-col items-start gap-2">
              <PawIcon className="size-6 text-brand" />
              <p className="text-[14.5px] font-semibold">
                Ahorra en tu próxima compra
              </p>
              <p className="text-[13px] text-muted-foreground">
                Explora el marketplace y genera impacto con lo que ya ibas a
                comprar para tu mascota.
              </p>
              <Button className="mt-1" render={<Link href="/partners" />}>
                <BagIcon className="size-4" />
                Ir al marketplace
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
