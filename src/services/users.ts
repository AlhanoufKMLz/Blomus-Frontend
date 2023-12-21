import api from '../api'
import { User } from '../types/types'

export default {
  findAll: async () => {
    const response = await api.get('/api/users')
    return response
  },
  // findOne: async (productId: string) => {
  //   const response = await api.get(`/api/products/${productId}`)
  //   return response
  // },
  // findBestSeller: async (limit: number) => {
  //   const response = await api.get(`/api/products/highest-sold?limit=${limit}`)
  //   return response
  // },
  createUser: async (user: Partial<User>) => {
    const response = await api.post('/api/auth/register', user)
    return response
  },
  updateProduct: async (userId: string, user: FormData) => {
    const response = await api.put(`/api/users/${userId}`, user)
    return response
  },
  deleteUser: async (userId: string) => {
    const response = await api.delete(`/api/users/${userId}`)
    return response
  },
  blockUser: async (userId: string) => {
    const response = await api.put(`/api/users/${userId}/block`)
    return response
  },
  switchRole: async (userId: string) => {
    const response = await api.put(`/api/users/${userId}/switch-role`)
    return response
  },
  SendResetEmail: async (email: string) => {
    const response = await api.post('/api/reset-password', { email })
    return response
  },
  ResetPassword: async (resetPasswordToken: string, password: string) => {
    const response = await api.post(`/api/reset-password/${resetPasswordToken}`, { password })
    return response
  },
  login: async (user: { email: string; password: string }) => {
    const response = await api.post('/api/auth/login', user)
    return response
  }
}
