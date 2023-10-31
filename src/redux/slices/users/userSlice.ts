import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../../../types/types'

export type UserState = {
  users: User[]
  error: undefined | string
  isLoading: boolean
}

const initialState: UserState = {
  users: [],
  error: undefined,
  isLoading: false
}

export const fetchUsers = createAsyncThunk('product/fetchUsers', async () => {
  const response = await fetch('/mock/e-commerce/users.json')
  const data = await response.json()
  return data
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: { payload: { user: User } }) => {
      state.users = [action.payload.user, ...state.users]
    },
    removeUser: (state, action: { payload: { userid: number } }) => {
      state.users = state.users.filter((user) => user.id !== action.payload.userid)
    },
    editUser: (state, action: { payload: { newUser: User } }) => {
      state.users = state.users.filter((user) => user.id !== action.payload.newUser.id)
      state.users = [action.payload.newUser, ...state.users]
    }
  },
  extraReducers: (builder) => {
    builder
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
  }
})

export const { removeUser, addUser, editUser } = userSlice.actions

export default userSlice.reducer
