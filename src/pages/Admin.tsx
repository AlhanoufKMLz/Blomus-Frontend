import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { fetchCategoreis } from '../redux/slices/categories/categorySlice'
import { fetchUsers } from '../redux/slices/users/userSlice'
import { Link } from 'react-router-dom'

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategoreis())
    dispatch(fetchUsers())
  }, [])

  return (
    <div>
      <div className="grid">
        <Link to={'/productsmanager'}> Products Categories </Link>
        <Link to={'/categoriesmanager'}> Manage Categories </Link>
        <Link to={'/usersmanager'}> Manage Users </Link>
      </div>
    </div>
  )
}
