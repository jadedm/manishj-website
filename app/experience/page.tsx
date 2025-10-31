export const metadata = {
  title: "Experience",
  description:
    "12 years from design patterns to systems architecture across monolithic, serverless, and distributed computing",
};

export default function ExperiencePage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 animate-slide-down">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              Experience
            </h1>
            <p className="text-muted-foreground">
              12 years of software engineering, from design patterns to systems
              design across monolithic, serverless, and distributed
              architectures
            </p>
          </div>
          <a
            href="/manish_jadhav_resume.pdf"
            download
            className="flex-shrink-0 px-4 py-2 text-sm border border-border rounded-lg hover:bg-secondary/50 transition-colors"
          >
            Download Resume
          </a>
        </div>
      </div>

      <div className="space-y-12 animate-fade-in animate-delay-200">
        {/* Work Experience */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-6">
            Work Experience
          </h2>

          <div className="space-y-8">
            {/* hyphn & Independent Consulting */}
            <div className="border-l-2 border-border pl-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg">
                  Founder & Independent Consultant
                </h3>
                <p className="text-muted-foreground text-sm">
                  HyphnTech | Independent Consultant
                </p>
                <p className="text-muted-foreground text-sm">
                  May 2024 - Present | Remote
                </p>
              </div>
              <p className="text-muted-foreground mb-3">
                Building my own startup and consulting independently on data
                engineering and AI projects. Focusing on execution over
                perfection with consistent, iterative delivery.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Building large-scale data pipelines for processing and
                    transforming data at scale
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Solving AI/ML integration challenges for companies, from
                    proof of concept to production deployment
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Architecting solutions across monolithic, serverless, and
                    distributed computing patterns based on project needs
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Applying lessons learned from perfectionism—shipping early,
                    iterating often, and prioritizing consistency over intensity
                  </span>
                </li>
              </ul>
            </div>

            {/* Saavi Softwares */}
            <div className="border-l-2 border-border pl-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg">Software Architect</h3>
                <p className="text-muted-foreground text-sm">
                  Saavi Softwares Private Limited
                </p>
                <p className="text-muted-foreground text-sm">
                  June 2022 - May 2024 | Pune, India
                </p>
              </div>
              <p className="text-muted-foreground mb-3">
                Built cloud-native applications on AWS with Node.js and React.
                Worked across serverless and distributed architectures.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Replaced traditional long-running servers with state
                    machine-based workflows, improving efficiency and
                    scalability
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Built solutions with AWS databases, specializing in DynamoDB
                    for high-performance applications
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Designed cloud architectures following AWS best practices
                    and reference patterns
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Maintained comprehensive code documentation for team
                    collaboration and long-term maintainability
                  </span>
                </li>
              </ul>
            </div>

            {/* Excellerate */}
            <div className="border-l-2 border-border pl-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg">Full Stack Developer</h3>
                <p className="text-muted-foreground text-sm">
                  Excellerate (Formerly Synerzip)
                </p>
                <p className="text-muted-foreground text-sm">
                  March 2020 - May 2022 | Pune, India
                </p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Created design documents and POCs for diverse consumer use
                    cases, evaluating technologies for product fit
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Built and maintained features across multiple Node.js
                    microservices in a distributed ecosystem
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Implemented event sourcing patterns and event-driven
                    architecture using RabbitMQ
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Applied JavaScript and TypeScript design patterns for
                    scalable, maintainable codebases
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Containerized applications with Docker and managed
                    deployment pipelines
                  </span>
                </li>
              </ul>
            </div>

            {/* MarketingMuggles */}
            <div className="border-l-2 border-border pl-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg">Software Engineer</h3>
                <p className="text-muted-foreground text-sm">
                  MarketingMuggles (Formerly Beardythoughts)
                </p>
                <p className="text-muted-foreground text-sm">
                  December 2012 - February 2020 | Pune, India
                </p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Built robust APIs with clean, well-documented code for easy
                    integration and maintenance
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Integrated Node.js backend APIs with React frontends to
                    deliver cohesive user experiences
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Applied fundamental design principles for building scalable
                    applications from the ground up
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Mastered asynchronous programming patterns for smooth
                    application flow and performance
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Wrote comprehensive unit tests for React and Node.js using
                    Jest, Mocha, and Chai
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Managed full project lifecycle from concept to
                    delivery—landing pages, web apps, and e-commerce solutions
                  </span>
                </li>
              </ul>
            </div>

            {/* University of Glasgow */}
            <div className="border-l-2 border-border pl-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg">Research Associate</h3>
                <p className="text-muted-foreground text-sm">
                  University of Glasgow
                </p>
                <p className="text-muted-foreground text-sm">
                  September 2012 - December 2012 | Glasgow, Scotland
                </p>
              </div>
              <p className="text-muted-foreground mb-3 text-sm">
                Conducted research and developed assistive technologies for
                accessibility, including:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    <strong>Subtitle Editor:</strong> Built a user-friendly
                    editor for creating and modifying video subtitles
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    <strong>Plugin/Tween Engine:</strong> Created a plugin
                    engine to integrate visual effects into subtitles
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    <strong>Accessible Video Player:</strong> Designed a video
                    player tailored for deaf users
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-6">
            Education
          </h2>

          <div className="space-y-6">
            <div className="border-l-2 border-border pl-4">
              <h3 className="font-semibold">M.Sc. in Embedded Systems</h3>
              <p className="text-muted-foreground text-sm">
                University of Glasgow, School of Engineering
              </p>
              <p className="text-muted-foreground text-sm">
                2011 - 2012 | Glasgow, Scotland
              </p>
            </div>

            <div className="border-l-2 border-border pl-4">
              <h3 className="font-semibold">B.Sc. in Electronics</h3>
              <p className="text-muted-foreground text-sm">
                Modern College of Arts, Commerce and Science
              </p>
              <p className="text-muted-foreground text-sm">
                2008 - 2011 | Pune, Maharashtra
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
