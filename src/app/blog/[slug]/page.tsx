import { getBlogPosts, getPost } from "@/data/blog";
import { DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import { mdxComponents } from "@/components/mdx-components";
import { mdxOptions } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
  const { slug } = await params;
  let post = await getPost(slug);

  let {
    title,
    last_updated: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const contentLines = post.content.split("\n");
  const firstContentIndex = contentLines.findIndex(
    (line) => line.trim().length > 0,
  );
  let renderedContent = post.content;

  if (firstContentIndex !== -1) {
    const firstLine = contentLines[firstContentIndex].trim();
    const isH1 = firstLine.startsWith("# ");
    const firstHeadingText = isH1 ? firstLine.slice(2).trim() : "";
    const isDuplicateTitle =
      isH1 &&
      firstHeadingText.toLowerCase() === post.metadata.title.trim().toLowerCase();

    if (isDuplicateTitle) {
      renderedContent = [
        ...contentLines.slice(0, firstContentIndex),
        ...contentLines.slice(firstContentIndex + 1),
      ]
        .join("\n")
        .replace(/^\s+/, "");
    }
  }

  return (
    <section id="blog" className="relative space-y-4">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.last_updated,
            dateModified: post.metadata.last_updated,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${DATA.url}${post.metadata.image}`
              : `${DATA.url}/og?title=${post.metadata.title}`,
            url: `${DATA.url}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: DATA.name,
            },
          }),
        }}
      />
      <Link
        href="/blog"
        aria-label="Back to all posts"
        className="absolute -left-10 -top-10 inline-flex text-2xl text-muted-foreground hover:text-foreground sm:-left-12"
      >
        <span aria-hidden>←</span>
      </Link>
      <h1 className="title font-bold text-4xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="text-sm mb-4">
        <Suspense fallback={<p className="h-5" />}>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {formatDate(post.metadata.last_updated)}
          </p>
        </Suspense>
      </div>
      <article className="prose dark:prose-invert max-w-none prose-h1:text-[1.35rem] prose-h1:font-semibold prose-h1:mt-6 prose-h1:mb-1 prose-h2:text-[1.2rem] prose-h3:text-[1.05rem] prose-h4:text-[0.98rem] prose-p:my-1 prose-p:leading-relaxed prose-hr:my-4 prose-blockquote:my-2">
        <MDXRemote
          source={renderedContent}
          components={mdxComponents}
          options={mdxOptions}
        />
      </article>
    </section>
  );
}
