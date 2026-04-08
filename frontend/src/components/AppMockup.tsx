"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Tab = "voice" | "thread" | "calendar";

const tabs: { key: Tab; label: string }[] = [
  { key: "voice", label: "Voice" },
  { key: "thread", label: "Thread" },
  { key: "calendar", label: "Calendar" },
];

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useAutoCycle(enabled: boolean, items: Tab[], ms: number) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    const t = setInterval(() => {
      setIdx((v) => (v + 1) % items.length);
    }, ms);
    return () => clearInterval(t);
  }, [enabled, items.length, ms]);

  return { idx, setIdx };
}

export function AppMockup({
  className,
  initial = "voice",
  forcedTab,
  showTabs = true,
}: {
  className?: string;
  initial?: Tab;
  forcedTab?: Tab;
  showTabs?: boolean;
}) {
  const reduced = useReducedMotion();
  const initialIdx = useMemo(() => {
    const i = tabs.findIndex((t) => t.key === initial);
    return clamp(i === -1 ? 0 : i, 0, tabs.length - 1);
  }, [initial]);

  const { idx, setIdx } = useAutoCycle(
    !reduced && forcedTab == null,
    tabs.map((t) => t.key),
    5200,
  );

  // Keep initial stable on first render.
  useEffect(() => {
    setIdx(initialIdx);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const active = forcedTab ?? (tabs[idx]?.key ?? "voice");
  const accent =
    active === "voice"
      ? "rgba(124,58,237,0.55)"
      : active === "thread"
        ? "rgba(251,191,36,0.55)"
        : "rgba(239,68,68,0.45)";

  return (
    <div className={className}>
      <div className="relative">
        {/* App shell */}
        <div
          className="relative z-10 rounded-[2.2rem] border border-white/12 bg-[rgba(255,255,255,0.05)] p-4 shadow-[0_35px_110px_rgba(0,0,0,0.65)] backdrop-blur"
          style={{
            boxShadow: `0 35px 110px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px ${accent}`,
          }}
        >
          <div className="mx-auto h-[18px] w-[112px] rounded-full bg-white/12" />

          {/* Top bar */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs font-semibold text-white/85">Ọ̀rẹ́</div>
            <div className="text-[11px] text-white/55">Nightly handover</div>
          </div>

          {/* Tabs */}
          {showTabs ? (
            <div className="relative mt-3 grid grid-cols-3 rounded-2xl border border-white/10 bg-white/5 p-1">
              <motion.div
                className="absolute left-1 top-1 h-[calc(100%-0.5rem)] w-[calc(33.333%-0.5rem)] rounded-xl bg-(--cream)"
                animate={{
                  x: `${(tabs.findIndex((t) => t.key === active) || 0) * 100}%`,
                }}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
              {tabs.map((t, i) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setIdx(i)}
                  className={`relative z-10 h-9 rounded-xl text-xs font-medium transition ${
                    active === t.key
                      ? "text-black"
                      : "text-white/75 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/70">
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  active === "voice"
                    ? "bg-(--grape)"
                    : active === "thread"
                      ? "bg-(--yello)"
                      : "bg-(--red)"
                }`}
              />
              <span>
                {active === "voice"
                  ? "Voice Space"
                  : active === "thread"
                    ? "Daily Thread"
                    : "Shadow Calendar"}
              </span>
            </div>
          )}

          {/* Screen */}
          <div className="relative mt-4 min-h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-black/30">
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="p-4"
            >
              {active === "voice" ? <VoiceScreen /> : null}
              {active === "thread" ? <ThreadScreen /> : null}
              {active === "calendar" ? <CalendarScreen /> : null}
            </motion.div>
          </div>

          {/* Bottom hint */}
          <div className="mt-4 flex items-center justify-between text-[11px] text-white/55">
            <span>Text all day → voice at night</span>
            <span className="inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-(--yello)" />
              <span>intent → schedule</span>
            </span>
          </div>
        </div>

        {/* Ambient highlight for the device */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-8 z-0 rounded-[3rem] opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(60% 60% at 30% 25%, rgba(251,191,36,0.15), transparent 60%), radial-gradient(60% 60% at 70% 15%, rgba(124,58,237,0.16), transparent 55%), radial-gradient(70% 70% at 55% 80%, rgba(239,68,68,0.10), transparent 60%)",
          }}
        />
      </div>
    </div>
  );
}

function Chip({
  tone,
  children,
}: {
  tone: "grape" | "yello" | "red";
  children: React.ReactNode;
}) {
  const toneMap: Record<typeof tone, string> = {
    grape: "bg-[rgba(124,58,237,0.14)] text-(--grape)",
    yello: "bg-[rgba(251,191,36,0.16)] text-(--yello)",
    red: "bg-[rgba(239,68,68,0.14)] text-(--red)",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 ${toneMap[tone]}`}>
      {children}
    </span>
  );
}

function VoiceScreen() {
  return (
    <div className="grid gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-white/85">Live decompression</div>
          <div className="mt-1 text-sm text-white/70">
            Talk for 8–12 minutes. We’ll turn it into 3 commitments.
          </div>
        </div>
        <Chip tone="grape">realtime</Chip>
      </div>

      <div className="grid place-items-center rounded-3xl border border-white/10 bg-white/5 p-6">
        <motion.div
          className="relative h-28 w-28 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,253,208,0.9), rgba(255,253,208,0.15) 45%, rgba(124,58,237,0.10) 70%, transparent 72%)",
          }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="mt-4 text-xs text-white/60">Listening… interruptible</div>
      </div>

      <div className="grid gap-2 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/75">
        <div className="flex items-start gap-2">
          <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--yello)" />
          <span>Extracted: 3 tasks for tomorrow</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-[0.45rem] h-1.5 w-1.5 rounded-full bg-(--grape)" />
          <span>Detected: pricing anxiety → rehearsal prompt</span>
        </div>
      </div>
    </div>
  );
}

function ThreadScreen() {
  return (
    <div className="grid gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-white/85">Daily thread</div>
          <div className="mt-1 text-sm text-white/70">
            Dump thoughts. We’ll summarize into tonight’s opener.
          </div>
        </div>
        <Chip tone="yello">async</Chip>
      </div>

      <div className="grid gap-3">
        <Bubble side="me" text="Had a great idea for a minimalism content series." />
        <Bubble
          side="them"
          text="Noted. Added to Creative Fragments. Want me to draft a 5‑part outline later?"
        />
        <Bubble side="me" text="Also I’m stressed about the pricing slide." />
        <Bubble
          side="them"
          text="Got it. Tonight I’ll bring this up during voice and propose a short rehearsal block."
        />
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs font-semibold text-white/80">Context sync</div>
        <div className="mt-2 text-sm text-white/70">
          “Today in 40 seconds” becomes the opening prompt for your evening walk.
        </div>
      </div>
    </div>
  );
}

function CalendarScreen() {
  return (
    <div className="grid gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm font-semibold text-white/85">Shadow calendar</div>
          <div className="mt-1 text-sm text-white/70">
            Intent → verification → time blocked.
          </div>
        </div>
        <Chip tone="red">commit</Chip>
      </div>

      <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
        <div className="text-xs font-semibold text-white/80">Tomorrow</div>
        <div className="grid gap-2">
          <TimelineRow time="09:00" title="Deck work" tone="yello" />
          <TimelineRow time="11:00" title="Client follow‑ups" tone="grape" />
          <TimelineRow time="16:30" title="Flow block (protected)" tone="red" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="text-xs font-semibold text-white/80">Verification request</div>
        <div className="mt-2 text-sm text-white/75">
          I noted “Deck work” at <span className="text-(--cream)">9:00 AM</span>. Block
          that time?
        </div>
        <div className="mt-3 flex gap-2">
          <button className="h-9 flex-1 rounded-xl bg-(--cream) text-sm font-medium text-black">
            Yes, block it
          </button>
          <button className="h-9 flex-1 rounded-xl border border-white/12 bg-white/5 text-sm font-medium text-(--cream)">
            Not yet
          </button>
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
        className={`max-w-[85%] rounded-2xl border px-3 py-2 text-sm leading-6 ${
          isMe
            ? "border-white/10 bg-white/10 text-white/80"
            : "border-white/10 bg-black/35 text-white/75"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function TimelineRow({
  time,
  title,
  tone,
}: {
  time: string;
  title: string;
  tone: "grape" | "yello" | "red";
}) {
  const dot =
    tone === "grape" ? "bg-(--grape)" : tone === "yello" ? "bg-(--yello)" : "bg-(--red)";
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/25 px-3 py-2">
      <div className="flex items-center gap-3">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        <div className="text-sm text-white/80">{title}</div>
      </div>
      <div className="text-xs text-white/55">{time}</div>
    </div>
  );
}

