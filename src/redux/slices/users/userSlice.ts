import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User, UserState } from '../../../types/types'
import api from '../../../api'
import { AxiosError } from 'axios'

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await api.get('/api/users')

  console.log(response.data.payload)
  return response.data.payload
})

// Register users
export const registerUser = createAsyncThunk(
  'user/register',
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

      console.log(response.data)
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue('rejected')
    }
  }
)

// Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (userId: string) => {
  const response = await api.delete(`/api/users/${userId}`)

  console.log(response.data.payload)
  return response.data.payload
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
        state.error = action.error.message
        state.isLoading = false
      })

      // Register users
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users = action.payload
        state.isLoading = false
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })

      // Delete user
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.payload.userId
        )
        state.isLoading = false
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
  }
})

export const { editUser } = userSlice.actions

export default userSlice.reducer
