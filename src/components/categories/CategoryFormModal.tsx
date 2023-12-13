import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AppDispatch } from '../../redux/store'
import { Category, CategoryFormModalProp, CategorySchema, categorySchema } from '../../types/types'
import { createCategory, updateCategory } from '../../redux/slices/categories/categorySlice'

const initialState = {
  _id: '',
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
      dispatch(createCategory({ name: categoryChanges.name }))
      toast.success('category added successfully!')
    } else {
      dispatch(
        updateCategory({
          category: { name: categoryChanges.name },
          categoryId: categoryChanges._id
        })
      )
      toast.success('category details updated successfully!')
    }

    // Reset the useState
    setCategoryChanges(initialState)
    // Close the form
    prop.setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    setCategoryChanges(initialState)
    prop.setIsModalOpen(false)
  }

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <form className="p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="flex flex-col text-primary_pink">
                <span className="text-primary_green pl-2">Name:</span>
                <input
                  {...register('name')}
                  onChange={handleChange}
                  className="border-2 border-primary_grey h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                  type="name"
                  name="name"
                  value={categoryChanges.name}
                />
              </label>
            </div>
            {errors.name && <span className="text-primary_pink"> {errors.name.message} </span>}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="h-16 w-16 bg-primary_green rounded-full text-primary_grey shadow-md hover:shadow-none hover:bg-primary_grey hover:text-primary_green shadow-shadow">
                {prop.category ? <span>Save</span> : <span>add</span>}
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="h-16 w-16 bg-primary_pink rounded-full text-primary_grey shadow-md hover:shadow-none hover:bg-primary_grey hover:text-primary_pink shadow-shadow">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
