import { createSlice } from '@reduxjs/toolkit'
import { User } from '../../../types/types'

export type UserState = {
  user: User | null
}

const initialState: UserState = {
  user: null
}

export const logedinUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: { payload: { user: User } }) => {
      state.user = action.payload.user
    },
    logoutUser: (state) => {
      state.user = null
    }
  }
})

export const { loginUser, logoutUser } = logedinUserSlice.actions

export default logedinUserSlice.reducer
