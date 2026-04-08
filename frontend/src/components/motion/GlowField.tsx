"use client";

import { motion, useReducedMotion } from "framer-motion";

type Glow = {
  key: string;
  className: string;
  color: string;
  size: number;
  x: string;
  y: string;
  opacity: number;
  duration: number;
  delay: number;
};

const glows: Glow[] = [
  {
    key: "grape",
    className: "blur-3xl",
    color: "rgba(124, 58, 237, 0.26)",
    size: 560,
    x: "-10%",
    y: "-5%",
    opacity: 0.45,
    duration: 12,
    delay: 0,
  },
  {
    key: "yello",
    className: "blur-3xl",
    color: "rgba(251, 191, 36, 0.22)",
    size: 560,
    x: "55%",
    y: "-18%",
    opacity: 0.38,
    duration: 14,
    delay: 0.4,
  },
  {
    key: "red",
    className: "blur-3xl",
    color: "rgba(239, 68, 68, 0.16)",
    size: 560,
    x: "40%",
    y: "55%",
    opacity: 0.28,
    duration: 16,
    delay: 0.8,
  },
];

export function GlowField({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className={className}>
      {glows.map((g) => (
        <motion.div
          key={g.key}
          className={`absolute rounded-full ${g.className}`}
          style={{
            width: g.size,
            height: g.size,
            left: g.x,
            top: g.y,
            background: g.color,
            opacity: g.opacity,
          }}
          animate={
            reduced
              ? undefined
              : {
                  x: [0, 12, 0, -10, 0],
                  y: [0, -10, 0, 12, 0],
                  scale: [1, 1.03, 1, 0.98, 1],
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  duration: g.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: g.delay,
                }
          }
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/55 to-black" />
    </div>
  );
}

