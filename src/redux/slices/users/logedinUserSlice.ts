import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { User } from '../../../types/types'
import api from '../../../api'

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

      console.log(response.data)
      return response.data
    } catch {
       
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
        state.error = action.error.message
        state.isLoading = false
      })
  }
})

export const { logout, editLogedInUser } = logedinUserSlice.actions

export default logedinUserSlice.reducer
