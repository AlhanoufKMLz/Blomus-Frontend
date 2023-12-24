import api from '../api'

export default {
  findOne: async () => {
    const response = await api.get('/api/wishlist')
    return response
  },
  addItem: async (productId: string) => {
    const response = api.post('/api/wishlist', {productId} )
    return response
  },
  removeItem: async (productId: string) => {
    const response = await api.put('/api/wishlist', {productId})
    return response
  }
}
