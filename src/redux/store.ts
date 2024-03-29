import { configureStore } from '@reduxjs/toolkit'

import productsReducer from './slices/products/productSlice'
import categoriesReducer from './slices/categories/categorySlice'
import usersReducer from './slices/users/userSlice'
import cartSlice from './slices/cart/cartSlice'
import orderSlice from './slices/orders/orderSlice'
import logedinUserSlice from './slices/users/logedinUserSlice'
import discountCodesSlice from './slices/discountCode/discountCodeSlice'
import wishlistSlice from './slices/wishlist/wishlistSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer,
    cart: cartSlice,
    orders: orderSlice,
    logedinUser: logedinUserSlice,
    discountCodes: discountCodesSlice,
    wishlist: wishlistSlice
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
