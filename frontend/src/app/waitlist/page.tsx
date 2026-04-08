"use client";

import { useEffect, useState } from "react";
import { Preloader } from "@/components/Preloader";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { WaitlistWizard } from "@/components/WaitlistWizard";

export default function WaitlistPage() {
  const [loading, setLoading] = useState(true);
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative min-h-screen bg-black text-(--cream) overflow-hidden">
      {loading ? <Preloader /> : null}

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

      {/* soft aurora/vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 70% at 50% 40%, rgba(255,255,255,0.06), transparent 55%), radial-gradient(55% 55% at 38% 30%, rgba(251,191,36,0.10), transparent 60%), radial-gradient(55% 55% at 68% 55%, rgba(124,58,237,0.12), transparent 60%), radial-gradient(70% 70% at 50% 65%, rgba(0,0,0,0.85), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid min-h-screen w-full max-w-5xl place-items-center px-6 py-16 md:px-10">
        <div className="flex w-full max-w-3xl flex-col items-center text-center">
          <motion.div
            className="relative"
            animate={reduced ? undefined : { y: [0, -6, 0] }}
            transition={
              reduced
                ? undefined
                : { duration: 4.8, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div className="relative h-44 w-44 md:h-52 md:w-52">
              <Image
                src="/images/logo2.png"
                alt="Ọ̀rẹ́"
                fill
                sizes="208px"
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          <h1 className="mt-8 text-balance text-2xl font-extrabold tracking-tight text-(--cream) md:text-3xl">
            Join the Ọ̀rẹ́ Waitlist
          </h1>

          <motion.a
            href="#start"
            className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-(--cream) px-10 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            whileHover={reduced ? undefined : { scale: 1.04 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
            onClick={(e) => {
              e.preventDefault();
              setStarted(true);
              const el = document.getElementById("start");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            Start
          </motion.a>

          <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/15 bg-white/5">
              i
            </span>
            <span>Takes 30 sec</span>
          </div>

          <div id="start" className="mt-10 w-full">
            {started ? <WaitlistWizard /> : null}
          </div>
        </div>
      </div>
    </main>
  );
}

