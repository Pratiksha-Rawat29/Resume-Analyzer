import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || "gemini-2.0-flash";

if (!apiKey) {
  console.warn(
    "[geminiService] GEMINI_API_KEY is not set. Requests to Gemini will fail until it is configured in backend/.env"
  );
}

const genAI = new GoogleGenerativeAI(apiKey || "missing-key");

const RESPONSE_SCHEMA_HINT = `
Return ONLY valid JSON (no markdown fences, no commentary) matching exactly this shape:

{
  "overallScore": number,               // 0-100 overall ATS / fit score
  "summary": string,                    // 2-3 sentence plain-language summary
  "matchedSkills": string[],            // skills from the resume relevant to the target role/JD
  "missingSkills": string[],            // skill-gap: important skills missing from the resume
  "strengths": string[],                // 3-5 concrete strengths
  "weaknesses": string[],               // 3-5 concrete weaknesses or gaps
  "suggestions": string[],              // 3-6 actionable improvement suggestions
  "keywordMatch": {
    "matched": string[],                // keywords from the JD found in the resume
    "missing": string[]                 // keywords from the JD absent from the resume
  },
  "atsFriendliness": {
    "score": number,                    // 0-100, formatting/parseability score
    "notes": string[]                   // notes on formatting issues (tables, columns, images, fonts, etc.)
  }
}
`;

function buildPrompt(resumeText, jobDescription) {
  const jdBlock = jobDescription?.trim()
    ? `TARGET JOB DESCRIPTION:\n"""${jobDescription.trim()}"""`
    : `No specific job description was provided. Evaluate the resume generally against strong industry standards for the role it appears to target, and infer the likely target role from the resume content itself.`;

  return `You are an expert technical recruiter and ATS (Applicant Tracking System) analyst.
Analyze the resume below${jobDescription?.trim() ? " against the target job description" : ""} and identify skill gaps, strengths, weaknesses, and concrete improvement suggestions.

RESUME TEXT:
"""${resumeText}"""

${jdBlock}

${RESPONSE_SCHEMA_HINT}

Rules:
- Be specific and reference real content from the resume, not generic advice.
- "missingSkills" should be genuine skill-gap items, not restatements of what's already present.
- Keep arrays concise (max ~8 items each).
- Output must be raw JSON only.`;
}

/**
 * Strips markdown code fences that models sometimes wrap JSON in,
 * even when explicitly told not to.
 */
function stripCodeFences(text) {
  return text
    .trim()
    .replace(/^```(?:json)?/i, "")
    .replace(/```$/i, "")
    .trim();
}

/**
 * Calls Gemini with the resume text (and optional job description) and
 * returns a parsed, structured analysis object.
 */
export async function analyzeResumeWithGemini(resumeText, jobDescription) {
  const model = genAI.getGenerativeModel({
    model: modelName,
    generationConfig: {
      responseMimeType: "application/json",
      temperature: 0.4,
    },
  });

  const prompt = buildPrompt(resumeText, jobDescription);

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();
  const cleaned = stripCodeFences(rawText);

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(
      "Gemini returned a response that could not be parsed as JSON. Please try again."
    );
  }
}
