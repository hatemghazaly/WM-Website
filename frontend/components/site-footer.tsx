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

          <p className="pt-2 text-xs text-white/70">
            © {new Date().getFullYear()} Willi Med. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
