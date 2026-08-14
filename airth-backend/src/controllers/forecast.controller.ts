import { Request, Response } from 'express'
import { pool } from '../db/pool'
import { getForecastByCoords } from '../services/openMeteo.service'

export async function getForecastByProvince(req: Request, res: Response) {
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
    const forecast = await getForecastByCoords(parseFloat(lat), parseFloat(lng))

    if (!forecast) {
      res.status(503).json({ status: 'error', message: 'Forecast data temporarily unavailable' })
      return
    }

    res.json({
      provinceId: province,
      hourly: forecast.hourly,
      daily: forecast.daily,
    })
  } catch (err) {
    console.error('Forecast fetch error:', err)
    res.status(500).json({ status: 'error', message: 'Failed to fetch forecast' })
  }
}