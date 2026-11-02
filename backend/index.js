require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mi_base",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ mensaje: "Backend y base de datos funcionan", hora: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));