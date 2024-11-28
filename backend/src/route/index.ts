import express from 'express'
import service from './service'
import { clearDatabase, seedDatabase } from '../utils/dataHelpers'

const router = express.Router()

router.use('/services', service)

router.get('/reset', async (_req, res) => {
  try {
    await clearDatabase()
    await seedDatabase()

    res.send('Database seeded')
  } catch (error) {
    console.log(error)
    res.status(500).end()
  }
})

export default router
