import jwt_decode from 'jwt-decode'

import { isDecodedUser } from '../types/type-guards'
import { User } from '../types/types'

export function getDecodedTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  try {
    const decodedUser = jwt_decode(token)
    if (!isDecodedUser(decodedUser)) return null

    const user: User = {
      firstName: decodedUser.firstName,
      lastName: decodedUser.lastName,
      email: decodedUser.email,
      _id: decodedUser.user_id,
      password: decodedUser.password,
      role: decodedUser.role
    }

    return user
  } catch (error) {
    return null
  }
}

export function getTokenFromStorage() {
  const token = localStorage.getItem('token')
  if (!token) return null

  return token
}
