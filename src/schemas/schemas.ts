import { ZodType, z } from 'zod'
import {
  CategorySchema,
  DiscountCodeSchema,
  EditUserSchema,
  EmailSchema,
  LoginSchema,
  ProductSchema,
  RegisterSchema,
  ResetPasswordSchema
} from '../types/types'

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

export const categorySchema: ZodType<CategorySchema> = z.object({
  name: z.string().refine((value) => value !== '', { message: 'Name is required' })
})

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

export const discountCodeSchema: ZodType<DiscountCodeSchema> = z.object({
  code: z.string().refine((value) => value !== '', { message: 'Code is required' }),
  percentage: z.number().refine((value) => value >= 0, { message: 'Percentage is required' })
})

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
