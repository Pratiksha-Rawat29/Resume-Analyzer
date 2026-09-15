import multer from "multer";

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  console.error("[error]", err.message);

  if (err instanceof multer.MulterError) {
    const message =
      err.code === "LIMIT_FILE_SIZE"
        ? "File is too large. Maximum size is 5MB."
        : err.message;
    return res.status(400).json({ error: message });
  }

  if (err.message?.includes("Only PDF files")) {
    return res.status(400).json({ error: err.message });
  }

  if (err.message?.includes("Could not extract any text")) {
    return res.status(422).json({ error: err.message });
  }

  if (err.message?.includes("Gemini")) {
    return res.status(502).json({ error: err.message });
  }

  return res.status(500).json({ error: "Something went wrong on the server." });
}
