import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { key } = req.query;

  if (!key) {
    return res.status(400).json({ success: false, reason: "No key" });
  }

  const filePath = path.join(process.cwd(), "keys.json");

  if (!fs.existsSync(filePath)) {
    return res.json({ success: false, reason: "No key database yet" });
  }

  const db = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!db[key]) {
    return res.json({ success: false, reason: "Key invalid or already used" });
  }

  // Delete key after use (one-time)
  delete db[key];
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2));

  return res.json({ success: true });
}
