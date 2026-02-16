import type { ComponentProps } from "react";
import {
  CodeBlock as CodeBlockClient,
  CustomLink as CustomLinkClient,
  RoundedImage as RoundedImageClient,
  Callout as CalloutClient,
  Video as VideoClient,
  FullBleed as FullBleedClient,
  MarsHero as MarsHeroClient,
  PostHero as PostHeroClient,
  ArrowDivider as ArrowDividerClient,
  SectionHeader as SectionHeaderClient,
  StatGrid as StatGridClient,
  StatItem as StatItemClient,
  PullQuote as PullQuoteClient,
  AnimatedStat as AnimatedStatClient,
  ImageScrubber as ImageScrubberClient,
  ParallaxImage as ParallaxImageClient,
  H1 as H1Client,
  H2 as H2Client,
  H3 as H3Client,
  H4 as H4Client,
  H5 as H5Client,
  H6 as H6Client,
} from "@/components/mdx-components.client";

export function CodeBlock(props: ComponentProps<typeof CodeBlockClient>) {
  return <CodeBlockClient {...props} />;
}

export function CustomLink(props: ComponentProps<typeof CustomLinkClient>) {
  return <CustomLinkClient {...props} />;
}

export function RoundedImage(props: ComponentProps<typeof RoundedImageClient>) {
  return <RoundedImageClient {...props} />;
}

export function Callout(props: ComponentProps<typeof CalloutClient>) {
  return <CalloutClient {...props} />;
}

export function Video(props: ComponentProps<typeof VideoClient>) {
  return <VideoClient {...props} />;
}

export function FullBleed(props: ComponentProps<typeof FullBleedClient>) {
  return <FullBleedClient {...props} />;
}

export function MarsHero(props: ComponentProps<typeof MarsHeroClient>) {
  return <MarsHeroClient {...props} />;
}

export function PostHero(props: ComponentProps<typeof PostHeroClient>) {
  return <PostHeroClient {...props} />;
}

export function ArrowDivider(props: ComponentProps<typeof ArrowDividerClient>) {
  return <ArrowDividerClient {...props} />;
}

export function SectionHeader(props: ComponentProps<typeof SectionHeaderClient>) {
  return <SectionHeaderClient {...props} />;
}

export function StatGrid(props: ComponentProps<typeof StatGridClient>) {
  return <StatGridClient {...props} />;
}

export function StatItem(props: ComponentProps<typeof StatItemClient>) {
  return <StatItemClient {...props} />;
}

export function PullQuote(props: ComponentProps<typeof PullQuoteClient>) {
  return <PullQuoteClient {...props} />;
}

export function AnimatedStat(props: ComponentProps<typeof AnimatedStatClient>) {
  return <AnimatedStatClient {...props} />;
}

export function ImageScrubber(props: ComponentProps<typeof ImageScrubberClient>) {
  return <ImageScrubberClient {...props} />;
}

export function ParallaxImage(props: ComponentProps<typeof ParallaxImageClient>) {
  return <ParallaxImageClient {...props} />;
}

export function H1(props: ComponentProps<typeof H1Client>) {
  return <H1Client {...props} />;
}

export function H2(props: ComponentProps<typeof H2Client>) {
  return <H2Client {...props} />;
}

export function H3(props: ComponentProps<typeof H3Client>) {
  return <H3Client {...props} />;
}

export function H4(props: ComponentProps<typeof H4Client>) {
  return <H4Client {...props} />;
}

export function H5(props: ComponentProps<typeof H5Client>) {
  return <H5Client {...props} />;
}

export function H6(props: ComponentProps<typeof H6Client>) {
  return <H6Client {...props} />;
}

export const mdxComponents = {
  a: CustomLink,
  pre: CodeBlock,
  RoundedImage,
  Callout,
  Video,
  FullBleed,
  MarsHero,
  PostHero,
  ArrowDivider,
  SectionHeader,
  StatGrid,
  StatItem,
  PullQuote,
  AnimatedStat,
  ImageScrubber,
  ParallaxImage,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
};
