export type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
  categories: number[]
  variants: string[]
  sizes: string[]
  quantity: number
}

export type Category = {
  id: number
  name: string
}

export type Order = {
  id: number
  productid: number
  userid: number
  purchasedAt: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: 'visitor' | 'admin'
}

export type ModalProps = {
  isOpen: boolean
  product: Product
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type EditCategoryModalProps = {
  isOpen: boolean
  category: Category
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
