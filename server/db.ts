// server/db.ts
import dotenv from "dotenv";
dotenv.config();
import pkg from "pg";
const { Pool } = pkg;

import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
export const pgPool = pool;  
