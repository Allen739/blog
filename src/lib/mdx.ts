import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

type CodeLineNode = {
  properties: {
    className?: string[];
  };
};

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "min-dark",
          onVisitLine(node: CodeLineNode) {
            // Add a class for line-based observers (used by annotated code).
            node.properties.className = node.properties.className || [];
            node.properties.className.push("code-line");
          },
        },
      ],
    ] as any,
    format: "mdx" as const,
  },
};
