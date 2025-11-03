import { getNoteBySlug, getNoteSlugs, getAdjacentNotes } from "@/lib/garden";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const stageEmoji = {
  evergreen: "🌳",
  budding: "🌿",
  seedling: "🌱",
};

export async function generateStaticParams() {
  const slugs = await getNoteSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);

  return {
    title: note.title,
    description: note.excerpt || note.title,
  };
}

export default async function GardenNotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await getNoteBySlug(slug);
  const { previous, next } = await getAdjacentNotes(slug);

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <Link
        href="/garden"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 animate-fade-in"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Garden
      </Link>

      <article>
        <header className="mb-8 animate-slide-down">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{stageEmoji[note.stage]}</span>
            <span className="text-sm text-muted-foreground capitalize">
              {note.stage}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {note.title}
          </h1>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {note.updated ? (
              <>
                <span>
                  Last tended {new Date(note.updated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>
                  Planted {new Date(note.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </>
            ) : (
              <span>
                Planted {new Date(note.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
          </div>
          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-md bg-secondary text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div
          className="prose animate-fade-in animate-delay-200"
          dangerouslySetInnerHTML={{ __html: note.content }}
        />
      </article>

      {(previous || next) && (
        <nav className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {previous && (
              <Link
                href={`/garden/${previous.slug}`}
                className="group border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </div>
                <h3 className="font-medium group-hover:text-muted-foreground transition-colors">
                  {previous.title}
                </h3>
              </Link>
            )}
            {next && (
              <Link
                href={`/garden/${next.slug}`}
                className={`group border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors ${!previous ? 'sm:col-start-2' : ''}`}
              >
                <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-2">
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
                <h3 className="font-medium text-right group-hover:text-muted-foreground transition-colors">
                  {next.title}
                </h3>
              </Link>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}
