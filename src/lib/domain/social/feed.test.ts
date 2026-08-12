import { describe, expect, it } from "vitest";
import {
  addReaction,
  assertValidPost,
  buildFeed,
  hasReacted,
  isPostVisibleInFeed,
  isValidPost,
  removeReaction,
  type Post,
  type Reaction,
} from "./feed";

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    id: "post-1",
    authorType: "shelter",
    authorUserId: null,
    postType: "caso_refugio",
    categoryId: null,
    caseId: null,
    campaignId: null,
    shelterId: "shelter-1",
    partnerId: null,
    title: "Max necesita cirugía",
    body: null,
    media: [],
    status: "published",
    createdAt: "2026-08-10T00:00:00.000Z",
    ...overrides,
  };
}

describe("isPostVisibleInFeed", () => {
  it("post publicado válido aparece en el feed", () => {
    expect(isPostVisibleInFeed(makePost({ status: "published" }))).toBe(true);
  });

  it("draft no aparece en el feed", () => {
    expect(isPostVisibleInFeed(makePost({ status: "draft" }))).toBe(false);
  });

  it("hidden no aparece en el feed", () => {
    expect(isPostVisibleInFeed(makePost({ status: "hidden" }))).toBe(false);
  });
});

describe("assertValidPost / isValidPost", () => {
  it("acepta un post de refugio con shelterId", () => {
    expect(isValidPost(makePost())).toBe(true);
  });

  it("acepta un post de usuario de tipo impacto_compartido con authorUserId", () => {
    const post = makePost({
      authorType: "user",
      authorUserId: "user-1",
      shelterId: null,
      postType: "impacto_compartido",
    });
    expect(isValidPost(post)).toBe(true);
  });

  it("rechaza estructura inválida: authorType 'shelter' sin shelterId", () => {
    const post = makePost({ shelterId: null });
    expect(isValidPost(post)).toBe(false);
    expect(() => assertValidPost(post)).toThrow(/shelterId/);
  });

  it("rechaza estructura inválida: authorType 'user' con un postType distinto de impacto_compartido", () => {
    const post = makePost({
      authorType: "user",
      authorUserId: "user-1",
      shelterId: null,
      postType: "caso_refugio",
    });
    expect(isValidPost(post)).toBe(false);
  });

  it("rechaza estructura inválida: título vacío", () => {
    expect(isValidPost(makePost({ title: "   " }))).toBe(false);
  });
});

describe("buildFeed", () => {
  it("filtra por publicados y ordena por fecha descendente", () => {
    const posts = [
      makePost({ id: "a", status: "published", createdAt: "2026-08-01T00:00:00.000Z" }),
      makePost({ id: "b", status: "draft", createdAt: "2026-08-05T00:00:00.000Z" }),
      makePost({ id: "c", status: "published", createdAt: "2026-08-10T00:00:00.000Z" }),
      makePost({ id: "d", status: "hidden", createdAt: "2026-08-12T00:00:00.000Z" }),
    ];

    expect(buildFeed(posts).map((p) => p.id)).toEqual(["c", "a"]);
  });
});

describe("reacciones", () => {
  const base: Reaction[] = [];

  it("añade una reacción", () => {
    const result = addReaction(base, {
      id: "r1",
      postId: "post-1",
      userId: "user-1",
      createdAt: "2026-08-12T00:00:00.000Z",
    });

    expect(result).toHaveLength(1);
    expect(result[0].reactionType).toBe("me_importa");
    expect(hasReacted(result, "post-1", "user-1")).toBe(true);
  });

  it("rechaza una segunda reacción del mismo usuario al mismo post", () => {
    const withReaction = addReaction(base, {
      id: "r1",
      postId: "post-1",
      userId: "user-1",
      createdAt: "2026-08-12T00:00:00.000Z",
    });

    expect(() =>
      addReaction(withReaction, {
        id: "r2",
        postId: "post-1",
        userId: "user-1",
        createdAt: "2026-08-12T01:00:00.000Z",
      }),
    ).toThrow();
  });

  it("quita una reacción existente", () => {
    const withReaction = addReaction(base, {
      id: "r1",
      postId: "post-1",
      userId: "user-1",
      createdAt: "2026-08-12T00:00:00.000Z",
    });

    const result = removeReaction(withReaction, "post-1", "user-1");
    expect(result).toHaveLength(0);
  });

  it("quitar una reacción inexistente no lanza error", () => {
    expect(removeReaction(base, "post-1", "user-1")).toEqual([]);
  });
});
