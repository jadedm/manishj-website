import Link from "next/link";
import { getPostsByYear } from "@/lib/posts";
import { ChevronRight } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "Thoughts on technology, development, and more",
};

export default async function BlogPage() {
  const postsByYear = await getPostsByYear();
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 animate-slide-down">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Blog
        </h1>
        <p className="text-muted-foreground">
          Writing about technology, code, and everything in between.
        </p>
      </div>

      <div className="space-y-10">
        {years.map((year, yearIndex) => (
          <section key={year} className={`animate-fade-in animate-delay-${(yearIndex + 1) * 100}`}>
            <h2 className="text-xl font-bold tracking-tight mb-4">{year}</h2>
            <div className="space-y-3">
              {postsByYear[year].map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium mb-1 group-hover:text-muted-foreground transition-colors">
                        {post.title}
                      </h3>
                      <time className="text-sm text-muted-foreground block mb-2">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      {post.excerpt && (
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {post.excerpt}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
