import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { getRecentProjects } from "@/lib/projects";
import { ChevronRight } from "lucide-react";

export default async function Home() {
  const recentPosts = (await getAllPosts()).slice(0, 5);
  const recentProjects = getRecentProjects(3);

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-16 sm:mb-20 animate-slide-down">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Journeyman of some
        </h1>
        <div className="prose-custom space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Not a jack of all trades. Not a master of none. I&apos;m a
            journeyman—pursuing diverse interests beyond apprenticeship,
            striving toward mastery in some.
          </p>
          <p>
            With 13 years building distributed systems, I&apos;ve learned to
            pick the right tool for the job. When I&apos;m not coding,
            you&apos;ll find me learning guitar, collecting DC comics, or on the
            badminton court.
          </p>
        </div>
      </section>

      <section className="mb-16 animate-fade-in animate-delay-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">Latest posts</h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            See all posts
          </Link>
        </div>

        <div className="space-y-3">
          {recentPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`block border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors group animate-slide-up animate-delay-${
                (index + 3) * 100
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-1 group-hover:text-muted-foreground transition-colors">
                    {post.title}
                  </h3>
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

      <section className="mb-16 animate-fade-in animate-delay-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Recent projects
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            See all projects
          </Link>
        </div>

        <div className="space-y-3">
          {recentProjects.map((project, index) => (
            <Link
              key={project.title}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors group animate-slide-up animate-delay-${
                (index + 5) * 100
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-1 group-hover:text-muted-foreground transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="animate-fade-in animate-delay-400">
        <h2 className="text-xl font-semibold tracking-tight mb-6">
          Let&apos;s Connect
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          If you want to get in touch with me about something or just to say hi,
          reach out on social media or send me an email.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="https://linkedin.com/in/jadhav-manish"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            LinkedIn
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href="https://github.com/jadedm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            GitHub
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href="mailto:hello@manishj.com"
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            hello@manishj.com
          </Link>
        </div>
      </section>
    </div>
  );
}
