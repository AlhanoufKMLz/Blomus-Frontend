import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AppDispatch } from '../../redux/store'
import { Category, CategoryFormModalProp, CategorySchema, categorySchema } from '../../types/types'
import { addCategory, editCategory } from '../../redux/slices/categories/categorySlice'

const initialState = {
  id: Number(new Date()),
  name: ''
}

export default function CategoryFormModal(prop: CategoryFormModalProp) {
  if (!prop.isOpen) return null

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CategorySchema>({ resolver: zodResolver(categorySchema) })

  const dispatch = useDispatch<AppDispatch>()
  const [categoryChanges, setCategoryChanges] = useState<Category>(initialState)

  useEffect(() => {
    if (prop.category) {
      setCategoryChanges(prop.category)
      reset()
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategoryChanges({ ...categoryChanges, name: e.target.value })
  }

  const handleFormSubmit = () => {
    if (!prop.category) {
      dispatch(addCategory({ category: categoryChanges }))
      toast.success('category added successfully!')
    } else {
      dispatch(editCategory({ newCategory: categoryChanges }))
      toast.success('category details updated successfully!')
    }
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
          <form className="p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="flex flex-col text-[#be9995]">
                <span className="text-[#727E7E] pl-2">Name:</span>
                <input
                  {...register('name')}
                  onChange={handleChange}
                  className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="name"
                  name="name"
                  value={categoryChanges.name}
                />
              </label>
            </div>
            {errors.name && <span className="text-[#be9995]"> {errors.name.message} </span>}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="h-16 w-16 bg-[#727E7E] rounded-full text-[#D0CDD3] shadow-md hover:shadow-none hover:bg-[#D0CDD3] hover:text-[#727E7E] shadow-[#5c5c5c]">
                {prop.category ? <span>Save</span> : <span>add</span>}
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="h-16 w-16 bg-[#be9995] rounded-full text-[#D0CDD3] shadow-md hover:shadow-none hover:bg-[#D0CDD3] hover:text-[#be9995] shadow-[#5c5c5c]">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
