import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category } from '../../../types/types'

export type CategoryState = {
  items: Category[]
  error: null | string
  isLoading: boolean
}

const initialState: CategoryState = {
  items: [],
  error: null,
  isLoading: false
}

export const fetchCategoreis = createAsyncThunk('product/fetchCategoreis', async () => {
  const response = await fetch('/mock/e-commerce/categories.json')
  const data = await response.json()
  return data
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, action: { payload: { category: Category } }) => {
      state.items = [action.payload.category, ...state.items]
    },
    removeCategory: (state, action: { payload: { categoryid: number } }) => {
      const filteredItems = state.items.filter(
        (product) => product.id !== action.payload.categoryid
      )
      state.items = filteredItems
    },
    editCategory: (state, action: { payload: { newCategory: Category } }) => {
      const filteredItems = state.items.filter(
        (product) => product.id !== action.payload.newCategory.id
      )
      state.items = filteredItems
      state.items = [action.payload.newCategory, ...state.items]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoreis.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategoreis.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchCategoreis.rejected, (state, action) => {
        //state.error = action.error.message
        state.isLoading = false
      })
  }
})
export const { removeCategory, addCategory, editCategory } = categorySlice.actions

export default categorySlice.reducer
