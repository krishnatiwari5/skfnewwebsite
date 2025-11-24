// server/db.ts
import dotenv from "dotenv";
dotenv.config();
// prefer IPv4 when DNS returns both A and AAAA
import dns from "dns";
if (typeof dns.setDefaultResultOrder === "function") {
  try {
    dns.setDefaultResultOrder("ipv4first");
    console.log("[dns] set default result order to ipv4first");
  } catch (e) {
    console.warn("[dns] could not set default result order:", e);
  }
}

import pkg from "pg";
const { Pool } = pkg;
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } as any, // required for many hosted DBs (Supabase)
});

// helpful error handler
pool.on("error", (err: any) => {
  console.error("[pg] unexpected error on idle client", err);
});

export const db = drizzle(pool, { schema });
export const pgPool = pool;

// helper to close pool on shutdown (useful in tests)
export async function closeDb() {
  await pool.end();
}
