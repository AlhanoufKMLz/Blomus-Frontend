import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { User, UserState } from '../../../types/types'
import api from '../../../api'

// Fetch all users
export const fetchUsersThunk = createAsyncThunk('users/fetchUsers', async (_, { rejectWithValue }) => {
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
export const registerUserThunk = createAsyncThunk(
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
export const deleteUserThunk = createAsyncThunk(
  'users/deleteUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/api/users/${userId}`)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Block user
export const blockUserThunk = createAsyncThunk(
  'users/blockUser',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/users/${userId}/block`)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Switch user role
export const switchUserRoleThunk = createAsyncThunk(
  'users/switchRole',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/users/${userId}/switch-role`)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Update user
export const updateUserThunk= createAsyncThunk(
  'users/updateUser',
  async ({user, userId}:{user: FormData, userId: string}, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/users/${userId}`, user)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

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
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Register users
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.users = [action.payload, ...state.users]
        state.isLoading = false
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Delete user
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload._id)
        state.isLoading = false
      })
      .addCase(deleteUserThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // block user
      .addCase(blockUserThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(blockUserThunk.fulfilled, (state, action) => {
        const updatedUsers = state.users.map((user) => {
          if (user._id === action.payload._id) return action.payload
          return user
        })
        state.users = updatedUsers
        state.isLoading = false
      })
      .addCase(blockUserThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Switch user role
      .addCase(switchUserRoleThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(switchUserRoleThunk.fulfilled, (state, action) => {
        const updatedUsers = state.users.map((user) => {
          if (user._id === action.payload._id) return action.payload
          return user
        })
        state.users = updatedUsers
        state.isLoading = false
      })
      .addCase(switchUserRoleThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Update user
      .addCase(updateUserThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateUserThunk.fulfilled, (state, action) => {
        const updatedUsers = state.users.map((user) => {
          if (user._id === action.payload._id) return action.payload
          return user
        })
        state.users = updatedUsers
        state.isLoading = false
      })
      .addCase(updateUserThunk.rejected, (state, action) => {
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
