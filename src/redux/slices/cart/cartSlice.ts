import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../../types/types'

export type CartState = {
  items: Product[]
  numberOfItems: number
}

const initialState: CartState = {
  items: [],
  numberOfItems: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: { product: Product } }) => {
      state.items = [action.payload.product, ...state.items]
      state.numberOfItems = state.items.length
    },
    removeFromCart: (state, action: { payload: { productid: number } }) => {
      const filteredItems = state.items.filter((product) => product.id !== action.payload.productid)
      state.items = filteredItems
      state.numberOfItems = state.items.length
    }
  }
})
export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer
