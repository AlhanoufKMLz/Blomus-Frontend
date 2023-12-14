import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AppDispatch, RootState } from '../redux/store'
import { addToCart } from '../redux/slices/cart/cartSlice'
import { Product } from '../types/types'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { fetchCategories } from '../redux/slices/categories/categorySlice'

export default function Products() {
  const dispatch = useDispatch<AppDispatch>()
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(() => {
    dispatch(fetchCategories())
  },[])

  useEffect(() => {
    dispatch(fetchProducts({searchText, category, sortBy, pageNumber}))
  }, [searchText, category, sortBy, pageNumber])

  const {products, totalPages, isLoading, error} = useSelector((state: RootState) => state.products)
  const categories = useSelector((state: RootState) => state.categories)

  function handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText (event.target.value)
  }

  function handleSortChange(event: { target: { value: string } }) {
    setSortBy(event.target.value)
    setPageNumber(1)
  }

  function handleFilterChange(event: { target: { value: string } }) {
    setCategory(event.target.value)
    setPageNumber(1)
  }

  const handlePageChange = (page: number) => {
    setPageNumber(page)
  }

  function handleAddToCart(product: Product) {
    dispatch(addToCart({ product }))
    toast.success('Awesome pick! ' + product.name + ' is now waiting in your cart')
  }

  //Display the products
  return (
    <div className="min-h-screen items-start m-4 md:mx-20 md:my-5">
      <div className="flex flex-col justify-center md:flex-row border-b-2 border-zinc_secondery pb-5">
        <div className="pt-2 relative text-primary_pink">
          <input
            onChange={handleSearchTextChange}
            className="border-2 border-primary_grey h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search for products..."
          />
          <svg
            className="h-4 w-4 fill-current absolute right-0 top-0 mt-5 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="512px"
            height="512px">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </div>
        <select onChange={handleSortChange} className="text-primary_pink mt-2 h-10 rounded-lg text-sm bg-zinc">
          <option>Sort By</option>
          <option value={'lowestPrice'}>Low-High</option>
          <option value={'highestPrice'}>High-Low</option>
        </select>
        <select
          onChange={handleFilterChange}
          className="text-primary_pink mt-2 h-10 rounded-lg text-sm bg-zinc">
          <option value={''}>All Products</option>
          {categories.categories.map((category) => (
            <option key={category._id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <section className="products-container">
        {isLoading && <h3> Loading products...</h3>}
        {error && <h3> {error}</h3>}
        <div className="grid gap-4">
          <ul className="py-8 flex gap-5 flex-wrap">
            {products.map((product) => (
              <li key={product._id} className="flex flex-col items-center justify-center mx-auto">
                <div className="flex w-80 h-80 bg-white rounded-lg shadow-lg shadow-[#c0c0c0] hover:shadow-none items-center justify-center">
                  <Link to={`/${product._id}`}>
                    {/* <img className="w-48" src={product.image} alt={product.name} /> */}
                  </Link>
                </div>
                <div className="w-56 -mt-10 overflow-hidden rounded-lg shadow-lg md:w-64 bg-secondary_grey">
                  <Link to={`/${product._id}`}>
                    <h3 className="py-2 font-bold tracking-wide text-center text-primary_green uppercase">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between px-3 py-2 bg-primary_pink">
                    <span className="text-secondary_grey">{product.price} SAR</span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-2 py-1 text-xs font-semibold text-secondary_grey hover:text-primary_green uppercase transition-colors duration-300 transform rounded focus:bg-grey-700 dark:focus:bg-grey-600">
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      {/* Pagenation */}
      <div className="flex justify-center">
        {pageNumber !== 1 && (
          <button
            className={'rounded-full hover:border w-6 m-2 border-primary_pink text-primary_green'}
            onClick={() => {
              handlePageChange(pageNumber - 1)
            }}>
            &laquo;
          </button>
        )}
        {Array.from({ length: totalPages }, (_, index) => {
          if (
            index + 1 === pageNumber ||
            index + 1 === pageNumber + 1 ||
            index + 1 === pageNumber - 1 ||
            index + 1 == 1 ||
            index + 1 == totalPages
          )
            return (
              <button
                key={index + 1}
                className={
                  index + 1 == pageNumber
                    ? 'rounded-full bg-primary_green w-6 m-2 text-secondary_grey'
                    : 'rounded-full hover:border w-6 m-2 border-primary_pink text-primary_green'
                }
                onClick={() => {
                  handlePageChange(index + 1)
                }}>
                {index + 1}
              </button>
            )
          else return <span className="text-primary_green">.</span>
        })}
        {pageNumber !== totalPages && (
          <button
            className={'rounded-full hover:border w-6 m-2 border-primary_pink text-primary_green'}
            onClick={() => {
              handlePageChange(pageNumber + 1)
            }}>
            &raquo;
          </button>
        )}
      </div>
    </div>
  )
}
