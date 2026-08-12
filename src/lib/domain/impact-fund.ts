/**
 * Reparto de una comisión de partner entre reserva operativa, fondo de
 * impacto y reserva de crecimiento — según docs/MODELO_ECONOMICO_B.md.
 *
 * Los documentos aprobados dan RANGOS, no cifras exactas (40-50% / 30-40% /
 * 10-20%), porque son hipótesis pendientes de validar con datos reales
 * (docs/ROADMAP_VALIDACION.md). Los valores de abajo son un punto medio
 * elegido para poder calcular algo mientras no hay datos — no son un dato
 * validado. Ajustar aquí, en un único lugar, cuando haya cifras reales.
 */
export const IMPACT_FUND_SPLIT = {
  operativa: 0.45,
  impacto: 0.35,
  crecimiento: 0.2,
} as const;

export interface CommissionSplit {
  operativa: number;
  impacto: number;
  crecimiento: number;
}

export function splitCommission(commissionAmount: number): CommissionSplit {
  if (commissionAmount < 0) {
    throw new Error("commissionAmount no puede ser negativo");
  }

  return {
    operativa: round2(commissionAmount * IMPACT_FUND_SPLIT.operativa),
    impacto: round2(commissionAmount * IMPACT_FUND_SPLIT.impacto),
    crecimiento: round2(commissionAmount * IMPACT_FUND_SPLIT.crecimiento),
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
