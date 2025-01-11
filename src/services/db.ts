import { Pool } from "pg";
import dotenv from "dotenv";
import { DBPatient } from "../types/patient";

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  ssl: {
    rejectUnauthorized: false, // This is for local development only
  },
});

export async function query(
  sqlString: string,
  params?: string[]
): Promise<DBPatient[]> {
  const client = await pool.connect();
  try {
    const res = await client.query(sqlString, params);
    return res.rows;
  } finally {
    client.release();
  }
}

export default pool;
