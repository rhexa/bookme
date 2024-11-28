import api from '../axios'

export const fetchServices = async () => {
  try {
    const response = await api.get('/services')
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
