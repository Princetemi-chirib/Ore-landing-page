import Image from "next/image";

function SocialTile({
  label,
  href,
  icon,
}: {
  label: string;
  href: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="group flex items-center justify-center gap-3 px-6 py-5 text-sm font-medium text-(--cream) transition hover:bg-white/5"
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-(--cream) shadow-sm backdrop-blur transition group-hover:bg-white/10">
        {icon}
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </a>
  );
}

export function Footer() {
  return (
    <footer className="mt-20">
      <div className="relative overflow-hidden bg-black">
        <div className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 md:px-10">
          <div className="grid gap-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-2xl">
                  <Image
                    src="/images/logo 3.png"
                    alt="Ọ̀rẹ́"
                    fill
                    sizes="48px"
                    className="object-contain"
                  />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-extrabold tracking-tight text-(--cream)">
                    Ọ̀rẹ́
                  </div>
                  <div className="text-xs text-white/55">The Cognitive CRM</div>
                </div>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-6 text-white/70">
                One high-utility second brain for your ideas, emotions, and
                commitments.
              </p>
            </div>

            <div className="md:col-span-7">
              <div className="grid gap-10 sm:grid-cols-3">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-white/65">
                    Product
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-white/70">
                    <a className="hover:text-white" href="#how-it-works">
                      Features
                    </a>
                    <a className="hover:text-white" href="#faqs">
                      FAQs
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold tracking-wide text-white/65">
                    Legal
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-white/70">
                    <a className="hover:text-white" href="/terms">
                      Terms of Use
                    </a>
                    <a className="hover:text-white" href="/privacy">
                      Privacy Policy
                    </a>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold tracking-wide text-white/65">
                    About
                  </div>
                  <div className="mt-3 grid gap-2 text-sm text-white/70">
                    <a className="hover:text-white" href="#about">
                      Meet the Team
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur">
              <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
                <SocialTile
                  label="Instagram"
                  href="#"
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9A4.75 4.75 0 0 1 16.5 21.25h-9A4.75 4.75 0 0 1 2.75 16.5v-9A4.75 4.75 0 0 1 7.5 2.75Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M12 16.25a4.25 4.25 0 1 0 0-8.5 4.25 4.25 0 0 0 0 8.5Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      />
                      <path
                        d="M17.25 6.9h.01"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  }
                />
                <SocialTile
                  label="TikTok"
                  href="#"
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M14 3v10.1a4.7 4.7 0 1 1-4-4.6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 7.2c1.1 1.7 2.8 2.8 4.9 2.9V7.1c-1.4-.2-2.7-1-3.6-2.1-.5-.6-.9-1.3-1.1-2H14v4.2Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                />
                <SocialTile
                  label="YouTube"
                  href="#"
                  icon={
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20.5 7.4a2.6 2.6 0 0 0-1.8-1.9C16.9 5 12 5 12 5s-4.9 0-6.7.5A2.6 2.6 0 0 0 3.5 7.4 27 27 0 0 0 3 12s0 3.5.5 4.6a2.6 2.6 0 0 0 1.8 1.9c1.8.5 6.7.5 6.7.5s4.9 0 6.7-.5a2.6 2.6 0 0 0 1.8-1.9c.5-1.1.5-4.6.5-4.6s0-3.5-.5-4.6Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.3 9.7v4.6l4.2-2.3-4.2-2.3Z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                />
              </div>
            </div>
          </div>

          <div className="mt-10 text-center text-xs text-white/55">
            © {new Date().getFullYear()} Ọ̀rẹ́. All rights reserved.
          </div>
          <div className="mt-3 text-center text-xs text-white/55">
            <a className="hover:text-white" href="mailto:hello@ore.so">
              hello@ore.so
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

