import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { WishlistState } from '../../../types/types'
import wishlistService from '../../../services/wishList'

// Fetch wishlist items
export const fetchWishlistItemsThunk = createAsyncThunk(
  'wishlist/fetchWishlistItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await wishlistService.findOne()

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Add to wishlist
export const addToWishlistThunk = createAsyncThunk(
  'wishlist/AddToWishlist',
  async (
    productId: string,
    { rejectWithValue }
  ) => {
    try {
      const response = await wishlistService.addItem(productId)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Remove from wishlist
export const removeFromWishlistThunk = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await wishlistService.removeItem(productId)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

const initialState: WishlistState = {
  items: [],
  error: undefined,
  isLoading: false,
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch wishlist items
      .addCase(fetchWishlistItemsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchWishlistItemsThunk.fulfilled, (state, action) => {
        state.items = action.payload.payload.products
        state.isLoading = false
      })
      .addCase(fetchWishlistItemsThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Add to wishlist
      .addCase(addToWishlistThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToWishlistThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addToWishlistThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Remove from wishlist
      .addCase(removeFromWishlistThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeFromWishlistThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.product._id !== action.payload.payload.deletedProduct._id)
        state.isLoading = false
      })
      .addCase(removeFromWishlistThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })
  }
})

export default wishlistSlice.reducer
