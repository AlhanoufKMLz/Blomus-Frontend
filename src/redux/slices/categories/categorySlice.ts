import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category } from '../../../types/types'
import api from '../../../api'

export type CategoryState = {
  categories: Category[]
  error: undefined | string
  isLoading: boolean
}

const initialState: CategoryState = {
  categories: [],
  error: undefined,
  isLoading: false
}

// Fetch all categories
export const fetchCategories = createAsyncThunk('categories/fetchCategoreis', async () => {
  const response = await api.get('/api/categories')
  console.log(response.data.payload)
  return response.data.payload
})

// Create new category
export const createCategory = createAsyncThunk(
  'categories/createCategory',
  async (category: { name: string }) => {
    const response = await api.post('/api/categories', category)
    console.log(response.data.payload)
    return response.data.payload
  }
)

// Update category
export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  async ({ category, categoryId }: { category: { name: string }; categoryId: string }) => {
    const response = await api.put(`/api/categories/${categoryId}`, category)
    console.log(response.data.payload)
    return response.data.payload
  }
)

// Delete category
export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  async (categoryId: string) => {
    const response = await api.delete(`/api/categories/${categoryId}`)
    console.log(response.data.payload)
    return response.data.payload
  }
)

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    editCategory: (state, action: { payload: { newCategory: Category } }) => {
      state.categories = state.categories.filter(
        (catecory) => catecory._id !== action.payload.newCategory._id
      )
      state.categories = [action.payload.newCategory, ...state.categories]
    }
  },
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
        state.error = action.error.message
        state.isLoading = false
      })

      // Create new category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories = [action.payload.category, ...state.categories]
        state.isLoading = false
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (catecory) => catecory._id !== action.payload.category._id
        )
        state.categories = [action.payload.category, ...state.categories]
        state.isLoading = false
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (category) => category._id !== action.payload.categoryid
        )
        state.isLoading = false
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
  }
})
export const { editCategory } = categorySlice.actions

export default categorySlice.reducer
