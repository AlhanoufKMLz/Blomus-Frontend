import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { Product, ProductState } from '../../../types/types'
import api from '../../../api';

// Fetch all products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ searchText, category, sortBy, pageNumber }:{searchText: string, category:string, sortBy:string, pageNumber:number}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('pageNumber', String(pageNumber))
    {searchText !== '' && queryParams.append('searchText', searchText)}
    {category !== '' && queryParams.append('category', category)}
    {sortBy !== '' && queryParams.append('sortBy', sortBy)}

    const response = await api.get(`/api/products?${queryParams.toString()}`);

    console.log(response.data)
  return response.data
})

// Fetch single product
export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSigleProduct',
  async (productId: string) => {
    const response = await api.get(`/api/products/${productId}`)

    return response.data.payload
  }
)

// Create new product
export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: { name: Product }) => {
    const response = await api.post('/api/products', product)
    
    return response.data.payload
  }
)

// Update product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ product, productId }: { product: Product; productId: string }) => {
    const response = await api.put(`/api/products/${productId}`, product)

    return response.data.payload
  }
)

// Delete product
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId: string) => {
    const response = await api.delete(`/api/products/${productId}`)
    
    return response.data.payload
  }
)

const initialState: ProductState = {
  products: [],
  singleProduct: undefined,
  totalPages: 0,
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
        state.products = action.payload.payload;
        state.totalPages = action.payload.totalPages
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

      // Create new product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products = [action.payload, ...state.products]
        state.isLoading = false
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })

      // Update category
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        )
        state.products = [action.payload, ...state.products]
        state.isLoading = false
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })

      // Delete category
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        )
        state.isLoading = false
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.error.message
        state.isLoading = false
      })
  }
})

export const { removeProduct, addProduct, editProdect } = productSlice.actions

export default productSlice.reducer
