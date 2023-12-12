import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../redux/store'
import { changeQuantity, removeFromCart } from '../redux/slices/cart/cartSlice'
import { Product } from '../types/types'

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()

  // Calculate the total price and taxes
  const totalPrice = cart.items.reduce((total, currentValue) => {
    return total + currentValue.price * (currentValue.quantity || 0)
  }, 0)
  const taxes = totalPrice * 0.15

  function handleRemoveFromCart(product: Product) {
    dispatch(removeFromCart({ product }))
  }

  function handleQuantity(type: string, product: Product) {
    dispatch(changeQuantity({ product, type }))
  }

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
            <h1 className="text-primary_pink font-bold">YOUR CART</h1>
            <div className="flex gap-16 flex-col md:flex-row">
              <div className="overflow-y-auto max-h-[500px] w-8/12">
                <table className="text-primary_green w-full">
                  <tbody>
                    {cart.items.map((product) => (
                      <tr className="border-t-2 border-zinc_secondery" key={product._id}>
                        <td className="py-8">
                          <Link to={`/products/${product._id}`}>
                            {/* <img src={product.image} alt={product.name} width="70" /> */}
                          </Link>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.price * (product.quantity || 0)} SAR</td>
                        <td>
                          <button
                            className="px-1 hover:text-primary_pink"
                            onClick={() => handleQuantity('remove', product)}>
                            -
                          </button>
                          <span className="px-1">{product.quantity}</span>
                          <button
                            className="px-1 hover:text-primary_pink"
                            onClick={() => handleQuantity('add', product)}>
                            +
                          </button>
                        </td>
                        <td>
                          <button
                            className="hover:text-primary_pink"
                            onClick={() => handleRemoveFromCart(product)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-trash"
                              viewBox="0 0 16 16">
                              {' '}
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{' '}
                              <path
                                fillRule="evenodd"
                                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              />{' '}
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="bg-white rounded-lg p-10 flex flex-col w-4/12 gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className="font-bold text-primary_green text-xl">SUMMARY</h2>
                  <div className="flex justify-between text-primary_pink">
                    <span>Subtotal</span>
                    <span>{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-primary_pink">
                    <span>Shipping</span>
                    <span>25</span>
                  </div>
                  <div className="flex justify-between text-primary_pink">
                    <span>Taxes</span>
                    <span>{taxes}</span>
                  </div>
                  <div className="flex justify-between text-primary_pink">
                    <span>Discount</span>
                    <span>-</span>
                  </div>
                  <div className="flex justify-between text-primary_pink border-y-2 border-zinc_secondery font-bold">
                    <span>Total</span>
                    <span>{totalPrice + taxes + 25}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <input
                    className="border-2 border-primary_grey h-10 p-2 w-full rounded-l-lg text-sm focus:outline-none"
                    type="code"
                    name="code"
                    placeholder="Coupon code"
                  />
                  <button className="bg-primary_green p-2 rounded-r-lg text-secondary_grey shadow-lg hover:shadow-none hover:bg-secondary_grey hover:text-primary_green">
                    Apply
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="bg-primary_pink p-2 rounded-lg text-secondary_grey shadow-md hover:shadow-none hover:bg-secondary_grey hover:text-primary_pink shadow-shadow">
                    Check Out
                  </button>
                  <Link
                    to={'/products'}
                    className="bg-primary_green p-2 text-center rounded-lg text-secondary_grey shadow-md hover:shadow-none hover:bg-secondary_grey hover:text-primary_green shadow-shadow">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
