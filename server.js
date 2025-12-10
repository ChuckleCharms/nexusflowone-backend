// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/db.js";

// ROUTES
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// --- CORS & JSON BODY PARSING ---
app.use(
  cors({
    origin: "*", // allow all origins (Vercel + nexusflowone.com)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// --- Simple DB test on startup ---
(async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Connected to Postgres");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
  }
})();

// --- ROUTES ---
app.use("/api/auth", authRoutes);

// Healthcheck root
app.get("/", (req, res) => {
  res.send("NexusFlow One Backend Running");
});

// Debug ping
app.get("/api/auth/ping", (req, res) => {
  res.json({
    ok: true,
    message: "Auth route is alive on NexusFlow One backend.",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
