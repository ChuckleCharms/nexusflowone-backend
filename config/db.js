// backend/config/db.js
import pkg from "pg";
const { Pool } = pkg;

// Railway puts your connection string in process.env.DATABASE_URL
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("❌ DATABASE_URL is not set");
  throw new Error("DATABASE_URL environment variable is required");
}

export const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});


