import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { ProductState } from '../../../types/types'
import productService from '../../../services/products'

// Fetch all products
export const fetchProductsThunk = createAsyncThunk(
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
      queryParams.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      queryParams.append('pageNumber', String(pageNumber))
      searchText && queryParams.append('searchText', searchText)
      category && queryParams.append('category', category)
      sortBy && queryParams.append('sortBy', sortBy)

      const response = await productService.findAll(queryParams.toString())

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Fetch single product
export const fetchSingleProductThunk = createAsyncThunk(
  'products/fetchSigleProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await productService.findOne(productId)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Fetch best selling products
export const fetchBestSellingProductsThunk = createAsyncThunk(
  'products/fetchBestSellingProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productService.findBestSeller(6)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Create new product
export const createProductThunk = createAsyncThunk(
  'products/createProduct',
  async (product: FormData, { rejectWithValue }) => {
    try {
      const response = await productService.createProduct(product)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Update product
export const updateProductThunk = createAsyncThunk(
  'products/updateProduct',
  async ({ product, productId }: { product: FormData; productId: string }, { rejectWithValue }) => {
    try {
      console.log('FormData entries:');
      for (const entry of product.entries()) {
        console.log(entry);
      }
      const response = await productService.updateProduct(productId, product)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Delete product
export const deleteProductThunk = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await productService.deleteProduct(productId)

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
  bestSellers: [],
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
      .addCase(fetchProductsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload.payload
        state.totalPages = action.payload.totalPages
        state.isLoading = false
      })
      .addCase(fetchProductsThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Fetch single product
      .addCase(fetchSingleProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSingleProductThunk.fulfilled, (state, action) => {
        state.singleProduct = action.payload
        state.isLoading = false
      })
      .addCase(fetchSingleProductThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Create new product
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.products = [action.payload, ...state.products]
        state.isLoading = false
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Update product
      .addCase(updateProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const updatedProducts = state.products.map((product) => {
          if (product._id === action.payload._id) return action.payload
          return product
        })
        state.products = updatedProducts
        state.isLoading = false
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Delete product
      .addCase(deleteProductThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload._id)
        state.isLoading = false
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Fetch best selling products
      .addCase(fetchBestSellingProductsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchBestSellingProductsThunk.fulfilled, (state, action) => {
        state.bestSellers = action.payload.highestSoldProducts
        state.isLoading = false
      })
      .addCase(fetchBestSellingProductsThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })
  }
})

export default productSlice.reducer
