import { describe, expect, it } from "vitest";
import { cn, formatEur } from "./utils";

describe("cn", () => {
  it("combina clases y resuelve conflictos de Tailwind", () => {
    expect(cn("p-2", "p-4")).toBe("p-4");
  });
});

describe("formatEur", () => {
  it("formatea en euros con formato español", () => {
    expect(formatEur(47.9)).toMatch(/^47,90\s€$/);
  });

  it("redondea a 2 decimales", () => {
    expect(formatEur(2.4)).toMatch(/^2,40\s€$/);
  });
});
