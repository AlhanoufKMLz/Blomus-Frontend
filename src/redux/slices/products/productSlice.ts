import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Product } from '../../../types/types'

export type ProductState = {
  products: Product[]
  error: undefined | string
  isLoading: boolean
}

const initialState: ProductState = {
  products: [],
  error: undefined,
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
      state.products = [action.payload.product, ...state.products]
    },
    removeProduct: (state, action: { payload: { productid: number } }) => {
      const filteredItems = state.products.filter(
        (product) => product.id !== action.payload.productid
      )
      state.products = filteredItems
    },
    editProdect: (state, action: { payload: { newProduct: Product } }) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.newProduct.id
      )
      state.products = [action.payload.newProduct, ...state.products]
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload
        state.isLoading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
  }
})
export const { removeProduct, addProduct, editProdect } = productSlice.actions

export default productSlice.reducer
