import { useState } from "react";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import UploadPanel from "./components/UploadPanel.jsx";
import Loader from "./components/Loader.jsx";
import ScoreGauge from "./components/ScoreGauge.jsx";
import SkillGapList from "./components/SkillGapList.jsx";
import SectionCard from "./components/SectionCard.jsx";
import { analyzeResume } from "./api/resumeApi.js";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleSubmit = async (file, jobDescription) => {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await analyzeResume(file, jobDescription);
      setResult(data.analysis);
      setFileName(data.fileName);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        "Something went wrong while analyzing your resume. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper font-body text-ink">
      <Header />

      <main className="mx-auto max-w-5xl px-6 py-12">
        <section>
          <p className="font-mono text-xs uppercase tracking-widest text-signal">
            Case file
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight text-ink">
            Upload a resume. Get an honest read on where it stands.
          </h2>
          <p className="mt-4 max-w-xl text-ink-soft">
            Gemini reads your resume the way an ATS and a recruiter both
            would — scoring fit, flagging missing skills, and marking up
            exactly what to fix.
          </p>
        </section>

        <section className="mt-10">
          <UploadPanel onSubmit={handleSubmit} loading={loading} />
        </section>

        {error && (
          <div className="mt-8 rounded-sm border border-flag/40 bg-flag-soft px-5 py-4 text-sm text-flag">
            {error}
          </div>
        )}

        {loading && <Loader />}

        {result && !loading && (
          <section className="mt-12 space-y-10">
            <div className="flex flex-col items-center justify-between gap-8 border-t border-rule pt-10 sm:flex-row">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                  Reviewed
                </p>
                <p className="mt-1 font-display text-xl text-ink">
                  {fileName}
                </p>
                <p className="mt-3 max-w-md text-sm text-ink-soft">
                  {result.summary}
                </p>
              </div>
              <div className="flex gap-8">
                <ScoreGauge score={result.overallScore} label="Overall match" />
                {result.atsFriendliness && (
                  <ScoreGauge
                    score={result.atsFriendliness.score}
                    label="ATS friendly"
                  />
                )}
              </div>
            </div>

            <div className="border-t border-rule pt-10">
              <SkillGapList
                matchedSkills={result.matchedSkills}
                missingSkills={result.missingSkills}
              />
            </div>

            <SectionCard
              eyebrow="Exhibit C"
              title="Strengths"
              items={result.strengths}
            />
            <SectionCard
              eyebrow="Exhibit D"
              title="Weaknesses"
              items={result.weaknesses}
            />
            <SectionCard
              eyebrow="Exhibit E"
              title="Suggestions"
              items={result.suggestions}
            />

            {result.keywordMatch && (
              <div className="border-t border-rule pt-6">
                <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                  Exhibit F
                </p>
                <h3 className="mt-1 font-display text-xl text-ink">
                  Keyword match
                </h3>
                <div className="mt-4">
                  <SkillGapList
                    matchedSkills={result.keywordMatch.matched}
                    missingSkills={result.keywordMatch.missing}
                  />
                </div>
              </div>
            )}

            {result.atsFriendliness?.notes?.length > 0 && (
              <SectionCard
                eyebrow="Exhibit G"
                title="Formatting notes"
                items={result.atsFriendliness.notes}
              />
            )}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
