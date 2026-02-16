import type { Element } from "hast";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "min-dark",
          onVisitLine(node: Element) {
            // Add a class for line-based observers (used by annotated code).
            node.properties.className = node.properties.className || [];
            node.properties.className.push("code-line");
          },
        },
      ],
    ],
    format: "mdx",
  },
};
