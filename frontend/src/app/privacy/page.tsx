import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Ọ̀rẹ́",
  description: "Privacy Policy for Ọ̀rẹ́.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 md:px-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="mt-2 text-sm text-black/70">
              Effective date: <span className="font-medium">April 8, 2026</span>
            </p>
          </div>
          <a
            href="/"
            className="text-sm font-medium text-black underline underline-offset-4"
          >
            Back to home
          </a>
        </div>

        <div className="prose prose-zinc mt-10 max-w-none">
          <p>
            This Privacy Policy explains how Ọ̀rẹ́ (“we”, “us”) collects, uses, and
            protects information when you use the Service.
          </p>

          <h2>1. Information we collect</h2>
          <ul>
            <li>
              <strong>Account information</strong>: such as email and basic profile
              data you provide.
            </li>
            <li>
              <strong>User Content</strong>: messages, journal entries, voice
              transcripts, and related context you submit.
            </li>
            <li>
              <strong>Usage data</strong>: diagnostics and basic analytics to keep
              the Service reliable.
            </li>
          </ul>

          <h2>2. How we use information</h2>
          <ul>
            <li>Provide and operate the Service.</li>
            <li>Improve features, performance, and safety.</li>
            <li>Communicate about product updates and access (e.g., beta invites).</li>
          </ul>

          <h2>3. Privacy and security principles</h2>
          <p>
            We design with privacy in mind. Our goals include zero-knowledge
            encryption for journal entries, PII scrubbing where appropriate, and
            options for local-only storage for sensitive nodes. Specific
            availability may depend on the product stage.
          </p>

          <h2>4. Sharing</h2>
          <p>
            We do not sell your personal information. We may share limited
            information with service providers (e.g., hosting, analytics) strictly
            to operate the Service, subject to confidentiality and security
            obligations.
          </p>

          <h2>5. Data retention</h2>
          <p>
            We retain information only as long as necessary to provide the Service
            and comply with legal obligations. You may request deletion, subject to
            applicable laws and operational constraints.
          </p>

          <h2>6. Your choices</h2>
          <ul>
            <li>Access, correct, or delete certain account information.</li>
            <li>Opt out of non-essential communications.</li>
          </ul>

          <h2>7. Contact</h2>
          <p>
            Questions or requests? Email{" "}
            <a href="mailto:hello@ore.so">hello@ore.so</a>.
          </p>
        </div>
      </div>
    </main>
  );
}
