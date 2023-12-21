import api from '../api'

export default {
  findOne: async () => {
    const response = await api.get('/api/cart')
    return response
  },
  addItem: async (productId: string, quantity: number) => {
    const response = api.post('/api/cart', { productId, quantity })
    return response
  },
  removeItem: async (productId: string) => {
    const response = await api.put('/api/cart', { productId })
    return response
  },
  updateQuantity: async (productId: string, updateType: string) => {
    const response = await api.put('/api/cart/update-quantity', { productId, updateType })
    return response
  }
}
