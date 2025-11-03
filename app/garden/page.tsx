import Link from "next/link";
import { getNotesByStage } from "@/lib/garden";
import { ChevronRight, Sprout, Leaf, TreeDeciduous } from "lucide-react";

export const metadata = {
  title: "Garden",
  description: "A collection of notes, ideas, and evolving thoughts",
};

const stageConfig = {
  evergreen: {
    icon: TreeDeciduous,
    label: "Evergreen",
    description: "Mature, well-developed ideas",
    emoji: "🌳",
  },
  budding: {
    icon: Leaf,
    label: "Budding",
    description: "Growing and being refined",
    emoji: "🌿",
  },
  seedling: {
    icon: Sprout,
    label: "Seedling",
    description: "Early ideas and rough notes",
    emoji: "🌱",
  },
};

export default async function GardenPage() {
  const notesByStage = await getNotesByStage();
  const stages = ['evergreen', 'budding', 'seedling'] as const;

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 animate-slide-down">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Digital Garden
        </h1>
        <p className="text-muted-foreground">
          A collection of notes and ideas at various stages of growth. Some are
          polished, others are just seeds.
        </p>
      </div>

      <div className="space-y-12">
        {stages.map((stage, stageIndex) => {
          const config = stageConfig[stage];
          const notes = notesByStage[stage];

          if (notes.length === 0) return null;

          return (
            <section
              key={stage}
              className={`animate-fade-in animate-delay-${(stageIndex + 1) * 100}`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{config.emoji}</span>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">
                    {config.label}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {notes.map((note) => (
                  <Link
                    key={note.slug}
                    href={`/garden/${note.slug}`}
                    className="block border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors group"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium mb-1 group-hover:text-muted-foreground transition-colors">
                          {note.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          {note.updated ? (
                            <span>
                              Last tended{" "}
                              {new Date(note.updated).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          ) : (
                            <span>
                              Planted{" "}
                              {new Date(note.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          )}
                        </div>
                        {note.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {note.excerpt}
                          </p>
                        )}
                        {note.tags && note.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {note.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-md bg-secondary text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
