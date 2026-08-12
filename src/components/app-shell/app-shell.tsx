import type { ReactNode } from "react";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";
import { MobileTabBar } from "./mobile-tab-bar";

/**
 * Shell de la app autenticada: sidebar (desktop/tablet) + header + tab bar
 * (móvil). Datos de usuario hardcodeados por ahora — se sustituyen por la
 * sesión real de Supabase en la Fase 4 del plan de implementación.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const userName = "Andrés";
  const userLevel = "Guardián";

  return (
    <div className="flex min-h-svh">
      <AppSidebar userName={userName} userLevel={userLevel} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader userName={userName} />
        <main className="flex-1 pb-20 sm:pb-0">{children}</main>
      </div>
      <MobileTabBar />
    </div>
  );
}
