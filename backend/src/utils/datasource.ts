import { DataSource } from 'typeorm'
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USER,
} from './config'

export const AppDataSource = new DataSource({
  type: DB_TYPE,
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
})

export const connectDB = async () => {
  try {
    await AppDataSource.initialize()
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}
