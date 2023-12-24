import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AppDispatch, RootState } from '../redux/store'
import { Product } from '../types/types'
import { addToCartThunk } from '../redux/slices/cart/cartSlice'
import { fetchBestSellingProductsThunk } from '../redux/slices/products/productSlice'
import { addToWishlistThunk } from '../redux/slices/wishlist/wishlistSlice'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()
  const bestSellers = useSelector((state: RootState) => state.products.bestSellers)
  const wishlist = useSelector((state: RootState) => state.wishlist.items)

  useEffect(() => {
    dispatch(fetchBestSellingProductsThunk())
  }, [])

  function handleAddToCart(product: Product) {
    const productId = product._id
    dispatch(addToCartThunk({ productId }))
    toast.success('Awesome pick! ' + product.name + ' is now waiting in your cart')
  }
  function handleAddToWishlist(product: Product) {
    const productId = product._id
    dispatch(addToWishlistThunk(productId)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Awesome pick! ' + product.name + ' is now waiting in your wishlist')
      }
      if (res.meta.requestStatus === 'rejected') {
        //toast.error(error)
      }
    })
  }

  return (
    <div className="min-h-screen items-start">
      <div>
        <div className="flex flex-col shadow-xl p-12 gap-3">
          <h1 className="text-4xl text-primary_pink font-bold">
            Let Your Space Shine Bright: <br />
            Candles and Diffusers for Pure Delight!
          </h1>
          <Link
            to={'/products'}
            className="bg-primary_green p-3 text-center w-2/12  text-2xl rounded-lg text-secondary_grey shadow-md hover:shadow-none hover:bg-secondary_grey hover:text-primary_green shadow-shadow">
            Start Shopping
          </Link>
        </div>

        <div className="flex items-start ">
          <img className="w-60 rounded-b-full" src="public/images/h1.JPG" />
          <img className="w-52 rounded-b-full" src="public/images/h3.JPG" />
          <img className="w-64 rounded-b-full" src="public/images/h5.JPG" />
          <img className="w-48 rounded-b-full" src="public/images/h6.JPG" />
        </div>

        {/* best selling products */}
        <h1 className="text-3xl text-primary_green font-bold text-center border-b-2 border-zinc_secondery p-4">
          Our best selling items
        </h1>

        <ul className="py-8 flex gap-5 flex-wrap">
          {bestSellers.map((product) => (
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
                  <div>
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
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className="px-2 py-1 text-xs font-semibold text-secondary_grey hover:text-primary_green uppercase transition-colors duration-300 transform rounded focus:bg-grey-700 dark:focus:bg-grey-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={
                          wishlist.find((item) => item.product._id === product._id)
                            ? 'currentColor'
                            : 'none'
                        }>
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
