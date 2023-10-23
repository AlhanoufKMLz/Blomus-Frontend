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
    categoriesRequest: (state) => {
      state.isLoading = true
    },
    categoriesSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addCategory: (state, action: { payload: { product: Category } }) => {
      state.items = [action.payload.product, ...state.items]
    },
    removeCategory: (state, action: { payload: { productid: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productid)
      state.items = filteredItems
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
export const { removeCategory, addCategory, categoriesRequest, categoriesSuccess } =
  categorySlice.actions

export default categorySlice.reducer
