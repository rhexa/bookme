import { createSlice } from '@reduxjs/toolkit'
import { fetchCategories } from '../services/category'
import { AppDispatch } from '../types/store'
import { Category } from '../types'

const initialState: Category[] = []

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  reducers: {
    _setCategories: (_state, action) => {
      return action.payload
    },
  },
})

export const { _setCategories } = categoriesSlice.actions

export const initializeCategories = () => {
  return async (dispatch: AppDispatch) => {
    const categories = await fetchCategories()
    dispatch(_setCategories(categories))
  }
}

export default categoriesSlice.reducer
