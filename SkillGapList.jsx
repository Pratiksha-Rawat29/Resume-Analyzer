function Column({ title, items, tone }) {
  const toneClasses =
    tone === "signal"
      ? "border-signal/40 bg-signal-soft text-signal"
      : "border-flag/40 bg-flag-soft text-flag";

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
        {title}
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items?.length ? (
          items.map((item, i) => (
            <li
              key={i}
              className={`rounded-full border px-3 py-1 text-sm ${toneClasses}`}
            >
              {item}
            </li>
          ))
        ) : (
          <li className="text-sm text-ink-soft">Nothing to show.</li>
        )}
      </ul>
    </div>
  );
}

export default function SkillGapList({ matchedSkills, missingSkills }) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <Column title="Skills you have" items={matchedSkills} tone="signal" />
      <Column title="Skill gap" items={missingSkills} tone="flag" />
    </div>
  );
}
