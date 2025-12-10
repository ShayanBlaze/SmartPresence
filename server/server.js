import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const usersDatabase = [];

app.post("/api/v1/register", (req, res) => {
  const { name, studentId, faceDescriptor } = req.body;

  if (!name || !studentId || !faceDescriptor) {
    return res.status(400).json({ error: "اطلاعات ناقص است" });
  }

  const existingUser = usersDatabase.find((u) => u.studentId === studentId);
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "این شماره دانشجویی قبلاً ثبت شده است" });
  }

  const newUser = {
    id: Date.now(),
    name,
    studentId,
    faceDescriptor,
    createdAt: new Date(),
  };

  usersDatabase.push(newUser);

  console.log(`User registered: ${name} (${studentId})`);
  console.log(`Total users: ${usersDatabase.length}`);

  res
    .status(200)
    .json({ message: "ثبت نام با موفقیت انجام شد", userId: newUser.id });
});

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});