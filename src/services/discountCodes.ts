import api from '../api'
import { DiscountCode } from '../types/types'

export default {
  findAll: async () => {
    const response = await api.get('/api/discount-code')
    return response
  },
  addDiscountCode: async (discountCode: Partial<DiscountCode>) => {
    const response = api.post('/api/discount-code', discountCode)
    return response
  },
  updateDiscountCode: async (discountCodeId: string, discountCode: Partial<DiscountCode>) => {
    const response = api.put(`/api/discount-code/${discountCodeId}`, discountCode)
    return response
  },
  deleteDiscountCode: async (discountCodeId: string) => {
    const response = await api.delete(`/api/discount-code/${discountCodeId}`)
    return response
  }
}