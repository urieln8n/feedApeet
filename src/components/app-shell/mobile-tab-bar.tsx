"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { USER_NAV_ITEMS } from "./nav-config";

/** Navegación inferior para el usuario autenticado en móvil (<640px). */
export function MobileTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-card sm:hidden">
      {USER_NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        const ItemIcon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium",
              active ? "text-brand" : "text-muted-foreground",
            )}
          >
            <ItemIcon className="size-[18px]" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
