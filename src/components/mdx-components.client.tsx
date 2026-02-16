"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React, { type ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
export { AnimatedStat } from "./magicui/animated-stat";
export { ImageScrubber } from "./magicui/image-scrubber";
export { ParallaxImage } from "./magicui/parallax-image";
import dynamic from "next/dynamic";

// Dynamically import AnnotatedCode (named export)
const AnnotatedCode = dynamic(
  () => import("./magicui/annotated-code").then((mod) => mod.AnnotatedCode),
  { ssr: false },
);

// Helper function to parse annotation metadata from code block `meta` string
function parseAnnotations(meta?: string): { line: number; content: string }[] {
  if (!meta) return [];
  const regex = /\{(\d+)\s*:\s*(.*?)\}/g;
  let match;
  const annotations = [];
  while ((match = regex.exec(meta)) !== null) {
    annotations.push({
      line: parseInt(match[1], 10),
      content: match[2].trim(),
    });
  }
  return annotations;
}

type PreProps = React.ComponentPropsWithoutRef<"pre"> & {
  "data-meta"?: string;
};

export const CodeBlock = ({ children, className, ...props }: PreProps) => {
  const preRef = useRef<HTMLPreElement>(null);
  const rawCode = preRef.current?.textContent || "";
  const meta = props["data-meta"]; // Added by rehype-pretty-code

  // Check if there are annotations in the meta string
  const annotations = parseAnnotations(meta);

  if (annotations.length > 0) {
    // If annotations are present, use the AnnotatedCode component
    // We need to extract the raw code and language
    const lang = className?.replace("language-", "") || "plaintext";
    return (
      <AnnotatedCode
        code={rawCode}
        lang={lang}
        annotations={annotations.map(ann => ({ ...ann, content: <p>{ann.content}</p> }))}
      />
    );
  }

  // Otherwise, render a standard pre tag (with highlighting from rehype-pretty-code)
  return (
    <pre ref={preRef} className={className} {...props}>
      {children}
    </pre>
  );
};


export function CustomLink({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  if (href?.startsWith("#")) {
    return (
      <a {...props} />
    );
  }
  return <a target="_blank" rel="noopener noreferrer" href={href} {...props} />;
}

export function RoundedImage({ src, alt, width, height, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { src?: string }) {
  if (!src) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="my-8"
    >
      <Image
        src={src}
        alt={alt || ""}
        width={width as number || 800}
        height={height as number || 600}
        className="rounded-lg w-full h-auto"
        {...props}
      />
    </motion.div>
  );
}

export function Callout({
  children,
  type = "default",
}: {
  children: ReactNode;
  type?: "default" | "warning" | "info" | "success" | "error";
}) {
  const colors = {
    default: "bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800",
    warning: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
    info: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    success: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
  };

  const icons = {
    default: "💡",
    warning: "⚠️",
    info: "ℹ️",
    success: "✅",
    error: "❌",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg border my-6 ${colors[type]}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl">{icons[type]}</span>
        <div className="prose dark:prose-invert max-w-none text-sm">{children}</div>
      </div>
    </motion.div>
  );
}

export function Video({ src, caption }: { src: string; caption?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="my-8"
    >
      <video
        src={src}
        controls
        className="w-full rounded-lg"
        playsInline
        loop
        muted
        autoPlay
      />
      {caption && (
        <p className="text-sm text-muted-foreground mt-2 text-center">{caption}</p>
      )}
    </motion.div>
  );
}

type FullBleedProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
};

export function FullBleed({ children, className, innerClassName }: FullBleedProps) {
  return (
    <div
      className={cn(
        "not-prose relative left-1/2 right-1/2 w-[100vw] -translate-x-1/2 overflow-hidden",
        className,
      )}
    >
      <div className={cn("mx-auto max-w-5xl px-6 sm:px-8", innerClassName)}>
        {children}
      </div>
    </div>
  );
}

type MarsHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image: string;
  imageAlt: string;
  children?: ReactNode;
};

export function MarsHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  children,
}: MarsHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-neutral-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_80%_-10%,rgba(255,132,82,0.35),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(700px_380px_at_0%_100%,rgba(255,200,120,0.2),transparent_65%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(1px_1px_at_10px_10px,rgba(255,255,255,0.25),transparent_40%)] [background-size:26px_26px]" />
      <div className="relative z-10 grid items-center gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[11px] uppercase tracking-[0.45em] text-orange-200/80"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-5xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="mt-6 max-w-xl text-base text-neutral-200/90 sm:text-lg"
            >
              {subtitle}
            </motion.p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
          </motion.div>
          <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/15 bg-neutral-900/80 px-4 py-2 text-[11px] uppercase tracking-[0.4em] text-orange-200/80">
            <span>Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="text-base"
              aria-hidden
            >
              ↓
            </motion.span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

type PostHeroProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PostHero({ eyebrow, title, subtitle }: PostHeroProps) {
  return (
    <FullBleed className="mb-12">
      <div className="relative overflow-hidden rounded-[24px] border border-neutral-200/70 bg-gradient-to-br from-white via-white to-neutral-50 px-6 py-10 text-neutral-900 shadow-sm dark:border-white/10 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900 dark:text-white sm:px-10 sm:py-12">
        <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(1px_1px_at_12px_12px,rgba(15,15,15,0.15),transparent_45%)] [background-size:28px_28px] dark:opacity-30 dark:[background-image:radial-gradient(1px_1px_at_12px_12px,rgba(255,255,255,0.18),transparent_45%)]" />
        <div className="relative">
          {eyebrow && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[11px] uppercase tracking-[0.5em] text-neutral-500 dark:text-neutral-400"
            >
              {eyebrow}
            </motion.p>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="mt-4 max-w-2xl text-base text-neutral-600 dark:text-neutral-300"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </FullBleed>
  );
}

type ArrowDividerProps = {
  label?: string;
  className?: string;
};

export function ArrowDivider({ label = "SCROLL", className }: ArrowDividerProps) {
  return (
    <div
      className={cn(
        "not-prose my-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.5em] text-neutral-500",
        className,
      )}
    >
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-300 to-neutral-400/70 dark:via-neutral-600 dark:to-neutral-500/70" />
      <span>{label}</span>
      <motion.span
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="text-base"
        aria-hidden
      >
        →
      </motion.span>
    </div>
  );
}

type SectionHeaderProps = {
  kicker?: string;
  title: string;
  description?: string;
};

export function SectionHeader({ kicker, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="not-prose mt-16"
    >
      {kicker && (
        <p className="text-[11px] uppercase tracking-[0.4em] text-neutral-500">
          {kicker}
        </p>
      )}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-base text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      )}
    </motion.div>
  );
}

type StatGridProps = {
  children: ReactNode;
};

export function StatGrid({ children }: StatGridProps) {
  return (
    <div className="not-prose grid gap-4 sm:grid-cols-3">
      {children}
    </div>
  );
}

type StatItemProps = {
  label: string;
  value: ReactNode;
  detail?: string;
};

export function StatItem({ label, value, detail }: StatItemProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-white/90 backdrop-blur">
      <div className="text-2xl font-semibold text-white">{value}</div>
      <div className="mt-2 text-xs uppercase tracking-[0.3em] text-white/70">
        {label}
      </div>
      {detail && <div className="mt-2 text-xs text-white/60">{detail}</div>}
    </div>
  );
}

type PullQuoteProps = {
  children: ReactNode;
  attribution?: string;
};

export function PullQuote({ children, attribution }: PullQuoteProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="not-prose my-10 rounded-2xl border border-neutral-200/70 bg-neutral-50 px-6 py-6 text-neutral-900 dark:border-white/10 dark:bg-neutral-900 dark:text-white"
    >
      <p className="text-lg font-medium leading-relaxed">{children}</p>
      {attribution && (
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-neutral-500 dark:text-neutral-400">
          {attribution}
        </p>
      )}
    </motion.div>
  );
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level: number) {
  const Heading = ({ children }: { children?: ReactNode }) => {
    const slug = slugify(children as string);
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        id={slug}
        className="group relative"
      >
        {React.createElement(`h${level}`, {}, children)}
        <a
          href={`#${slug}`}
          className="absolute left-0 -translate-x-full opacity-0 group-hover:opacity-100 transition-opacity pr-2"
        >
          #
        </a>
      </motion.div>
    );
  };
  Heading.displayName = `Heading${level}`;
  return Heading;
}

export const H1 = createHeading(1);
export const H2 = createHeading(2);
export const H3 = createHeading(3);
export const H4 = createHeading(4);
export const H5 = createHeading(5);
export const H6 = createHeading(6);
