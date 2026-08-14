import { Request, Response } from 'express'
import { pool } from '../db/pool'

export async function getAllProvinces(_req: Request, res: Response) {
  try {
    const result = await pool.query(
      'SELECT id, name_th, name_en, region, lat, lng FROM provinces ORDER BY name_th'
    )
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Failed to fetch provinces' })
  }
}

export async function getProvinceById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const result = await pool.query(
      'SELECT id, name_th, name_en, region, lat, lng FROM provinces WHERE id = $1',
      [id]
    )
    if (result.rows.length === 0) {
      res.status(404).json({ status: 'error', message: 'Province not found' })
      return
    }
    res.json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ status: 'error', message: 'Failed to fetch province' })
  }
}