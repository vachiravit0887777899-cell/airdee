import { apiClient } from './api'
import type { ProvinceApi } from '../types/province'
import type { AirQualityData } from '../types/airQuality'

export async function fetchProvinces(): Promise<ProvinceApi[]> {
  const res = await apiClient.get<ProvinceApi[]>('/provinces')
  return res.data
}

export async function fetchAirQuality(provinceId: string): Promise<AirQualityData> {
  const [airRes, weatherRes] = await Promise.all([
    apiClient.get(`/air-quality/${provinceId}`),
    apiClient.get(`/weather/${provinceId}`),
  ])

  const provinceRes = await apiClient.get<ProvinceApi>(`/provinces/${provinceId}`)

  return {
    provinceId: airRes.data.provinceId,
    provinceName: provinceRes.data.name_th,
    pm25: airRes.data.pm25,
    aqi: airRes.data.aqi,
    status: airRes.data.status,
    temperature: weatherRes.data.temperature,
    humidity: weatherRes.data.humidity,
    windSpeed: weatherRes.data.windSpeed,
    windDirection: weatherRes.data.windDirection,
    rainProbability: weatherRes.data.rainProbability,
    updatedAt: airRes.data.updatedAt,
  }
}

export interface BulkAirQualityItem {
  provinceId: string
  pm25: number | null
  aqi: number | null
}

export async function fetchAllAirQuality(): Promise<BulkAirQualityItem[]> {
  const res = await apiClient.get<BulkAirQualityItem[]>('/air-quality/all')
  return res.data
}
export interface HistoryPoint {
  pm25: number
  aqi: number
  recordedAt: string
}

export async function fetchAirQualityHistory(
  provinceId: string,
  hours = 24
): Promise<HistoryPoint[]> {
  const res = await apiClient.get<{ provinceId: string; history: HistoryPoint[] }>(
    `/air-quality/history/${provinceId}`,
    { params: { hours } }
  )
  return res.data.history
}
export interface HourlyForecastItem {
  time: string
  temperature: number
  rainProbability: number
}

export interface DailyForecastItem {
  date: string
  tempMax: number
  tempMin: number
  rainProbability: number
}

export interface ForecastData {
  hourly: HourlyForecastItem[]
  daily: DailyForecastItem[]
}

export async function fetchForecast(provinceId: string): Promise<ForecastData> {
  const res = await apiClient.get<{ provinceId: string; hourly: HourlyForecastItem[]; daily: DailyForecastItem[] }>(
    `/forecast/${provinceId}`
  )
  return { hourly: res.data.hourly, daily: res.data.daily }
}