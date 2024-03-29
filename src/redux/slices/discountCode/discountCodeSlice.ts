import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { DiscountCode, DiscountCodeState } from '../../../types/types'
import discountCodesServices from '../../../services/discountCodes'

// Fetch all discount codes
export const fetchDiscountCodesThunk = createAsyncThunk(
  'discountCode/fetchDiscountCodes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await discountCodesServices.findAll()

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Fetch single discount code
export const fetchSingleDiscountCodeThunk = createAsyncThunk(
  'discountCode/fetchSingleDiscountCodeThunk',
  async (discountCode: string, { rejectWithValue }) => {
    try {
      const response = await discountCodesServices.findOne(discountCode)

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
  async (discountCode: Partial<DiscountCode>, { rejectWithValue }) => {
    try {
      const response = await discountCodesServices.addDiscountCode(discountCode)

      return response.data
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
    {
      discountCode,
      discountCodeId
    }: { discountCode: Partial<DiscountCode>; discountCodeId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await discountCodesServices.updateDiscountCode(discountCodeId, discountCode)

      return response.data
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
      const response = await discountCodesServices.deleteDiscountCode(discountCodeId)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

const initialState: DiscountCodeState = {
  codes: [],
  code: null,
  error: undefined,
  isLoading: false
}

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
        state.codes = [action.payload.payload, ...state.codes]
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
        const updatedDiscountCodes = state.codes.map((code) => {
          if (code._id === action.payload.payload._id) return action.payload.payload
          return code
        })
        state.codes = updatedDiscountCodes
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
        state.codes = state.codes.filter((code) => code._id !== action.payload.payload._id)
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

      // Fetch single discount code
      .addCase(fetchSingleDiscountCodeThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchSingleDiscountCodeThunk.fulfilled, (state, action) => {
        state.code = action.payload
        state.isLoading = false
      })
      .addCase(fetchSingleDiscountCodeThunk.rejected, (state, action) => {
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
