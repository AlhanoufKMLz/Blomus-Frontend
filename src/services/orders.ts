import api from '../api'
import { DiscountCode, Order } from '../types/types'

export default {
    findAll: async () => {
    const response = api.get(`/api/orders`)
    return response
  },
  createOrder: async (shippingInfo: Partial<Order>) => {
    const response = api.post('/api/orders', {shippingInfo})
    return response
  }
}