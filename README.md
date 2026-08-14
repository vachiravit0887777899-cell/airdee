# AirDee 🌤️

เว็บแอปพลิเคชันตรวจสอบคุณภาพอากาศและสภาพอากาศรายจังหวัดทั่วประเทศไทย ออกแบบด้วยสไตล์ Dark Glassmorphism พร้อมฉากพื้นหลังแบบ Dynamic ที่เปลี่ยนไปตามคุณภาพอากาศจริง

**🔗 Live Demo:** https://airdee-frontend.onrender.com

![AirDee Screenshot](./screenshot.png)

---

## ✨ ฟีเจอร์หลัก

- 📍 ตรวจสอบ PM2.5, AQI, อุณหภูมิ, ความชื้น, ลม และโอกาสฝนตกครบทั้ง 77 จังหวัด
- 🗺️ แผนที่ประเทศไทยแบบ Interactive ระบายสีตามคุณภาพอากาศจริง
- 📈 กราฟ PM2.5/AQI ย้อนหลัง และพยากรณ์อากาศ 24 ชั่วโมง / 7 วันข้างหน้า
- 🎨 ฉากพื้นหลังแบบ Dynamic (ท้องฟ้าใส / หมอกบาง / ฝุ่นหนา / มลพิษรุนแรง) เปลี่ยนตาม PM2.5 จริง
- 🌧️ แอนิเมชันฝุ่นและฝนแบบ Canvas ปรับความหนาแน่นตามข้อมูลจริง
- 📌 ค้นหาตำแหน่งปัจจุบันอัตโนมัติผ่าน Geolocation
- 📱 รองรับการติดตั้งเป็นแอป (PWA) ใช้งานได้แม้ไม่มีอินเทอร์เน็ต (offline fallback)
- ♿ รองรับ Accessibility: คีย์บอร์ด, screen reader, `prefers-reduced-motion`, ไม่ใช้สีอย่างเดียวบอกระดับคุณภาพอากาศ

---

## 🛠️ Tech Stack

**Frontend**
- Vue 3 + TypeScript + Vite
- Tailwind CSS
- Vue Router / Pinia
- ECharts (vue-echarts)
- Leaflet (แผนที่)

**Backend**
- Node.js + Express + TypeScript
- PostgreSQL
- REST API architecture

**ข้อมูลจากภายนอก**
- [Air4Thai](http://air4thai.pcd.go.th) — ข้อมูล PM2.5/AQI จากกรมควบคุมมลพิษ
- [Open-Meteo](https://open-meteo.com) — ข้อมูลสภาพอากาศและพยากรณ์

**Deployment**
- [Render](https://render.com) — Backend, Frontend (Static Site), PostgreSQL

---

## 📁 โครงสร้างโปรเจกต์

```
AirDee/
├── airth-frontend/          # Vue 3 + Vite frontend
│   └── src/
│       ├── components/      # dashboard, province, map, weather-scene, charts
│       ├── composables/     # geolocation, particle systems, weather scene logic
│       ├── stores/          # Pinia stores
│       ├── services/        # API service layer (axios)
│       ├── views/           # HomeView, ProvinceDetailView
│       └── data/            # รายชื่อ 77 จังหวัด
│
└── airth-backend/           # Express + TypeScript backend
    └── src/
        ├── routes/          # provinces, air-quality, weather, forecast, history
        ├── controllers/     # request handlers
        ├── services/        # Air4Thai, Open-Meteo integration + caching
        ├── db/               # schema.sql, seed script, connection pool
        └── utils/            # geo distance calculation
```

---

## 🚀 การติดตั้งและรันในเครื่อง

### สิ่งที่ต้องมีก่อน
- Node.js 18+
- PostgreSQL 16+

### 1. Clone โปรเจกต์

```bash
git clone https://github.com/vachiravit0887777899-cell/airdee.git
cd airdee
```

### 2. ตั้งค่า Backend

```bash
cd airth-backend
npm install
```

สร้างไฟล์ `.env`:
```
PORT=4000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/airdee
```

สร้าง database และรัน schema:
```bash
psql -U postgres -c "CREATE DATABASE airdee;"
psql -U postgres -d airdee -f src/db/schema.sql
npm run seed
```

รัน backend:
```bash
npm run dev
```

### 3. ตั้งค่า Frontend

```bash
cd ../airth-frontend
npm install
```

สร้างไฟล์ `.env`:
```
VITE_API_URL=http://localhost:4000/api
```

รัน frontend:
```bash
npm run dev
```

เปิด `http://localhost:5173`

---

## 📡 API Endpoints

| Method | Endpoint | คำอธิบาย |
|---|---|---|
| GET | `/api/provinces` | รายชื่อจังหวัดทั้งหมด |
| GET | `/api/provinces/:id` | ข้อมูลจังหวัดเดี่ยว |
| GET | `/api/air-quality/all` | PM2.5/AQI ทุกจังหวัด (สำหรับแผนที่) |
| GET | `/api/air-quality/:province` | PM2.5/AQI จังหวัดเดี่ยว |
| GET | `/api/air-quality/history/:province` | ประวัติ PM2.5/AQI ย้อนหลัง |
| GET | `/api/weather/:province` | สภาพอากาศปัจจุบัน |
| GET | `/api/forecast/:province` | พยากรณ์ 24 ชม. / 7 วัน |

---

## 🌐 Deployment

โปรเจกต์นี้ deploy บน [Render](https://render.com) ประกอบด้วย 3 services:

1. **PostgreSQL** — เก็บข้อมูลจังหวัดและประวัติคุณภาพอากาศ
2. **Web Service** (Backend) — Root Directory: `airth-backend`
3. **Static Site** (Frontend) — Root Directory: `airth-frontend`, ตั้งค่า `VITE_API_URL` ชี้ไปยัง backend URL

---

## 📄 License

โปรเจกต์นี้สร้างขึ้นเพื่อการศึกษา ข้อมูลคุณภาพอากาศและสภาพอากาศมาจาก Air4Thai (กรมควบคุมมลพิษ) และ Open-Meteo ซึ่งเป็น public open data