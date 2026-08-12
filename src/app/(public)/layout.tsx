import type { ReactNode } from "react";
import { PublicNav } from "@/components/app-shell/public-nav";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicNav />
      <main className="flex-1">{children}</main>
    </>
  );
}
