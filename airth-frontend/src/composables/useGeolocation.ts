import { provinces, type Province } from '../data/provinces'

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * หาจังหวัดที่ใกล้พิกัดที่กำหนดที่สุด
 */
export function findNearestProvince(lat: number, lng: number): Province | null {
  if (provinces.length === 0) return null

  let nearest = provinces[0]
  let minDistance = calculateDistance(lat, lng, nearest.lat, nearest.lng)

  for (const p of provinces) {
    const distance = calculateDistance(lat, lng, p.lat, p.lng)
    if (distance < minDistance) {
      minDistance = distance
      nearest = p
    }
  }

  return nearest
}

export type GeolocationErrorType = 'denied' | 'unavailable' | 'timeout' | 'unsupported'

export interface GeolocationResult {
  province: Province | null
  error: GeolocationErrorType | null
}

/**
 * ขอตำแหน่งผู้ใช้ผ่าน Browser Geolocation API แล้วหาจังหวัดที่ใกล้ที่สุด
 */
export function requestUserLocation(): Promise<GeolocationResult> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ province: null, error: 'unsupported' })
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const province = findNearestProvince(latitude, longitude)
        resolve({ province, error: null })
      },
      (err) => {
        let errorType: GeolocationErrorType = 'unavailable'
        if (err.code === err.PERMISSION_DENIED) errorType = 'denied'
        else if (err.code === err.TIMEOUT) errorType = 'timeout'
        resolve({ province: null, error: errorType })
      },
      { timeout: 10000, enableHighAccuracy: false }
    )
  })
}