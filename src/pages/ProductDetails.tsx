import React from 'react'
import { useParams } from 'react-router'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/slices/cart/cartSlice'

export default function ProductDetails() {
  const { productid } = useParams()
  const products = useSelector((state: RootState) => state.products)
  const product = products.items.find((item) => Number(productid) === item.id)
  const dispatch = useDispatch<AppDispatch>()

  function handleAddToCart() {
    if (product) dispatch(addToCart({ product }))
  }

  return (
    <div>
      <img src={product?.image} alt="" width={'500'} />
      <p>Name: {product?.name}</p>
      <p>Description: {product?.description}</p>
      <button className="mb-2 border-red-200 bg-slate-200 w-28" onClick={handleAddToCart}>
        Add To Cart
      </button>
    </div>
  )
}
