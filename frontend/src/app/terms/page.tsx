import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Ọ̀rẹ́",
  description: "Terms of Use for Ọ̀rẹ́.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <div className="mx-auto w-full max-w-3xl px-6 py-14 md:px-10">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Terms of Use</h1>
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
            These Terms of Use (“Terms”) govern your access to and use of Ọ̀rẹ́
            (the “Service”). By using the Service, you agree to these Terms.
          </p>

          <h2>1. The Service</h2>
          <p>
            Ọ̀rẹ́ is a productivity and reflection system that may include text
            capture, voice interaction, and calendar/task assistance features. The
            Service is provided on an “as is” and “as available” basis.
          </p>

          <h2>2. Eligibility</h2>
          <p>
            You must be legally able to form a binding contract in your
            jurisdiction to use the Service.
          </p>

          <h2>3. Your Content</h2>
          <p>
            You retain ownership of the content you submit (e.g., journal entries,
            messages, voice transcripts, calendar inputs) (“User Content”). You
            grant us a limited license to host, process, and display User Content
            solely to operate and improve the Service.
          </p>

          <h2>4. Privacy</h2>
          <p>
            Our Privacy Policy explains how we handle personal information. By
            using the Service, you agree to our Privacy Policy.
          </p>

          <h2>5. Acceptable Use</h2>
          <ul>
            <li>Do not use the Service for unlawful purposes.</li>
            <li>Do not attempt to access or disrupt systems or data improperly.</li>
            <li>Do not upload malware or exploit vulnerabilities.</li>
          </ul>

          <h2>6. AI Outputs</h2>
          <p>
            The Service may generate suggestions, summaries, or schedules. These
            outputs can be inaccurate. You are responsible for reviewing and
            confirming anything important (including commitments and calendar
            blocks).
          </p>

          <h2>7. Accounts and Security</h2>
          <p>
            You are responsible for maintaining the confidentiality of your
            account and for all activity under your account.
          </p>

          <h2>8. Termination</h2>
          <p>
            We may suspend or terminate access to the Service at any time if we
            reasonably believe you violated these Terms or if necessary to protect
            the Service, other users, or third parties.
          </p>

          <h2>9. Changes</h2>
          <p>
            We may update these Terms from time to time. If changes are material,
            we will provide reasonable notice. Continued use of the Service after
            changes become effective constitutes acceptance.
          </p>

          <h2>10. Contact</h2>
          <p>
            Questions about these Terms? Email{" "}
            <a href="mailto:hello@ore.so">hello@ore.so</a>.
          </p>
        </div>
      </div>
    </main>
  );
}

