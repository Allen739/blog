# Blog Publishing Guide

## Directory structure

```
content/your-post-slug.mdx       ← blog posts (one file per post)
public/your-image.jpg            ← images, files (served at /your-image.jpg)
```

The URL becomes `/blog/your-post-slug`.

---

## Frontmatter

Every post starts with a frontmatter block. Example:

```mdx
---
title: "My Post Title"
last_updated: "2026-07-28"
summary: "A single sentence describing this post."
image: "/hero.jpg"
---
```

### Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | yes | Displayed as the page heading and in blog listings. |
| `last_updated` | yes | Date string — see Dates below. |
| `summary` | yes | Short description shown on `/blog` listing page. |
| `image` | no | Path to an OG image (e.g. `/hero.jpg`). Used for social share cards. |

### Dates

The date format can be:

- **Date-only**: `"2026-07-28"` — treated as UTC, displayed as "July 28, 2026"
- **Full ISO**: `"2026-07-28T14:30:00Z"` — treated as local time
- You can also use `"2026-07-28T14:30:00-05:00"` with a timezone offset

The blog page shows relative time automatically:

| Post age | Display |
|----------|---------|
| Today | "Today" |
| < 7 days | "July 28, 2026 (3d ago)" |
| < 30 days | "July 28, 2026 (2w ago)" |
| < 365 days | "July 28, 2026 (3mo ago)" |
| ≥ 365 days | "July 28, 2026 (1y ago)" |

> **Tip**: Use `"YYYY-MM-DD"` for simple blog posts. The date sorts correctly and displays cleanly.

### Updating an existing post

Update `last_updated` in the frontmatter to the current date. The blog listing will re-sort, and readers will see "3d ago" / "Today" etc.

---

## Writing content

After the frontmatter, write plain Markdown. All standard GFM features work.

### Headings

```mdx
## Heading level 2
### Heading level 3
#### Heading level 4
```

If the first line of content is `# Title` matching frontmatter `title`, it is automatically removed (no duplicate heading shown).

### Bold, italic, links

```mdx
**bold** *italic* ~~strikethrough~~
[link text](https://example.com)
```

### Lists

```mdx
- unordered item
- another item

1. ordered item
2. another item
```

### Blockquotes

```mdx
> This is a quote.
```

### Code blocks

With language tag for syntax highlighting (theme: `min-dark`):

````mdx
```tsx
function Hello() {
  return <p>hi</p>;
}
```
````

Languages supported: any common language (ts, tsx, js, jsx, py, go, rust, css, bash, diff, etc.).

Inline code: `` `const x = 1` ``

### Tables

```mdx
| Feature | Supported |
|---------|-----------|
| Tables  | Yes       |
| Align   | Yes       |
```

### Task lists

```mdx
- [x] done
- [ ] not done
```

### Horizontal rule

```mdx
---
```

---

## Images

Place images in the `public/` folder, then reference them in Markdown:

```mdx
![Alt text](/your-image.jpg)
```

For example, `public/hero.jpg` becomes `/hero.jpg`.

A common pattern for blog posts:

```
public/blog/my-post/diagram.png
```

Referenced as:

```mdx
![Architecture diagram](/blog/my-post/diagram.png)
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`.

---

## Videos

Use raw HTML inside MDX:

```mdx
<video src="/demo.mp4" controls width="100%" />
```

Place the video file in `public/`:

```
public/demo.mp4
```

---

## Advanced (MDX)

Since these are MDX files (not plain Markdown), you can embed JSX directly:

```mdx
import { SomeComponent } from "@/components/some-component"

<SomeComponent prop="value" />
```

> **Note**: Custom components must be registered in `src/components/mdx-components.tsx` and imported in `src/app/blog/[slug]/page.tsx` — see the Marginalia component on the `features-overhaul` branch for an example.

---

## Quick reference

```mdx
---
title: "Example Post"
last_updated: "2026-07-28"
summary: "Short summary."
---

## Section

Paragraph with **bold** and *italic*.

![Image](/photo.jpg)

| Col 1 | Col 2 |
|-------|-------|
| A     | B     |

- [x] done
- [ ] todo

```ts
console.log("hello");
```

> A quote.
```

---

## Preview & publish

```bash
pnpm dev        # local preview at http://localhost:3000
git add content/your-post-slug.mdx
git commit -m "blog: your title"
git push        # auto-deploys to Vercel
```

For new images, also `git add public/your-image.jpg`.
