import { MessageIcon } from "@/components/icons";
import { PageHeader } from "@/components/feature/page-header";
import { EmptyState } from "@/components/feature/empty-state";

export default function MuroPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Muro"
        title="Historias e impacto de la comunidad"
        description="Actualizaciones de refugios, casos de animales, campañas y el impacto generado entre todos."
      />
      <div className="px-4 py-10 sm:px-6">
        <EmptyState
          icon={MessageIcon}
          title="Pantalla en construcción"
          description="El feed de historias llega en la siguiente fase de implementación."
        />
      </div>
    </div>
  );
}
