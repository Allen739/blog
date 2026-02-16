import { getBlogPosts } from "@/data/blog";
import { compareDateStringsDesc, formatDateShort } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Blog",
  description: "My thoughts on software development, life, and more.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <div className="mb-8 grid grid-cols-[22px_1fr] items-center gap-3">
        <Link
          href="/"
          aria-label="Back to home"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <span aria-hidden>←</span>
        </Link>
        <h1 className="font-medium text-2xl tracking-tighter">Blog</h1>
      </div>
      <div className="grid grid-cols-[22px_1fr] gap-3">
        <div aria-hidden />
        <div className="space-y-1">
          {posts
            .sort((a, b) =>
              compareDateStringsDesc(a.metadata.publishedAt, b.metadata.publishedAt),
            )
            .map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block py-2"
              >
                <div className="w-full flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <span className="text-lg font-medium group-hover:underline decoration-1 underline-offset-4 transition-all">
                    {post.metadata.title}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDateShort(post.metadata.publishedAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {post.metadata.summary}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
