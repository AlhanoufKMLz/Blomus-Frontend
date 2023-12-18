import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { Product, ProductState } from '../../../types/types'
import api from '../../../api'

// Fetch all products
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (
    {
      searchText,
      category,
      sortBy,
      pageNumber
    }: {
      searchText: string
      category: string
      sortBy: string
      pageNumber: number
    },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams()
      queryParams.append('pageNumber', String(pageNumber))
      {
        searchText !== '' && queryParams.append('searchText', searchText)
      }
      {
        category !== '' && queryParams.append('category', category)
      }
      {
        sortBy !== '' && queryParams.append('sortBy', sortBy)
      }

      const response = await api.get(`/api/products?${queryParams.toString()}`)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Fetch single product
export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSigleProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/products/${productId}`)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Create new product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: FormData, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/products', product)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Update product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({product, productId}:{product: FormData, productId: string}, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/products/${productId}`, product)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/products/${productId}`)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

const initialState: ProductState = {
  products: [],
  singleProduct: undefined,
  totalPages: 0,
  error: undefined,
  isLoading: false
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.payload
        state.totalPages = action.payload.totalPages
        state.isLoading = false
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Fetch single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload
        state.isLoading = false
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Create new product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = [action.payload, ...state.products]
        state.isLoading = false
      })
      .addCase(createProduct.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Update category
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProducts = state.products.map((product) => {
          if (product._id === action.payload._id) return action.payload
          return product
        })
        state.products = updatedProducts
        state.isLoading = false
      })
      .addCase(updateProduct.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Delete category
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload._id)
        state.isLoading = false
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })
  }
})

export const { } = productSlice.actions

export default productSlice.reducer
