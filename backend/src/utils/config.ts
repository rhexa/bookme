import 'dotenv/config'

export const PORT = process.env.PORT || 3000

const get_DB_TYPE = () => {
  switch (process.env.DB_TYPE) {
    case 'postgres':
      return 'postgres'
    case 'mysql':
      return 'mysql'
    default:
      return 'postgres'
  }
}

export const DB_TYPE = get_DB_TYPE()

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT)
  : 5432

if (!process.env.DB_USER) throw new Error('DB_USER is not defined')
if (!process.env.DB_PASSWORD) throw new Error('DB_PASSWORD is not defined')
if (!process.env.DB_DATABASE) throw new Error('DB_DATABASE is not defined')

export const DB_USER = process.env.DB_USER
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE
