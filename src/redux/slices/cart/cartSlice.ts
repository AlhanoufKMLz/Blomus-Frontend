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
      const productFound = state.items.find((item) => item.id === action.payload.product.id)
      if (productFound) productFound.quantity++
      else {
        state.items = [{ ...action.payload.product, quantity: 1 }, ...state.items]
      }
      state.numberOfItems++
    },
    removeFromCart: (state, action: { payload: { product: Product } }) => {
      const filteredItems = state.items.filter((item) => item.id !== action.payload.product.id)
      state.items = filteredItems
      state.numberOfItems -= 1 * action.payload.product.quantity
    },
    changeQuantity: (state, action: { payload: { product: Product; type: string } }) => {
      const productFound = state.items.find((item) => item.id === action.payload.product.id)
      //Check if the product found in the cart
      if (productFound) {
        //Check if the type add or remove
        if (action.payload.type === 'add') {
          productFound.quantity++
          state.numberOfItems++
        } else {
          //Check if the quantity zero delete the product from cart
          if (productFound.quantity > 1) {
            productFound.quantity--
          } else {
            const filteredItems = state.items.filter(
              (item) => item.id !== action.payload.product.id
            )
            state.items = filteredItems
          }
          state.numberOfItems--
        }
      }
    }
  }
})
export const { addToCart, removeFromCart, changeQuantity } = cartSlice.actions

export default cartSlice.reducer
