import { Request, Response } from 'express'
import { pool } from '../db/pool'

export async function getAirQualityHistory(req: Request, res: Response) {
  try {
    const { province } = req.params
    const hours = parseInt(req.query.hours as string, 10) || 24

    const provinceCheck = await pool.query('SELECT id FROM provinces WHERE id = $1', [province])
    if (provinceCheck.rows.length === 0) {
      res.status(404).json({ status: 'error', message: 'Province not found' })
      return
    }

    const result = await pool.query(
      `SELECT pm25, aqi, recorded_at
       FROM air_quality_history
       WHERE province_id = $1
         AND recorded_at >= NOW() - INTERVAL '1 hour' * $2
       ORDER BY recorded_at ASC`,
      [province, hours]
    )

    res.json({
      provinceId: province,
      history: result.rows.map((row) => ({
        pm25: parseFloat(row.pm25),
        aqi: row.aqi,
        recordedAt: row.recorded_at,
      })),
    })
  } catch (err) {
    console.error('History fetch error:', err)
    res.status(500).json({ status: 'error', message: 'Failed to fetch history' })
  }
}