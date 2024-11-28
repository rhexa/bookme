import express from 'express'
import service from './service'

const router = express.Router()

router.use('/services', service)

export default router
