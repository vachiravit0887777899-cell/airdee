import { Router } from 'express'
import { getAirQualityHistory } from '../controllers/history.controller'

const router = Router()

router.get('/:province', getAirQualityHistory)

export default router