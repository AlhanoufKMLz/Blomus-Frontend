import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { User, UserState } from '../../../types/types'
import api from '../../../api'

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/users')

    return response.data.payload
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.msg)
    }
  }
})

// Register users
export const registerUser = createAsyncThunk(
  'users/register',
  async (
    user: {
      firstName: string
      lastName: string
      email: string
      password: string
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post('/api/auth/register', user)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string, { rejectWithValue }) => {
  try {
    const response = await api.delete(`/api/users/${userId}`)

    return response.data.payload
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.msg)
    }
  }
})

export const blockUser = createAsyncThunk('users/blockUser', async (userId: string, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/users/${userId}/block`)

    return response.data.payload
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.msg)
    }
  }
})

// Switch user role
export const switchUserRole = createAsyncThunk('users/switchRole', async (userId: string, { rejectWithValue }) => {
  try {
    const response = await api.put(`/api/users/${userId}/switch-role`)

    return response.data.payload
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(error.response?.data.msg)
    }
  }
})

const initialState: UserState = {
  users: [],
  error: undefined,
  isLoading: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    editUser: (state, action: { payload: { newUser: User } }) => {
      state.users = state.users.filter((user) => user._id !== action.payload.newUser._id)
      state.users = [action.payload.newUser, ...state.users]
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Register users
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log("fulfilled")
        state.users = [action.payload, ...state.users]
        state.isLoading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        console.log("rejected")
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload._id)
        state.isLoading = false
      })
      .addCase(deleteUser.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // block user
      .addCase(blockUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload._id)
        state.users = [action.payload, ...state.users]
        
        state.isLoading = false
      })
      .addCase(blockUser.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Switch user role
      .addCase(switchUserRole.pending, (state) => {
        state.isLoading = true
      })
      .addCase(switchUserRole.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload._id)
        state.users = [action.payload, ...state.users]
        
        state.isLoading = false
      })
      .addCase(switchUserRole.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })
  }
})

export const { editUser } = userSlice.actions

export default userSlice.reducer
