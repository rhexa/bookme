import { createSlice } from '@reduxjs/toolkit'
import { fetchServices } from '../services/service'
import { Service } from '../types'
import { AppDispatch } from '../types/store'

const initialState: Service[] = []
const servicesSlice = createSlice({
  name: 'services',
  initialState: initialState,
  reducers: {
    _setService: (_state, action) => {
      return action.payload
    },
  },
})

export const { _setService } = servicesSlice.actions

export const initializeServices = () => {
  return async (dispatch: AppDispatch) => {
    const services = await fetchServices()
    dispatch(_setService(services))
  }
}

export default servicesSlice.reducer
