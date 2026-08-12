import type { SVGProps } from "react";

/**
 * Set de iconos propio de FeedAPet — trazo geométrico consistente,
 * deliberadamente distinto del set Lucide por defecto de shadcn/ui.
 * Mismos diseños que la auditoría de producto (2026-08-10).
 */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function PawIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <ellipse cx="12" cy="16.5" rx="5.4" ry="4.2" />
      <circle cx="6" cy="8.6" r="2" />
      <circle cx="10.3" cy="5.2" r="1.9" />
      <circle cx="14.4" cy="5.2" r="1.9" />
      <circle cx="18.4" cy="8.6" r="2" />
    </Icon>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 20.2C5.2 15.6 3 11.4 4.6 8.1 6 5.2 9.6 4.6 12 7.4 14.4 4.6 18 5.2 19.4 8.1 21 11.4 18.8 15.6 12 20.2Z" />
    </Icon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3 19 6v5c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V6Z" />
      <polyline points="9,12.2 11,14.2 15,9.8" />
    </Icon>
  );
}

export function LeafIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 19C4 11 9 5 19 4 20 12 15 18 5 19Z" />
      <path d="M5 19 13 11" />
    </Icon>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19c0-3.3 2.5-5.5 5.5-5.5S14.5 15.7 14.5 19" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M14.8 19c-.2-2.4 1.3-4 3.2-4 2 0 3.6 1.6 3.6 4.4" />
    </Icon>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="10.5" cy="10.5" r="6.2" />
      <line x1="15" y1="15" x2="20.5" y2="20.5" />
    </Icon>
  );
}

export function FilterIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="3.5,4.5 20.5,4.5 14,12.5 14,19 10,20.5 10,12.5" />
    </Icon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="6,9 12,15.5 18,9" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="9,5.5 15.5,12 9,18.5" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="3.5" y1="6.5" x2="20.5" y2="6.5" />
      <line x1="3.5" y1="12" x2="20.5" y2="12" />
      <line x1="3.5" y1="17.5" x2="20.5" y2="17.5" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="5.5" y1="5.5" x2="18.5" y2="18.5" />
      <line x1="18.5" y1="5.5" x2="5.5" y2="18.5" />
    </Icon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <polygon points="12,3 14.6,9.3 21.5,9.8 16.2,14.2 17.9,21 12,17.3 6.1,21 7.8,14.2 2.5,9.8 9.4,9.3" />
    </Icon>
  );
}

export function PercentIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7.5" cy="7.5" r="2.2" />
      <circle cx="16.5" cy="16.5" r="2.2" />
      <line x1="5" y1="19" x2="19" y2="5" />
    </Icon>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <polyline points="4.5,12.5 9.5,17.5 19.5,6.5" />
    </Icon>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <line x1="3.5" y1="12" x2="19" y2="12" />
      <polyline points="13.5,6 19.5,12 13.5,18" />
    </Icon>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h5v-5h2v5h5v-9" />
    </Icon>
  );
}

export function BagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 8h12l1 12.5H5Z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </Icon>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 21S5 14.4 5 9.5a7 7 0 0 1 14 0C19 14.4 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.4" />
    </Icon>
  );
}

export function MessageIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 5.5h16v11H10l-4 3.5v-3.5H4Z" />
    </Icon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c0-4 3.4-6.8 7.5-6.8s7.5 2.8 7.5 6.8" />
    </Icon>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="7" height="7" rx="1.2" />
      <rect x="13" y="4" width="7" height="7" rx="1.2" />
      <rect x="4" y="13" width="7" height="7" rx="1.2" />
      <rect x="13" y="13" width="7" height="7" rx="1.2" />
    </Icon>
  );
}

export function AlertIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3.5 21.5 20h-19Z" />
      <line x1="12" y1="9.5" x2="12" y2="14" />
      <circle cx="12" cy="16.8" r="0.9" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="6" cy="12" r="2.2" />
      <circle cx="17.5" cy="6" r="2.2" />
      <circle cx="17.5" cy="18" r="2.2" />
      <line x1="7.9" y1="11" x2="15.7" y2="7" />
      <line x1="7.9" y1="13" x2="15.7" y2="17" />
    </Icon>
  );
}

export function FlagIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3v18" />
      <path d="M6 4.5c3-1.5 6 1.5 9 0v9c-3 1.5-6-1.5-9 0Z" />
    </Icon>
  );
}
