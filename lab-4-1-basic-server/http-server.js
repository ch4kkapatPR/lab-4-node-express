const http = require('http');
const url = require('url');

const PORT = 3000;

// ✅ สร้างข้อมูลจำลอง students array
const students = [
  { id: 1, name: 'สมชาย ใจดี', major: 'วิศวกรรม', year: 3 },
  { id: 2, name: 'สุดา เก่งมาก', major: 'วิทยาการคอมพิวเตอร์', year: 2 },
  { id: 3, name: 'อนันต์ ฉลาดสุด', major: 'วิศวกรรม', year: 4 },
];

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = decodeURI(parsedUrl.pathname); // รองรับ path ภาษาไทย
  const method = req.method;

  // ✅ Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (method === 'GET' && pathname === '/') {
    // ✅ route GET /
    const message = {
      message: '👋 ยินดีต้อนรับสู่ Student API',
      endpoints: [
        'GET /',
        'GET /students',
        'GET /students/:id',
        'GET /students/major/:major',
      ],
    };
    res.statusCode = 200;
    res.end(JSON.stringify(message));
  }

  else if (method === 'GET' && pathname === '/students') {
    // ✅ route GET /students
    res.statusCode = 200;
    res.end(JSON.stringify(students));
  }

  else if (method === 'GET' && pathname.startsWith('/students/major/')) {
    // ✅ route GET /students/major/:major
    const major = pathname.split('/')[3];
    const filtered = students.filter(s => s.major === major);
    if (filtered.length > 0) {
      res.statusCode = 200;
      res.end(JSON.stringify(filtered));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: `ไม่พบนักศึกษาสาขา ${major}` }));
    }
  }

  else if (method === 'GET' && pathname.startsWith('/students/')) {
    // ✅ route GET /students/:id
    const id = Number(pathname.split('/')[2]);
    const student = students.find(s => s.id === id);
    if (student) {
      res.statusCode = 200;
      res.end(JSON.stringify(student));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: `ไม่พบนักศึกษารหัส ${id}` }));
    }
  }

  else {
    // ✅ จัดการกรณี 404 Not Found
    res.statusCode = 404;
    res.end(JSON.stringify({ error: '404 Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`🌐 HTTP Server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET /');
  console.log('  GET /students');
  console.log('  GET /students/:id');
  console.log('  GET /students/major/:major');
});
