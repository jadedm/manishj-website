import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeStringify from 'rehype-stringify';

const gardenDirectory = path.join(process.cwd(), 'garden');

export type GrowthStage = 'seedling' | 'budding' | 'evergreen';

export interface GardenNote {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  stage: GrowthStage;
  tags?: string[];
  excerpt?: string;
  content: string;
}

export async function getNoteSlugs(): Promise<string[]> {
  const fileNames = fs.readdirSync(gardenDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export async function getNoteBySlug(slug: string): Promise<GardenNote> {
  const fullPath = path.join(gardenDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] })
    .use(rehypeStringify)
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title,
    date: data.date,
    updated: data.updated,
    stage: data.stage || 'seedling',
    tags: data.tags || [],
    excerpt: data.excerpt,
    content: contentHtml,
  };
}

export async function getAllNotes(): Promise<Omit<GardenNote, 'content'>[]> {
  const slugs = await getNoteSlugs();
  const notes = await Promise.all(
    slugs.map(async (slug) => {
      const fullPath = path.join(gardenDirectory, `${slug}.md`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        updated: data.updated,
        stage: data.stage || 'seedling',
        tags: data.tags || [],
        excerpt: data.excerpt,
      };
    })
  );

  // Sort by updated date (or date if no updated) - most recent first
  return notes.sort((a, b) => {
    const dateA = a.updated || a.date;
    const dateB = b.updated || b.date;
    return dateA < dateB ? 1 : -1;
  });
}

export async function getNotesByStage(): Promise<Record<GrowthStage, Omit<GardenNote, 'content'>[]>> {
  const notes = await getAllNotes();
  const notesByStage: Record<GrowthStage, Omit<GardenNote, 'content'>[]> = {
    evergreen: [],
    budding: [],
    seedling: [],
  };

  notes.forEach((note) => {
    notesByStage[note.stage].push(note);
  });

  return notesByStage;
}

export async function getAdjacentNotes(
  slug: string
): Promise<{
  previous: Omit<GardenNote, 'content'> | null;
  next: Omit<GardenNote, 'content'> | null;
}> {
  const notes = await getAllNotes();
  const currentIndex = notes.findIndex((note) => note.slug === slug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex > 0 ? notes[currentIndex - 1] : null,
    next: currentIndex < notes.length - 1 ? notes[currentIndex + 1] : null,
  };
}
