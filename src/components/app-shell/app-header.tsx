import Link from "next/link";
import { PawIcon, SearchIcon } from "@/components/icons";
import { Input } from "@/components/ui/input";

/**
 * Cabecera dentro del shell autenticado. En desktop la sidebar ya lleva
 * marca y avatar, así que aquí solo va el buscador; en móvil (sin sidebar
 * visible) añade marca y avatar para no perder esa identidad.
 */
export function AppHeader({ userName }: { userName: string }) {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-border px-4 sm:px-6">
      <Link href="/dashboard" className="flex items-center gap-2 sm:hidden">
        <PawIcon className="size-5 text-brand" />
        <span className="font-heading text-[15px] font-bold">FeedAPet</span>
      </Link>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar partners, refugios, casos…"
          className="pl-9"
        />
      </div>

      <div className="flex-1 md:hidden" />

      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-[12px] font-bold text-gold-foreground sm:hidden"
        aria-hidden="true"
      >
        {userName.charAt(0)}
      </div>
    </header>
  );
}
