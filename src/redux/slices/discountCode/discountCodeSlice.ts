import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { DiscountCode, DiscountCodeState } from '../../../types/types'
import api from '../../../api'

const initialState: DiscountCodeState = {
  codes: [],
  error: undefined,
  isLoading: false
}

// Fetch all discount codes
export const fetchDiscountCodesThunk = createAsyncThunk(
  'discountCode/fetchDiscountCodes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/discount-code')

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Create new discount code
export const createDiscountCodeThunk = createAsyncThunk(
  'discountCode/createDiscountCode',
  async (discountCode: DiscountCode, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/discount-code', discountCode)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Update discount code
export const updateDiscountCodeThunk = createAsyncThunk(
  'discountCode/updateDiscountCode',
  async (
    { discountCode, discountCodeId }: { discountCode: DiscountCode; discountCodeId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put(`/api/discount-code/${discountCodeId}`, discountCode)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Delete discount code
export const deleteDiscountCodeThunk = createAsyncThunk(
  'discountCode/deleteDiscountCode',
  async (discountCodeId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/discount-code/${discountCodeId}`)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const discountCodesSlice = createSlice({
  name: 'discountCodes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all discount codes
      .addCase(fetchDiscountCodesThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchDiscountCodesThunk.fulfilled, (state, action) => {
        state.codes = action.payload
        console.log("🚀 ~ file: discountCodeSlice.ts:92 ~ .addCase ~ action.payload:", action.payload)
        state.isLoading = false
      })
      .addCase(fetchDiscountCodesThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Create new discount code
      .addCase(createDiscountCodeThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createDiscountCodeThunk.fulfilled, (state, action) => {
        state.codes = [action.payload, ...state.codes]
        state.isLoading = false
      })
      .addCase(createDiscountCodeThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Update discount code
      .addCase(updateDiscountCodeThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateDiscountCodeThunk.fulfilled, (state, action) => {
        state.codes = state.codes.filter(
          (code) => code._id !== action.payload._id
        )
        state.codes = [action.payload, ...state.codes]
        state.isLoading = false
      })
      .addCase(updateDiscountCodeThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Delete discount code
      .addCase(deleteDiscountCodeThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteDiscountCodeThunk.fulfilled, (state, action) => {
        state.codes = state.codes.filter(
          (code) => code._id !== action.payload._id
        )
        state.isLoading = false
      })
      .addCase(deleteDiscountCodeThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })
  }
})

export default discountCodesSlice.reducer
