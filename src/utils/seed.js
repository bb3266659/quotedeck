import { normalizeQuote } from './storage'

export const SAMPLE_QUOTES = [
  { text: 'ความลับของการก้าวไปข้างหน้า คือการเริ่มลงมือทำ', author: 'Mark Twain', tags: ['แรงบันดาลใจ', 'เริ่มต้น'] },
  { text: 'เราไม่ได้ขึ้นสู่ระดับเป้าหมายของเรา แต่เราตกลงมาสู่ระดับระบบที่เราสร้างไว้', author: 'James Clear', source: 'Atomic Habits', tags: ['นิสัย', 'พัฒนาตัวเอง'] },
  { text: 'สิ่งที่ขวางทาง คือหนทางนั้นเอง', author: 'Marcus Aurelius', tags: ['stoic', 'ชีวิต'] },
  { text: 'ถ้าคุณอยากไปเร็ว จงไปคนเดียว ถ้าอยากไปไกล จงไปด้วยกัน', author: 'สุภาษิตแอฟริกา', tags: ['ทีม', 'ชีวิต'] },
  { text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci', tags: ['design', 'work'] },
  { text: 'วันที่ยากที่สุด มักเป็นวันที่เราเติบโตมากที่สุด', author: '', tags: ['กำลังใจ'] }
].map(normalizeQuote)