import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Category, EditCategoryModalProps } from '../../types/types'
import { editCategory } from '../../redux/slices/categories/categorySlice'

export default function EditCategoryModal(prop: EditCategoryModalProps) {
  const inputStyle = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'

  if (!prop.isOpen) return null

  const dispatch = useDispatch<AppDispatch>()
  const [categoryChanges, setCategoryChanges] = useState<Category>(prop.category)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategoryChanges({ ...categoryChanges, name: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(editCategory({ newCategory: categoryChanges }))
    // Close the form
    prop.setIsModalOpen(false)
  }

  return (
    <div>
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
                value={categoryChanges.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="id"> ID: </label>
              <input
                type="number"
                name="id"
                id="id"
                className={inputStyle}
                value={categoryChanges.name}
                onChange={handleChange}
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
    </div>
  )
}
