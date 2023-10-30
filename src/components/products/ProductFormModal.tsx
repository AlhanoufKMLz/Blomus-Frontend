import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { ProductFormModalProps, Product } from '../../types/types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { addProduct, editProdect } from '../../redux/slices/products/productSlice'

const initialState = {
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

export default function ProductFormModal(prop: ProductFormModalProps) {
  const inputStyle = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'

  if (!prop.isOpen) return null

  const dispatch = useDispatch<AppDispatch>()
  const [productChanges, setProductChanges] = useState<Product>(initialState)

  useEffect(() => {
    if (prop.product) {
      setProductChanges(prop.product)
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target

    const isList = name === 'categories' || name === 'variants' || name === 'sizes'
    if (isList) {
      setProductChanges({
        ...productChanges,
        [name]: value.split(',')
      })
      return
    }

    setProductChanges({
      ...productChanges,
      [name]: value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!prop.product) dispatch(addProduct({ product: productChanges }))
    else dispatch(editProdect({ newProduct: productChanges }))
    // Reset the useState
    setProductChanges(initialState)
    // Close the form
    prop.setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    prop.setIsModalOpen(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
          <div className="flex justify-between">
            <div className="mb-4">
              <label htmlFor="name" className="flex flex-col text-[#be9995]">
                <span className="text-[#727E7E] pl-2">Name:</span>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  value={productChanges.name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="flex flex-col text-[#be9995]">
                <span className="text-[#727E7E] pl-2">Price:</span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  value={productChanges.price}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="flex flex-col text-[#be9995]">
              <span className="text-[#727E7E] pl-2">Image URL:</span>
              <input
                type="text"
                name="image"
                id="image"
                className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                value={productChanges.image}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="flex flex-col text-[#be9995]">
              <span className="text-[#727E7E] pl-2">Description:</span>
              <textarea
                name="description"
                id="description"
                className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                value={productChanges.description}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="categories" className="flex flex-col text-[#be9995]">
              <span className="text-[#727E7E] pl-2">
                Categories: (use comma , to create multiple)
              </span>
              <input
                type="text"
                name="categories"
                id="categories"
                className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                onChange={handleChange}
                value={productChanges.categories.join(',')}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="variants" className="flex flex-col text-[#be9995]">
              <span className="text-[#727E7E] pl-2">
                Variants: (use comma , to create multiple)
              </span>
              <input
                type="text"
                name="variants"
                id="variants"
                className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                onChange={handleChange}
                value={productChanges.variants.join(',')}
              />
            </label>
          </div>
          <div className="mb-4">
            <label htmlFor="sizes" className="flex flex-col text-[#be9995]">
              <span className="text-[#727E7E] pl-2">Sizes: (use comma , to create multiple)</span>
              <input
                type="text"
                name="sizes"
                id="sizes"
                className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                onChange={handleChange}
                value={productChanges.sizes.join(',')}
              />
            </label>
          </div>
          <div className="flex justify-center gap-4">
            <button type="submit" className="h-12 w-12 bg-[#727E7E] rounded-full text-[#D0CDD3]">
              {prop.product ? <span>Save</span> : <span>add</span>}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="h-12 w-12 bg-[#be9995] rounded-full text-[#D0CDD3] text-sm">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
