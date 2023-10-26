import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { fetchCategoreis } from '../redux/slices/categories/categorySlice'
import { addToCart } from '../redux/slices/cart/cartSlice'
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

  //Sort products based on price
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

  //Filter products based on categories
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

  //Add product to cart
  function handleAddToCart(id: number) {
    const product = productsToDisplay.find((product) => product.id === Number(id))
    if (product)
      // Check if product is found before dispatching
      dispatch(addToCart({ product }))
  }

  //Display the products
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
          <ul className="p-20">
            {productsToDisplay.map((product) => (
              <li key={product.id} className="flex flex-col mb-2 border-black border-solid">
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.name} width="50" />
                  <span>{product.name}</span>
                  <span>{product.price}</span>
                </Link>
                <button
                  className="mb-2 border-red-200 bg-slate-200 w-28"
                  onClick={() => handleAddToCart(product.id)}>
                  Add To Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
