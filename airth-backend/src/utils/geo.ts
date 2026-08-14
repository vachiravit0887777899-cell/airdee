/**
 * คำนวณระยะทางระหว่าง 2 จุดพิกัด (Haversine formula)
 * คืนค่าเป็นกิโลเมตร
 */
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // รัศมีโลก (กม.)
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/**
 * หาจุดที่ใกล้ที่สุดจาก list ของจุดที่มี lat/lng
 * คืนค่า index ของจุดที่ใกล้ที่สุด หรือ -1 ถ้า list ว่าง
 */
export function findNearestIndex(
  targetLat: number,
  targetLng: number,
  points: { lat: number; lng: number }[]
): number {
  if (points.length === 0) return -1

  let nearestIndex = 0
  let minDistance = calculateDistance(targetLat, targetLng, points[0].lat, points[0].lng)

  for (let i = 1; i < points.length; i++) {
    const distance = calculateDistance(targetLat, targetLng, points[i].lat, points[i].lng)
    if (distance < minDistance) {
      minDistance = distance
      nearestIndex = i
    }
  }

  return nearestIndex
}