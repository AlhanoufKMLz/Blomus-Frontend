import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { Order, OrderState } from '../../../types/types'
import ordersServices from '../../../services/orders'

// Fetch all orders
export const fetchOrdersThunk = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await ordersServices.findAll()

  return response.data.payload
})

// Create order
export const createOrderThunk = createAsyncThunk(
  'orders/createOrder',
  async (shippingInfo: Partial<Order>, { rejectWithValue }) => {
    try {
      const response = await ordersServices.createOrder(shippingInfo)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

const initialState: OrderState = {
  orders: [],
  error: undefined,
  isLoading: false
}

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
      
      // Create new product
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.orders = [action.payload, ...state.orders]
        state.isLoading = false
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })
  }
})

export default orderSlice.reducer
