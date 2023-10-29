import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import { changeQuantity, removeFromCart } from '../redux/slices/cart/cartSlice'
import { Product } from '../types/types'

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()

  function handleRemoveFromCart(product: Product) {
    dispatch(removeFromCart({ product }))
  }

  function handleQuantity(type: string, product: Product) {
    dispatch(changeQuantity({ product, type }))
  }

  return (
    <div>
      <div className="grid">
        <table className="m-20 text-[#727E7E]">
          {cart.items.length === 0 && (
            <h1 className="text-[#be9995]">You don&apos;t have any items in the cart</h1>
          )}
          {cart.items.length !== 0 && <h1 className="text-[#be9995]">YOURE CART</h1>}
          <tbody>
            {cart.items.map((product) => (
              <tr className="border-t-2" key={product.id}>
                <td className="py-12">
                  <Link to={`/products/${product.id}`}>
                    <img src={product.image} alt={product.name} width="70" />
                  </Link>
                </td>
                <td>{product.name}</td>
                <td>{product.price * product.quantity} SAR</td>
                <td>
                  <button className="px-1" onClick={() => handleQuantity('remove', product)}>
                    -
                  </button>
                  <span className="px-1">{product.quantity}</span>
                  <button className="px-1" onClick={() => handleQuantity('add', product)}>
                    +
                  </button>
                </td>
                <td>
                  <button onClick={() => handleRemoveFromCart(product)}>
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
    </div>
  )
}
