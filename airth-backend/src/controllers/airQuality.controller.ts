import { Request, Response } from 'express'
import { pool } from '../db/pool'
import { getNearestStationData, getBulkAirQuality } from '../services/air4thai.service'

function getStatusFromPm25(pm25: number): string {
  if (pm25 <= 15) return 'good'
  if (pm25 <= 35) return 'moderate'
  if (pm25 <= 55) return 'unhealthy'
  if (pm25 <= 90) return 'danger'
  return 'hazardous'
}

export async function getAirQualityByProvince(req: Request, res: Response) {
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

    const stationData = await getNearestStationData(parseFloat(lat), parseFloat(lng))

    if (!stationData || stationData.pm25 === null) {
      res.status(503).json({
        status: 'error',
        message: 'Air quality data temporarily unavailable',
      })
      return
    }

    const pm25 = stationData.pm25
    const aqi = stationData.aqi ?? Math.round(pm25 * 1.8)
    const status = getStatusFromPm25(pm25)

    await pool.query(
      `INSERT INTO air_quality_history (province_id, pm25, aqi) VALUES ($1, $2, $3)`,
      [province, pm25, aqi]
    )

    res.json({
      provinceId: province,
      pm25,
      aqi,
      status,
      stationName: stationData.stationName,
      distanceKm: stationData.distanceKm,
      updatedAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Air quality fetch error:', err)
    res.status(500).json({ status: 'error', message: 'Failed to fetch air quality' })
  }
}

export async function getAllProvincesAirQuality(_req: Request, res: Response) {
  try {
    const provincesResult = await pool.query('SELECT id, lat, lng FROM provinces')
    const points = provincesResult.rows.map((row) => ({
      id: row.id,
      lat: parseFloat(row.lat),
      lng: parseFloat(row.lng),
    }))

    const results = await getBulkAirQuality(points)
    res.json(results)
  } catch (err) {
    console.error('Bulk air quality fetch error:', err)
    res.status(500).json({ status: 'error', message: 'Failed to fetch bulk air quality' })
  }
}