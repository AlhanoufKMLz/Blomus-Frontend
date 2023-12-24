import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'
import { fetchWishlistItemsThunk, removeFromWishlistThunk } from '../redux/slices/wishlist/wishlistSlice'

export default function Wishlist() {
  const dispatch = useDispatch<AppDispatch>()
  const wishlist = useSelector((state: RootState) => state.wishlist)
  
  useEffect(() => {
    dispatch(fetchWishlistItemsThunk())    
  }, [])
  

  function handleRemoveFromWishlist(productId: string) {
    dispatch(removeFromWishlistThunk(productId))
  }

  return (
    <div className="min-h-screen items-start m-4 md:mx-20 md:my-5">
      <div className="grid ">
        {wishlist.items.length === 0 && (
          <div className="flex flex-col gap-6 items-center">
            <h1 className="text-primary_pink text-2xl font-bold">
              You don&apos;t have any items in the wishlist
            </h1>
            <Link
              to={'/products'}
              className="bg-primary_green p-2 text-center rounded-lg text-secondary_grey shadow-md hover:shadow-none hover:bg-secondary_grey hover:text-primary_green shadow-shadow">
              Start Shopping
            </Link>
          </div>
        )}
        {wishlist.items.length > 0 && (
          <div>
            <h1 className="text-primary_pink font-bold">YOUR WISHLIST</h1>
            <div className="flex gap-16 flex-col md:flex-row">
              <div className="overflow-y-auto max-h-[500px] w-full">
                <table className="text-primary_green w-full">
                  <tbody>
                    {wishlist.items.map((item) => (
                      <tr className="border-t-2 border-zinc_secondery" key={item.product._id}>
                        <td className="py-8">
                          <Link to={`/products/${item._id}`}>
                            {/* <img src={product.image} alt={product.name} width="70" /> */}
                          </Link>
                        </td>
                        <td>{item.product.name}</td>
                        <td>{item.product.price} SAR</td>
                        <td>
                          <button
                            className="hover:text-primary_pink"
                            onClick={() => handleRemoveFromWishlist(item.product._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16">
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{' '}
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
