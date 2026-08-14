import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { pool } from './db/pool'
import provincesRoutes from './routes/provinces.routes'
import airQualityRoutes from './routes/airQuality.routes'
import weatherRoutes from './routes/weather.routes'
import historyRoutes from './routes/history.routes'
import forecastRoutes from './routes/forecast.routes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.get('/api/health', async (_req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')
    res.json({
      status: 'ok',
      service: 'AirDee Backend',
      dbTime: result.rows[0].now,
      time: new Date().toISOString(),
    })
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Database connection failed' })
  }
})

app.use('/api/provinces', provincesRoutes)
app.use('/api/air-quality', airQualityRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/air-quality/history', historyRoutes)
app.use('/api/forecast', forecastRoutes)

app.listen(PORT, () => {
  console.log(`AirTH backend running at http://localhost:${PORT}`)
})