import { Router } from 'express'
import { getWeatherByProvince } from '../controllers/weather.controller'

const router = Router()

router.get('/:province', getWeatherByProvince)

export default router