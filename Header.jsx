export default function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs tracking-widest text-signal">
            NO. 001
          </span>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
            Resume Analyzer
          </h1>
        </div>
        <span className="hidden font-mono text-xs uppercase tracking-widest text-ink-soft sm:block">
          Reviewed by Gemini
        </span>
      </div>
    </header>
  );
}
