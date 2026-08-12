import { describe, expect, it } from "vitest";
import { buildFeed } from "@/lib/domain/social/feed";
import { DEMO_VIEWER_ID, feedFollows, feedPosts, feedReactions } from "./feed";

describe("fixtures del feed", () => {
  it("todos los posts son estructuralmente válidos (se comprueba también al importar el módulo)", () => {
    expect(feedPosts.length).toBeGreaterThan(0);
  });

  it("buildFeed excluye los fixtures draft/hidden incluidos a propósito", () => {
    const visible = buildFeed(feedPosts);
    expect(visible.some((p) => p.id === "post-caso-borrador")).toBe(false);
    expect(visible.some((p) => p.id === "post-oculto-moderacion")).toBe(false);
    expect(visible.length).toBe(feedPosts.length - 2);
  });

  it("reacciones y follows del visor de demo referencian posts/objetivos que existen", () => {
    const postIds = new Set(feedPosts.map((p) => p.id));
    for (const reaction of feedReactions) {
      expect(postIds.has(reaction.postId)).toBe(true);
    }
    expect(feedFollows.every((f) => f.followerId === DEMO_VIEWER_ID)).toBe(true);
  });
});
