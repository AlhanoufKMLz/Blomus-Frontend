import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { User } from '../../../types/types'
import api from '../../../api'
import { AxiosError } from 'axios'

export type UserState = {
  user: User | null
  error: undefined | string
  isLoading: boolean
}

const initialState: UserState = {
  user: null,
  error: undefined,
  isLoading: false
}

// Login user
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/auth/login', user)
      
      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

export const logedinUserSlice = createSlice({
  name: 'loged in user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
    },
    editLogedInUser: (state, action: { payload: { newUser: User } }) => {
      state.user = action.payload.newUser
    }
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.isLoading = false
      })
      .addCase(loginUser.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })
  }
})

export const { logout, editLogedInUser } = logedinUserSlice.actions

export default logedinUserSlice.reducer
