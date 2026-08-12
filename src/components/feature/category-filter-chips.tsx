"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/lib/fixtures/types";

export function CategoryFilterChips({
  categories,
  selected,
  onSelect,
}: {
  categories: Category[];
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
          selected === null
            ? "border-brand bg-brand text-primary-foreground"
            : "border-border text-muted-foreground hover:bg-secondary",
        )}
      >
        Todas
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors",
            selected === category.id
              ? "border-brand bg-brand text-primary-foreground"
              : "border-border text-muted-foreground hover:bg-secondary",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
