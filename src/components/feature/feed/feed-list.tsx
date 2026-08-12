import { buildFeed, hasReacted, type Reaction } from "@/lib/domain/social/feed";
import { isFollowing, type Follow } from "@/lib/domain/social/follows";
import { EmptyState } from "@/components/feature/empty-state";
import { MessageIcon } from "@/components/icons";
import { PostCard } from "./post-card";
import type { FeedPost } from "@/lib/fixtures/feed";

/**
 * No es una regla de negocio nueva: solo resuelve, para un post ya dado, a
 * qué objetivo de `follows` corresponde su autor (shelter o partner),
 * reutilizando isFollowing() de src/lib/domain/social/follows.ts tal cual.
 */
function isAuthorFollowed(
  follows: Follow[],
  post: FeedPost,
  viewerId: string,
): boolean {
  if (post.authorType === "shelter" && post.shelterId) {
    return isFollowing(follows, viewerId, "shelter", post.shelterId);
  }
  if (post.authorType === "partner" && post.partnerId) {
    return isFollowing(follows, viewerId, "partner", post.partnerId);
  }
  return false;
}

export function FeedList({
  posts,
  reactions,
  follows,
  viewerId,
}: {
  posts: FeedPost[];
  reactions: Reaction[];
  follows: Follow[];
  viewerId: string;
}) {
  // buildFeed() (Fase 3) solo conoce la forma `Post`; FeedPost la extiende
  // con campos de presentación, así que en tiempo de ejecución el resultado
  // sigue siendo FeedPost — el cast es por la varianza de arrays de
  // TypeScript al tipar el retorno, no una suposición sobre los datos. La
  // regla de visibilidad (published vs. draft/hidden) y el orden vienen
  // enteramente de buildFeed(), sin duplicarla aquí.
  const visible = buildFeed(posts) as FeedPost[];

  if (visible.length === 0) {
    return (
      <EmptyState
        icon={MessageIcon}
        title="Todavía no hay publicaciones"
        description="Vuelve pronto — aquí aparecerán historias de refugios, campañas e impacto de la comunidad."
      />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {visible.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          initialReacted={hasReacted(reactions, post.id, viewerId)}
          initialFollowing={isAuthorFollowed(follows, post, viewerId)}
        />
      ))}
    </div>
  );
}
