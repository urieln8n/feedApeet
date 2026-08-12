import { PageHeader } from "@/components/feature/page-header";
import { FeedList } from "@/components/feature/feed/feed-list";
import {
  DEMO_VIEWER_ID,
  feedFollows,
  feedPosts,
  feedReactions,
} from "@/lib/fixtures/feed";

export default function MuroPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Muro"
        title="Historias e impacto de la comunidad"
        description="Actualizaciones de refugios, casos de animales, campañas y el impacto generado entre todos."
      />
      <div className="mx-auto flex max-w-2xl flex-col px-4 py-6 sm:px-6 sm:py-8">
        <FeedList
          posts={feedPosts}
          reactions={feedReactions}
          follows={feedFollows}
          viewerId={DEMO_VIEWER_ID}
        />
      </div>
    </div>
  );
}
