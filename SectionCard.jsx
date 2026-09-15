export default function SectionCard({ eyebrow, title, items }) {
  return (
    <div className="border-t border-rule pt-6">
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
        {eyebrow}
      </p>
      <h3 className="mt-1 font-display text-xl text-ink">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items?.length ? (
          items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm text-ink-soft">
              <span className="font-mono text-signal">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item}</span>
            </li>
          ))
        ) : (
          <li className="text-sm text-ink-soft">Nothing to show.</li>
        )}
      </ul>
    </div>
  );
}
