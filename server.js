// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

// Basic CORS – open for now so Vercel + custom domain work
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Health check / root
app.get("/", (req, res) => {
  res.send("NexusFlow One Backend Running");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`NexusFlow One backend listening on port ${PORT}`);
});

