import { configureStore } from '@reduxjs/toolkit'
import step from './reducers/step'
import services from './reducers/services'
import categories from './reducers/categories'
import booking from './reducers/booking'

const store = configureStore({
  reducer: {
    step,
    services,
    categories,
    booking,
  },
})

export default store
