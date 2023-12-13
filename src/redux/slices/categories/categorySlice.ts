import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Category, CategoryState } from '../../../types/types'
import api from '../../../api'
import { AxiosError } from 'axios'

const initialState: CategoryState = {
  categories: [],
  error: undefined,
  isLoading: false
}

// Fetch all categories
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategoreis',
  async (_,{ rejectWithValue }) => {
    try {
      const response = await api.get('/api/categories')

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Create new category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category: { name: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/categories', category)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Update category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({category, categoryId}: {category: {name:string}, categoryId:string}, { rejectWithValue }) => {
    try { 
      const response = await api.put(`/api/categories/${categoryId}`, category)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Delete category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/categories/${categoryId}`)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Create new category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories = [action.payload, ...state.categories]
        state.isLoading = false
      })
      .addCase(createCategory.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (catecory) => catecory._id !== action.payload._id
        )
        state.categories = [action.payload, ...state.categories]
        state.isLoading = false
      })
      .addCase(updateCategory.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (catecory) => catecory._id !== action.payload._id
        )
        state.isLoading = false
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })
  }
})

export default categorySlice.reducer
