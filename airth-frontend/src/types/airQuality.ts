export interface AirQualityData {
  provinceId: string
  provinceName: string
  pm25: number
  aqi: number
  status: 'good' | 'moderate' | 'unhealthy' | 'danger' | 'hazardous'
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: number
  rainProbability: number
  updatedAt: string
}