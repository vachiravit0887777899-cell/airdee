export interface DustParticle {
  x: number
  y: number
  radius: number
  speedX: number
  speedY: number
  opacity: number
}

/**
 * คำนวณจำนวน particle ที่เหมาะสมตามค่า PM2.5
 * ตามที่ระบุใน requirement:
 * PM2.5 ต่ำ = 5-15, ปานกลาง = 20-50, สูง = 60-120, อันตราย = 120-200
 */
export function getParticleCount(pm25: number): number {
  if (pm25 <= 15) return 10
  if (pm25 <= 35) return 35
  if (pm25 <= 55) return 90
  return Math.min(160, 120 + Math.floor((pm25 - 55) * 0.8)) // ยิ่งอันตรายมาก ยิ่งเพิ่ม แต่ไม่เกิน limit
}

/**
 * สร้าง particle เริ่มต้นแบบสุ่มตำแหน่ง
 */
export function createParticle(width: number, height: number): DustParticle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 2 + 1,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: Math.random() * 0.2 + 0.05,
    opacity: Math.random() * 0.4 + 0.2,
  }
}

/**
 * อัปเดตตำแหน่ง particle 1 เฟรม แล้ววนกลับด้านตรงข้ามถ้าหลุดจอ
 */
export function updateParticle(p: DustParticle, width: number, height: number): void {
  p.x += p.speedX
  p.y += p.speedY

  if (p.y > height) {
    p.y = -5
    p.x = Math.random() * width
  }
  if (p.x > width) p.x = 0
  if (p.x < 0) p.x = width
}