# 📖 QuoteDeck

PWA สำหรับเก็บคำคมที่เจอมา แล้วเปิดอ่านทบทวนแบบ flashcard — ทำงานออฟไลน์ ติดตั้งลงหน้าจอโฮมได้

## ✨ ฟีเจอร์
- เก็บคำคม พร้อมผู้พูด ที่มา แท็ก และโน้ตส่วนตัว
- **Quote of the Day** สุ่มจากวันที่ (ทั้งวันได้ประโยคเดิม)
- **Playback แบบ Flashcard** พลิกการ์ด ปัดซ้าย/ขวา สลับลำดับ เล่นอัตโนมัติ
- **Zen Mode** ซ่อน UI ทั้งหมด เหลือแค่ข้อความ
- **4 ธีม**: Light / Dark / Warm / Mint
- **Import / Export JSON** สำรองและย้ายข้อมูลข้ามเครื่อง
- ทำงาน 100% บนเครื่อง ไม่มีเซิร์ฟเวอร์ ไม่เก็บข้อมูลผู้ใช้

## 🚀 เริ่มต้น
```bash
npm install
npm run dev      # เปิด http://localhost:5173
npm run build    # สร้างไฟล์ production ที่ dist/
npm run preview  # ทดสอบ PWA/Service Worker (ต้องทดสอบจาก build เท่านั้น)
```

## 📦 Deploy ขึ้น GitHub Pages
1. push โค้ดขึ้น branch `main`
2. ไปที่ **Settings → Pages → Build and deployment → Source: GitHub Actions**
3. workflow จะ build และ deploy ให้อัตโนมัติที่ `https://<user>.github.io/<repo>/`

> `VITE_BASE` ถูกตั้งค่าอัตโนมัติจากชื่อ repo ถ้าจะ deploy ที่ root domain (เช่น Netlify/Vercel) ไม่ต้องตั้งค่าอะไรเพิ่ม

## 🗂 ที่เก็บข้อมูล
ข้อมูลทั้งหมดอยู่ใน `localStorage` คีย์ `quotedeck.quotes.v1` — ล้างข้อมูลเบราว์เซอร์แล้วข้อมูลจะหาย **แนะนำให้ Export เก็บไว้เป็นระยะ**

## 📄 License
MIT