import { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '../../redux/store'
import { Category } from '../../types/types'
import { addCategory } from '../../redux/slices/categories/categorySlice'

const initialCategorytState: Category = {
  id: 0,
  name: ''
}

export function CategoryForm(prop: {
  setDisplayAddForm: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const dispatch = useDispatch<AppDispatch>()
  const [category, setCategory] = useState<Category>(initialCategorytState)

  const inputStyle = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400'
  const labelStyle = 'block text-sm font-medium text-gray-600'

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory({ ...category, [name]: value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(addCategory({ category }))
    // Reset the form
    setCategory(initialCategorytState)
  }

  return (
    <div>
      <h3 className="text-2xl font-bold">Add a new category</h3>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg">
        <div className="mb-4">
          <label htmlFor="name" className={labelStyle}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={category.name}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="id" className={labelStyle}>
            ID:
          </label>
          <input
            type="number"
            name="id"
            id="id"
            value={category.id}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Add Category
        </button>
        <button
          onClick={() => prop.setDisplayAddForm(false)}
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Close
        </button>
      </form>
    </div>
  )
}
