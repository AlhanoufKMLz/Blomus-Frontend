import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'
import { changeQuantity, removeFromCart } from '../../redux/slices/cart/cartSlice'
import { Product } from '../../types/types'

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
      <div className="card grid gap-4">
        <ul className="p-20">
          {cart.items.map((product) => (
            <li key={product.id} className="flex flex-col mb-2 border-black border-solid">
              <Link to={`/products/${product.id}`}>
                <img src={product.image} alt={product.name} width="50" />
                <p>Name: {product.name}</p>
                <p>Price: {product.price}</p>
              </Link>
              <div className="flex">
                <span>Quantity: </span>
                <button className="px-1" onClick={() => handleQuantity('add', product)}>
                  +
                </button>
                <span className="px-1">{product.quantity}</span>
                <button className="px-1" onClick={() => handleQuantity('remove', product)}>
                  -
                </button>
              </div>

              <button
                className="mb-2 border-red-200 bg-slate-200 w-28"
                onClick={() => handleRemoveFromCart(product)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
