import api from '../axios'

export const fetchCategories = async () => {
  try {
    const response = await api.get('/categories')
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
