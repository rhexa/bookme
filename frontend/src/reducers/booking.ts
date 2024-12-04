import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BookingData } from '../types'

export const initialState: BookingData = {
  name: '',
  email: '',
  mobile: '',
  serviceId: '',
  selectedTime: '',
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    _setBooking(_state, action: PayloadAction<BookingData>) {
      return action.payload
    },
    _clearBooking() {
      return initialState
    },
  },
})

export const { _setBooking, _clearBooking } = bookingSlice.actions
export default bookingSlice.reducer
