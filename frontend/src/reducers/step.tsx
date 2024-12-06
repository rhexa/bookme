import { createSlice } from '@reduxjs/toolkit'

const stepSlice = createSlice({
  name: 'step',
  initialState: 0,
  reducers: {
    _setStep: (_state, action) => {
      return action.payload
    },
  },
})

export const { _setStep } = stepSlice.actions

export default stepSlice.reducer
