import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { ExternalLink, Github } from "lucide-react";

export const metadata = {
  title: "Projects",
  description: "A collection of my projects and work",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 animate-slide-down">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Projects
        </h1>
        <p className="text-muted-foreground">
          A collection of my projects and work.
        </p>
      </div>

      <div className="space-y-3">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className={`border border-border rounded-lg p-4 animate-slide-up animate-delay-${Math.min(index + 1, 5) * 100}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="font-medium mb-1">
                  {project.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex gap-2">
                  {project.demoUrl && (
                    <Link
                      href={project.demoUrl}
                      target={project.demoUrl.startsWith('http') ? "_blank" : undefined}
                      rel={project.demoUrl.startsWith('http') ? "noopener noreferrer" : undefined}
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
    </div>
  );
}
