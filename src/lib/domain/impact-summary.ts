import { splitCommission } from "./impact-fund";

/**
 * Forma mínima de una compra confirmada, compatible con la tabla
 * purchase_attributions (ver supabase/migrations/0001_init.sql).
 */
export interface ConfirmedPurchase {
  amount: number;
  savingsAmount: number;
  commissionAmount: number;
}

export interface UserImpactSummary {
  totalSpent: number;
  totalSavings: number;
  totalCommissionGenerated: number;
  /** Porción de la comisión generada que va al fondo de impacto (ver MODELO_ECONOMICO_B.md). */
  totalImpactGenerated: number;
  purchaseCount: number;
}

/**
 * Agrega las compras confirmadas de un usuario en el resumen que alimenta
 * el dashboard ("Has comprado X → has generado Y de impacto"). Con datos
 * de ejemplo hoy; la misma función se reutiliza cuando haya compras reales
 * de Supabase — solo cambia de dónde vienen los `ConfirmedPurchase[]`.
 */
export function computeUserImpactSummary(
  purchases: ConfirmedPurchase[],
): UserImpactSummary {
  return purchases.reduce<UserImpactSummary>(
    (acc, purchase) => {
      const { impacto } = splitCommission(purchase.commissionAmount);
      return {
        totalSpent: round2(acc.totalSpent + purchase.amount),
        totalSavings: round2(acc.totalSavings + purchase.savingsAmount),
        totalCommissionGenerated: round2(
          acc.totalCommissionGenerated + purchase.commissionAmount,
        ),
        totalImpactGenerated: round2(acc.totalImpactGenerated + impacto),
        purchaseCount: acc.purchaseCount + 1,
      };
    },
    {
      totalSpent: 0,
      totalSavings: 0,
      totalCommissionGenerated: 0,
      totalImpactGenerated: 0,
      purchaseCount: 0,
    },
  );
}

/** Estimación de impacto para una única oferta, usada en el marketplace antes de comprar. */
export function estimateOfferImpact(
  averageTicket: number,
  commissionRate: number,
): number {
  const commission = round2(averageTicket * (commissionRate / 100));
  return splitCommission(commission).impacto;
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}
