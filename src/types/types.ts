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
  shippingInfo: {
    country: String
    city: String
    address: String
  }
  orderStatus: Status
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
  items: { product: Product; quantity: number }[]
  totalPrice: number
  savedAmount: number
  totalAfterDiscount: number
  error: undefined | string
  isLoading: boolean
  itemsCount: number
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
  isProfileOpen: boolean
  user: User
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>
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

export const registerSchema: ZodType<RegisterSchema> = z.object({
  firstName: z.string().refine((value) => value !== '', { message: 'First name is required' }),
  lastName: z.string().refine((value) => value !== '', { message: 'Last name is required' }),
  email: z.string().refine(
    (value) => {
      const emailRegex = /\S+@\S+\.\S+/
      return emailRegex.test(value)
    },
    { message: 'Please enter valid email' }
  ),
  password: z
    .string()
    .min(8)
    .refine(
      (value) => {
        const hasNumber = /\d/.test(value)
        const hasAlphabetCharacter = /[a-zA-Z]/.test(value)
        return hasNumber && hasAlphabetCharacter
      },
      { message: 'Password must contain at least one number and one alphabet character' }
    )
})

export type LoginSchema = {
  email: string
  password: string
}

export const loginSchema: ZodType<LoginSchema> = z.object({
  email: z
    .string()
    .refine(
      (value) => {
        const emailRegex = /\S+@\S+\.\S+/
        return emailRegex.test(value)
      },
      { message: 'Please enter valid email' }
    )
    .refine((value) => value !== '', { message: 'Email is required' }),
  password: z.string().refine((value) => value !== '', { message: 'Password name is required' })
})

export type EditUserSchema = {
  firstName: string
  lastName: string
  email: string
  password?: string
}

export const editUserSchema: ZodType<EditUserSchema> = z.object({
  firstName: z.string().refine((value) => value !== '', { message: 'First name is required' }),
  lastName: z.string().refine((value) => value !== '', { message: 'Last name is required' }),
  email: z
    .string()
    .email('This is not a valid email.')
    .refine(
      (value) => {
        const emailRegex = /\S+@\S+\.\S+/
        return emailRegex.test(value)
      },
      { message: 'Email is not valid' }
    )
})

export type CategorySchema = {
  name: string
}

export const categorySchema: ZodType<CategorySchema> = z.object({
  name: z.string().refine((value) => value !== '', { message: 'Name is required' })
})

export type ProductSchema = {
  name: string
  description: string
  price: number
  quantityInStock: number
  sizes: string
  discount: number
}

export const productSchema: ZodType<ProductSchema> = z.object({
  name: z.string().refine((value) => value !== '', { message: 'Name is required' }),
  description: z.string().refine((value) => value !== '', { message: 'Description is required' }),
  price: z.number().refine((value) => value > 0, { message: 'Price is required' }),
  discount: z.number().refine((value) => value >= 0, { message: 'Discount cannt be negative' }),
  quantityInStock: z
    .number()
    .refine((value) => value >= 0, { message: 'Quantity cannt be negative' }),
  sizes: z.string()
})

export type DiscountCodeSchema = {
  code: string
  percentage: number
}

export const discountCodeSchema: ZodType<DiscountCodeSchema> = z.object({
  code: z.string().refine((value) => value !== '', { message: 'Code is required' }),
  percentage: z.number().refine((value) => value >= 0, { message: 'Percentage is required' }),
})

export type EmailSchema = {
  email: string
}

export const emailSchema: ZodType<EmailSchema> = z.object({
  email: z
    .string()
    .refine((value) => value !== '', { message: 'Email is required' })
    .refine(
      (value) => {
        const emailRegex = /\S+@\S+\.\S+/
        return emailRegex.test(value)
      },
      { message: 'Please enter valid email' }
    )
})

export type ResetPasswordSchema = {
  password: string
  confirmPassword: string
}

export const resetPasswordSchema: ZodType<ResetPasswordSchema> = z
  .object({
    password: z.string().refine(
      (value) => {
        const hasNumber = /\d/.test(value)
        const hasAlphabetCharacter = /[a-zA-Z]/.test(value)
        return hasNumber && hasAlphabetCharacter
      },
      { message: 'Password must contain at least one number and one alphabet character' }
    ),
    confirmPassword: z.string().refine((value) => value !== '', {
      message: 'Password is required'
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })
