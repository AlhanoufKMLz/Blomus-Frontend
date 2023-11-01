import { createSlice } from '@reduxjs/toolkit'
import { Product } from '../../../types/types'

export type CartState = {
  items: Product[]
}

const initialState: CartState = {
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: { payload: { product: Product } }) => {
      const productFound = state.items.find((item) => item.id === action.payload.product.id)
      if (productFound && productFound.quantity) productFound.quantity++
      else state.items = [{ ...action.payload.product, quantity: 1 }, ...state.items]
    },
    removeFromCart: (state, action: { payload: { product: Product } }) => {
      state.items = state.items.filter((item) => item.id !== action.payload.product.id)
    },
    changeQuantity: (state, action: { payload: { product: Product; type: string } }) => {
      const productFound = state.items.find((item) => item.id === action.payload.product.id)
      //Check if the product found in the cart
      if (productFound && productFound.quantity) {
        //Check if the type add or remove
        if (action.payload.type === 'add') productFound.quantity++
        //Check if the quantity zero delete the product from cart
        else if (productFound.quantity > 1) productFound.quantity--
        else state.items = state.items.filter((item) => item.id !== action.payload.product.id)
      }
    }
  }
})
export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions

export default cartSlice.reducer
