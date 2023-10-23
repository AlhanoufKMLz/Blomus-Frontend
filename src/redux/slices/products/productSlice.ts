import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../../types/types'

export type ProductState = {
  items: Product[]
  error: null | string
  isLoading: boolean
}

const initialState: ProductState = {
  items: [],
  error: null,
  isLoading: false
}

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
  const response = await fetch('/mock/e-commerce/products.json')
  const data = await response.json()
  return data
})

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: { payload: { product: Product } }) => {
      state.items = [action.payload.product, ...state.items]
    },
    removeProduct: (state, action: { payload: { productid: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productid)
      state.items = filteredItems
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // state.error = action.error.message
        state.isLoading = false
      })
  }
})
export const { removeProduct, addProduct } = productSlice.actions

export default productSlice.reducer
