export const metadata = {
  title: "About",
  description: "Founder & Independent Consultant - Journeyman of Some",
};

export default function AboutPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="mb-10 animate-slide-down">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
          About
        </h1>
        <p className="text-muted-foreground">
          Founder & Independent Consultant - Journeyman of Some
        </p>
      </div>

      <div className="prose animate-fade-in animate-delay-200">
        <p>
          You&apos;ve heard the expression &quot;jack of all trades, master of
          none&quot;? Well, I&apos;m kind of in the middle. I have a number of
          diverse interests that I&apos;ve pursued to a level beyond an
          apprenticeship but has not yet reached (and will likely never reach)
          mastery.
        </p>

        <p>
          I&apos;m not a jack of all trades. I&apos;m not a master of none.{" "}
          <strong>I&apos;m a journeyman of some.</strong>
        </p>

        <h2>What I Do</h2>
        <p>
          I&apos;m building my own startup, hyphn, and working as an independent
          consultant. With 12 years of experience, I&apos;ve spent years learning
          design patterns to solve low-level code challenges and understanding
          systems design across monolithic, serverless, and distributed architectures.
          These days, most of my work revolves around building large-scale data
          pipelines and solving AI problems for companies.
        </p>

        <p>
          My philosophy? Pick the right tool for the job, not the tool I know
          best. I prioritize shipping features over perfect architecture, while
          maintaining clean, maintainable code with good documentation and
          testing.
        </p>

        <h2>Lessons Learned</h2>
        <p>
          For years, perfectionism held me back. I&apos;d obsess over architecture,
          refactor endlessly, and delay shipping until everything felt &quot;just
          right.&quot; The result? Burnout, missed opportunities, and projects that
          never saw the light of day.
        </p>
        <p>
          Now, I focus on <strong>consistency over intensity</strong> and{" "}
          <strong>execution over perfection</strong>. Ship early, iterate often,
          and learn from real-world feedback. Small, consistent progress beats
          sporadic bursts of &quot;perfect&quot; work every time. Done is better
          than perfect.
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
            <strong>Architecture:</strong> Monolithic, Serverless, Distributed computing,
            Data pipelines, Microservices, Event-driven
          </li>
          <li>
            <strong>Current Focus:</strong> Large-scale data engineering, AI/ML
            integration, Cloud-native solutions
          </li>
        </ul>

        <h2>Journey</h2>
        <p>
          My career started at the University of Glasgow in 2012 working on
          assistive technologies for accessibility. I then spent 7+ years at
          MarketingMuggles, growing from building landing pages to architecting
          full-stack applications. At Excellerate, I dove deep into microservices
          and event-driven architectures. At Saavi Softwares, I focused on
          cloud-native solutions spanning serverless and distributed computing on AWS.
          In May 2024, I started my own journey—building hyphn and consulting independently.
        </p>

        <h2>Beyond Code</h2>
        <p>
          When I&apos;m not in front of a screen, I&apos;m exploring music,
          reading comics and compelling stories across genres, or staying active
          through sports.
        </p>

        <h2>Currently Learning</h2>
        <ul>
          <li>Startup building and product management</li>
          <li>Advanced music theory</li>
          <li>Consulting skills</li>
        </ul>

        <h2>Let&apos;s Connect</h2>
        <p>
          I&apos;m always interested in discussing technology, startups, or even
          music and comics. Feel free to reach out!
        </p>
      </div>
    </div>
  );
}
