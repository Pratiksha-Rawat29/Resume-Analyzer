export default function Loader() {
  return (
    <div className="flex flex-col items-center gap-4 border-t border-rule py-16 text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-rule border-t-signal" />
      <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
        Reading between the lines…
      </p>
    </div>
  );
}
