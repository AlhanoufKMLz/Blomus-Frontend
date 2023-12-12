import { ZodType, z } from 'zod'

export type Product = {
  _id: string
  name: string
  image: string
  description: string
  price: number
  categories: number[]
  sizes: string[]
  quantity?: number
}

export type ProductState = {
  products: Product[]
  singleProduct: Product | undefined
  count: number
  error: undefined | string
  isLoading: boolean
}

export type Category = {
  _id: string
  name: string
}

export type Order = {
  _id: string
  products: { product: string; quantity: number }[]
  user: string
  orderDate: Date
  shippingInfo: {
    country: String
    city: String
    address: String
  }
  orderStatus: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Returned' | 'Canceled'
}

export type User = {
  _id: string
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'USER' | 'ADMIN'
  isAccountVerified: boolean
  isBlocked: boolean
  avatar: string
  activationToken: string
  resetPasswordToken: string
}

export type UserState = {
  users: User[]
  error: undefined | string
  isLoading: boolean
}

//props

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

export type SideBarProp = {
  setSelectedComponent: React.Dispatch<React.SetStateAction<string>>
}

//schemas

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
    { message: 'Email is not valid' }
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
  email: z.string().refine((value) => value !== '', { message: 'Email is required' }),
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
  email: z.string().refine(
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
  image: string
  description: string
  price: number
  categories: string
  variants: string
  sizes: string
}

export const productSchema: ZodType<ProductSchema> = z.object({
  name: z.string().refine((value) => value !== '', { message: 'Name is required' }),
  image: z.string().refine((value) => value !== '', { message: 'Image is required' }),
  description: z.string().refine((value) => value !== '', { message: 'Description is required' }),
  price: z.number().refine((value) => value > 0, { message: 'Price is required' }),
  categories: z.string().refine(
    (value) => {
      if (value === '') return true
      const pattern = /^\d+(?:\s*,\s*\d+)*$/
      return pattern.test(value)
    },
    { message: 'Input should be in the format "1,2" or "1,2,3,..."' }
  ),
  variants: z.string().refine(
    (value) => {
      if (value === '') return true
      const pattern = /^(\s*[^,]+\s*,)*\s*[^,]+\s*$/
      return pattern.test(value)
    },
    { message: 'Input should be in the format "x,y" or "x,y,z,...' }
  ),
  sizes: z.string().refine(
    (value) => {
      if (value === '') return true
      const pattern = /^(\s*[^,]+\s*,)*\s*[^,]+\s*$/
      return pattern.test(value)
    },
    { message: 'Input should be in the format "x,y" or "x,y,z,..."' }
  )
})
