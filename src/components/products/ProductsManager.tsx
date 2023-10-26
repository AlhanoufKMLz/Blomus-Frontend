import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeProduct } from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Product } from '../../types/types'
import EditModal from './EditProductModal'
import { ProductForm } from './ProductForm'

export function ProductsManager() {
  const products = useSelector((state: RootState) => state.products)
  const categories = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()

  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(products.items)
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product>()
  const [displayAddForm, setDisplayAddForm] = useState(false)

  //Filter products pased on category
  function filter(event: { target: { value: string } }) {
    const selectedValue = Number(event.target.value)

    if (selectedValue === 0) {
      setProductsToDisplay(products.items)
    } else {
      setProductsToDisplay(
        products.items.filter((product) => product.categories.includes(selectedValue))
      )
    }
  }

  //Search for product
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(event.target.value)
  }
  useEffect(() => {
    if (searchKeyWord.trim() !== '') {
      const results = products.items.filter((product) =>
        product.name.toLowerCase().includes(searchKeyWord.toLowerCase())
      )
      setProductsToDisplay(results)
    } else setProductsToDisplay(products.items)
  }, [searchKeyWord, products.items])

  //Open edit product modal
  function handleEdit(product: Product) {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  //Open add prodact form
  function addProductForm() {
    setDisplayAddForm(true)
  }

  //Display products table
  return (
    <div className="grid">
      <div className="flex">
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block  p-2.5"
          type="text"
          onChange={handleChange}
          placeholder="Search for products..."
        />
        <select
          onChange={filter}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500block  p-2.5">
          <option value={0}>All Products</option>
          {categories.items.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500block  p-2.5"
          onClick={addProductForm}>
          Add New Product
        </button>
      </div>
      {displayAddForm && <ProductForm setDisplayAddForm={setDisplayAddForm} />}
      {products.isLoading && <h3> Loading products...</h3>}
      <table>
        <tbody>
          <tr className="text-left">
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
          {productsToDisplay.map((product) => (
            <tr className="border-t-2" key={product.id}>
              <td>
                <img src={product.image} alt={product.name} width="50" />
              </td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <button className=" text-red-400 text-xs">Show more...</button>
              </td>
              <td>
                <button className=" text-red-400 text-xs" onClick={() => handleEdit(product)}>
                  Edit
                </button>
              </td>
              <td>
                <button
                  className=" text-red-400 text-xs"
                  onClick={() => dispatch(removeProduct({ productid: product.id }))}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit prodact modal */}
      {selectedProduct && (
        <EditModal isOpen={isModalOpen} product={selectedProduct} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  )
}
