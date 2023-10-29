import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { fetchCategoreis } from '../redux/slices/categories/categorySlice'
import { fetchUsers } from '../redux/slices/users/userSlice'
import { fetchOrders } from '../redux/slices/orders/orderSlice'
import { Link } from 'react-router-dom'

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategoreis())
    dispatch(fetchUsers())
    dispatch(fetchOrders())
  }, [])

  return (
    <div>
      <ul>
        <li>
          <Link to={'/productsmanager'}>Products</Link>
        </li>
        <li>
          <Link to={'/categoriesmanager'}>Categories</Link>
        </li>
        <li>
          <Link to={'/usersmanager'}>Users</Link>
        </li>
        <li>
          <Link to={'/orders'}>Orders</Link>
        </li>
      </ul>
    </div>
  )
}
