export function SiteFooter() {
  return (
    <footer className="border-t border-emerald-100 bg-[#EEF8F1] px-4 py-8 text-sm text-black md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-md text-center sm:text-left">
          <p className="text-lg font-semibold text-black">
            Willi Med For Pharmaceutical Industries
          </p>

          <p className="mt-2 text-black">
            Committed to quality care and trusted partnerships.
          </p>

          <div className="mt-4 space-y-2">
            <p>
              📞{" "}
              <a
                href="tel:+202123456789"
                className="transition hover:text-emerald-700"
              >
                +20 2 1234 56789
              </a>
            </p>

            <p>
              📱{" "}
              <a
                href="tel:+201001234567"
                className="transition hover:text-emerald-700"
              >
                +20 100 123 4567
              </a>
            </p>

            <p>
              ✉️{" "}
              <a
                href="mailto:info@willimed.com"
                className="transition hover:text-emerald-700"
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
              className="transition hover:text-emerald-700 hover:underline"
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
              className="transition hover:text-emerald-700 hover:underline"
            >
              Aleja Solidarności 60A, Local 122, 00-240 Warsaw, Poland
            </a>
          </div>

          <p className="pt-2 text-xs text-gray-700">
            © {new Date().getFullYear()} Willi Med. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
