export const metadata = {
  title: "About",
  description: "Founder, Technical Consultant, and Journeyman of Some",
};

export default function AboutPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 animate-slide-down">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          About
        </h1>
        <p className="text-muted-foreground">
          Founder, Technical Consultant, and Journeyman of Some
        </p>
      </div>

      <div className="prose animate-fade-in animate-delay-200">
        <p>
          You've heard the expression "jack of all trades, master of none"? Well,
          I'm kind of in the middle. I have a number of diverse interests that
          I've pursued to a level beyond an apprenticeship but has not yet reached
          (and will likely never reach) mastery.
        </p>

        <p>
          I'm not a jack of all trades. I'm not a master of none.{" "}
          <strong>I'm a journeyman of some.</strong>
        </p>

        <h2>What I Do</h2>
        <p>
          I'm the founder of <strong>HyphTech</strong> and work as a technical
          consultant. With 13 years of coding experience, I've built everything
          from simple WordPress sites to complex distributed systems.
        </p>

        <p>
          My philosophy? Pick the right tool for the job, not the tool I know
          best. I prioritize shipping features over perfect architecture, while
          maintaining clean, maintainable code with good documentation and testing.
        </p>

        <h2>Technical Expertise</h2>
        <p>I work across the full stack with:</p>
        <ul>
          <li>
            <strong>Languages:</strong> JavaScript/TypeScript, Python, PHP
          </li>
          <li>
            <strong>Cloud:</strong> AWS (primary), Azure, Google Cloud Platform
          </li>
          <li>
            <strong>Architecture:</strong> Distributed systems, Microservices,
            Event-driven architectures
          </li>
        </ul>

        <h2>Journey</h2>
        <p>
          I started as a WordPress freelancer in 2012 and evolved into building
          complex distributed systems. Previously, I led the engineering team at
          Saavi Softwares. Now I run my own startup and consult on technical
          projects.
        </p>

        <h2>Beyond Code</h2>
        <p>
          When I'm not in front of a screen, you'll find me learning guitar,
          diving into music theory, collecting DC Universe comics, or playing
          badminton, football, or cricket.
        </p>

        <h2>Currently Learning</h2>
        <ul>
          <li>Startup building and product management</li>
          <li>Advanced music theory</li>
          <li>Consulting skills</li>
        </ul>

        <h2>Let's Connect</h2>
        <p>
          I'm always interested in discussing technology, startups, or even music
          and comics. Feel free to reach out!
        </p>
      </div>
    </div>
  );
}
