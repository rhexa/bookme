import express, { Request } from 'express'
import 'reflect-metadata' // required for typeorm
import { connectDB } from './utils/datasource'
import { PORT } from './utils/config'
import { Service } from './entity/Service'
import { Category } from './entity/Category'
import cors from 'cors'
import route from './route'

const main = async () => {
  await connectDB()
  const app = express()
  app.use(express.json())
  app.use(cors<Request>())

  app.use('/api', route)

  app.get('/test', async (_req, res) => {
    try {
      const category = new Category()
      category.name = 'massasge'

      const newService = new Service()
      newService.name = 'test'
      newService.price = 100
      newService.category = category
      await newService.save()
    } catch (error) {
      console.log(error)
    }

    const services = await Service.find({
      relations: {
        category: true,
      },
      select: {
        category: {
          name: true,
        },
      },
    })
    console.log(services)
    res.json(services)
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void main()
