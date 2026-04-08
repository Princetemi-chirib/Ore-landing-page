"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function Preloader({
  label = "Ọ̀rẹ́",
}: {
  label?: string;
}) {
  const reduced = useReducedMotion();

  return (
    <div className="fixed inset-0 z-60 grid place-items-center bg-black">
      {/* grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.75) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.75) 1px, transparent 1px)",
          backgroundSize: "110px 110px",
        }}
      />

      {/* soft vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 40%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(70% 70% at 50% 60%, rgba(0,0,0,0.85), transparent 70%)",
        }}
      />

      <div className="relative flex flex-col items-center">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg">
            <Image
              src="/images/logo1.png"
              alt={label}
              fill
              sizes="32px"
              className="object-contain"
              priority
            />
          </div>
          <div className="text-sm font-extrabold tracking-[0.22em] text-(--cream)">
            {label}
          </div>
        </div>

        {/* loading bar */}
        <div className="mt-4 h-[3px] w-44 overflow-hidden rounded-full bg-white/20">
          <motion.div
            className="h-full w-[38%] rounded-full bg-(--cream)"
            animate={
              reduced
                ? undefined
                : {
                    x: ["-60%", "160%"],
                  }
            }
            transition={
              reduced
                ? undefined
                : {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
          />
        </div>
      </div>
    </div>
  );
}

