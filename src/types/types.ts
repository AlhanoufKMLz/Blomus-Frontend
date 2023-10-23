export type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
  categories: number[]
  variants: string[]
  sizes: string[]
}

export type Category = {
  id: number
  name: string
}

export type Order = {
  id: number
  productid: number
  userid: number
  purchasedAt: Date
}

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'visitor' | 'admin'
}
