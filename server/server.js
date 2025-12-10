import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


const usersDatabase = [];

// مسیر ثبت نام (همان که در useFaceRegistration صدا می‌زنید)
app.post("/register", (req, res) => {
  const { name, studentId, faceDescriptor } = req.body;

  if (!name || !studentId || !faceDescriptor) {
    return res.status(400).json({ error: "اطلاعات ناقص است" });
  }

  // بررسی تکراری نبودن (ساده)
  const existingUser = usersDatabase.find((u) => u.studentId === studentId);
  if (existingUser) {
    return res
      .status(400)
      .json({ error: "این شماره دانشجویی قبلاً ثبت شده است" });
  }

  // ذخیره کاربر
  const newUser = {
    id: Date.now(),
    name,
    studentId,
    faceDescriptor, // این همان آرایه‌ای است که برای تشخیص هویت لازم داریم
    createdAt: new Date(),
  };

  usersDatabase.push(newUser);

  console.log(`User registered: ${name} (${studentId})`);
  console.log(`Total users: ${usersDatabase.length}`);

  res
    .status(200)
    .json({ message: "ثبت نام با موفقیت انجام شد", userId: newUser.id });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
