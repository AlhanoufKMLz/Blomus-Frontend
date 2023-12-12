import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Product, ProductState } from '../../../types/types'
import api from '../../../api';

// Fetch all products
export const fetchProducts = createAsyncThunk('product/fetchProducts', async ({ searchText, category, sortBy }:{searchText: string, category:string, sortBy:string}) => {
    const queryParams = new URLSearchParams();
    // queryParams.append('limit', '2')
    // queryParams.append('pageNumber', String(pageNumber))
    {searchText !== '' && queryParams.append('searchText', searchText)}
    {category !== '' && queryParams.append('category', category)}
    {sortBy !== '' && queryParams.append('sortBy', sortBy)}

    const response = await api.get(`/api/products?${queryParams.toString()}`);

  console.log(response.data)
  return response.data.payload
})

// Fetch products count
export const fetchProductsCount = createAsyncThunk(
  'product/fetchProductsCount',
  async () => {
    const response = await api.get(`/api/products/count`)

    return response.data.usersCount
  }
)

// Fetch single product
export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSigleProduct',
  async (productId: string) => {
    const response = await api.get(`/api/products/${productId}`)

    return response.data.payload
  }
)

const initialState: ProductState = {
  products: [],
  singleProduct: undefined,
  count: 0,
  error: undefined,
  isLoading: false
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: { payload: { product: Product } }) => {
      state.products = [action.payload.product, ...state.products]
    },
    removeProduct: (state, action: { payload: { productid: string } }) => {
      state.products = state.products.filter((product) => product._id !== action.payload.productid)
    },
    editProdect: (state, action: { payload: { newProduct: Product } }) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.newProduct._id
      )
      state.products = [action.payload.newProduct, ...state.products]
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all products
      .addCase(fetchProducts.pending, (state) => { 
        state.isLoading = true 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // Fetch single product
      .addCase(fetchSingleProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProduct = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })

      // Fetch products count
      .addCase(fetchProductsCount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductsCount.fulfilled, (state, action) => {
        state.count = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProductsCount.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  }
})

export const { removeProduct, addProduct, editProdect } = productSlice.actions

export default productSlice.reducer
