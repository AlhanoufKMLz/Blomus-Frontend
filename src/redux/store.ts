import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './slices/products/productSlice'
import categoriesReducer from './slices/categories/categorySlice'
import usersReducer from './slices/users/userSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
    users: usersReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
