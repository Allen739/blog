# Blog Publishing Guide (MDX-Only Workflow)

This project is set up so you can publish blog posts by adding/editing files in `content/` only.
You do **not** need to modify React/Next.js source code for normal posts.

## 1. Where to Put a New Post

Create a new file in:

`content/<your-slug>.mdx`

Example:

`content/my-first-principles-on-ai-tools.mdx`

Your URL becomes:

`/blog/my-first-principles-on-ai-tools`

## 2. Required Frontmatter

Every blog file must start with frontmatter like this:

```mdx
---
title: "My Post Title"
publishedAt: "2026-02-16"
summary: "1-2 sentence summary shown on the blog list page."
layout: "standard"
---
```

Required fields:
- `title` (string)
- `publishedAt` (date string, recommended format `YYYY-MM-DD`)
- `summary` (string)

Optional fields:
- `layout` (`"standard"` or `"feature"`)
- `image` (path like `"/blog/my-image.jpg"` if you want OG image override)

## 3. Writing the Content (Your Thoughts)

After frontmatter, write normal Markdown/MDX content.

Example structure:

```mdx
# My Post Title

Intro paragraph in your own voice.

## Why this matters

Your thoughts, examples, and experience.

## What I learned

- Point one
- Point two
- Point three
```

Notes:
- Keep it simple: headings, paragraphs, lists, quotes, code blocks are all good.
- If your first heading is the same as frontmatter `title`, the page already handles duplicate display safely.
- Use fenced code blocks for code:

````md
```ts
const message = "hello";
console.log(message);
```
````

## 4. Attribution Line (When Adapting from Another Source)

If a post is inspired by an external article, add one final line at the bottom in this format:

`Based on the blog by anthropic: https://example.com/post`

Keep it as a single line with the raw URL when you want exact-link formatting.

## 5. Local Check Before Pushing

Run:

```bash
pnpm dev
```

Then open:
- `http://localhost:3000/blog`
- `http://localhost:3000/blog/<your-slug>`

Optional quick type check:

```bash
pnpm exec tsc --noEmit
```

## 6. Git Workflow (Content-Only Publishing)

Use this every time you publish a new thought post:

```bash
git status
git add content/<your-slug>.mdx
git commit -m "Add blog post: <short-title>"
git push
```

Your branch is configured with upstream tracking, so `git push` is enough (no need for `origin main`).

Commit message format for new `.mdx` posts:
- Use: `Add blog post: <short-title>`
- Example: `Add blog post: my thoughts on shipping fast`

Commit message format when editing an existing post:
- Use: `Update blog post: <short-title>`
- Example: `Update blog post: mars autonomy thoughts`

Commit message format when fixing typos only:
- Use: `Fix blog typos: <short-title>`
- Example: `Fix blog typos: building c compiler`

## 7. Deploying on Vercel

If Vercel is connected to GitHub and auto-deploy is enabled:
- Push to `main`
- Vercel builds automatically
- The new post goes live after a successful build

## 8. Troubleshooting

If post does not appear:
- Confirm file is in `content/` and ends with `.mdx`
- Confirm frontmatter keys are present and spelled exactly
- Confirm `publishedAt` is a valid date string
- Confirm there are no frontmatter syntax mistakes (quotes and `---` separators)

If build fails:
- Run `pnpm exec tsc --noEmit` locally
- Check Vercel logs for the exact failing file and line

## 9. Quick Copy Template

Copy this to create a new post quickly:

```mdx
---
title: "Your Title Here"
publishedAt: "2026-02-16"
summary: "One short summary sentence."
layout: "standard"
---

# Your Title Here

Write your thoughts here.

## Section

More thoughts.

Based on the blog by anthropic: https://example.com/post
```
