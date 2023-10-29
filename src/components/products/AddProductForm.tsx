import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { addProduct } from '../../redux/slices/products/productSlice'
import { AppDispatch } from '../../redux/store'
import { Product } from '../../types/types'

const initialProductState: Product = {
  id: 0,
  name: '',
  image: '',
  description: '',
  price: 0,
  categories: [],
  variants: [],
  sizes: [],
  quantity: 0
}

export function ProductForm(prop: {
  setDisplayAddForm: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const dispatch = useDispatch<AppDispatch>()
  const [product, setProduct] = useState<Product>(initialProductState)

  const inputStyle = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'
  const labelStyle = 'block text-sm font-medium text-gray-600'

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProduct({
        ...product,
        [name]: value.split(',')
      })
      return
    }

    setProduct({
      ...product,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(addProduct({ product }))
    // Reset the form
    setProduct(initialProductState)
  }

  const handleCloseForm = () => {
    prop.setDisplayAddForm(false)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold">Add a new product</h3>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className={labelStyle}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className={labelStyle}>
            Image URL:
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={product.image}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className={labelStyle}>
            Description:
          </label>
          <textarea
            name="description"
            id="description"
            value={product.description}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categories" className={labelStyle}>
            Categories: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="categories"
            id="categories"
            value={product.categories.join(',')}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="variants" className={labelStyle}>
            Variants: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="variants"
            id="variants"
            value={product.variants.join(',')}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="sizes" className={labelStyle}>
            Sizes: (use comma , to create multiple)
          </label>
          <input
            type="text"
            name="sizes"
            id="sizes"
            value={product.sizes.join(',')}
            onChange={handleChange}
            className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Add Product
        </button>
        <button
          type="button"
          onClick={handleCloseForm}
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Close
        </button>
      </form>
    </div>
  )
}
