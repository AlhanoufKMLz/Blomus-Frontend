import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { LogedinUserState, User } from '../../../types/types'
import { getDecodedTokenFromStorage } from '../../../utils/token'
import usersServices from '../../../services/users'
import api from '../../../api'

// Login user
export const loginUserThunk = createAsyncThunk(
  'user/loginUser',
  async (user: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await usersServices.login(user)

      localStorage.setItem('token', response.data.token)
      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
      const decodedUser = getDecodedTokenFromStorage()

      return {data: response.data, decodedUser}
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)



export type UserState = {
  user: User | null
  error: undefined | string
  isLoading: boolean
}

const decodedUser = getDecodedTokenFromStorage()

const initialState: LogedinUserState = {
  user: null,
  error: undefined,
  isLoading: false,
  decodedUser
}

export const logedinUserSlice = createSlice({
  name: 'loged in user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.decodedUser = null
    },
    editLogedInUser: (state, action: { payload: { newUser: User } }) => {
      state.user = action.payload.newUser
    }
  },
  extraReducers: (builder) => {
    builder
      // Login user
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.user = action.payload?.data.user
        state.decodedUser = action.payload?.decodedUser
        state.isLoading = false
        return state
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
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
