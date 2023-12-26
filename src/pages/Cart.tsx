import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'
import {
  fetchCartItemsThunk,
  removeFromCartThunk,
  updateItemQuantityThunk
} from '../redux/slices/cart/cartSlice'
import Checkout from '../components/Global/Checkout'

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector((state: RootState) => state.cart)

  useEffect(() => {
    dispatch(fetchCartItemsThunk())
  }, [])

  // hadle remove item  from cart
  function handleRemoveFromCart(productId: string) {
    dispatch(removeFromCartThunk(productId))
  }

  // handle change cart item quantity
  function handleQuantity(productId: string, updateType: string) {
    dispatch(updateItemQuantityThunk({ productId, updateType }))
  }

  // display cart
  return (
    <div className="min-h-screen items-start m-4 md:mx-20 md:my-5">
      <div className="grid ">
        {cart.items.length === 0 && (
          <div className="flex flex-col gap-6 items-center">
            <h1 className="text-primary_pink text-2xl font-bold">
              You don&apos;t have any items in the cart
            </h1>
            <Link
              to={'/products'}
              className="bg-primary_green p-2 text-center rounded-lg text-secondary_grey shadow-md hover:shadow-none hover:bg-secondary_grey hover:text-primary_green shadow-shadow">
              Start Shopping
            </Link>
          </div>
        )}
        {cart.items.length > 0 && (
          <div>
            <div className="flex justify-between md:w-8/12">
              <h1 className="text-primary_pink font-bold">YOUR CART</h1>
              <h1 className="text-primary_pink font-bold">{cart.items.length} ITEMS</h1>
            </div>
            <div className="flex gap-16 flex-col md:flex-row">
              <div className="overflow-y-auto max-h-[700px] w-full md:w-8/12 bg-white rounded-lg">
                <table className="text-primary_green w-full">
                  <tbody>
                    {cart.items.map((item) => (
                      <tr className="border-t-2 border-zinc_secondery" key={item.product._id}>
                        <td className="p-8">
                          <Link to={`/products/${item.product._id}`}>
                            <img
                              src={`https://${item.product.image}`}
                              alt={item.product.name}
                              width="70"
                            />
                          </Link>
                        </td>
                        <td>{item.product.name}</td>
                        <td>{item.product.price * item.quantity} SAR</td>
                        <td>
                          <button
                            className="px-1 hover:text-primary_pink"
                            onClick={() => handleQuantity(item.product._id, 'dec')}>
                            -
                          </button>
                          <span className="px-1">{item.quantity}</span>
                          <button
                            className="px-1 hover:text-primary_pink"
                            onClick={() => handleQuantity(item.product._id, 'inc')}>
                            +
                          </button>
                        </td>
                        <td className="p-4">
                          <button
                            className="hover:text-primary_pink"
                            onClick={() => handleRemoveFromCart(item.product._id)}>
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
              <Checkout />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
