import fs from "fs";
import path from "path";

function generateKey() {
  const prefix = "MaickaConz";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let suffix = "";

  for (let i = 0; i < 20; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }

  return prefix + suffix;
}

export default function handler(req, res) {
  const key = generateKey();

  const filePath = path.join(process.cwd(), "keys.json");

  let db = {};

  if (fs.existsSync(filePath)) {
    db = JSON.parse(fs.readFileSync(filePath, "utf8"));
  }

  db[key] = true; // store key as available

  fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

  return res.status(200).json({ key });
}
