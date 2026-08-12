import { UserIcon } from "@/components/icons";
import { PageHeader } from "@/components/feature/page-header";
import { EmptyState } from "@/components/feature/empty-state";

export default function PerfilPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Perfil"
        title="Tu perfil"
        description="Datos, Team Perro/Gato, Impact Score, compras, donaciones y favoritos."
      />
      <div className="px-4 py-10 sm:px-6">
        <EmptyState
          icon={UserIcon}
          title="Pantalla en construcción"
          description="Se implementa en la siguiente fase, reutilizando ImpactStat, ActivityList y OfferCard ya construidos."
        />
      </div>
    </div>
  );
}
