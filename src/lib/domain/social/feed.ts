/**
 * Lógica de dominio del Feed (posts + reacciones) — pura, sin Supabase, sin
 * React, sin Next.js. Misma forma que las tablas `posts`/`reactions` de
 * supabase/migrations/0002_social.sql, para que sustituir fixtures por
 * consultas reales sea un cambio de origen de datos, no de esta capa.
 *
 * Alcance aprobado en docs/MVP_V2_COMMUNITY_IMPACT_PLATFORM.md — no construye
 * PostCard/FeedList (eso es Fase 4), solo decide qué es un post válido y qué
 * posts pertenecen al feed.
 */

export type PostAuthorType = "user" | "shelter" | "partner" | "system";

/**
 * Los 5 tipos de post aprobados para el MVP (sección C del documento de
 * alcance). Sin comentarios ni posts libres de usuario — esos son Fase 2 de
 * producto, no de esta migración de dominio.
 */
export type PostType =
  | "caso_refugio"
  | "campana"
  | "logro_comunidad"
  | "impacto_compartido"
  | "heroe_del_mes";

export type PostStatus = "draft" | "published" | "hidden";

export interface Post {
  id: string;
  authorType: PostAuthorType;
  authorUserId: string | null;
  postType: PostType;
  categoryId: string | null;
  caseId: string | null;
  campaignId: string | null;
  shelterId: string | null;
  partnerId: string | null;
  title: string;
  body: string | null;
  media: string[];
  status: PostStatus;
  createdAt: string;
}

const POST_TYPES: readonly PostType[] = [
  "caso_refugio",
  "campana",
  "logro_comunidad",
  "impacto_compartido",
  "heroe_del_mes",
];

/**
 * Estructura coherente de un post — replica en el dominio, antes de tocar
 * Supabase, las mismas invariantes que ya exige la base de datos real:
 *
 * 1. `posts_author_consistency` (0002_social.sql): la columna de autor que
 *    corresponde a `authorType` debe estar rellena.
 * 2. La única combinación permitida con `authorType = 'user'` es
 *    `postType = 'impacto_compartido'` — el usuario solo puede compartir su
 *    propio impacto, nunca publicar otro tipo de post (política RLS "Los
 *    usuarios comparten su propio impacto" de 0002_social.sql, confirmada
 *    como interpretación correcta el 2026-08-12; ver contradicción señalada
 *    entre la sección I y las secciones B/L de
 *    docs/MVP_V2_COMMUNITY_IMPACT_PLATFORM.md).
 * 3. `title` no puede estar vacío.
 *
 * Lanza un Error con el motivo si el post no es válido — mismo estilo que
 * `splitCommission` en impact-fund.ts.
 */
export function assertValidPost(post: Post): void {
  if (!POST_TYPES.includes(post.postType)) {
    throw new Error(`postType desconocido: ${post.postType}`);
  }

  if (post.title.trim().length === 0) {
    throw new Error("El post necesita un título");
  }

  switch (post.authorType) {
    case "user":
      if (post.authorUserId === null) {
        throw new Error("Un post de tipo 'user' necesita authorUserId");
      }
      if (post.postType !== "impacto_compartido") {
        throw new Error(
          "Un usuario solo puede publicar posts de tipo 'impacto_compartido'",
        );
      }
      break;
    case "shelter":
      if (post.shelterId === null) {
        throw new Error("Un post de tipo 'shelter' necesita shelterId");
      }
      break;
    case "partner":
      if (post.partnerId === null) {
        throw new Error("Un post de tipo 'partner' necesita partnerId");
      }
      break;
    case "system":
      break;
    default:
      throw new Error(`authorType desconocido: ${post.authorType as string}`);
  }
}

export function isValidPost(post: Post): boolean {
  try {
    assertValidPost(post);
    return true;
  } catch {
    return false;
  }
}

/** Un post solo aparece en el feed público cuando está publicado — nunca draft ni hidden. */
export function isPostVisibleInFeed(post: Post): boolean {
  return post.status === "published";
}

/**
 * El modelo que consumirá el futuro FeedList (Fase 4): posts visibles,
 * ordenados por fecha descendente — igual que el índice
 * `posts_status_created_at_idx` de la migración. No genera ningún dato de
 * presentación (eso es responsabilidad de los componentes, no del dominio).
 */
export function buildFeed(posts: Post[]): Post[] {
  return posts
    .filter(isPostVisibleInFeed)
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

// ============ REACCIONES ============
// Viven en este módulo porque son una interacción sobre un post — mismo
// archivo previsto para "feed.ts" en el encargo de Fase 3, sin crear un
// reactions.ts que no estaba en la lista de archivos prevista.

/** Único tipo de reacción aprobado en el MVP — no inventar otros. */
export type ReactionType = "me_importa";

export interface Reaction {
  id: string;
  postId: string;
  userId: string;
  reactionType: ReactionType;
  createdAt: string;
}

export function hasReacted(
  reactions: Reaction[],
  postId: string,
  userId: string,
): boolean {
  return reactions.some((r) => r.postId === postId && r.userId === userId);
}

/**
 * Añade una reacción — rechaza duplicados (una reacción por usuario y post,
 * igual que el `unique (user_id, post_id)` de la migración). Función pura:
 * devuelve un array nuevo, no muta `reactions`.
 */
export function addReaction(
  reactions: Reaction[],
  input: { id: string; postId: string; userId: string; createdAt: string },
): Reaction[] {
  if (hasReacted(reactions, input.postId, input.userId)) {
    throw new Error("El usuario ya reaccionó a este post");
  }

  const reaction: Reaction = {
    id: input.id,
    postId: input.postId,
    userId: input.userId,
    reactionType: "me_importa",
    createdAt: input.createdAt,
  };

  return [...reactions, reaction];
}

/**
 * Quita la reacción del usuario en ese post. Tolerante si no existía —igual
 * que un DELETE en SQL que no encuentra filas no es un error, dejar de
 * seguir/reaccionar algo que ya no estaba activo tampoco lo es.
 */
export function removeReaction(
  reactions: Reaction[],
  postId: string,
  userId: string,
): Reaction[] {
  return reactions.filter((r) => !(r.postId === postId && r.userId === userId));
}

// ============ PUNTO DE EXTENSIÓN — IMPACT SCORE (sin implementar) ============

/**
 * Qué acciones sociales son candidatas a alimentar el Impact Score en el
 * futuro (principio aprobado en docs/MVP_V2_COMMUNITY_IMPACT_PLATFORM.md,
 * sección F: reacciones y shares suman con techo bajo, el eje económico
 * sigue dominando). Deliberadamente NO implementado: ni pesos, ni fórmula, ni
 * techo por periodo — GAP-NEW-11 sigue sin resolver. Este tipo solo deja el
 * punto de extensión nombrado para cuando exista esa decisión.
 */
export type SocialImpactScoreEventType = "reaction" | "share" | "follow";
