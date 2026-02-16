# Joseph Portfolio + Blog

Personal portfolio and blog built with Next.js 14, TypeScript, Tailwind CSS, and MDX.

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS + shadcn/ui components
- MDX blog content from `content/*.mdx`

## Local Development

1. Install dependencies:

```bash
pnpm install
```

2. Start development server:

```bash
pnpm dev
```

3. Open `http://localhost:3000`

## Content Updates

- Profile and social links: `src/data/resume.tsx`
- Blog posts: `content/*.mdx`
- Blog routes:
  - Index: `src/app/blog/page.tsx`
  - Post page: `src/app/blog/[slug]/page.tsx`

## Deploy (Vercel)

1. Push this repository to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Use default detected settings for Next.js:
   - Build Command: `pnpm build` (or `npm run build`)
   - Install Command: `pnpm install` (or `npm install`)
4. Deploy.

## Deploy (Self-Hosted Node)

```bash
pnpm install
pnpm build
pnpm start
```

Runs on port `3000` by default.

## Pre-Deploy Checklist

- Update personal info and links in `src/data/resume.tsx`
- Confirm latest blog content in `content/`
- Run:

```bash
pnpm build
```

## License

MIT. See `LICENSE`.
