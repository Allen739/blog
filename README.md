# joseph.nd

Personal blog and portfolio. Built with Next.js 16, Tailwind CSS v4, and MDX.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 7
- **Styling**: Tailwind CSS v4 (via `@theme` in globals.css)
- **Fonts**: Inter (sans) + Noto Sans JP (japanese accent)
- **Content**: MDX via `next-mdx-remote`, stored in `content/*.mdx`
- **Code highlighting**: `rehype-pretty-code` (min-dark theme)
- **Animations**: framer-motion
- **Package manager**: pnpm

## Local development

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Project structure

```
content/*.mdx              ← blog posts (one file = one post)
public/me.jpeg             ← static assets (images, files)
src/
  app/                     ← Next.js App Router pages
  components/              ← UI components
  data/
    site.tsx               ← profile, nav links, socials, current state
    blog.ts                ← MDX reader and post loader
  lib/
    mdx.ts                 ← remark/rehype plugin config
    utils.ts               ← date formatting helpers
docs/publishing.md         ← full guide for writing & publishing
```

## Content publishing

Only `content/*.mdx` needs to be touched for new posts. See [`docs/publishing.md`](docs/publishing.md) for the full guide — frontmatter, dates, images, videos, code blocks, and more.

## Profile & config

Edit `src/data/site.tsx`:

- Name, description, avatar
- Navbar links and socials
- Current state items (mood, building, listening, reading)

## Deploy

Push to GitHub. Vercel auto-deploys with default Next.js settings.

```bash
git push
```
