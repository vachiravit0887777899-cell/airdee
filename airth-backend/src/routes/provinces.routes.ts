import { Router } from 'express'
import { getAllProvinces, getProvinceById } from '../controllers/provinces.controller'

const router = Router()

router.get('/', getAllProvinces)
router.get('/:id', getProvinceById)

export default router