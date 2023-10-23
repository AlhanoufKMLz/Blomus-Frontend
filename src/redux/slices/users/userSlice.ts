import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { User } from '../../../types/types'

export type UserState = {
  items: User[]
  error: null | string
  isLoading: boolean
}

const initialState: UserState = {
  items: [],
  error: null,
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
    usersRequest: (state) => {
      state.isLoading = true
    },
    usersSuccess: (state, action) => {
      state.isLoading = false
      state.items = action.payload
    },
    addUser: (state, action: { payload: { product: User } }) => {
      state.items = [action.payload.product, ...state.items]
    },
    removeUser: (state, action: { payload: { productid: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productid)
      state.items = filteredItems
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.items = action.payload
        state.isLoading = false
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        // state.error = action.error.message
        state.isLoading = false
      })
  }
})

export const { removeUser, addUser, usersRequest, usersSuccess } = userSlice.actions

export default userSlice.reducer
