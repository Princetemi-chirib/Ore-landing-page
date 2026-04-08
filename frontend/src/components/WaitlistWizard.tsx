"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";

type Role = "Founder / OBO" | "Creative" | "High performer" | "Other";
type Goal =
  | "Clear my mind daily"
  | "Plan my days better"
  | "Follow-through on tasks"
  | "Reduce stress & burnout"
  | "Increase creative output";
type Capture =
  | "Notes app"
  | "Journal"
  | "Voice notes"
  | "WhatsApp/DM to self"
  | "Nothing consistent";
type FirstFeature =
  | "Voice decompression"
  | "Daily thread + summary"
  | "Shadow calendar + verification"
  | "DNA onboarding";
type Frequency = "Daily" | "3–5x per week" | "1–2x per week" | "Occasionally";

type Answers = {
  role?: Role;
  goals?: Goal[];
  capture?: Capture;
  firstFeature?: FirstFeature;
  frequency?: Frequency;
  country?: string;
  email?: string;
  whatsapp?: string;
  consent?: "I accept" | "I don’t accept";
};

type Step =
  | { type: "choice"; key: keyof Answers; title: string; options: string[] }
  | {
      type: "multi";
      key: "goals";
      title: string;
      options: Goal[];
      helper?: string;
    }
  | { type: "text"; key: keyof Answers; title: string; placeholder: string; helper?: string }
  | { type: "email"; key: "email"; title: string; placeholder: string }
  | { type: "phone"; key: "whatsapp"; title: string; placeholder: string; helper?: string };

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function looksLikePhone(value: string) {
  const v = value.trim();
  // Simple: allow +, digits, spaces, dashes, parentheses. Require at least 8 digits.
  const digits = (v.match(/\d/g) ?? []).length;
  return digits >= 8 && /^[+\d\s().-]+$/.test(v);
}

export function WaitlistWizard() {
  const reduced = useReducedMotion();
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [textValue, setTextValue] = useState("");
  const [multiGoals, setMultiGoals] = useState<Goal[]>([]);
  const [status, setStatus] = useState<
    | { state: "idle" }
    | { state: "submitting" }
    | { state: "done" }
    | { state: "error"; message: string }
  >({ state: "idle" });

  const steps: Step[] = useMemo(
    () => [
      {
        type: "choice",
        key: "role",
        title: "What best describes you?*",
        options: ["Founder / OBO", "Creative", "High performer", "Other"],
      },
      {
        type: "multi",
        key: "goals",
        title: "What are you trying to improve most right now?*",
        helper: "Select all that apply.",
        options: [
          "Clear my mind daily",
          "Plan my days better",
          "Follow-through on tasks",
          "Reduce stress & burnout",
          "Increase creative output",
        ] as Goal[],
      },
      {
        type: "choice",
        key: "capture",
        title: "How do you capture thoughts today?*",
        options: ["Notes app", "Journal", "Voice notes", "WhatsApp/DM to self", "Nothing consistent"],
      },
      {
        type: "choice",
        key: "firstFeature",
        title: "Which feature would make you try Ọ̀rẹ́ first?*",
        options: [
          "Voice decompression",
          "Daily thread + summary",
          "Shadow calendar + verification",
          "DNA onboarding",
        ],
      },
      {
        type: "choice",
        key: "frequency",
        title: "How often would you use it?*",
        options: ["Daily", "3–5x per week", "1–2x per week", "Occasionally"],
      },
      {
        type: "text",
        key: "country",
        title: "What is your country of residence?*",
        placeholder: "Type your answer here…",
      },
      {
        type: "email",
        key: "email",
        title: "What’s your email?*",
        placeholder: "you@domain.com",
      },
      {
        type: "phone",
        key: "whatsapp",
        title: "What’s your WhatsApp number?*",
        placeholder: "+234 800 000 0000",
        helper: "Include country code.",
      },
      {
        type: "choice",
        key: "consent",
        title:
          "Do you consent to using your contact information to send you promotional emails, messages, and an exclusive invitation when Ọ̀rẹ́ goes live?*",
        options: ["I accept", "I don’t accept"],
      },
    ],
    [],
  );

  const step = steps[stepIdx];
  const total = steps.length;

  const canContinue = useMemo(() => {
    if (status.state === "submitting") return false;
    if (status.state === "done") return false;

    if (step.type === "choice") return true;
    if (step.type === "multi") return multiGoals.length > 0;
    if (step.type === "text") return textValue.trim().length > 0;
    if (step.type === "email") return isEmail(textValue);
    if (step.type === "phone") return looksLikePhone(textValue);
    return false;
  }, [status.state, step, textValue, multiGoals.length]);

  async function submit(payload: Answers) {
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus({
          state: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }
      setStatus({ state: "done" });
    } catch {
      setStatus({ state: "error", message: "Network error. Please try again." });
    }
  }

  function setChoice(value: string) {
    setStatus({ state: "idle" });

    // If the final step is consent, submit from here (choice-steps don't use OK).
    const isLast = stepIdx === total - 1;
    if (isLast && step.key === "consent") {
      if (value !== "I accept") {
        setStatus({
          state: "error",
          message: "Please accept to receive an invite when we go live.",
        });
        return;
      }

      const payload: Answers = { ...answers, consent: value, goals: multiGoals };
      setAnswers(payload);
      void submit(payload);
      return;
    }

    setAnswers((a) => ({ ...a, [step.key]: value }));
    setStepIdx((s) => Math.min(total - 1, s + 1));
    setTextValue("");
  }

  function toggleGoal(g: Goal) {
    setMultiGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g],
    );
    setStatus({ state: "idle" });
  }

  async function onOk() {
    if (!canContinue) return;
    const v = textValue.trim();
    if (step.type === "multi") {
      setAnswers((a) => ({ ...a, goals: multiGoals }));
    } else if (step.type !== "choice") {
      setAnswers((a) => ({ ...a, [step.key]: v }));
    }
    setStatus({ state: "idle" });

    const isLast = stepIdx === total - 1;
    if (!isLast) {
      setStepIdx((s) => s + 1);
      setTextValue("");
      return;
    }

    const payload: Answers =
      step.type === "multi"
        ? { ...answers, goals: multiGoals }
        : step.type === "choice"
          ? answers
          : { ...answers, [step.key]: v };

    if (payload.consent !== "I accept") {
      setStatus({
        state: "error",
        message: "Please accept to receive an invite when we go live.",
      });
      return;
    }

    await submit(payload);
  }

  function onBack() {
    if (status.state === "submitting") return;
    if (stepIdx === 0) return;
    setStatus({ state: "idle" });
    setStepIdx((s) => Math.max(0, s - 1));
    setTextValue("");
    if (step.type === "multi") setMultiGoals([]);
  }

  if (status.state === "done") {
    return (
      <div className="w-full max-w-2xl text-center">
        <div className="text-xs font-semibold tracking-wide text-white/65">
          You’re in
        </div>
        <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-(--cream) md:text-4xl">
          Thanks — we’ll reach out soon.
        </h2>
        <p className="mt-3 text-sm leading-6 text-white/75">
          We’re onboarding in waves. Keep an eye on your email (and WhatsApp if you opted in).
        </p>
        <a
          href="/"
          className="mt-7 inline-flex h-10 items-center justify-center rounded-full bg-(--cream) px-8 text-sm font-semibold text-black"
        >
          Back home
        </a>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="text-xs text-white/55">
          {stepIdx + 1} / {total}
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs font-semibold text-white/55 hover:text-white disabled:opacity-40"
          disabled={stepIdx === 0}
        >
          Back
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stepIdx}
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mt-10"
        >
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-white/15 bg-white/5 text-xs text-white/80">
              {stepIdx + 1}
            </span>
            <h2 className="text-balance text-xl font-extrabold tracking-tight text-(--cream) md:text-2xl">
              {step.title}
            </h2>
          </div>

          <div className="mt-10">
            {step.type === "choice" ? (
              <div className="mx-auto grid max-w-xl gap-3">
                {step.options.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setChoice(o)}
                    className="rounded-2xl border border-white/12 bg-white/6 px-5 py-4 text-left text-sm font-medium text-white/85 backdrop-blur transition hover:bg-white/12"
                  >
                    <span className="flex items-center justify-between gap-4">
                      <span>{o}</span>
                      <span className="text-xs text-white/45">↵</span>
                    </span>
                  </button>
                ))}

                {step.key === "consent" ? (
                  <div className="mt-2 text-xs text-white/55">
                    You can withdraw consent at any time. See our{" "}
                    <a
                      className="underline underline-offset-4 hover:text-white"
                      href="/privacy"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      className="underline underline-offset-4 hover:text-white"
                      href="/terms"
                    >
                      Terms of Use
                    </a>
                    .
                  </div>
                ) : null}
              </div>
            ) : step.type === "multi" ? (
              <div className="mx-auto grid max-w-xl gap-3">
                {step.options.map((o) => {
                  const selected = multiGoals.includes(o);
                  return (
                    <button
                      key={o}
                      type="button"
                      onClick={() => toggleGoal(o)}
                      className={`rounded-2xl border px-5 py-4 text-left text-sm font-medium backdrop-blur transition ${
                        selected
                          ? "border-white/25 bg-white/14 text-white"
                          : "border-white/12 bg-white/6 text-white/85 hover:bg-white/12"
                      }`}
                    >
                      <span className="flex items-center justify-between gap-4">
                        <span>{o}</span>
                        <span className="text-xs text-white/55">
                          {selected ? "Selected" : "Tap to select"}
                        </span>
                      </span>
                    </button>
                  );
                })}
                {step.helper ? (
                  <div className="mt-1 text-xs text-white/55">{step.helper}</div>
                ) : null}
                <div className="mt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onOk}
                    disabled={!canContinue}
                    className="inline-flex h-9 items-center justify-center rounded-full bg-[rgba(245,241,230,0.88)] px-6 text-xs font-extrabold text-black disabled:opacity-40"
                  >
                    OK
                  </button>
                  {status.state === "error" ? (
                    <div className="text-xs text-red-300">{status.message}</div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-xl">
                <input
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onOk();
                  }}
                  placeholder={step.placeholder}
                  autoFocus
                  className="w-full bg-transparent px-1 py-3 text-xl font-medium text-white/95 outline-none placeholder:text-white/30"
                />
                <div className="h-px w-full bg-white/30" />
                {"helper" in step && step.helper ? (
                  <div className="mt-2 text-xs text-white/55">{step.helper}</div>
                ) : null}

                <div className="mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onOk}
                    disabled={!canContinue}
                    className="inline-flex h-9 items-center justify-center rounded-full bg-[rgba(245,241,230,0.85)] px-6 text-xs font-extrabold text-black disabled:opacity-40"
                  >
                    OK
                  </button>
                  {status.state === "error" ? (
                    <div className="text-xs text-red-300">{status.message}</div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

