import { extractTextFromPdf } from "../services/pdfService.js";
import { analyzeResumeWithGemini } from "../services/geminiService.js";

export async function analyzeResume(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No resume file uploaded. Attach a PDF under the 'resume' field.",
      });
    }

    const { jobDescription } = req.body;

    // Step 1: Multer already gave us the file buffer in memory.
    // Step 2: pdf-parse extracts raw text from that buffer.
    const resumeText = await extractTextFromPdf(req.file.buffer);

    // Step 3: send resume text (+ optional job description) to Gemini.
    const analysis = await analyzeResumeWithGemini(resumeText, jobDescription);

    return res.status(200).json({
      success: true,
      fileName: req.file.originalname,
      analysis,
    });
  } catch (err) {
    next(err);
  }
}

export function healthCheck(req, res) {
  res.status(200).json({ status: "ok", service: "resume-analyzer-backend" });
}
