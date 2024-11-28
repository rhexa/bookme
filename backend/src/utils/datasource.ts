import { DataSource, DataSourceOptions } from 'typeorm'
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_TYPE,
  DB_USER,
} from './config'

const initDataSourceOptions = (): DataSourceOptions => {
  switch (DB_TYPE) {
    case 'mysql':
      return {
        type: 'mysql',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
      }
    default:
      return {
        type: 'postgres',
        host: DB_HOST,
        port: DB_PORT,
        username: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        entities: ['src/entity/**/*.ts'],
        migrations: ['src/migration/**/*.ts'],
      }
  }
}

export const AppDataSource = new DataSource(initDataSourceOptions())

export const connectDB = async () => {
  try {
    await AppDataSource.initialize()
    console.log('DB connected')
  } catch (error) {
    console.log(error)
  }
}
