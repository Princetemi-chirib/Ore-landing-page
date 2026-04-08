"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Floating({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? undefined : { opacity: 0, y: 10 }}
      animate={
        reduced
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: [0, -6, 0],
            }
      }
      transition={
        reduced
          ? { duration: 0.2 }
          : {
              duration: 5.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay,
            }
      }
      whileHover={reduced ? undefined : { y: -4, scale: 1.01 }}
    >
      {children}
    </motion.div>
  );
}

