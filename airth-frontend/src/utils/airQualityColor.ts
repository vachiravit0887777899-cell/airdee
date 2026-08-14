export type AirQualityStatus = 'good' | 'moderate' | 'unhealthy' | 'danger' | 'hazardous'

/**
 * แปลงค่า PM2.5 เป็นสถานะคุณภาพอากาศ (ใช้เกณฑ์เดียวกับ backend)
 */
export function getStatusFromPm25(pm25: number): AirQualityStatus {
  if (pm25 <= 15) return 'good'
  if (pm25 <= 35) return 'moderate'
  if (pm25 <= 55) return 'unhealthy'
  if (pm25 <= 90) return 'danger'
  return 'hazardous'
}

/**
 * สีตรงกับที่กำหนดใน tailwind.config.js (aqi.*)
 * ใช้ hex ตรงๆ ที่นี่เพราะ Leaflet ไม่รองรับ Tailwind class
 */
export const statusColorMap: Record<AirQualityStatus, string> = {
  good: '#4ade80',
  moderate: '#facc15',
  unhealthy: '#fb923c',
  danger: '#f87171',
  hazardous: '#c084fc',
}

export const statusLabelMap: Record<AirQualityStatus, string> = {
  good: 'ดีมาก',
  moderate: 'ปานกลาง',
  unhealthy: 'เริ่มมีผลกระทบ',
  danger: 'อันตราย',
  hazardous: 'อันตรายมาก',
}

/**
 * ไอคอนสัญลักษณ์แต่ละสถานะ (สำหรับ Color Accessibility — ไม่ใช้สีอย่างเดียวบอกระดับ)
 */
export const statusIconMap: Record<AirQualityStatus, string> = {
  good: '●',
  moderate: '▲',
  unhealthy: '◆',
  danger: '■',
  hazardous: '✕',
}

/**
 * แปลงค่า PM2.5 เป็นสี hex โดยตรง (ใช้บ่อยสุดในแผนที่)
 */
export function getColorFromPm25(pm25: number | null): string {
  if (pm25 === null) return '#4b5563' // เทา = ไม่มีข้อมูล
  return statusColorMap[getStatusFromPm25(pm25)]
}