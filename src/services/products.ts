import api from '../api'

export default {
  findAll: async (queryParams: string) => {
    const response = await api.get(`/api/products?${queryParams}`)
    return response
  },
  findOne: async (productId: string) => {
    const response = await api.get(`/api/products/${productId}`)
    return response
  }
}
