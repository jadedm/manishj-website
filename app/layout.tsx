import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Manish Jadhav - Journeyman of Some",
    template: "%s - Manish J",
  },
  description:
    "Founder and independent consultant with expertise spanning design patterns to systems architecture—monolithic, serverless, and distributed computing. Building large-scale data pipelines and solving AI problems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme') || 'system';
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
                document.documentElement.classList.toggle('dark', isDark);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-border">
              <nav className="container max-w-3xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex justify-between items-center">
                  <Link
                    href="/"
                    className="font-semibold tracking-tight flex items-center gap-1"
                  >
                    Manish J
                  </Link>
                  <div className="flex items-center gap-4 text-sm">
                    <Link
                      href="/blog"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      blog
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <Link
                      href="/projects"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      projects
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <Link
                      href="/experience"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      experience
                    </Link>
                    <span className="text-muted-foreground">/</span>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      about
                    </Link>
                  </div>
                </div>
              </nav>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border mt-auto">
              <div className="container max-w-3xl mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Manish Jadhav
                  </p>
                  <ThemeToggle />
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
