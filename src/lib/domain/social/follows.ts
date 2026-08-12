/**
 * Lógica de dominio de "seguir" — pura, sin Supabase, sin React. Misma forma
 * que la tabla `follows` de supabase/migrations/0002_social.sql.
 *
 * Solo refugios y partners en el MVP — sin seguir a otros usuarios (decisión
 * confirmada en la revisión del 2026-08-12,
 * docs/MVP_V2_COMMUNITY_IMPACT_PLATFORM.md sección C: "Confirmado 2026-08-12.
 * Solo se sigue a refugios y partners en el MVP").
 */

export type FollowTargetType = "shelter" | "partner";

export interface Follow {
  id: string;
  followerId: string;
  targetType: FollowTargetType;
  shelterId: string | null;
  partnerId: string | null;
  createdAt: string;
}

const FOLLOW_TARGET_TYPES: readonly string[] = ["shelter", "partner"];

/**
 * Construye un Follow con las columnas de destino correctas ya rellenas,
 * igual que exige `follows_target_consistency` en la migración. `targetType`
 * se recibe como string (no como el tipo ya validado) porque esta es la
 * puerta de entrada desde datos no confiables — por eso valida en runtime y
 * no solo confía en TypeScript.
 */
export function buildFollow(input: {
  id: string;
  followerId: string;
  targetType: string;
  targetId: string;
  createdAt: string;
}): Follow {
  if (!FOLLOW_TARGET_TYPES.includes(input.targetType)) {
    throw new Error(
      `No se puede seguir un objetivo de tipo '${input.targetType}' — solo 'shelter' o 'partner' en el MVP`,
    );
  }

  const targetType = input.targetType as FollowTargetType;

  return {
    id: input.id,
    followerId: input.followerId,
    targetType,
    shelterId: targetType === "shelter" ? input.targetId : null,
    partnerId: targetType === "partner" ? input.targetId : null,
    createdAt: input.createdAt,
  };
}

export function isFollowing(
  follows: Follow[],
  followerId: string,
  targetType: FollowTargetType,
  targetId: string,
): boolean {
  return follows.some(
    (f) =>
      f.followerId === followerId &&
      f.targetType === targetType &&
      (targetType === "shelter" ? f.shelterId : f.partnerId) === targetId,
  );
}

/**
 * Sigue un refugio o partner. Rechaza duplicados (igual que los índices
 * únicos parciales `follows_unique_shelter_idx`/`follows_unique_partner_idx`
 * de la migración) y objetivos inválidos. Función pura: devuelve un array
 * nuevo, no muta `follows`.
 */
export function follow(
  follows: Follow[],
  input: {
    id: string;
    followerId: string;
    targetType: string;
    targetId: string;
    createdAt: string;
  },
): Follow[] {
  const newFollow = buildFollow(input);

  if (
    isFollowing(follows, newFollow.followerId, newFollow.targetType, input.targetId)
  ) {
    throw new Error("Ya sigues a este refugio/partner");
  }

  return [...follows, newFollow];
}

/**
 * Deja de seguir. Tolerante si no se seguía (no es un error, igual que un
 * DELETE que no encuentra filas).
 */
export function unfollow(
  follows: Follow[],
  followerId: string,
  targetType: FollowTargetType,
  targetId: string,
): Follow[] {
  return follows.filter(
    (f) =>
      !(
        f.followerId === followerId &&
        f.targetType === targetType &&
        (targetType === "shelter" ? f.shelterId : f.partnerId) === targetId
      ),
  );
}
