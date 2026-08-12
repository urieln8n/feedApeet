import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { PawIcon } from "@/components/icons";
import { ReactionButton } from "./reaction-button";
import { ShareButton } from "./share-button";
import { FollowButton } from "./follow-button";
import { ReportButton } from "./report-button";
import type { FeedPost } from "@/lib/fixtures/feed";

/** Etiquetas de los 5 tipos de post aprobados — sin inventar ninguno nuevo. */
const POST_TYPE_LABEL: Record<FeedPost["postType"], string> = {
  caso_refugio: "Caso de refugio",
  campana: "Campaña",
  logro_comunidad: "Logro de la comunidad",
  impacto_compartido: "Impacto compartido",
  heroe_del_mes: "Héroe del Mes",
};

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "short",
});

/**
 * Tarjeta reutilizable de una publicación del Feed. Sin comentarios, sin
 * contador de seguidores público, sin gamificación adicional — solo lo
 * aprobado en docs/MVP_V2_COMMUNITY_IMPACT_PLATFORM.md.
 */
export function PostCard({
  post,
  initialReacted,
  initialFollowing,
}: {
  post: FeedPost;
  initialReacted: boolean;
  initialFollowing: boolean;
}) {
  const followTarget =
    post.authorType === "shelter"
      ? { targetType: "shelter" as const, targetId: post.shelterId }
      : post.authorType === "partner"
        ? { targetType: "partner" as const, targetId: post.partnerId }
        : null;

  return (
    <Card>
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <Avatar>
            {post.authorType === "system" ? (
              <AvatarFallback>
                <PawIcon className="size-4 text-brand" />
              </AvatarFallback>
            ) : (
              <AvatarFallback>{post.authorAvatarInitial}</AvatarFallback>
            )}
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-semibold">
              {post.authorName}
            </p>
            <p className="text-[11.5px] text-muted-foreground">
              {dateFormatter.format(new Date(post.createdAt))}
            </p>
          </div>
          <Badge className="shrink-0 border-transparent bg-brand-soft text-brand-strong">
            {POST_TYPE_LABEL[post.postType]}
          </Badge>
        </div>

        <div>
          <p className="text-[15px] font-semibold">{post.title}</p>
          {post.body ? (
            <p className="mt-1 text-[13.5px] text-muted-foreground">
              {post.body}
            </p>
          ) : null}
        </div>

        {post.media.length > 0 ? (
          <div className="flex items-center gap-2 rounded-lg border border-dashed border-border bg-secondary/40 px-3 py-4 text-[12px] text-muted-foreground">
            <PawIcon className="size-4 shrink-0 text-brand" />
            {post.media[0]}
          </div>
        ) : null}

        {post.relatedLabel ? (
          <p className="text-[12px] text-muted-foreground">
            {post.relatedLabel}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <ReactionButton postId={post.id} initialActive={initialReacted} />
          <ShareButton postId={post.id} title={post.title} />
          {followTarget && followTarget.targetId ? (
            <FollowButton
              targetType={followTarget.targetType}
              targetId={followTarget.targetId}
              targetLabel={post.authorName}
              initialFollowing={initialFollowing}
            />
          ) : null}
          <ReportButton postId={post.id} className="ml-auto" />
        </div>
      </CardContent>
    </Card>
  );
}
