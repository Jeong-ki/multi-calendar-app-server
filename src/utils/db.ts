import { required } from ".";
import "./dotenv";
import { Pool } from "pg";

const pool = new Pool({
  user: required("DB_USER"),
  host: required("DB_HOST"),
  database: required("DB_NAME"),
  password: required("DB_PASSWORD"),
  port: parseInt(required("DB_PORT"), 10),
});

export default pool;
