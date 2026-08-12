import { PinIcon } from "@/components/icons";
import { PageHeader } from "@/components/feature/page-header";
import { EmptyState } from "@/components/feature/empty-state";

export default function RefugiosPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Refugios"
        title="Refugios y casos verificados"
        description="Descubre refugios aliados, sus casos abiertos y el impacto que ya han generado juntos."
      />
      <div className="px-4 py-10 sm:px-6">
        <EmptyState
          icon={PinIcon}
          title="Pantalla en construcción"
          description="El listado, la búsqueda y la ficha de cada refugio llegan en la siguiente fase de implementación."
        />
      </div>
    </div>
  );
}
