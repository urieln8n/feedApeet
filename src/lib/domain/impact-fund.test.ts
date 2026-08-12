import { describe, expect, it } from "vitest";
import { splitCommission } from "./impact-fund";

describe("splitCommission", () => {
  it("reparte una comisión entre operativa, impacto y crecimiento sumando el total", () => {
    const split = splitCommission(100);

    expect(split.operativa).toBe(45);
    expect(split.impacto).toBe(35);
    expect(split.crecimiento).toBe(20);
    expect(split.operativa + split.impacto + split.crecimiento).toBeCloseTo(100);
  });

  it("rechaza comisiones negativas", () => {
    expect(() => splitCommission(-1)).toThrow();
  });
});
