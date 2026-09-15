import "./config/env.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import resumeRoutes from "./routes/resumeRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN.split(",").map((o) => o.trim()) }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "AI Resume Analyzer API is running." });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// Centralized error handler (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Resume analyzer backend listening on http://localhost:${PORT}`);
});
