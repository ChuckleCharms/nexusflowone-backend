// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/db.js";

// ROUTES
import authRoutes from "./routes/auth.js";
// (You can add more later: projects, workflows, etc.)

dotenv.config();

const app = express();

// --- CORS & JSON BODY PARSING ---
app.use(
  cors({
    origin: "*", // allow all origins (Vercel, custom domains, etc.)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes);

// Simple root healthcheck
app.get("/", (req, res) => {
  res.send("NexusFlow One Backend Running");
});

// Quick debug endpoint to test from browser
app.get("/api/auth/ping", (req, res) => {
  res.json({
    ok: true,
    message: "Auth route is alive on NexusFlow One backend.",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
