import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'
import { removeFromCart } from '../../redux/slices/cart/cartSlice'

export default function Cart() {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch<AppDispatch>()

  function handleRemoveFromCart(productid: number) {
    dispatch(removeFromCart({ productid }))
  }

  return (
    <div>
      <div className="card grid gap-4">
        <ul className="p-20">
          {cart.items.map((product) => (
            <li key={product.id} className="flex flex-col mb-2 border-black border-solid">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} width="50" />
                <span>{product.name}</span>
                <span>{product.price}</span>
              </Link>
              <button
                className="mb-2 border-red-200 bg-slate-200 w-28"
                onClick={() => handleRemoveFromCart(product.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
