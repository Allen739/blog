"use client";

import { useEffect, useState, useRef } from "react";
// Removed unified imports as highlighting is now external
import { motion } from "framer-motion";

type Annotation = {
  line: number;
  content: React.ReactNode;
};

type AnnotatedCodeProps = {
  code: string; // This will now be pre-highlighted HTML
  lang: string;
  annotations: Annotation[];
};

export function AnnotatedCode({ code, lang, annotations }: AnnotatedCodeProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const [currentLine, setCurrentLine] = useState(annotations[0]?.line || 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const line = parseInt(entry.target.getAttribute("data-line") || "0");
            const annotationForLine = annotations.find(
              (ann) => ann.line === line
            );
            if (annotationForLine) {
              setCurrentLine(line);
            }
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 } // Trigger when the middle of the element is in view
    );

    if (codeRef.current) {
      // Find all code lines and observe them
      // Assuming each line now has a data-line attribute from rehype-pretty-code
      codeRef.current.querySelectorAll(".code-line").forEach((lineElement) => {
        const lineNum = parseInt(lineElement.getAttribute("data-line") || "0");
        // Only observe lines that have an annotation
        if (annotations.some(ann => ann.line === lineNum)) {
          observer.observe(lineElement);
        }
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [annotations]); // Re-run effect if annotations change

  return (
    <div className="flex flex-col md:flex-row gap-6 my-8">
      <div className="flex-1 max-h-[600px] overflow-y-auto relative rounded-lg bg-gray-900 text-white p-4">
        <div
          ref={codeRef}
          // The code prop now contains the pre-highlighted HTML
          dangerouslySetInnerHTML={{ __html: code }}
        />
        {/* Line highlighting overlay (optional, can be done with CSS) */}
        {/* This part might need adjustment if line heights are variable */}
        {annotations.map((ann) => (
          <div
            key={ann.line}
            className={`absolute inset-y-0 left-0 right-0 transition-colors duration-200 ${
              currentLine === ann.line ? "bg-blue-500/20" : "bg-transparent"
            }`}
            style={{ top: `calc(${ann.line - 1} * 1.5em)`, height: "1.5em" }} // Adjust 1.5em based on actual line height
          />
        ))}
      </div>
      <div className="flex-1 sticky top-0 max-h-[600px] overflow-y-auto">
        <ul className="space-y-4">
          {annotations.map((annotation, i) => (
            <motion.li
              key={i}
              className={`p-4 border-l-4 transition-colors duration-200 ${
                currentLine === annotation.line
                  ? "border-blue-500 bg-blue-500/10"
                  : "border-gray-700 bg-gray-800"
              } rounded-r-lg`}
            >
              {annotation.content}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
