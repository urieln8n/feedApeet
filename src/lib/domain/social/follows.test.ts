import { describe, expect, it } from "vitest";
import { follow, isFollowing, unfollow, type Follow } from "./follows";

describe("follow", () => {
  it("sigue un refugio válido", () => {
    const result = follow([], {
      id: "f1",
      followerId: "user-1",
      targetType: "shelter",
      targetId: "shelter-1",
      createdAt: "2026-08-12T00:00:00.000Z",
    });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      targetType: "shelter",
      shelterId: "shelter-1",
      partnerId: null,
    });
  });

  it("sigue un partner válido", () => {
    const result = follow([], {
      id: "f1",
      followerId: "user-1",
      targetType: "partner",
      targetId: "partner-1",
      createdAt: "2026-08-12T00:00:00.000Z",
    });

    expect(result[0]).toMatchObject({
      targetType: "partner",
      partnerId: "partner-1",
      shelterId: null,
    });
  });

  it("rechaza seguir a un usuario (no existe follow de usuarios en el MVP)", () => {
    expect(() =>
      follow([], {
        id: "f1",
        followerId: "user-1",
        targetType: "user",
        targetId: "user-2",
        createdAt: "2026-08-12T00:00:00.000Z",
      }),
    ).toThrow(/shelter.*partner/i);
  });

  it("rechaza un follow duplicado", () => {
    const existing: Follow[] = follow([], {
      id: "f1",
      followerId: "user-1",
      targetType: "shelter",
      targetId: "shelter-1",
      createdAt: "2026-08-12T00:00:00.000Z",
    });

    expect(() =>
      follow(existing, {
        id: "f2",
        followerId: "user-1",
        targetType: "shelter",
        targetId: "shelter-1",
        createdAt: "2026-08-12T01:00:00.000Z",
      }),
    ).toThrow(/ya sigues/i);
  });

  it("permite que dos usuarios distintos sigan el mismo refugio", () => {
    const existing = follow([], {
      id: "f1",
      followerId: "user-1",
      targetType: "shelter",
      targetId: "shelter-1",
      createdAt: "2026-08-12T00:00:00.000Z",
    });

    const result = follow(existing, {
      id: "f2",
      followerId: "user-2",
      targetType: "shelter",
      targetId: "shelter-1",
      createdAt: "2026-08-12T01:00:00.000Z",
    });

    expect(result).toHaveLength(2);
  });
});

describe("unfollow", () => {
  it("deja de seguir un refugio", () => {
    const existing = follow([], {
      id: "f1",
      followerId: "user-1",
      targetType: "shelter",
      targetId: "shelter-1",
      createdAt: "2026-08-12T00:00:00.000Z",
    });

    const result = unfollow(existing, "user-1", "shelter", "shelter-1");
    expect(result).toHaveLength(0);
    expect(isFollowing(result, "user-1", "shelter", "shelter-1")).toBe(false);
  });

  it("dejar de seguir algo que no se seguía no lanza error", () => {
    expect(unfollow([], "user-1", "shelter", "shelter-1")).toEqual([]);
  });
});
