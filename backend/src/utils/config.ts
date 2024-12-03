import 'dotenv/config'
import nodemailer from 'nodemailer'
import { emailConfigSchema } from './types'

export const BOOKING_EMAIL = process.env.BOOKING_EMAIL

export const emailConfig = emailConfigSchema.parse({
  host: process.env.EMAIL_SMTP_HOSTNAME,
  port: process.env.EMAIL_SMTP_PORT
    ? parseInt(process.env.EMAIL_SMTP_PORT)
    : 587,
  secure: process.env.EMAIL_SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export const emailTransporter = nodemailer.createTransport(emailConfig)

export const PORT = process.env.PORT || 3000

export const DB_TYPE = process.env.DB_TYPE
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
