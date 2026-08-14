import { Router } from 'express'
import { getForecastByProvince } from '../controllers/forecast.controller'

const router = Router()

router.get('/:province', getForecastByProvince)

export default router