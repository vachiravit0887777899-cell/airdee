import { Router } from 'express'
import { getAirQualityByProvince, getAllProvincesAirQuality } from '../controllers/airQuality.controller'

const router = Router()

router.get('/all', getAllProvincesAirQuality)
router.get('/:province', getAirQualityByProvince)

export default router