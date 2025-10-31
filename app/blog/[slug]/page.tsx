import { getPostBySlug, getPostSlugs, getAdjacentPosts } from "@/lib/posts";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
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
  const post = await getPostBySlug(slug);

  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const { previous, next } = await getAdjacentPosts(slug);

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 animate-fade-in"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>

      <article>
        <header className="mb-8 animate-slide-down">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {post.title}
          </h1>
          <time className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </header>

        <div
          className="prose animate-fade-in animate-delay-200"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {(previous || next) && (
        <nav className="mt-16 pt-8 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {previous && (
              <Link
                href={`/blog/${previous.slug}`}
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
                href={`/blog/${next.slug}`}
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
