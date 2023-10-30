import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { fetchProducts } from '../redux/slices/products/productSlice'
import { fetchCategories } from '../redux/slices/categories/categorySlice'
import { fetchUsers } from '../redux/slices/users/userSlice'
import { fetchOrders } from '../redux/slices/orders/orderSlice'
import SideBar from '../components/SideBar'
import { ProductsManager } from '../components/products/ProductsManager'
import { CategoriesManager } from '../components/categories/CategoriesManager'
import Orders from '../components/orders/Orders'
import { UsersManager } from '../components/users/UsersManager'

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedComponent, setSelectedComponent] = useState('products')

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchCategories())
    dispatch(fetchUsers())
    dispatch(fetchOrders())
  }, [])

  return (
    <div className="min-h-screen items-start">
      <SideBar setSelectedComponent={setSelectedComponent} />
      <main>
        {selectedComponent === 'products' && <ProductsManager />}
        {selectedComponent === 'categories' && <CategoriesManager />}
        {selectedComponent === 'users' && <UsersManager />}
        {selectedComponent === 'orders' && <Orders />}
      </main>
    </div>
  )
}
