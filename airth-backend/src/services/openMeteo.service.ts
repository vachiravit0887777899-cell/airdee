import axios from 'axios'
import https from 'https'

const httpsAgent = new https.Agent({ rejectUnauthorized: false })

export interface WeatherResult {
  temperature: number
  humidity: number
  windSpeed: number
  windDirection: number
  rainProbability: number
  updatedAt: string
}

export async function getWeatherByCoords(lat: number, lng: number): Promise<WeatherResult | null> {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lng,
        current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,precipitation_probability',
        timezone: 'Asia/Bangkok',
      },
      timeout: 10000,
      httpsAgent,
    })

    const current = response.data.current
    if (!current) return null

    return {
      temperature: Math.round(current.temperature_2m),
      humidity: Math.round(current.relative_humidity_2m),
      windSpeed: Math.round(current.wind_speed_10m),
      windDirection: Math.round(current.wind_direction_10m),
      rainProbability: current.precipitation_probability ?? 0,
      updatedAt: current.time,
    }
  } catch (err) {
    console.error('Open-Meteo fetch error:', err)
    return null
  }
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

export interface ForecastResult {
  hourly: HourlyForecastItem[]
  daily: DailyForecastItem[]
}

export async function getForecastByCoords(lat: number, lng: number): Promise<ForecastResult | null> {
  try {
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude: lat,
        longitude: lng,
        hourly: 'temperature_2m,precipitation_probability',
        daily: 'temperature_2m_max,temperature_2m_min,precipitation_probability_max',
        forecast_days: 7,
        timezone: 'Asia/Bangkok',
      },
      timeout: 10000,
      httpsAgent,
    })

    const hourly = response.data.hourly
    const daily = response.data.daily
    if (!hourly || !daily) return null

    // เอาแค่ 24 ชั่วโมงข้างหน้า
    const hourlyForecast: HourlyForecastItem[] = hourly.time
      .slice(0, 24)
      .map((time: string, i: number) => ({
        time,
        temperature: Math.round(hourly.temperature_2m[i]),
        rainProbability: hourly.precipitation_probability[i] ?? 0,
      }))

    const dailyForecast: DailyForecastItem[] = daily.time.map((date: string, i: number) => ({
      date,
      tempMax: Math.round(daily.temperature_2m_max[i]),
      tempMin: Math.round(daily.temperature_2m_min[i]),
      rainProbability: daily.precipitation_probability_max[i] ?? 0,
    }))

    return { hourly: hourlyForecast, daily: dailyForecast }
  } catch (err) {
    console.error('Open-Meteo forecast fetch error:', err)
    return null
  }
}