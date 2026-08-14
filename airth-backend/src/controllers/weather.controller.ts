import { Request, Response } from 'express'
import { pool } from '../db/pool'
import { getWeatherByCoords } from '../services/openMeteo.service'

export async function getWeatherByProvince(req: Request, res: Response) {
  try {
    const { province } = req.params

    const provinceResult = await pool.query(
      'SELECT id, lat, lng FROM provinces WHERE id = $1',
      [province]
    )
    if (provinceResult.rows.length === 0) {
      res.status(404).json({ status: 'error', message: 'Province not found' })
      return
    }

    const { lat, lng } = provinceResult.rows[0]
    const weather = await getWeatherByCoords(parseFloat(lat), parseFloat(lng))

    if (!weather) {
      res.status(503).json({
        status: 'error',
        message: 'Weather data temporarily unavailable',
      })
      return
    }

    // บันทึกลงตาราง weather เพื่อเก็บ timestamp ตามที่ DATABASE กำหนด
    await pool.query(
      `INSERT INTO weather (province_id, temperature, humidity, wind_speed, wind_direction, rain_probability)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [province, weather.temperature, weather.humidity, weather.windSpeed, weather.windDirection, weather.rainProbability]
    )

    res.json({
      provinceId: province,
      temperature: weather.temperature,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      windDirection: weather.windDirection,
      rainProbability: weather.rainProbability,
      updatedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Weather fetch error:', err)
    res.status(500).json({ status: 'error', message: 'Failed to fetch weather' })
  }
}