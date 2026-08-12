"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShareIcon } from "@/components/icons";

/**
 * Usa la Web Share API nativa del navegador cuando está disponible — no es
 * integración con ninguna red social externa, es la función de compartir
 * del propio sistema operativo. Si no está disponible, copia el enlace al
 * portapapeles. Sin conexión a Supabase ni al Impact Score todavía; el
 * punto de extensión queda en SocialImpactScoreEventType
 * (src/lib/domain/social/feed.ts), sin implementar por decisión explícita.
 */
export function ShareButton({ postId, title }: { postId: string; title: string }) {
  async function handleShare() {
    const url =
      typeof window !== "undefined" ? `${window.location.origin}/muro#${postId}` : "";

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // el usuario cerró el diálogo nativo de compartir — no es un error
      }
      return;
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      toast.success("Enlace copiado");
      return;
    }

    toast.info(url);
  }

  return (
    <Button type="button" variant="outline" size="sm" onClick={handleShare}>
      <ShareIcon className="size-4" />
      Compartir
    </Button>
  );
}
