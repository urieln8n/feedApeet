"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PawIcon } from "@/components/icons";
import { USER_NAV_ITEMS } from "./nav-config";

/**
 * Sidebar fija de la app autenticada. En >=1024px va expandida (icono +
 * etiqueta); entre 640-1024px se colapsa a solo icono (ver sección E de la
 * auditoría UX — evita añadir un tercer patrón de cajón/hamburguesa).
 * Oculta por debajo de 640px, donde la navegación pasa a <MobileTabBar />.
 */
export function AppSidebar({
  userName,
  userLevel,
}: {
  userName: string;
  userLevel: string;
}) {
  const pathname = usePathname();

  return (
    <aside className="hidden shrink-0 flex-col border-r border-sidebar-border bg-sidebar sm:flex sm:w-[76px] lg:w-60">
      <div className="flex h-16 items-center gap-2 px-4 lg:px-5">
        <PawIcon className="size-5 shrink-0 text-brand" />
        <span className="hidden font-heading text-[15px] font-bold tracking-tight lg:inline">
          FeedAPet
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-2.5 py-2 lg:px-3">
        {USER_NAV_ITEMS.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const ItemIcon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors",
                "justify-center lg:justify-start",
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <ItemIcon className="size-[17px] shrink-0" />
              <span className="hidden lg:inline">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-2.5 border-t border-sidebar-border px-3 py-3 lg:px-4">
        <div
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gold text-[12px] font-bold text-gold-foreground"
          aria-hidden="true"
        >
          {userName.charAt(0)}
        </div>
        <div className="hidden min-w-0 lg:block">
          <p className="truncate text-[12.5px] font-semibold">{userName}</p>
          <p className="truncate text-[11px] text-muted-foreground">
            {userLevel}
          </p>
        </div>
      </div>
    </aside>
  );
}
