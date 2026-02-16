import type { ComponentProps } from "react";
import {
  CodeBlock as CodeBlockClient,
  CustomLink as CustomLinkClient,
} from "@/components/mdx-components.client";

export function CodeBlock(props: ComponentProps<typeof CodeBlockClient>) {
  return <CodeBlockClient {...props} />;
}

export function CustomLink(props: ComponentProps<typeof CustomLinkClient>) {
  return <CustomLinkClient {...props} />;
}

export const mdxComponents = {
  a: CustomLink,
  pre: CodeBlock,
};
