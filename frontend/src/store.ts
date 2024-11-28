import { configureStore } from '@reduxjs/toolkit'
import step from './reducers/step'
import services from './reducers/services'
import categories from './reducers/categories'

const store = configureStore({
  reducer: {
    step,
    services,
    categories,
  },
})

export default store
