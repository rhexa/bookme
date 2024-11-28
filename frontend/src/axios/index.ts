import axios from 'axios'
import { API_URL } from '../utils/config'

const api = axios.create({
  baseURL: `${API_URL}/api`,
})

export default api
