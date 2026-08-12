import { describe, expect, it } from "vitest";
import { computeUserImpactSummary, estimateOfferImpact } from "./impact-summary";

describe("computeUserImpactSummary", () => {
  it("agrega varias compras confirmadas en un resumen", () => {
    const summary = computeUserImpactSummary([
      { amount: 47.9, savingsAmount: 7.19, commissionAmount: 5.75 },
      { amount: 20, savingsAmount: 2, commissionAmount: 2.4 },
    ]);

    expect(summary.purchaseCount).toBe(2);
    expect(summary.totalSpent).toBeCloseTo(67.9);
    expect(summary.totalSavings).toBeCloseTo(9.19);
    expect(summary.totalCommissionGenerated).toBeCloseTo(8.15);
    expect(summary.totalImpactGenerated).toBeCloseTo(8.15 * 0.35, 1);
  });

  it("devuelve ceros sin compras", () => {
    expect(computeUserImpactSummary([])).toEqual({
      totalSpent: 0,
      totalSavings: 0,
      totalCommissionGenerated: 0,
      totalImpactGenerated: 0,
      purchaseCount: 0,
    });
  });
});

describe("estimateOfferImpact", () => {
  it("estima el impacto de una oferta a partir del ticket medio y la comisión", () => {
    const impact = estimateOfferImpact(50, 12);
    expect(impact).toBeCloseTo(50 * 0.12 * 0.35, 2);
  });
});
