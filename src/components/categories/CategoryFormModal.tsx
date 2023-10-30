import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { Category, CategoryFormModalProps } from '../../types/types'
import { addCategory, editCategory } from '../../redux/slices/categories/categorySlice'

const initialState = {
  id: 0,
  name: ''
}

export default function CategoryFormModal(prop: CategoryFormModalProps) {
  if (!prop.isOpen) return null

  const dispatch = useDispatch<AppDispatch>()
  const [categoryChanges, setCategoryChanges] = useState<Category>(initialState)

  useEffect(() => {
    if (prop.category) {
      setCategoryChanges(prop.category)
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategoryChanges({ ...categoryChanges, name: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!prop.category) dispatch(addCategory({ category: categoryChanges }))
    else dispatch(editCategory({ newCategory: categoryChanges }))
    // Reset the useState
    setCategoryChanges(initialState)
    // Close the form
    prop.setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setCategoryChanges({ id: Number(new Date()), name: '' })
    prop.setIsModalOpen(false)
  }

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <form className="p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="flex flex-col text-[#be9995]">
                <span className="text-[#727E7E] pl-2">Name:</span>
                <input
                  onChange={handleChange}
                  className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="name"
                  name="name"
                  value={categoryChanges.name}
                />
              </label>
            </div>
            <div className="flex justify-center gap-4">
              <button type="submit" className="h-12 w-12 bg-[#727E7E] rounded-full text-[#D0CDD3]">
                {prop.category ? <span>Save</span> : <span>add</span>}
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
    </div>
  )
}
