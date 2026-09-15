import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

/**
 * Uploads a resume PDF (and optional job description) to the backend,
 * which runs it through Multer -> pdf-parse -> Gemini.
 */
export async function analyzeResume(file, jobDescription) {
  const formData = new FormData();
  formData.append("resume", file);
  if (jobDescription?.trim()) {
    formData.append("jobDescription", jobDescription.trim());
  }

  const { data } = await client.post("/resume/analyze", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return data;
}
