export default function ScoreGauge({ score = 0, label = "Overall match" }) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = 70;
  const circumference = Math.PI * radius; // half circle
  const offset = circumference - (clamped / 100) * circumference;

  const tone =
    clamped >= 75 ? "#2F6F5E" : clamped >= 50 ? "#C9752B" : "#B23A3A";

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 180 100" className="w-56">
        <path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke="#D8D4C6"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d="M 20 90 A 70 70 0 0 1 160 90"
          fill="none"
          stroke={tone}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms ease" }}
        />
        <text
          x="90"
          y="78"
          textAnchor="middle"
          className="font-mono"
          fontSize="30"
          fill="#1B1F27"
        >
          {Math.round(clamped)}
        </text>
      </svg>
      <p className="-mt-2 font-mono text-xs uppercase tracking-widest text-ink-soft">
        {label}
      </p>
    </div>
  );
}
