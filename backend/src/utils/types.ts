import { z } from 'zod'

export const clientFormDataSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  mobile: z.string(),
  selectedTime: z.string(),
})

export const emailConfigSchema = z.object({
  host: z.string(),
  port: z.number(),
  secure: z.boolean(),
  auth: z.object({
    user: z.string(),
    pass: z.string(),
  }),
})
