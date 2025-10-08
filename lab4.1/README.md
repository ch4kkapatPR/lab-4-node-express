# 🧑‍💻 Student API — HTTP & Express

โปรเจกต์นี้แสดงตัวอย่างการสร้าง REST API 2 แบบได้แก่ :
1. `http-server.js` — ใช้ Node.js HTTP core module
2. `express-server.js` — ใช้ Express Framework

---

## 📦 การติดตั้ง
- npm install express

## 🚀 การรัน Server
HTTP Server
- node http-server.js

Express Server
- node express-server.js

## การทดสอบ 
จะใช้ Curl ใน cmd หรือ terminal ก็ได้ หรือจะใช้โปรแกรมภายนอกเช่น Postman ก็ได้เช่นกัน
### ✅ HTTP Server
curl http://localhost:3000/

![alt text](./http-server-result/image.png)

curl http://localhost:3000/students

![alt text](./http-server-result/image-2.png)

curl http://localhost:3000/students/1

![alt text](./http-server-result/image-1.png)

curl http://localhost:3000/students/major/วิศวกรรม

![alt text](./http-server-result/image-3.png)

### ✅ Express Server
curl http://localhost:3001/

![alt text](./express-server-result/image.png)

curl http://localhost:3001/students

![alt text](./express-server-result/image-1.png)

curl http://localhost:3001/students/2

![alt text](./express-server-result/image-2.png)

curl http://localhost:3001/students/major/บริหารธุรกิจ

![alt text](./express-server-result/image-3.png)

curl http://localhost:3001/stats

![alt text](./express-server-result/image-4.png)
