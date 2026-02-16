"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  height?: number;
  className?: string;
};

export function ParallaxImage({ src, alt, height = 500, className }: ParallaxImageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-height * 0.2, height * 0.2]);

  return (
    <div
      ref={ref}
      className={`relative my-8 overflow-hidden rounded-lg ${className}`}
      style={{ height }}
    >
      <motion.div style={{ y }}>
        <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: "cover" }} />
      </motion.div>
    </div>
  );
}
