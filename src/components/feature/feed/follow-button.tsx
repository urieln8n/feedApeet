"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "@/components/icons";
import type { FollowTargetType } from "@/lib/domain/social/follows";

/**
 * Estado visual/local únicamente en esta fase — sin persistencia en
 * Supabase todavía. Solo refugios y partners (nunca "user"), igual que
 * src/lib/domain/social/follows.ts.
 */
export function FollowButton({
  targetType,
  targetId,
  targetLabel,
  initialFollowing,
}: {
  targetType: FollowTargetType;
  targetId: string;
  targetLabel: string;
  initialFollowing: boolean;
}) {
  const [following, setFollowing] = useState(initialFollowing);

  return (
    <Button
      type="button"
      variant={following ? "secondary" : "outline"}
      size="sm"
      aria-pressed={following}
      aria-label={`${following ? "Dejar de seguir" : "Seguir"} a ${targetLabel}`}
      onClick={() => setFollowing((value) => !value)}
      data-target-type={targetType}
      data-target-id={targetId}
    >
      {following ? <CheckIcon className="size-4" /> : null}
      {following ? "Siguiendo" : "Seguir"}
    </Button>
  );
}
