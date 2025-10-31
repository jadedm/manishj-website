import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { ChevronRight } from "lucide-react";

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
          <Link
            key={project.title}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`block border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors group animate-slide-up animate-delay-${Math.min(index + 1, 5) * 100}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="font-medium mb-1 group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h2>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
