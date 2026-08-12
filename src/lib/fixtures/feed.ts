/**
 * Datos de ejemplo del Feed — misma forma que la tabla `posts` de
 * supabase/migrations/0002_social.sql (a través de los tipos de
 * src/lib/domain/social/feed.ts), para que sustituir fixtures por consultas
 * reales sea un cambio de origen de datos, no de pantalla.
 *
 * Nombres claramente de demostración, sin refugios ni personas reales.
 * Reutiliza los mismos refugios/casos/campaña ya usados como ejemplo en
 * src/lib/fixtures/dashboard.ts (San Roque, Els Amics, "Marca X") para que
 * el universo de datos de la app sea coherente entre pantallas.
 */

import { assertValidPost, type Post, type Reaction } from "@/lib/domain/social/feed";
import type { Follow } from "@/lib/domain/social/follows";

/** "Usuario" con el que se navega la demo — mismo Andrés del saludo del Dashboard. */
export const DEMO_VIEWER_ID = "user-demo-andres";
const DEMO_VIEWER_NAME = "Andrés";

const SECOND_DEMO_USER_ID = "user-demo-maria";
const SECOND_DEMO_USER_NAME = "María";

const SHELTER_SAN_ROQUE_ID = "shelter-san-roque";
const SHELTER_ELS_AMICS_ID = "shelter-els-amics";

export interface FeedPost extends Post {
  /** Campos de presentación — no forman parte del dominio puro de Fase 3. */
  authorName: string;
  authorAvatarInitial: string;
  relatedLabel: string | null;
}

export const feedPosts: FeedPost[] = [
  {
    id: "post-max-cirugia",
    authorType: "shelter",
    authorUserId: null,
    postType: "caso_refugio",
    categoryId: null,
    caseId: "case-max",
    campaignId: null,
    shelterId: SHELTER_SAN_ROQUE_ID,
    partnerId: null,
    title: "Max necesita una cirugía urgente",
    body: "Max llegó al refugio hace dos semanas con una fractura. Necesitamos cubrir el coste de la operación.",
    media: ["Foto de Max recién llegado al refugio, antes de la cirugía"],
    status: "published",
    createdAt: "2026-08-10T09:00:00.000Z",
    authorName: "Refugio San Roque",
    authorAvatarInitial: "S",
    relatedLabel: "Caso: Max · Refugio San Roque",
  },
  {
    id: "post-luna-adopcion",
    authorType: "shelter",
    authorUserId: null,
    postType: "caso_refugio",
    categoryId: null,
    caseId: "case-luna",
    campaignId: null,
    shelterId: SHELTER_ELS_AMICS_ID,
    partnerId: null,
    title: "Luna busca un hogar",
    body: "Luna es una perra muy tranquila, ideal para pisos. Lleva 3 meses esperando su familia.",
    media: [],
    status: "published",
    createdAt: "2026-08-08T12:00:00.000Z",
    authorName: "Protectora Els Amics",
    authorAvatarInitial: "P",
    relatedLabel: "Caso: Luna · Protectora Els Amics",
  },
  {
    id: "post-campana-marca-x",
    authorType: "system",
    authorUserId: null,
    postType: "campana",
    categoryId: null,
    caseId: null,
    campaignId: "camp-1",
    shelterId: null,
    partnerId: null,
    title: "Marca X financia comida para 50 perros en agosto",
    body: "Una campaña patrocinada que alimenta a 50 perros en 3 refugios aliados durante todo el mes.",
    media: ["Reparto de alimento en uno de los refugios participantes"],
    status: "published",
    createdAt: "2026-08-05T10:00:00.000Z",
    authorName: "FeedAPet",
    authorAvatarInitial: "F",
    relatedLabel: "Campaña activa · 3 refugios participantes",
  },
  {
    id: "post-logro-comunidad-julio",
    authorType: "system",
    authorUserId: null,
    postType: "logro_comunidad",
    categoryId: null,
    caseId: null,
    campaignId: null,
    shelterId: null,
    partnerId: null,
    title: "La comunidad generó 1.240 € de impacto en julio",
    body: "Entre compras, donaciones y campañas, así de lejos llegamos juntos el mes pasado.",
    media: [],
    status: "published",
    createdAt: "2026-08-01T08:00:00.000Z",
    authorName: "FeedAPet",
    authorAvatarInitial: "F",
    relatedLabel: null,
  },
  {
    id: "post-impacto-andres",
    authorType: "user",
    authorUserId: DEMO_VIEWER_ID,
    postType: "impacto_compartido",
    categoryId: null,
    caseId: null,
    campaignId: null,
    shelterId: null,
    partnerId: "p-petfood-iberica",
    title: "Andrés generó 6,96 € de impacto con su compra",
    body: "Comprando en PetFood Ibérica, parte de la comisión va directa al fondo de impacto animal.",
    media: [],
    status: "published",
    createdAt: "2026-08-09T18:30:00.000Z",
    authorName: DEMO_VIEWER_NAME,
    authorAvatarInitial: "A",
    relatedLabel: "Compra en PetFood Ibérica",
  },
  {
    id: "post-heroe-maria",
    authorType: "system",
    authorUserId: null,
    postType: "heroe_del_mes",
    categoryId: null,
    caseId: null,
    campaignId: null,
    shelterId: SHELTER_ELS_AMICS_ID,
    partnerId: null,
    title: "Héroe del Mes: María",
    body: "Por su constancia ayudando a Protectora Els Amics y participando cada semana en la comunidad.",
    media: ["Retrato ilustrado de María, Héroe del Mes de julio"],
    status: "published",
    createdAt: "2026-08-02T09:00:00.000Z",
    authorName: SECOND_DEMO_USER_NAME,
    authorAvatarInitial: "M",
    relatedLabel: "Nivel: Guardián",
  },
  {
    id: "post-caso-rocky",
    authorType: "shelter",
    authorUserId: null,
    postType: "caso_refugio",
    categoryId: null,
    caseId: null,
    campaignId: null,
    shelterId: SHELTER_SAN_ROQUE_ID,
    partnerId: null,
    title: "Rocky ya está recuperado y listo para adopción",
    body: "Después de tres meses de tratamiento, Rocky puede volver a correr sin problema.",
    media: [],
    status: "published",
    createdAt: "2026-08-11T15:00:00.000Z",
    authorName: "Refugio San Roque",
    authorAvatarInitial: "S",
    relatedLabel: "Refugio San Roque",
  },
  {
    id: "post-caso-borrador",
    authorType: "shelter",
    authorUserId: null,
    postType: "caso_refugio",
    categoryId: null,
    caseId: null,
    campaignId: null,
    shelterId: SHELTER_ELS_AMICS_ID,
    partnerId: null,
    title: "Caso nuevo (sin publicar todavía)",
    body: "Borrador en revisión por el equipo — nunca debería aparecer en el muro público.",
    media: [],
    status: "draft",
    createdAt: "2026-08-12T08:00:00.000Z",
    authorName: "Protectora Els Amics",
    authorAvatarInitial: "P",
    relatedLabel: "Protectora Els Amics",
  },
  {
    id: "post-oculto-moderacion",
    authorType: "shelter",
    authorUserId: null,
    postType: "caso_refugio",
    categoryId: null,
    caseId: null,
    campaignId: null,
    shelterId: SHELTER_SAN_ROQUE_ID,
    partnerId: null,
    title: "Publicación retirada por moderación",
    body: "Este contenido fue ocultado tras revisión del equipo — nunca debería aparecer en el muro público.",
    media: [],
    status: "hidden",
    createdAt: "2026-08-07T08:00:00.000Z",
    authorName: "Refugio San Roque",
    authorAvatarInitial: "S",
    relatedLabel: "Refugio San Roque",
  },
];

// Sanity check en tiempo de carga: si un fixture no cumpliera las mismas
// invariantes que exige el dominio de Fase 3, esto falla de inmediato en vez
// de dejar pasar un post con estructura imposible. No duplica la regla, solo
// la reutiliza (assertValidPost ya existe en feed.ts).
feedPosts.forEach((post) => assertValidPost(post));

export const feedReactions: Reaction[] = [
  {
    id: "reaction-1",
    postId: "post-max-cirugia",
    userId: DEMO_VIEWER_ID,
    reactionType: "me_importa",
    createdAt: "2026-08-10T10:00:00.000Z",
  },
  {
    id: "reaction-2",
    postId: "post-heroe-maria",
    userId: DEMO_VIEWER_ID,
    reactionType: "me_importa",
    createdAt: "2026-08-02T11:00:00.000Z",
  },
  {
    id: "reaction-3",
    postId: "post-max-cirugia",
    userId: SECOND_DEMO_USER_ID,
    reactionType: "me_importa",
    createdAt: "2026-08-10T11:00:00.000Z",
  },
];

export const feedFollows: Follow[] = [
  {
    id: "follow-1",
    followerId: DEMO_VIEWER_ID,
    targetType: "shelter",
    shelterId: SHELTER_SAN_ROQUE_ID,
    partnerId: null,
    createdAt: "2026-08-01T00:00:00.000Z",
  },
];
