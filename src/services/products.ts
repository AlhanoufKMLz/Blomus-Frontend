import api from '../api'

export default {
  findAll: async (queryParams: string) => {
    const response = await api.get(`/api/products?${queryParams}`)
    return response
  },
  findOne: async (productId: string) => {
    const response = await api.get(`/api/products/${productId}`)
    return response
  },
  findBestSeller: async (limit: number) => {
    const response = await api.get(`/api/products/highest-sold?limit=${limit}`)
    return response
  },
  createProduct: async (product: FormData) => {
    const response = await api.post('/api/products', product)
    return response
  },
  updateProduct: async (productId: string, product: FormData) => {
    const response = await api.put(`/api/products/${productId}`, product)
    return response
  },
  deleteProduct: async (productId: string) => {
    const response = await api.delete(`/api/products/${productId}`)
    return response
  }
}
