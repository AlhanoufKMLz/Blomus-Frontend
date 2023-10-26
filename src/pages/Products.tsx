import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { fetchCategoreis } from '../redux/slices/categories/categorySlice'
import { Product } from '../types/types'

export default function Products() {
  const products = useSelector((state: RootState) => state.products)
  const categories = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategoreis())
  }, [])

  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(products.items)
  const [searchKeyWord, setSearchKeyWord] = useState('')

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

  function sort(event: { target: { value: string } }) {
    const sortedProducts = [...productsToDisplay]
    sortedProducts.sort((a, b) => {
      if (event.target.value === 'Low-High') {
        return b.price - a.price
      }
      return a.price - b.price
    })
    setProductsToDisplay(sortedProducts)
  }

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

  return (
    <div>
      <div className="flex">
        <input
          type="text"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block  p-2.5"
          placeholder="Search for products..."
        />
        <select
          onChange={filter}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block  p-2.5">
          <option value={0}>All Products</option>
          {categories.items.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          onChange={sort}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block  p-2.5">
          <option value={'Low-High'}>Low-High</option>
          <option value={'High-Low'}>High-Low</option>
        </select>
      </div>

      <section className="products-container">
        {products.isLoading && <h3> Loading products...</h3>}
        <div className="card grid gap-4">
          <ul>
            {productsToDisplay.map((product) => (
              <li key={product.id} className="flex items-center gap-4 text-2xl mb-2">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} width="50" />
                  <span>{product.name}</span>
                  <span>{product.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
