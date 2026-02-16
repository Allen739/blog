"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";

type AnimatedStatProps = {
  from?: number;
  to: number;
  unit?: string;
  className?: string;
};

export function AnimatedStat({ from = 0, to, unit, className }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value).toLocaleString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to]);

  return (
    <span className={className}>
        <motion.span ref={ref} />
        {unit && <span>{unit}</span>}
    </span>
  );
}
