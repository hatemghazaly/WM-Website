export function SiteFooter() {
  return (
    <footer className="border-t bg-background/95 px-4 py-8 text-sm text-muted-foreground md:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p className="font-semibold">
            Willi Med For Pharmaceutical Industries
          </p>
          <p>Committed to quality care and trusted partnerships.</p>
        </div>

        <div className="space-y-2 sm:space-y-0 sm:text-right">
          <p>
            Building No.(4) - Floor No.(13) - Apt. No.(26) Abdel Hakim El-Refaey
            St. from Abbas Al Akkad, Nasr City, Cairo, Egypt{" "}
          </p>
          <p>
            ALEJA "SOLIDARNOŚCI", numer 60A, lokal 122, kod poczt. 00-240,
            Warszawa, Poland
          </p>
          <p>© {new Date().getFullYear()} Willi Med. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
