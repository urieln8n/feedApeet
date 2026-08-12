"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/**
 * Estado visual/local únicamente en esta fase — sin persistencia en
 * Supabase todavía (Fase 4 es solo UI). El `postId` ya está disponible como
 * dato para cuando esta acción se conecte a un Server Action que llame a
 * addReaction()/removeReaction() de src/lib/domain/social/feed.ts.
 */
export function ReactionButton({
  postId,
  initialActive,
}: {
  postId: string;
  initialActive: boolean;
}) {
  const [active, setActive] = useState(initialActive);

  return (
    <Button
      type="button"
      variant={active ? "secondary" : "outline"}
      size="sm"
      aria-pressed={active}
      onClick={() => setActive((value) => !value)}
      data-post-id={postId}
    >
      <HeartIcon
        className={cn("size-4", active && "fill-current text-brand-strong")}
      />
      Me importa
    </Button>
  );
}
