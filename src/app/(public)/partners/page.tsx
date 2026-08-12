"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/feature/page-header";
import { SearchBar } from "@/components/feature/search-bar";
import { CategoryFilterChips } from "@/components/feature/category-filter-chips";
import { PartnerCard } from "@/components/feature/partner-card";
import { EmptyState } from "@/components/feature/empty-state";
import { BagIcon } from "@/components/icons";
import { categories, findCategory } from "@/lib/fixtures/categories";
import { offers, partners } from "@/lib/fixtures/partners";

export default function MarketplacePage() {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const activePartners = useMemo(
    () => partners.filter((p) => p.status === "active"),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return activePartners.filter((partner) => {
      const matchesCategory =
        !categoryId || partner.categoryId === categoryId;
      const matchesQuery =
        !q ||
        partner.name.toLowerCase().includes(q) ||
        partner.shortDescription.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [activePartners, categoryId, query]);

  return (
    <div>
      <PageHeader
        eyebrow="Marketplace"
        title="Ahorra en lo que ya compras para tu mascota"
        description="Partners con descuento real. Cada compra confirmada genera comisión y una parte financia impacto animal verificable."
      />

      <div className="flex flex-col gap-5 px-4 py-6 sm:px-6 sm:py-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="sm:max-w-xs sm:flex-1">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Buscar un partner…"
            />
          </div>
          <CategoryFilterChips
            categories={categories}
            selected={categoryId}
            onSelect={setCategoryId}
          />
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={BagIcon}
            title="No hay partners para esta búsqueda"
            description="Prueba con otra categoría o borra el texto de búsqueda."
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                category={findCategory(partner.categoryId)}
                featuredOffer={offers.find(
                  (o) => o.partnerId === partner.id && o.status === "active",
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
