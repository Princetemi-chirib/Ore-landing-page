"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import React, { memo, useMemo, useRef, useState } from "react";

type Step = {
  eyebrow: string;
  title: string;
  body: string;
  tone: "grape" | "yello" | "red";
};

const steps: Step[] = [
  {
    eyebrow: "DNA onboarding",
    title: "Start with context, not questions.",
    body: "Add your website + socials. Ọ̀rẹ́ learns your voice, projects, and priorities—so every session starts grounded.",
    tone: "grape",
  },
  {
    eyebrow: "Daily capture",
    title: "Text like a thread. Nothing gets lost.",
    body: "Quick captures become structured fragments. Your day stays lightweight, your context stays complete.",
    tone: "yello",
  },
  {
    eyebrow: "Evening voice",
    title: "Decompress in real time—interruptible.",
    body: "Talk for 8–12 minutes. Ọ̀rẹ́ summarizes, challenges one sticky thought, and extracts tomorrow’s top 3.",
    tone: "grape",
  },
  {
    eyebrow: "Intent parsing",
    title: "Reflection vs commitment—automatically.",
    body: "“I’m tired” stays reflection. “Deck work tomorrow at 9” becomes a commitment—pending verification.",
    tone: "yello",
  },
  {
    eyebrow: "Shadow calendar",
    title: "Verified commitments become time blocks.",
    body: "One tap blocks the time. Then you get pre‑game context and post‑game follow‑ups—without manual overhead.",
    tone: "red",
  },
];

function toneColor(tone: Step["tone"]) {
  if (tone === "grape") return "rgba(124,58,237,0.55)";
  if (tone === "yello") return "rgba(251,191,36,0.55)";
  return "rgba(239,68,68,0.45)";
}

export function ScrollStorySection() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: scrollerRef,
    offset: ["start start", "end end"],
  });

  const [activeIdx, setActiveIdx] = useState(0);
  const slideCount = steps.length + 1; // intro + steps
  const isIntro = activeIdx === 0;
  const activeStep = !isIntro ? steps[activeIdx - 1] : undefined;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(0.9999, v));
    const next = Math.floor(clamped * slideCount);
    if (next !== activeIdx) setActiveIdx(next);
  });

  const accent = useMemo(
    () => (activeStep ? toneColor(activeStep.tone) : "rgba(124,58,237,0.55)"),
    [activeStep],
  );

  return (
    <section ref={ref} className="relative mt-20 w-full">
      {/* Mobile: normal scrolling (text up, mock down) */}
      <div className="md:hidden">
        <div className="relative overflow-hidden bg-black">
          <StageBackground accent={accent} reduced={reduced} />
          <div className="relative mx-auto max-w-6xl px-6 py-12">
            <CenteredIntro />

            <div className="mt-10">
              <div className="text-xs font-semibold tracking-wide text-white/65">
                Scroll walkthrough
              </div>
              <h3 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-(--cream)">
                The nightly handover, step by step
              </h3>
              <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-white/75">
                Capture → decompress → verify → schedule. Scroll to see how the
                thread, voice space, and shadow calendar work together.
              </p>
            </div>

            <div className="mt-10 grid gap-10">
              {steps.map((s, i) => (
                <div key={s.eyebrow} className="grid gap-5">
                  <StoryCopy step={s} idx={i + 1} reduced={true} />
                  <StoryMock stepIdx={i} reduced={reduced} />
                  <div className="h-px w-full bg-linear-to-r from-white/0 via-white/12 to-white/0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: pinned slideshow */}
      <div className="hidden md:block">
        <div
          ref={scrollerRef}
          className="relative"
          style={{ height: `${slideCount * 100}vh` }}
        >
          <div className="sticky top-0 h-svh overflow-hidden bg-black">
            <StageBackground accent={accent} reduced={reduced} />

            <div className="relative mx-auto flex h-full max-w-6xl flex-col px-6 py-10 md:px-10 md:py-12">
              <AnimatePresence mode="wait">
                {isIntro ? (
                  <motion.div
                    key="intro"
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex flex-1 items-center justify-center"
                  >
                    <CenteredIntro />
                  </motion.div>
                ) : (
                  <motion.div
                    key="slides"
                    initial={reduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="flex-1"
                  >
                    <div className="mt-2 grid h-full items-center gap-12 md:grid-cols-12">
                      <div className="md:col-span-6">
                        <div className="text-xs font-semibold tracking-wide text-white/65">
                          Scroll walkthrough
                        </div>
                        <h3 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-(--cream) md:text-4xl">
                          The nightly handover, step by step
                        </h3>
                        <p className="mt-3 max-w-xl text-pretty text-sm leading-6 text-white/75">
                          Capture → decompress → verify → schedule. Scroll to see how the
                          thread, voice space, and shadow calendar work together.
                        </p>

                        <div className="mt-8">
                          <StepCounter idx={activeIdx - 1} total={steps.length} />
                        </div>

                        <div className="mt-8">
                          <AnimatePresence mode="wait">
                            {activeStep ? (
                              <StoryCopy
                                key={activeStep.eyebrow}
                                step={activeStep}
                                idx={activeIdx}
                                reduced={reduced}
                              />
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="md:col-span-6">
                        <div className="mx-auto w-full max-w-xl">
                          <AnimatePresence mode="wait">
                            {activeStep ? (
                              <StoryMock
                                key={activeStep.eyebrow}
                                stepIdx={activeIdx - 1}
                                reduced={reduced}
                              />
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StageBackground({
  accent,
  reduced,
}: {
  accent: string;
  reduced: boolean;
}) {
  return (
    <div aria-hidden className="absolute inset-0">
      {/* Aurora wash */}
      <div
        className="absolute -inset-[35%] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 25%, rgba(251,191,36,0.14), transparent 60%), radial-gradient(60% 60% at 72% 18%, rgba(124,58,237,0.16), transparent 58%), radial-gradient(70% 70% at 55% 80%, rgba(239,68,68,0.10), transparent 60%)",
        }}
      />

      {/* Grid / lines */}
      <div
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.75) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.75) 1px, transparent 1px)",
          backgroundSize: "140px 140px",
        }}
      />

      {/* Filled colored squares */}
      <motion.div
        className="absolute left-[10%] top-[22%] h-10 w-10 rounded-lg bg-[rgba(124,58,237,0.20)]"
        animate={reduced ? undefined : { opacity: [0.25, 0.65, 0.25] }}
        transition={
          reduced ? undefined : { duration: 5.0, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.10)" }}
      />
      <motion.div
        className="absolute left-[18%] top-[62%] h-8 w-8 rounded-lg bg-[rgba(251,191,36,0.18)]"
        animate={reduced ? undefined : { opacity: [0.20, 0.55, 0.20] }}
        transition={
          reduced ? undefined : { duration: 6.2, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.10)" }}
      />
      <motion.div
        className="absolute right-[16%] top-[26%] h-9 w-9 rounded-lg bg-[rgba(239,68,68,0.14)]"
        animate={reduced ? undefined : { opacity: [0.18, 0.52, 0.18] }}
        transition={
          reduced ? undefined : { duration: 6.6, repeat: Infinity, ease: "easeInOut" }
        }
        style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.10)" }}
      />
      <div
        className="absolute right-[10%] top-[68%] h-12 w-12 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,241,230,0.16), rgba(245,241,230,0.06))",
          boxShadow: "0 0 0 1px rgba(255,255,255,0.10)",
        }}
      />

      {/* Active accent haze */}
      <motion.div
        className="absolute -inset-20 blur-3xl"
        style={{ background: `radial-gradient(circle at 60% 35%, ${accent}, transparent 55%)` }}
        animate={reduced ? undefined : { opacity: [0.22, 0.38, 0.22] }}
        transition={
          reduced ? undefined : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-black/0 via-black/55 to-black" />
    </div>
  );
}

const CenteredIntro = memo(function CenteredIntro() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-balance text-3xl font-extrabold tracking-tight text-(--cream) md:text-5xl">
        Ọ̀rẹ́ brings your mind into one system—so you can focus on what matters.
      </h2>
      <p className="mt-4 text-pretty text-sm leading-6 text-white/70">
        Between ideas, voice notes, and unfinished commitments, your day gets fragmented.
        Ọ̀rẹ́ captures everything, then turns it into a calm plan—without losing your
        context.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <div className="hidden h-px w-32 bg-white/12 md:block" />
        <div className="inline-flex items-center rounded-full border border-white/12 bg-white/5 px-3 py-1 text-[11px] font-medium text-(--cream)">
          FEATURES
        </div>
        <div className="hidden h-px w-32 bg-white/12 md:block" />
      </div>
    </div>
  );
});

const StepCounter = memo(function StepCounter({
  idx,
  total,
}: {
  idx: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-3 text-xs text-white/55">
      <span className="inline-flex h-7 items-center rounded-full border border-white/10 bg-white/5 px-3 font-semibold text-white/70">
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div className="h-px flex-1 bg-linear-to-r from-white/0 via-white/12 to-white/0" />
    </div>
  );
});

const StoryCopy = memo(function StoryCopy({
  step,
  idx,
  reduced,
}: {
  step: Step;
  idx: number;
  reduced: boolean;
}) {
  const dot =
    step.tone === "grape"
      ? "bg-(--grape)"
      : step.tone === "yello"
        ? "bg-(--yello)"
        : "bg-(--red)";

  return (
    <motion.div
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="max-w-xl"
    >
      <div className="flex items-center gap-3">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <div className="text-xs font-semibold text-white/70">{step.eyebrow}</div>
        <div className="ml-auto text-xs text-white/45">
          {String(idx + 1).padStart(2, "0")}
        </div>
      </div>

      <AnimatedHeading tone={step.tone}>{step.title}</AnimatedHeading>

      <div className="mt-3 text-sm leading-6 text-white/75">{step.body}</div>
    </motion.div>
  );
});

function AnimatedHeading({
  tone,
  children,
}: {
  tone: Step["tone"];
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  const gradient =
    tone === "grape"
      ? "linear-gradient(90deg, rgba(245,241,230,1) 0%, rgba(124,58,237,1) 60%, rgba(245,241,230,1) 100%)"
      : tone === "yello"
        ? "linear-gradient(90deg, rgba(245,241,230,1) 0%, rgba(251,191,36,1) 60%, rgba(245,241,230,1) 100%)"
        : "linear-gradient(90deg, rgba(245,241,230,1) 0%, rgba(239,68,68,1) 60%, rgba(245,241,230,1) 100%)";

  return (
    <motion.h4
      className="mt-4 text-balance text-2xl font-extrabold tracking-tight text-transparent md:text-3xl"
      style={
        reduced
          ? {
              backgroundImage: gradient,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }
          : {
              backgroundImage: gradient,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              backgroundSize: "200% 100%",
            }
      }
      animate={
        reduced
          ? undefined
          : {
              backgroundPositionX: ["0%", "100%", "0%"],
            }
      }
      transition={
        reduced
          ? undefined
          : {
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
            }
      }
    >
      {children}
    </motion.h4>
  );
}

function StoryMock({ stepIdx, reduced }: { stepIdx: number; reduced: boolean }) {
  const step = steps[stepIdx] ?? steps[0];
  const accent =
    step.tone === "grape"
      ? "rgba(124,58,237,0.55)"
      : step.tone === "yello"
        ? "rgba(251,191,36,0.55)"
        : "rgba(239,68,68,0.45)";

  return (
    <div className="relative">
      <div
        className="relative z-10 rounded-[2.6rem] border border-white/12 bg-[rgba(255,255,255,0.05)] p-5 shadow-[0_40px_140px_rgba(0,0,0,0.70)] backdrop-blur"
        style={{
          boxShadow: `0 40px 140px rgba(0,0,0,0.70), 0 0 0 1px rgba(255,255,255,0.06), 0 0 55px ${accent}`,
        }}
      >
        <div className="mx-auto h-[18px] w-[140px] rounded-full bg-white/12" />

        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs font-semibold text-white/85">Ọ̀rẹ́</div>
          <div className="text-[11px] text-white/55">Nightly handover</div>
        </div>

        <div className="mt-4 overflow-hidden rounded-4xl border border-white/10 bg-black/30">
          <motion.div
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="p-5"
          >
            {stepIdx === 0 ? <DNAUi reduced={reduced} /> : null}
            {stepIdx === 1 ? <ThreadUi reduced={reduced} /> : null}
            {stepIdx === 2 ? <VoiceUi reduced={reduced} /> : null}
            {stepIdx === 3 ? <IntentUi reduced={reduced} /> : null}
            {stepIdx === 4 ? <CalendarUi reduced={reduced} /> : null}
          </motion.div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 z-0 rounded-[3.25rem] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(55% 55% at 30% 25%, rgba(251,191,36,0.14), transparent 60%), radial-gradient(55% 55% at 72% 18%, rgba(124,58,237,0.16), transparent 58%), radial-gradient(65% 65% at 55% 80%, rgba(239,68,68,0.10), transparent 60%)",
        }}
      />
    </div>
  );
}

function PanelTitle({ title, tag }: { title: string; tag: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold text-white/85">{title}</div>
        <div className="mt-1 text-sm text-white/70">
          {tag}
        </div>
      </div>
    </div>
  );
}

function ScrollingViewport({
  reduced,
  children,
}: {
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
      <motion.div
        className="p-4"
        animate={
          reduced
            ? undefined
            : {
                y: [0, -18, 0],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        {children}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-black/35 to-black/0" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/45 to-black/0" />
    </div>
  );
}

function DNAUi({ reduced }: { reduced: boolean }) {
  return (
    <div className="grid gap-4">
      <PanelTitle
        title="DNA onboarding"
        tag="Website + socials → reusable context profile"
      />
      <ScrollingViewport reduced={reduced}>
        <div className="grid gap-3">
          {[
            { k: "Website URL", v: "yourdomain.com" },
            { k: "LinkedIn", v: "@you" },
            { k: "X / Portfolio", v: "@you" },
            { k: "Current projects", v: "3 detected" },
          ].map((r) => (
            <div
              key={r.k}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
            >
              <div className="text-sm text-white/80">{r.k}</div>
              <div className="text-sm text-white/50">{r.v}</div>
            </div>
          ))}
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-white/60">Building profile…</span>
            <span className="text-xs text-(--grape)">Firecrawl → vector memory</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full w-[68%] rounded-full bg-linear-to-r from-(--grape) via-(--cream) to-(--yello)"
              animate={reduced ? undefined : { width: ["40%", "68%", "55%", "72%"] }}
              transition={
                reduced
                  ? undefined
                  : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </div>
        </div>
      </ScrollingViewport>
    </div>
  );
}

function ThreadUi({ reduced }: { reduced: boolean }) {
  return (
    <div className="grid gap-4">
      <PanelTitle title="Daily thread" tag="Quick capture → structured fragments" />
      <ScrollingViewport reduced={reduced}>
        <div className="grid gap-3">
          <Bubble side="me" text="Great idea: a minimalism content series." />
          <Bubble side="them" text="Noted. Added to Creative Fragments." />
          <Bubble side="me" text="Also I’m stressed about the pricing slide." />
          <Bubble side="them" text="Tonight we’ll unpack this and schedule a rehearsal." />
          <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
            <div className="text-xs font-semibold text-white/80">Context sync</div>
            <div className="mt-2 text-sm text-white/70">
              Today’s texts become the opening prompt for your evening voice session.
            </div>
          </div>
        </div>
      </ScrollingViewport>
    </div>
  );
}

function VoiceUi({ reduced }: { reduced: boolean }) {
  return (
    <div className="grid gap-4">
      <PanelTitle title="Voice Space" tag="Interruptible realtime decompression" />
      <div className="grid place-items-center rounded-3xl border border-white/10 bg-white/5 p-8">
        <motion.div
          className="h-28 w-28 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,253,208,0.9), rgba(255,253,208,0.18) 45%, rgba(124,58,237,0.14) 70%, transparent 72%)",
          }}
          animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
          transition={
            reduced ? undefined : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <div className="mt-4 text-xs text-white/60">Listening…</div>
      </div>
      <div className="grid gap-2 rounded-3xl border border-white/10 bg-black/25 p-4 text-sm text-white/75">
        <div className="flex items-start gap-2">
          <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--yello)" />
          <span>Extracted: 3 tasks for tomorrow</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--grape)" />
          <span>Challenge: one sticky belief</span>
        </div>
      </div>
    </div>
  );
}

function IntentUi({ reduced }: { reduced: boolean }) {
  return (
    <div className="grid gap-4">
      <PanelTitle title="Intent parsing" tag="Reflection vs commitment" />
      <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
        <motion.div
          className="rounded-2xl border border-white/10 bg-black/25 p-4"
          animate={reduced ? undefined : { x: [0, 4, 0] }}
          transition={
            reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="text-xs font-semibold text-white/80">Reflection</div>
          <div className="mt-1 text-sm text-white/70">“I’m tired.”</div>
        </motion.div>
        <motion.div
          className="rounded-2xl border border-white/10 bg-black/25 p-4"
          animate={reduced ? undefined : { x: [0, -4, 0] }}
          transition={
            reduced ? undefined : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <div className="text-xs font-semibold text-white/80">Commitment</div>
          <div className="mt-1 text-sm text-white/70">
            “I’ll finish the deck tomorrow at 9 AM.”
          </div>
        </motion.div>
        <div className="mt-1 text-xs text-white/60">
          Commitments trigger a verification request before scheduling.
        </div>
      </div>
    </div>
  );
}

function CalendarUi({ reduced }: { reduced: boolean }) {
  return (
    <div className="grid gap-4">
      <PanelTitle title="Shadow calendar" tag="Verified blocks + contextual alerts" />
      <ScrollingViewport reduced={reduced}>
        <div className="grid gap-3">
          <div className="text-xs font-semibold text-white/80">Tomorrow</div>
          {[
            { time: "09:00", tone: "yello", label: "Deck work" },
            { time: "11:00", tone: "grape", label: "Follow‑ups" },
            { time: "16:30", tone: "red", label: "Flow block" },
            { time: "18:15", tone: "yello", label: "Handover walk" },
          ].map((r) => (
            <div
              key={r.time}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 rounded-full ${
                    r.tone === "yello"
                      ? "bg-(--yello)"
                      : r.tone === "grape"
                        ? "bg-(--grape)"
                        : "bg-(--red)"
                  }`}
                />
                <span className="text-sm text-white/80">{r.label}</span>
              </div>
              <span className="text-xs text-white/55">{r.time}</span>
            </div>
          ))}
        </div>
      </ScrollingViewport>
      <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
        <div className="text-xs font-semibold text-white/80">Verification request</div>
        <div className="mt-2 text-sm text-white/75">
          I noted “Deck work” at <span className="text-(--cream)">9:00 AM</span>. Block
          that time?
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="h-10 rounded-2xl bg-(--cream) text-sm font-medium text-black grid place-items-center">
            Yes, block it
          </div>
          <div className="h-10 rounded-2xl border border-white/12 bg-white/5 text-sm font-medium text-(--cream) grid place-items-center">
            Not yet
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, text }: { side: "me" | "them"; text: string }) {
  const isMe = side === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-3xl border px-4 py-3 text-sm leading-6 ${
          isMe
            ? "border-white/10 bg-white/10 text-white/85"
            : "border-white/10 bg-black/30 text-white/75"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

