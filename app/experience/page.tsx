export const metadata = {
  title: "Experience",
  description: "11+ years of software engineering experience",
};

export default function ExperiencePage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 animate-slide-down">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          Experience
        </h1>
        <p className="text-muted-foreground">
          11+ years of software engineering, specializing in backend development
          and distributed systems
        </p>
      </div>

      <div className="space-y-12 animate-fade-in animate-delay-200">
        {/* Work Experience */}
        <section>
          <h2 className="text-xl font-semibold tracking-tight mb-6">
            Work Experience
          </h2>

          <div className="space-y-8">
            {/* Saavi Softwares */}
            <div className="border-l-2 border-border pl-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg">Software Architect</h3>
                <p className="text-muted-foreground text-sm">
                  Saavi Softwares Private Limited
                </p>
                <p className="text-muted-foreground text-sm">
                  June 2022 - Present | Pune, India
                </p>
              </div>
              <p className="text-muted-foreground mb-3">
                Utilizing Node.js for server-side development and React for
                building scalable frontend applications. Cloud-native
                application development using AWS.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Implemented state machine-based workflows to replace
                    traditional long-running servers, enhancing efficiency and
                    scalability
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Developing solutions utilizing AWS databases, with a
                    specialization in DynamoDB
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Demonstrated understanding of cloud reference architectures
                    following AWS best practices
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Strong emphasis on code documentation to ensure clarity,
                    maintainability, and collaboration within the team
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
                    Developed design documents and Proof of Concepts (POCs)
                    utilizing diverse technologies tailored to consumer use
                    cases
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Familiarity with principles of scalable architecture,
                    including monolithic, microservices, etc.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Responsible for building and maintaining features across
                    multiple microservices within the ecosystem (Node.js)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Well-versed in event sourcing patterns and event-driven
                    architecture, ensuring alignment with project requirements
                    (RabbitMQ)
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Continuously enhanced expertise in JavaScript and TypeScript
                    design patterns to facilitate scalable coding practices
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Experienced with Docker and deployment processes, ensuring
                    smooth and efficient application deployment
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
                    Developed robust APIs with clean, well-documented code to
                    ensure clarity and ease of integration
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Integrated backend Node.js APIs seamlessly with React
                    frontend applications to deliver cohesive user experiences
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Demonstrated expertise in fundamental design principles
                    crucial for building scalable applications
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Proficient in asynchronous programming paradigms,
                    addressing challenges effectively to ensure smooth
                    application flow
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Proficient in writing comprehensive unit tests for both
                    React and Node.js using Jest, Mocha, and Chai
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    Managed end-to-end project lifecycle, ranging from
                    conceptualization to delivery, encompassing landing page
                    design, application development, and full-fledged
                    e-commerce solutions
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
                Conducted literature research and spearheaded the development of
                innovative assistive technologies, including:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    <strong>Subtitle Editor:</strong> Designed and implemented
                    a user-friendly subtitle editor enabling users to edit
                    existing subtitles or create new ones
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    <strong>Plugin/Tween Engine:</strong> Developed a versatile
                    plugin/tween engine to seamlessly integrate effects into
                    subtitles
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-foreground">•</span>
                  <span>
                    <strong>Accessible Video Player:</strong> Engineered an
                    accessible video player tailored specifically for deaf
                    individuals
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
