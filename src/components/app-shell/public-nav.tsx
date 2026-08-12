import Link from "next/link";
import { PawIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { PUBLIC_NAV_ITEMS } from "./nav-config";

export function PublicNav() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <PawIcon className="size-5 text-brand" />
          <span className="font-heading text-[15px] font-bold tracking-tight">
            FeedAPet
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {PUBLIC_NAV_ITEMS.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              render={<Link href={item.href} />}
            >
              {item.label}
            </Button>
          ))}
        </nav>

        <Button size="sm" render={<Link href="/login" />}>
          Entrar
        </Button>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-border px-4 py-1.5 sm:hidden">
        {PUBLIC_NAV_ITEMS.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            size="sm"
            className="shrink-0"
            render={<Link href={item.href} />}
          >
            {item.label}
          </Button>
        ))}
      </nav>
    </header>
  );
}
