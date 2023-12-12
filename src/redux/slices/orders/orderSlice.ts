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
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await api.get(`/api/orders`)
  console.log(response.data.payload)
  return response.data.payload
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
