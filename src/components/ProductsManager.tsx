import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeProduct } from '../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../redux/store'
import { NewProductWrapper } from './NewProductWrapper'

export function ProductsManager() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full">
      <NewProductWrapper />
      {products.isLoading && <h3> Loading products...</h3>}
      <div className="card grid gap-4">
        <ul>
          {products.items.map((product) => (
            <li key={product.id} className="flex items-center gap-4 text-2xl mb-2">
              <img src={product.image} alt={product.name} width="50" />
              <span>{product.name}</span>
              <button
                className=" text-red-400 text-xs"
                onClick={() => dispatch(removeProduct({ productid: product.id }))}>
                🗑️
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
