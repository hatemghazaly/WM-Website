type SocialIconProps = {
  className?: string;
};

function FacebookLogo({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 512"
      fill="currentColor"
      className={className}
    >
      <path d="M80 299.3V512h124V299.3h87.7l18.7-97.4H204V166.4c0-51.2 20.2-72.7 72.7-72.7H312V.1C295.6-.4 263.4 0 225.9 0c-73.2 0-123.7 44.6-123.7 126.3v75.6H22.1v97.4H80z" />
    </svg>
  );
}

function LinkedinLogo({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.67H9.35V9h3.41v1.56h.05c.48-.91 1.65-1.85 3.4-1.85 3.63 0 4.29 2.39 4.29 5.5v6.24ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function TelegramLogo({ className }: SocialIconProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 496 512"
      fill="currentColor"
      className={className}
    >
      <path d="M248 8C111 8 0 119.03 0 256s111 248 248 248 248-111.03 248-248S385 8 248 8zm121.23 169.82l-40.82 192.46c-3.09 13.79-11.18 17.23-22.61 10.81l-62.49-46.1-30.17 29.07c-3.33 3.33-6.12 6.12-12.55 6.12l4.49-63.66 115.86-104.54c5.04-4.49-1.1-6.95-7.79-2.46l-143.3 90.25-61.76-19.31c-13.41-4.2-13.65-13.41 2.81-19.83l241.32-93.09c11.16-4.2 20.92 2.81 17.17 19.32z" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-8 rounded-t-[2rem] border-t border-gray-700 bg-gray-800 px-4 py-8 text-sm text-white shadow-[0_-12px_40px_rgba(0,0,0,0.18)] md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md text-center sm:text-left">
          <p className="text-lg font-semibold text-white">Willi Med Group</p>

          <p className="mt-2 text-white/90">
            Y o u r&nbsp;&nbsp;&nbsp;e x c e ll e n c e&nbsp;&nbsp;&nbsp;c o d e
          </p>

          <div className="mt-4 space-y-2">
            <p>
              📞{" "}
              <a
                href="tel:+202123456789"
                className="transition hover:text-gray-200"
              >
                +20 2 1234 56789
              </a>
            </p>

            <p>
              📱{" "}
              <a
                href="tel:+201001234567"
                className="transition hover:text-gray-200"
              >
                +20 100 123 4567
              </a>
            </p>

            <p>
              ✉️{" "}
              <a
                href="mailto:info@willimed.com"
                className="transition hover:text-gray-200"
              >
                info@willimed.com
              </a>
            </p>
          </div>
        </div>

        <div className="max-w-lg space-y-4 text-left">
          <div>
            <p className="font-medium">📍 Egypt Office</p>

            <a
              href="https://maps.google.com/?q=Abdel+Hakim+El-Refaey+Street+Nasr+City+Cairo+Egypt"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-gray-200 hover:underline"
            >
              Building No. (4), Floor No. (13), Apt. No. (26), Abdel Hakim
              El-Refaey St., off Abbas Al Akkad, Nasr City, Cairo, Egypt
            </a>
          </div>

          <div>
            <p className="font-medium">📍 Poland Office</p>

            <a
              href="https://maps.google.com/?q=Aleja+Solidarnosci+60A+122+Warsaw+Poland"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-gray-200 hover:underline"
            >
              Aleja Solidarności 60A, Local 122, 00-240 Warsaw, Poland
            </a>
          </div>

          <div>
            <p className="font-medium">🔗 Follow Us</p>

            <div className="mt-3 flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=100091625206419"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#1877F2] transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                <FacebookLogo className="h-4 w-4" />
              </a>

              <a
                href="https://www.linkedin.com/company/76397040/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#0A66C2] transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                <LinkedinLogo className="h-4 w-4" />
              </a>

              <a
                href="https://t.me/RitexWilliMed"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-[#229ED9] transition hover:-translate-y-0.5 hover:bg-white/20"
              >
                <TelegramLogo className="h-4 w-4" />
              </a>
            </div>
          </div>

          <p className="pt-2 text-xs text-white/70">
            © {new Date().getFullYear()} Willi Med. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
