# Manish Jadhav - Personal Website

Personal website featuring a markdown-powered blog, project portfolio, and professional experience timeline. Built with Next.js 16, TypeScript, and Tailwind CSS 4.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, shadcn/ui components
- **Content**: Markdown with gray-matter, unified/remark/rehype
- **Fonts**: Geist Sans & Geist Mono
- **Package Manager**: pnpm

## Getting Started

Install dependencies:
```bash
pnpm install
```

Run development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Build for production:
```bash
pnpm build
pnpm start
```

Lint code:
```bash
pnpm lint
```

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout with navigation and theme provider
│   ├── page.tsx            # Home page
│   ├── blog/
│   │   ├── page.tsx        # Blog listing (grouped by year)
│   │   └── [slug]/page.tsx # Individual blog posts
│   ├── projects/page.tsx   # Projects listing
│   ├── experience/page.tsx # Work history timeline
│   └── about/page.tsx      # About page
├── components/
│   ├── theme-provider.tsx  # Theme context provider
│   └── theme-toggle.tsx    # Light/dark/system toggle
├── lib/
│   ├── posts.ts            # Blog post utilities
│   ├── projects.ts         # Project data
│   └── utils.ts            # Utility functions
└── posts/                  # Markdown blog posts
```

## Features

### Blog System
- Markdown posts with frontmatter (title, date, excerpt)
- Automatic year-based grouping
- Previous/next post navigation
- External links open in new tabs with security attributes

### Theme System
- Three-way toggle: light/dark/system
- localStorage persistence
- No flash of incorrect theme on load
- Smooth transitions

### Content Pages
- **Home**: Recent posts, projects, and contact info
- **Blog**: All posts grouped by year
- **Projects**: GitHub repositories
- **Experience**: Professional timeline with education
- **About**: Personal background and philosophy

## Adding Content

### New Blog Post

Create a `.md` file in the `posts/` directory:

```markdown
---
title: "Your Post Title"
date: "2024-10-31"
excerpt: "Brief description of the post"
---

Your content here (no need for H1 heading - title is rendered automatically)
```

### Update Projects

Edit `lib/projects.ts`:

```typescript
export const projects: Project[] = [
  {
    title: "Project Name",
    description: "Project description",
    url: "https://github.com/username/repo",
  },
  // ...
];
```

## Style Guidelines

- No emojis in content (simple conversational tone)
- Escape apostrophes in JSX as `&apos;`
- External links need `target="_blank"` and `rel="noopener noreferrer"`
- Max width: `max-w-3xl` (768px) for content
- Use animation utilities: `animate-slide-down`, `animate-fade-in`, `animate-delay-*`

## Markdown Processing Pipeline

1. `gray-matter` - Parse frontmatter
2. `remark-parse` - Parse markdown to AST
3. `remark-rehype` - Convert to HTML AST
4. `rehype-external-links` - Add target="_blank" to external links
5. `rehype-stringify` - Convert to HTML string

## Deployment

### AWS Amplify

The project is configured for AWS Amplify deployment:

- Build config in `amplify.yml`
- Uses `output: 'standalone'` in `next.config.ts`
- Automatic detection and deployment from repository

Connect your repository to AWS Amplify and it will automatically detect the configuration.

## License

Personal website - All rights reserved.
