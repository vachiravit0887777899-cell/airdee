import axios from 'axios'
import https from 'https'
import type { Air4ThaiResponse, Air4ThaiStation } from '../types/air4thai'
import { findNearestIndex } from '../utils/geo'

const AIR4THAI_URL = 'http://air4thai.pcd.go.th/services/getNewAQI_JSON.php'

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

let cachedStations: Air4ThaiStation[] | null = null
let cacheTimestamp = 0
const CACHE_DURATION_MS = 15 * 60 * 1000

async function fetchAllStations(): Promise<Air4ThaiStation[]> {
  const now = Date.now()

  if (cachedStations && now - cacheTimestamp < CACHE_DURATION_MS) {
    return cachedStations
  }

  const response = await axios.get<Air4ThaiResponse>(AIR4THAI_URL, {
    timeout: 10000,
    httpsAgent,
  })

  cachedStations = response.data.stations
  cacheTimestamp = now
  return cachedStations
}

export interface NearestStationResult {
  pm25: number | null
  aqi: number | null
  distanceKm: number
  stationName: string
  updatedAt: string
}

export async function getNearestStationData(
  lat: number,
  lng: number
): Promise<NearestStationResult | null> {
  const stations = await fetchAllStations()

  const validStations = stations.filter(
    (s) => s.lat && s.long && !isNaN(parseFloat(s.lat)) && !isNaN(parseFloat(s.long))
  )

  if (validStations.length === 0) return null

  const points = validStations.map((s) => ({
    lat: parseFloat(s.lat),
    lng: parseFloat(s.long),
  }))

  const nearestIndex = findNearestIndex(lat, lng, points)
  if (nearestIndex === -1) return null

  const station = validStations[nearestIndex]
  const point = points[nearestIndex]

  const distance = Math.sqrt(
    Math.pow(point.lat - lat, 2) + Math.pow(point.lng - lng, 2)
  ) * 111

  const pm25Raw = station.AQILast?.PM25?.value
  const aqiRaw = station.AQILast?.AQI?.aqi

  const pm25 = pm25Raw && pm25Raw !== 'n/a' && parseFloat(pm25Raw) >= 0 ? parseFloat(pm25Raw) : null
  const aqi = aqiRaw && aqiRaw !== 'n/a' && parseInt(aqiRaw, 10) >= 0 ? parseInt(aqiRaw, 10) : null

  return {
    pm25,
    aqi,
    distanceKm: Math.round(distance * 10) / 10,
    stationName: station.nameTH || station.nameEN,
    updatedAt: `${station.AQILast?.date ?? ''} ${station.AQILast?.time ?? ''}`.trim(),
  }
}

export interface ProvincePoint {
  id: string
  lat: number
  lng: number
}

export interface BulkAirQualityResult {
  provinceId: string
  pm25: number | null
  aqi: number | null
}

export async function getBulkAirQuality(
  points: ProvincePoint[]
): Promise<BulkAirQualityResult[]> {
  const results: BulkAirQualityResult[] = []

  for (const point of points) {
    const stationData = await getNearestStationData(point.lat, point.lng)
    results.push({
      provinceId: point.id,
      pm25: stationData?.pm25 ?? null,
      aqi: stationData?.aqi ?? null,
    })
  }

  return results
}