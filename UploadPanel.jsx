import { useCallback, useRef, useState } from "react";

export default function UploadPanel({ onSubmit, loading }) {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState("");
  const inputRef = useRef(null);

  const acceptFile = useCallback((candidate) => {
    if (!candidate) return;
    if (candidate.type !== "application/pdf") {
      setValidationError("Only PDF files are accepted.");
      return;
    }
    if (candidate.size > 5 * 1024 * 1024) {
      setValidationError("File is too large — 5MB max.");
      return;
    }
    setValidationError("");
    setFile(candidate);
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    acceptFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setValidationError("Attach a resume PDF to continue.");
      return;
    }
    onSubmit(file, jobDescription);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-5">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`md:col-span-3 cursor-pointer rounded-sm border-2 border-dashed p-10 text-center transition-colors bg-margin-lines ${
          isDragging
            ? "border-signal bg-signal-soft"
            : "border-rule hover:border-ink-soft"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => acceptFile(e.target.files?.[0])}
        />
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
          Exhibit A
        </p>
        <p className="mt-3 font-display text-xl text-ink">
          {file ? file.name : "Drop your resume here"}
        </p>
        <p className="mt-1 text-sm text-ink-soft">
          {file
            ? `${(file.size / 1024).toFixed(0)} KB — click to replace`
            : "PDF only, up to 5MB, or click to browse"}
        </p>
      </div>

      <div className="md:col-span-2 flex flex-col">
        <label
          htmlFor="jobDescription"
          className="font-mono text-xs uppercase tracking-widest text-ink-soft"
        >
          Exhibit B — target role (optional)
        </label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description to score against a specific role..."
          className="focus-ring mt-3 h-full min-h-[9rem] resize-none rounded-sm border border-rule bg-white/60 p-4 text-sm text-ink placeholder:text-ink-soft/60"
        />
      </div>

      {validationError && (
        <p className="md:col-span-5 -mt-2 font-mono text-sm text-flag">
          {validationError}
        </p>
      )}

      <div className="md:col-span-5 flex items-center justify-between border-t border-rule pt-6">
        <p className="text-sm text-ink-soft">
          Your file is parsed in memory and never stored on disk.
        </p>
        <button
          type="submit"
          disabled={loading}
          className="focus-ring rounded-sm bg-ink px-6 py-3 font-mono text-xs uppercase tracking-widest text-paper transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Reviewing…" : "Run analysis"}
        </button>
      </div>
    </form>
  );
}
