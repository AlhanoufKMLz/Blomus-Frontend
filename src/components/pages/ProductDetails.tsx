import React from 'react'
import { useParams } from 'react-router'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

export default function ProductDetails() {
  const { productid } = useParams()
  const products = useSelector((state: RootState) => state.products)
  const product = products.items.find((item) => Number(productid) === item.id)

  return (
    <div>
      <img src={product?.image} alt="" width={'500'} />
      <p>Name: {product?.name}</p>
      <p>Description: {product?.description}</p>
    </div>
  )
}
