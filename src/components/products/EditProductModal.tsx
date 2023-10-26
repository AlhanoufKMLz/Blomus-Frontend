import React, { ChangeEvent, FormEvent, useState } from 'react'
import { ModalProps, Product } from '../../types/types'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { editProdect } from '../../redux/slices/products/productSlice'

export default function EditProductModal(prop: ModalProps) {
  const inputStyle = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'

  if (!prop.isOpen) return null

  const dispatch = useDispatch<AppDispatch>()
  const [productChanges, setProductChanges] = useState<Product>(prop.product)

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
    dispatch(editProdect({ newProduct: productChanges }))
    // Close the form
    prop.setIsModalOpen(false)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form className="p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name"> Name: </label>
            <input
              type="text"
              name="name"
              id="name"
              className={inputStyle}
              value={productChanges.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image">Image URL:</label>
            <input
              type="text"
              name="image"
              id="image"
              className={inputStyle}
              value={productChanges.image}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description">Description:</label>
            <textarea
              name="description"
              id="description"
              className={inputStyle}
              value={productChanges.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              name="price"
              id="price"
              className={inputStyle}
              value={productChanges.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categories">Categories: (use comma , to create multiple)</label>
            <input
              type="text"
              name="categories"
              id="categories"
              className={inputStyle}
              onChange={handleChange}
              value={productChanges.categories.join(',')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="variants">Variants: (use comma , to create multiple)</label>
            <input
              type="text"
              name="variants"
              id="variants"
              className={inputStyle}
              onChange={handleChange}
              value={productChanges.variants.join(',')}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="sizes">Sizes: (use comma , to create multiple)</label>
            <input
              type="text"
              name="sizes"
              id="sizes"
              className={inputStyle}
              onChange={handleChange}
              value={productChanges.sizes.join(',')}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Save Ghanges
          </button>
          <button
            onClick={() => prop.setIsModalOpen(false)}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Cansel
          </button>
        </form>
      </div>
    </div>
  )
}
