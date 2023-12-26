import { ZodType, z } from 'zod'
import { ROLES, STATUS } from '../constants/constants'

export type Role = keyof typeof ROLES
export type Status = keyof typeof STATUS

export type Product = {
  _id: string
  name: string
  image: string
  description: string
  price: number
  categories: string[]
  sizes: string[]
  quantityInStock: number
  itemsSold: number
  discount: number
}

export type Category = {
  _id: string
  name: string
}

export type Order = {
  _id: string
  products: { product: Product; quantity: number }[]
  user: User
  orderDate: Date
  shippingInfo: ShippingInfo
  orderStatus: Status
}
export type ShippingInfo = {
  country: String
  city: String
  address: String
}

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role
  isAccountVerified: boolean
  isBlocked: boolean
  avatar: string
  activationToken: string
  resetPasswordToken: string
}

export type DiscountCode = {
  _id: string
  code: string
  discountPercentage: number
  expirationDate: Date
}

export type DecodedUser = {
  firstName: string
  lastName: string
  email: string
  userId: string
  role: Role
  isBlocked: boolean
  exp: number
  iat: number
}

//-----------STATES-----------

export type ProductState = {
  products: Product[]
  bestSellers: Product[]
  singleProduct: Product | undefined
  totalPages: number
  error: undefined | string
  isLoading: boolean
}

export type CategoryState = {
  categories: Category[]
  error: undefined | string
  isLoading: boolean
}

export type UserState = {
  users: User[]
  error: undefined | string
  isLoading: boolean
}

export type LogedinUserState = {
  user: User | null
  error: undefined | string
  isLoading: boolean
  decodedUser: DecodedUser | undefined | null
}

export type CartState = {
  shippingFee: number
  items: { product: Product; quantity: number }[]
  totalPrice: number
  savedAmount: number
  finalTotal: number
  error: undefined | string
  isLoading: boolean
  itemsCount: number
  taxes: number
}

export type WishlistState = {
  items: {product: Product, _id: string}[]
  error: undefined | string
  isLoading: boolean
}

export type OrderState = {
  orders: Order[]
  error: undefined | string
  isLoading: boolean
}

export type DiscountCodeState = {
  codes: DiscountCode[]
  code: DiscountCode | null
  error: undefined | string
  isLoading: boolean
}

//-----------PROPS-----------

export type ProductFormModalProp = {
  isOpen: boolean
  product: Product | null
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type CategoryFormModalProp = {
  isOpen: boolean
  category: Category | null
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type ProfileModalProp = {
  isModalOpen: boolean
  user: User
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type DiscountCodeFormModalProp = {
  isOpen: boolean
  discountCode: DiscountCode | null
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type SideBarProp = {
  setSelectedComponent: React.Dispatch<React.SetStateAction<string>>
}

//-----------SCHEMAS-----------

export type RegisterSchema = {
  firstName: string
  lastName: string
  email: string
  password?: string
}

export type LoginSchema = {
  email: string
  password: string
}

export type EditUserSchema = {
  firstName: string
  lastName: string
  email: string
  password?: string
}

export type CategorySchema = {
  name: string
}

export type ProductSchema = {
  name: string
  description: string
  price: number
  quantityInStock: number
  sizes: string
  discount: number
}

export type DiscountCodeSchema = {
  code: string
  percentage: number
}

export type EmailSchema = {
  email: string
}

export type ResetPasswordSchema = {
  password: string
  confirmPassword: string
}
