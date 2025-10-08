const express = require('express');
const app = express();
const PORT = 3001;

// ✅ สร้างข้อมูลจำลอง students array (เหมือน http-server.js)
const students = [
  { id: 1, name: 'สมชาย ใจดี', major: 'วิศวกรรม', year: 3 },
  { id: 2, name: 'สุดา เก่งมาก', major: 'วิทยาการคอมพิวเตอร์', year: 2 },
  { id: 3, name: 'อนันต์ ฉลาดสุด', major: 'วิศวกรรม', year: 4 },
  { id: 4, name: 'ศิริพร ตั้งใจ', major: 'บริหารธุรกิจ', year: 1 },
];

// ✅ Middleware
app.use(express.json());

// ✅ Route GET / (ต้อนรับ)
app.get('/', (req, res) => {
  res.json({
    message: '👋 ยินดีต้อนรับสู่ Student API (Express)',
    endpoints: [
      'GET /',
      'GET /students',
      'GET /students/:id',
      'GET /students/major/:major',
      'GET /stats',
    ],
  });
});

// ✅ Route GET /students (รายการนักศึกษา)
app.get('/students', (req, res) => {
  res.json(students);
});

// ✅ Route GET /students/:id (หานักศึกษาตาม id)
app.get('/students/:id', (req, res) => {
  const id = Number(req.params.id);
  const student = students.find((s) => s.id === id);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: `ไม่พบนักศึกษารหัส ${id}` });
  }
});

// ✅ Route GET /students/major/:major (กรองตามสาขา)
app.get('/students/major/:major', (req, res) => {
  const major = req.params.major;
  const filtered = students.filter((s) => s.major === major);
  if (filtered.length > 0) {
    res.json(filtered);
  } else {
    res.status(404).json({ error: `ไม่พบนักศึกษาสาขา ${major}` });
  }
});

// ✅ Route GET /stats (ข้อมูลสถิติ)
app.get('/stats', (req, res) => {
  const total = students.length;

  // นับจำนวนนักศึกษาแยกตามสาขา
  const byMajor = students.reduce((acc, s) => {
    acc[s.major] = (acc[s.major] || 0) + 1;
    return acc;
  }, {});

  res.json({
    totalStudents: total,
    studentsByMajor: byMajor,
  });
});

// ✅ Middleware 404 (ต้องวางไว้ล่างสุด)
app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Express Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET /');
  console.log('  GET /students');
  console.log('  GET /students/:id');
  console.log('  GET /students/major/:major');
  console.log('  GET /stats');
});
