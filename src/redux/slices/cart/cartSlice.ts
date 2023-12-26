import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { CartState, DiscountCode } from '../../../types/types'
import cartService from '../../../services/cart'

// Fetch cart items
export const fetchCartItemsThunk = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.findOne()

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Add to cart
export const addToCartThunk = createAsyncThunk(
  'cart/AddToCart',
  async (
    { productId, quantity = 1 }: { productId: string; quantity?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartService.addItem(productId, quantity)

      return response.data.payload
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Remove from cart
export const removeFromCartThunk = createAsyncThunk(
  'cart/removeFromCart',
  async (productId: string, { rejectWithValue }) => {
    try {
      const response = await cartService.removeItem(productId)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

// Update item quantity
export const updateItemQuantityThunk = createAsyncThunk(
  'cart/updateItemQuantity',
  async (
    { productId, updateType }: { productId: string; updateType: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await cartService.updateQuantity(productId, updateType)

      return response.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.msg)
      }
    }
  }
)

const initialState: CartState = {
  items: [],
  shippingFee: 25,
  totalPrice: 0,
  savedAmount: 0,
  finalTotal: 0,
  error: undefined,
  isLoading: false,
  itemsCount: 0,
  taxes: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    calculatePrice(state) {
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      )
      state.taxes = Number((state.totalPrice * 0.15).toFixed())
      state.finalTotal = state.totalPrice + Number(state.taxes) + state.shippingFee
    },
    applyDiscount(state, action: { payload: { discount: DiscountCode } }) {
      if(action.payload.discount.expirationDate < new Date)
        state.error = 'Discount code is expiered'
      else{
        state.savedAmount = state.finalTotal * action.payload.discount.discountPercentage / 100
        state.finalTotal = state.finalTotal - state.savedAmount 
      }      
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart items
      .addCase(fetchCartItemsThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCartItemsThunk.fulfilled, (state, action) => {
        state.items = action.payload.cartItems
        state.itemsCount = action.payload.itemsCount
        state.isLoading = false
      })
      .addCase(fetchCartItemsThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Add to cart
      .addCase(addToCartThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addToCartThunk.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(addToCartThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Remove from cart
      .addCase(removeFromCartThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeFromCartThunk.fulfilled, (state, action) => {
        const removed = state.items.find((item) => item.product._id !== action.payload.result)
        state.items = state.items.filter((item) => item.product._id !== action.payload.result)
        if (removed) state.itemsCount -= removed.quantity
        state.isLoading = false
      })
      .addCase(removeFromCartThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })

      // Update item quantity
      .addCase(updateItemQuantityThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateItemQuantityThunk.fulfilled, (state, action) => {
        if(action.payload.item.quantity === 0){
          state.items = state.items.filter((item) => item.product._id !== action.payload.item.product)
          return
        }
        const updatedCart = state.items.map((item) => {
          if (item.product._id === action.payload.item.product) {
            item.quantity = action.payload.item.quantity
          }
          return item
        })
        state.items = updatedCart
        state.isLoading = false
      })
      .addCase(updateItemQuantityThunk.rejected, (state, action) => {
        const errorMessage = action.payload
        if (typeof errorMessage === 'string') {
          state.error = errorMessage
        }
        state.isLoading = false
        return state
      })
  }
})

export const { calculatePrice, applyDiscount } = cartSlice.actions

export default cartSlice.reducer
