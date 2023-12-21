import api from '../api'
import { Category } from '../types/types'

export default {
  findAll: async () => {
    const response = await api.get('/api/categories')
    return response
  },
  addCategory: async (category: Partial<Category>) => {
    const response = api.post('/api/categories', category)
    return response
  },
  updateCategory: async (categoryId: string, category: Partial<Category>) => {
    const response = api.put(`/api/categories/${categoryId}`, category)
    return response
  },
  deleteCategory: async (categoryId: string) => {
    const response = await api.delete(`/api/categories/${categoryId}`)
    return response
  }
}