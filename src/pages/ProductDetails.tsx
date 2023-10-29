import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cart/cartSlice'
import { fetchProducts } from '../redux/slices/products/productSlice'

export default function ProductDetails() {
  const { productid } = useParams()

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  const products = useSelector((state: RootState) => state.products)
  const product = products.items.find((item) => Number(productid) === item.id)

  function handleAddToCart() {
    if (product) dispatch(addToCart({ product }))
  }

  return (
    <div>
      {product && (
        <div
          key={product?.id}
          className="flex sm:flex-col justify-center mx-auto p-20 items-center gap-10">
          <div className="flex w-96 h-96 bg-white rounded-lg shadow-md items-center justify-center">
            <img className="w-56" src={product.image} alt={product.name} />
          </div>
          <table className="w-72 -mt-10 overflow-hidde text-[#727E7E] rounded-lg md:w-64">
            <tbody>
              <tr className="border-b border-[#D0CDD3]">
                <td className="py-4 font-bold tracking-wide text-[#be9995] uppercase">
                  {product.name}
                </td>
              </tr>
              <tr className="border-b border-[#D0CDD3]">
                <td className="py-4">
                  <span>{product.description}</span>
                </td>
              </tr>
              <tr className="text-[#be9995] border-b border-[#D0CDD3]">
                <td className="flex justify-between py-4">
                  <span>{product?.price} SAR</span>

                  <button
                    onClick={() => handleAddToCart()}
                    className="px-2 py-1 text-xs font-semibold hover:text-[#727E7E] uppercase transition-colors duration-300 transform rounded focus:bg-grey-700 dark:focus:bg-grey-600">
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
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
