# Blog Publishing Guide

## 1. Create a new post

Add a file to `content/`:

```
content/your-post-slug.mdx
```

The URL becomes `/blog/your-post-slug`.

## 2. Frontmatter

Every post starts with:

```mdx
---
title: "Your Title"
last_updated: "2026-07-13"
summary: "One short sentence for the blog listing."
---
```

Only `title`, `last_updated`, and `summary` are required.

## 3. Write

After the frontmatter, write plain Markdown. Headings, paragraphs, lists, quotes, code blocks — all work.

If the first heading matches the frontmatter title, it's automatically deduplicated.

## 4. Preview

```bash
pnpm dev
```

Open `http://localhost:3000/blog` and `http://localhost:3000/blog/your-post-slug`.

## 5. Publish

```bash
git add content/your-post-slug.mdx
git commit -m "Add blog post: your title"
git push
```
