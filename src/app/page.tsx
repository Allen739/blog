import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { getBlogPosts } from "@/data/blog";
import { compareDateStringsDesc, formatDateShort } from "@/lib/utils";
import Link from "next/link";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const posts = await getBlogPosts();
  const recentPosts = posts
    .sort((a, b) =>
      compareDateStringsDesc(a.metadata.publishedAt, b.metadata.publishedAt),
    )
    .slice(0, 5);

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-10">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-28 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      <section id="recent-blogs">
        <BlurFade delay={BLUR_FADE_DELAY * 2}>
          <h2 className="text-xl font-bold mb-4">Recent Blog Posts</h2>
        </BlurFade>
        <div className="space-y-3">
          {recentPosts.map((post, id) => (
            <BlurFade
              key={post.slug}
              delay={BLUR_FADE_DELAY * 3 + id * 0.05}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group block"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <span className="text-base font-medium group-hover:underline decoration-1 underline-offset-4 transition-all">
                    {post.metadata.title}
                  </span>
                  <span className="text-xs text-muted-foreground shrink-0">
                    {formatDateShort(post.metadata.publishedAt)}
                  </span>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>
    </main>
  );
}
