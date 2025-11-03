import Link from "next/link";
import { getAllNotes } from "@/lib/garden";
import { getRecentProjects } from "@/lib/projects";
import { ChevronRight, ExternalLink, Github } from "lucide-react";

const stageEmoji = {
  evergreen: "🌳",
  budding: "🌿",
  seedling: "🌱",
};

export default async function Home() {
  const recentNotes = (await getAllNotes()).slice(0, 5);
  const recentProjects = getRecentProjects(3);

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <section className="mb-16 sm:mb-20 animate-slide-down">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Journeyman of some
        </h1>
        <div className="prose-custom space-y-4 text-muted-foreground leading-relaxed">
          <p>
            You&apos;ve heard the expression &quot;jack of all trades, master of none&quot;?
            Well, I&apos;m somewhere in between. I have diverse interests I&apos;ve
            pursued beyond apprenticeship, though I&apos;ll likely never reach mastery
            in all of them.
          </p>
          <p>
            I&apos;m not a jack of all trades. I&apos;m not a master of none.
            I&apos;m a journeyman of some.
          </p>
          <p>
            With 12 years of experience—from learning design patterns to
            architecting systems spanning monolithic, serverless, and
            distributed computing—I&apos;m now building my own startup and
            consulting independently. These days, I focus on large-scale data
            pipelines and solving AI problems for companies.
          </p>
          <p>
            When I&apos;m not coding, you&apos;ll find me exploring music,
            reading comics and compelling stories, or playing sports.
          </p>
          <p>
            If you want to know more about my professional journey, {""}
            <a
              href="/experience"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors"
            >
              View my traditional resume
            </a>
          </p>
        </div>
      </section>

      <section className="mb-16 animate-fade-in animate-delay-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold tracking-tight">
            Recently tended
          </h2>
          <Link
            href="/garden"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore garden
          </Link>
        </div>

        <div className="space-y-3">
          {recentNotes.map((note, index) => (
            <Link
              key={note.slug}
              href={`/garden/${note.slug}`}
              className={`block border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors group animate-slide-up animate-delay-${
                (index + 3) * 100
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{stageEmoji[note.stage]}</span>
                    <h3 className="font-medium group-hover:text-muted-foreground transition-colors">
                      {note.title}
                    </h3>
                  </div>
                  {note.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {note.excerpt}
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
            <div
              key={project.title}
              className={`border border-border rounded-lg p-4 animate-slide-up animate-delay-${
                (index + 5) * 100
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium mb-1">{project.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  <div className="flex gap-2">
                    {project.demoUrl && (
                      <Link
                        href={project.demoUrl}
                        target={
                          project.demoUrl.startsWith("http")
                            ? "_blank"
                            : undefined
                        }
                        rel={
                          project.demoUrl.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Demo
                      </Link>
                    )}
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 border border-border rounded-md hover:bg-secondary/50 transition-colors"
                      >
                        <Github className="h-3 w-3" />
                        GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 animate-fade-in animate-delay-400">
        <h2 className="text-xl font-semibold tracking-tight mb-6">
          Companies I&apos;m working with
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          I&apos;ve had the privilege of working with innovative companies
          solving interesting problems.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href="https://hyphn.tech/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Hyphn
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href="https://inoltro.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Inoltro
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link
            href="https://juvo.work/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
          >
            Juvo
          </Link>
        </div>
      </section>

      <section className="animate-fade-in animate-delay-500">
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
