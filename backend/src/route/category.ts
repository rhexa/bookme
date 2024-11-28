import express from 'express'
import { Category } from '../entity/Category'
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    if (req.query.full === 'true') {
      res.send(
        await Category.find({
          relations: {
            services: true,
          },
        })
      )
      return
    }
    res.send(await Category.find({}))
  } catch (error) {
    console.error(error)
    res.status(500).end()
  }
})

export default router
