import express from 'express'
import 'reflect-metadata' // required for typeorm
import { connectDB } from './utils/datasource'
import { PORT } from './utils/config'

const main = async () => {
  await connectDB()
  const app = express()
  app.use(express.json())

  app.get('/ping', (_req, res) => {
    console.log('someone pinged here')
    res.send('pong')
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

void main()
