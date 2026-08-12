import type { ComponentType, SVGProps } from "react";
import {
  BagIcon,
  GridIcon,
  MessageIcon,
  PinIcon,
  UserIcon,
} from "@/components/icons";

export interface NavItem {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

/** Navegación pública (top bar) — sin sesión requerida. */
export const PUBLIC_NAV_ITEMS: NavItem[] = [
  { href: "/partners", label: "Marketplace", icon: BagIcon },
  { href: "/refugios", label: "Refugios", icon: PinIcon },
  { href: "/muro", label: "Muro", icon: MessageIcon },
];

/** Navegación del usuario autenticado — sidebar (desktop) y tab bar (móvil). */
export const USER_NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: GridIcon },
  { href: "/partners", label: "Marketplace", icon: BagIcon },
  { href: "/refugios", label: "Refugios", icon: PinIcon },
  { href: "/muro", label: "Muro", icon: MessageIcon },
  { href: "/perfil", label: "Perfil", icon: UserIcon },
];
