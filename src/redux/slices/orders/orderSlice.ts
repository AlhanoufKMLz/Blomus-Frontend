import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Order } from '../../../types/types'

export type OrderState = {
  orders: Order[]
  error: undefined | string
  isLoading: boolean
}

const initialState: OrderState = {
  orders: [],
  error: undefined,
  isLoading: false
}

export const fetchOrders = createAsyncThunk('product/fetchOrders', async () => {
  const response = await fetch('/mock/e-commerce/orders.json')
  const data = await response.json()
  return data
})

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload
        state.isLoading = false
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
  }
})

export default orderSlice.reducer
