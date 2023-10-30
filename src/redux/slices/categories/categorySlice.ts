import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category } from '../../../types/types'

export type CategoryState = {
  categories: Category[]
  error: undefined | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: undefined,
  isLoading: false
}

export const fetchCategories = createAsyncThunk('product/fetchCategoreis', async () => {
  const response = await fetch('/mock/e-commerce/categories.json')
  const data = await response.json()
  return data
})

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action: { payload: { category: Category } }) => {
      state.categories = [action.payload.category, ...state.categories]
    },
    removeCategory: (state, action: { payload: { categoryid: number } }) => {
      const filteredItems = state.categories.filter(
        (category) => category.id !== action.payload.categoryid
      )
      state.categories = filteredItems
    },
    editCategory: (state, action: { payload: { newCategory: Category } }) => {
      const filteredItems = state.categories.filter(
        (catecory) => catecory.id !== action.payload.newCategory.id
      )
      state.categories = filteredItems
      state.categories = [action.payload.newCategory, ...state.categories]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
  }
})
export const { removeCategory, addCategory, editCategory } = categorySlice.actions

export default categorySlice.reducer
