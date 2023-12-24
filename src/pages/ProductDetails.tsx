import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

import { AppDispatch, RootState } from '../redux/store'
import { addToCartThunk } from '../redux/slices/cart/cartSlice'
import { fetchSingleProductThunk } from '../redux/slices/products/productSlice'
import { Product } from '../types/types'
import { addToWishlistThunk } from '../redux/slices/wishlist/wishlistSlice'

export default function ProductDetails() {
  const { productid } = useParams()
  const dispatch = useDispatch<AppDispatch>()
  const product = useSelector((state: RootState) => state.products.singleProduct)
  const wishlist = useSelector((state: RootState) => state.wishlist.items)

  useEffect(() => {
    if (productid) {
      dispatch(fetchSingleProductThunk(productid))
    }
  }, [dispatch, productid])


  function handleAddToCart() {
    if (product) {
      const productId = product._id
      dispatch(addToCartThunk({ productId }))
      toast.success('Awesome pick! ' + product.name + ' is now waiting in your cart')
    }
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
    <div>
      {product && (
        <div
          key={product?._id}
          className="flex flex-col md:flex-row justify-center mx-auto p-20 items-center gap-10">
          <Link
            to={'/products'}
            className="h-16 w-16 bg-primary_pink flex justify-center items-center rounded-full text-primary_grey shadow-md hover:shadow-none hover:bg-primary_grey hover:text-primary_pink shadow-shadow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-arrow-left-short"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </Link>
          <div className="flex w-96 h-96 bg-white rounded-lg shadow-md items-center justify-center">
            {/* <img className="w-56" src={product.image} alt={product.name} /> */}
          </div>
          <table className="w-72 -mt-10 overflow-hidde text-primary_green rounded-lg md:w-64">
            <tbody>
              <tr className="border-b border-primary_grey">
                <td className="py-4 font-bold tracking-wide text-primary_pink uppercase">
                  {product.name}
                </td>
              </tr>
              <tr className="border-b border-primary_grey">
                <td className="py-4">
                  <span>{product.description}</span>
                </td>
              </tr>
              {product.sizes.length > 0 && (
                <tr className="border-b border-primary_grey">
                  <td>
                    <span className="text-primary_pink font-bold">Sizes</span>

                    {product.sizes.map((size) => (
                      <div key={size}>
                        <input type="radio" id={size} name="drone" value={size} checked />
                        <label className="pl-2" htmlFor={size}>
                          {size}
                        </label>
                      </div>
                    ))}
                  </td>
                </tr>
              )}
              <tr className="text-primary_pink border-b border-primary_grey">
                <td className="flex justify-between py-4">
                  <span>{product?.price} SAR</span>
                  <div>
                    <button
                      onClick={() => handleAddToCart()}
                      className="px-2 py-1 text-xs font-semibold hover:text-primary_green uppercase transition-colors duration-300 transform rounded focus:bg-grey-700 dark:focus:bg-grey-600">
                      <svg
                        className="w-6 h-6"
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
                      className="px-2 py-1 text-xs font-semibold hover:text-primary_green uppercase transition-colors duration-300 transform rounded focus:bg-grey-700 dark:focus:bg-grey-600">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
