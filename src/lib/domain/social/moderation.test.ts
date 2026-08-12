import { describe, expect, it } from "vitest";
import {
  createReport,
  isValidStatusTransition,
  transitionReport,
  type Report,
} from "./moderation";

describe("createReport", () => {
  it("crea un reporte válido sobre un post", () => {
    const report = createReport({
      id: "rep-1",
      targetType: "post",
      postId: "post-1",
      reporterId: "user-1",
      reason: "Contenido inapropiado",
      createdAt: "2026-08-12T00:00:00.000Z",
    });

    expect(report.status).toBe("pending");
    expect(report.postId).toBe("post-1");
  });

  it("rechaza un objetivo no permitido (distinto de 'post')", () => {
    expect(() =>
      createReport({
        id: "rep-1",
        targetType: "comment",
        postId: null,
        reporterId: "user-1",
        reason: "Motivo",
        createdAt: "2026-08-12T00:00:00.000Z",
      }),
    ).toThrow(/comment/);
  });

  it("rechaza un reporte de tipo 'post' sin postId", () => {
    expect(() =>
      createReport({
        id: "rep-1",
        targetType: "post",
        postId: null,
        reporterId: "user-1",
        reason: "Motivo",
        createdAt: "2026-08-12T00:00:00.000Z",
      }),
    ).toThrow(/postId/);
  });

  it("rechaza un motivo vacío", () => {
    expect(() =>
      createReport({
        id: "rep-1",
        targetType: "post",
        postId: "post-1",
        reporterId: "user-1",
        reason: "   ",
        createdAt: "2026-08-12T00:00:00.000Z",
      }),
    ).toThrow(/motivo/i);
  });
});

describe("transiciones de estado", () => {
  const pendingReport: Report = {
    id: "rep-1",
    targetType: "post",
    postId: "post-1",
    reporterId: "user-1",
    reason: "Motivo",
    status: "pending",
    reviewedBy: null,
    reviewedAt: null,
    createdAt: "2026-08-12T00:00:00.000Z",
  };

  it("pending → reviewed es válida", () => {
    expect(isValidStatusTransition("pending", "reviewed")).toBe(true);

    const updated = transitionReport(
      pendingReport,
      "reviewed",
      "admin-1",
      "2026-08-12T01:00:00.000Z",
    );
    expect(updated.status).toBe("reviewed");
    expect(updated.reviewedBy).toBe("admin-1");
  });

  it("reviewed → actioned es válida", () => {
    const reviewedReport: Report = { ...pendingReport, status: "reviewed" };
    expect(isValidStatusTransition("reviewed", "actioned")).toBe(true);

    const updated = transitionReport(
      reviewedReport,
      "actioned",
      "admin-1",
      "2026-08-12T02:00:00.000Z",
    );
    expect(updated.status).toBe("actioned");
  });

  it("rechaza una transición inválida: pending → actioned (salta reviewed)", () => {
    expect(isValidStatusTransition("pending", "actioned")).toBe(false);
    expect(() =>
      transitionReport(pendingReport, "actioned", "admin-1", "2026-08-12T01:00:00.000Z"),
    ).toThrow(/inválida/i);
  });

  it("rechaza una transición inválida hacia atrás: actioned → pending", () => {
    const actionedReport: Report = { ...pendingReport, status: "actioned" };
    expect(isValidStatusTransition("actioned", "pending")).toBe(false);
    expect(() =>
      transitionReport(actionedReport, "pending", "admin-1", "2026-08-12T01:00:00.000Z"),
    ).toThrow(/inválida/i);
  });
});
