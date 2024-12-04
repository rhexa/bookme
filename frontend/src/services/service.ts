import { AxiosResponse } from 'axios'
import api from '../axios'
import { BookingData } from '../types'

export const fetchServices = async () => {
  try {
    const response = await api.get('/services')
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const bookService = async (data: BookingData) => {
  const { serviceId, ...formData } = data

  try {
    const response = await api.post<AxiosResponse<string>>(
      `/services/${serviceId}/book`,
      formData
    )
    return response
  } catch (error) {
    console.error(error)
  }
}
