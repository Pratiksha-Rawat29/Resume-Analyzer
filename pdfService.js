import pdfParse from "pdf-parse/lib/pdf-parse.js";

/**
 * Extracts raw text content from a PDF buffer.
 * @param {Buffer} buffer - the uploaded PDF file buffer (from Multer memory storage)
 * @returns {Promise<string>} extracted text
 */
export async function extractTextFromPdf(buffer) {
  const data = await pdfParse(buffer);
  const text = (data.text || "").trim();

  if (!text) {
    throw new Error(
      "Could not extract any text from this PDF. It may be a scanned image without a text layer."
    );
  }

  return text;
}
