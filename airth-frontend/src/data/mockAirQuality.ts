import type { AirQualityData } from '../types/airQuality'

export const mockAirQuality: AirQualityData = {
  provinceId: 'bangkok',
  provinceName: 'กรุงเทพมหานคร',
  pm25: 42,
  aqi: 88,
  status: 'moderate',
  temperature: 33,
  humidity: 65,
  windSpeed: 12,
  windDirection: 180,
  rainProbability: 20,
  updatedAt: new Date().toISOString(),
}