import api from '../api'
import { ShippingInfo } from '../types/types'

export default {
    findAll: async () => {
    const response = api.get(`/api/orders`)
    return response
  },
  createOrder: async (shippingInfo: ShippingInfo) => {
    const response = api.post('/api/orders', {shippingInfo})
    return response
  },
  updateStatus: async (orderStatus: string, orderId: string) => {
    const response = api.put(`/api/orders/${orderId}/status`, {orderStatus})
    return response
  }
}