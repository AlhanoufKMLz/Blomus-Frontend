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
    },
    editProdect: (state, action: { payload: { newProduct: Product } }) => {
      state.items = state.items.filter((product) => product.id !== action.payload.newProduct.id)
      state.items = [action.payload.newProduct, ...state.items]
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
export const { removeProduct, addProduct, editProdect } = productSlice.actions

export default productSlice.reducer
