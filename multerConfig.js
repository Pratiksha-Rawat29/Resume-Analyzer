import multer from "multer";

// Resumes are parsed in-memory and never written to disk, so we don't
// need to manage cleanup of temp files.
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const isPdf =
    file.mimetype === "application/pdf" ||
    file.originalname.toLowerCase().endsWith(".pdf");

  if (!isPdf) {
    return cb(new Error("Only PDF files are supported."), false);
  }
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
