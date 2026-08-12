/**
 * Lógica de dominio de moderación — pura, sin Supabase, sin React. Misma
 * forma que la tabla `reports` de supabase/migrations/0002_social.sql.
 *
 * Deliberadamente separada de la persistencia: este módulo decide qué
 * transiciones de estado son válidas, no cómo se guardan. Tampoco decide qué
 * pasa con el post cuando un reporte se resuelve (ver nota al final —
 * regla pendiente, no definida en la documentación).
 */

/** Único target posible en el MVP — no hay comentarios que reportar todavía. */
export type ReportTargetType = "post";

export type ReportStatus = "pending" | "reviewed" | "actioned";

export interface Report {
  id: string;
  targetType: ReportTargetType;
  postId: string | null;
  reporterId: string;
  reason: string;
  status: ReportStatus;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string;
}

const REPORT_TARGET_TYPES: readonly string[] = ["post"];

/**
 * Crea un reporte válido — replica `reports_target_consistency` de la
 * migración (si el target es 'post', necesita postId) y exige un motivo no
 * vacío. `targetType` se recibe como string porque es la puerta de entrada
 * desde datos no confiables.
 */
export function createReport(input: {
  id: string;
  targetType: string;
  postId: string | null;
  reporterId: string;
  reason: string;
  createdAt: string;
}): Report {
  if (!REPORT_TARGET_TYPES.includes(input.targetType)) {
    throw new Error(
      `No se puede reportar un objetivo de tipo '${input.targetType}' — solo 'post' en el MVP`,
    );
  }

  if (input.targetType === "post" && input.postId === null) {
    throw new Error("Un reporte de tipo 'post' necesita postId");
  }

  if (input.reason.trim().length === 0) {
    throw new Error("El reporte necesita un motivo");
  }

  return {
    id: input.id,
    targetType: "post",
    postId: input.postId,
    reporterId: input.reporterId,
    reason: input.reason,
    status: "pending",
    reviewedBy: null,
    reviewedAt: null,
    createdAt: input.createdAt,
  };
}

/**
 * Transiciones válidas: pending → reviewed → actioned. Estrictamente lineal
 * hacia adelante — sin saltos (pending → actioned) ni retrocesos, ni
 * quedarse en el mismo estado.
 */
const VALID_TRANSITIONS: Record<ReportStatus, ReportStatus[]> = {
  pending: ["reviewed"],
  reviewed: ["actioned"],
  actioned: [],
};

export function isValidStatusTransition(
  from: ReportStatus,
  to: ReportStatus,
): boolean {
  return VALID_TRANSITIONS[from].includes(to);
}

/**
 * Aplica una transición de estado, validando que sea legal. Función pura:
 * devuelve un Report nuevo, no muta `report`. `reviewedBy`/`reviewedAt` solo
 * se exigen al salir de 'pending' (quien revisa queda registrado).
 */
export function transitionReport(
  report: Report,
  to: ReportStatus,
  reviewedBy: string,
  reviewedAt: string,
): Report {
  if (!isValidStatusTransition(report.status, to)) {
    throw new Error(
      `Transición inválida: '${report.status}' → '${to}'`,
    );
  }

  return {
    ...report,
    status: to,
    reviewedBy,
    reviewedAt,
  };
}

/** Distinción simple entre contenido visible/oculto — no decide cuándo ocultar. */
export function isContentHidden(postStatus: string): boolean {
  return postStatus === "hidden";
}

export function isContentPublished(postStatus: string): boolean {
  return postStatus === "published";
}

// ============ REGLA DELIBERADAMENTE NO IMPLEMENTADA ============
//
// Qué le pasa exactamente a un post cuando su reporte pasa a 'actioned'
// (¿siempre se oculta? ¿puede 'actioned' significar "revisado, sin
// infracción, se queda publicado"?) no está definido en
// docs/MVP_V2_COMMUNITY_IMPACT_PLATFORM.md ni en ningún documento aprobado.
// Este módulo NO asume una regla — transitionReport() solo cambia el estado
// del reporte, nunca el status del post. Esa relación necesita una decisión
// de producto explícita antes de implementarse (Fase 6, cola de moderación).
