import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import SideBar from '../components/SideBar'
import { ProductsManager } from '../components/products/ProductsManager'
import { CategoriesManager } from '../components/categories/CategoriesManager'
import Orders from '../components/orders/Orders'
import { UsersManager } from '../components/users/UsersManager'
import { fetchUsersThunk } from '../redux/slices/users/userSlice'
import { fetchCategoriesThunk } from '../redux/slices/categories/categorySlice'
import { fetchOrdersThunk } from '../redux/slices/orders/orderSlice'
import { AppDispatch } from '../redux/store'
import { fetchCartItemsThunk } from '../redux/slices/cart/cartSlice'

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedComponent, setSelectedComponent] = useState('products')

  useEffect(() => {
    dispatch(fetchCategoriesThunk())
    dispatch(fetchUsersThunk())
    dispatch(fetchOrdersThunk())
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
