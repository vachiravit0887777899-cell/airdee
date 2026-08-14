import { provinces } from './provinces'

/**
 * แปลงชื่อภาษาอังกฤษให้เป็นรูปแบบเดียวกันเพื่อเทียบกันได้
 * (ตัดช่องว่าง, ตัวพิมพ์เล็กหมด) เผื่อไฟล์ GeoJSON เขียนสะกด/เว้นวรรคต่างจากเราเล็กน้อย
 */
function normalize(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '')
}

/**
 * ตารางแก้ไขกรณีชื่อใน GeoJSON เขียนต่างจาก nameEn ของเรามาก
 * (เติมเพิ่มได้ถ้าเจอจังหวัดที่จับคู่ไม่ติด)
 * key = ชื่อใน GeoJSON (CHA_NE), value = id ของเรา
 */
export const manualOverrides: Record<string, string> = {
  'BangkokMetropolis': 'bangkok',
  'Bangkok Metropolis': 'bangkok',
}

/**
 * หา province id ของเราจากชื่อ CHA_NE ในไฟล์ GeoJSON
 * คืนค่า null ถ้าจับคู่ไม่ได้เลย (ต้องเพิ่มใน manualOverrides)
 */
export function matchProvinceId(chaNe: string): string | null {
  // เช็ค manual override ก่อน
  if (manualOverrides[chaNe]) return manualOverrides[chaNe]

  const normalizedInput = normalize(chaNe)
  const found = provinces.find((p) => normalize(p.nameEn) === normalizedInput)
  return found ? found.id : null
}