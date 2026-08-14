export type SceneType =
  | 'clean-sky'
  | 'light-haze'
  | 'dust'
  | 'heavy-pollution'
  | 'rain'
  | 'night'

export interface SceneInput {
  pm25: number
  isRaining: boolean
  isNight: boolean
}

/**
 * ตัดสินใจว่าควรแสดงฉากไหน จากค่า PM2.5, ฝน, และเวลา (กลางวัน/กลางคืน)
 * ลำดับความสำคัญ: ฝนตก > pm25 หนัก > กลางคืน > ปกติ
 */
export function resolveScene(input: SceneInput): SceneType {
  const { pm25, isRaining, isNight } = input

  if (isRaining) return 'rain'
  if (pm25 > 55) return 'heavy-pollution'
  if (pm25 > 35) return 'dust'
  if (pm25 > 15) return 'light-haze'
  if (isNight) return 'night'
  return 'clean-sky'
}

/**
 * เช็คว่าตอนนี้เป็นเวลากลางคืนหรือไม่ (18:00 - 06:00)
 */
export function isNightTime(date: Date = new Date()): boolean {
  const hour = date.getHours()
  return hour >= 18 || hour < 6
}