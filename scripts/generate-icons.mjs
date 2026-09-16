import { mkdirSync, readFileSync, existsSync } from 'node:fs'
import sharp from 'sharp'

const SRC = 'public/icons/icon.svg'
const OUT = 'public/icons'

if (!existsSync(SRC)) {
  console.error('ไม่พบไฟล์ public/icons/icon.svg')
  process.exit(1)
}
mkdirSync(OUT, { recursive: true })

const svg = readFileSync(SRC)

for (const size of [180, 192, 512]) {
  await sharp(svg, { density: 512 }).resize(size, size).png().toFile(`${OUT}/icon-${size}.png`)
}

// maskable: เว้นขอบปลอดภัย 10% รอบด้าน
await sharp(svg, { density: 512 })
  .resize(410, 410)
  .extend({ top: 51, bottom: 51, left: 51, right: 51, background: '#5b21b6' })
  .flatten({ background: '#5b21b6' })
  .png()
  .toFile(`${OUT}/icon-maskable-512.png`)

console.log('✅ สร้างไอคอน PNG เรียบร้อย')