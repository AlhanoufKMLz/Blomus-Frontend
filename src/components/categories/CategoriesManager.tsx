import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../redux/store'
import { Category } from '../../types/types'
import { removeCategory } from '../../redux/slices/categories/categorySlice'
import EditCategory from './EditCategoryModal'
import { CategoryForm } from './AddCategoryForm'

export function CategoriesManager() {
  const categories = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()

  const [categoriesToDisplay, setCategoriesToDisplay] = useState<Category[]>(categories.items)
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [displayAddForm, setDisplayAddForm] = useState(false)

  //Search for category
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(event.target.value)
  }
  useEffect(() => {
    if (searchKeyWord.trim() !== '') {
      const results = categories.items.filter((categories) =>
        categories.name.toLowerCase().includes(searchKeyWord.toLowerCase())
      )
      setCategoriesToDisplay(results)
    } else setCategoriesToDisplay(categories.items)
  }, [searchKeyWord, categories.items])

  //Open edit category modal
  function handleEdit(category: Category) {
    setSelectedCategory(category)
    setIsModalOpen(true)
  }

  //Open add category form
  function addCategoryForm() {
    setDisplayAddForm(true)
  }

  //Display categories table
  return (
    <div className="grid">
      <div className="flex">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block  p-2.5"
          type="text"
          onChange={handleChange}
          placeholder="Search for category..."
        />
        <button
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500block  p-2.5"
          onClick={addCategoryForm}>
          Add New Category
        </button>
      </div>
      {displayAddForm && <CategoryForm setDisplayAddForm={setDisplayAddForm} />}
      {categories.isLoading && <h3> Loading categories...</h3>}
      <table>
        <tbody>
          <tr className="text-left">
            <th>Name</th>
            <th>ID</th>
          </tr>
          {categoriesToDisplay.map((category) => (
            <tr className="border-t-2" key={category.id}>
              <td>{category.name}</td>
              <td>{category.id}</td>
              <td>
                <button className=" text-red-400 text-xs" onClick={() => handleEdit(category)}>
                  Edit
                </button>
              </td>
              <td>
                <button
                  className=" text-red-400 text-xs"
                  onClick={() => dispatch(removeCategory({ categoryid: category.id }))}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedCategory && (
        <EditCategory
          isOpen={isModalOpen}
          category={selectedCategory}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  )
}
