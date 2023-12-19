import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Order } from '../../../types/types'
import api from '../../../api'

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

// Fetch all orders
export const fetchOrdersThunk = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await api.get(`/api/orders`)

  return response.data.payload
})

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrdersThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchOrdersThunk.fulfilled, (state, action) => {
        state.orders = action.payload
        state.isLoading = false
      })
      .addCase(fetchOrdersThunk.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
  }
})

export default orderSlice.reducer
