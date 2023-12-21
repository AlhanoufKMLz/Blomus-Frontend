import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import SideBar from '../components/Dashboard/SideBar'
import { ProductsManager } from '../components/Dashboard/products/ProductsManager'
import { CategoriesManager } from '../components/Dashboard/categories/CategoriesManager'
import Orders from '../components/Dashboard/orders/Orders'
import { UsersManager } from '../components/Dashboard/users/UsersManager'
import { fetchUsersThunk } from '../redux/slices/users/userSlice'
import { fetchCategoriesThunk } from '../redux/slices/categories/categorySlice'
import { fetchOrdersThunk } from '../redux/slices/orders/orderSlice'
import { AppDispatch } from '../redux/store'
import { DiscountCodesManager } from '../components/Dashboard/discountCodes/discountCodesManager'
import { fetchDiscountCodesThunk } from '../redux/slices/discountCode/discountCodeSlice'

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>()
  const [selectedComponent, setSelectedComponent] = useState('products')

  useEffect(() => {
    dispatch(fetchCategoriesThunk())
    dispatch(fetchUsersThunk())
    dispatch(fetchOrdersThunk())
    dispatch(fetchDiscountCodesThunk())
  }, [])
  
  return (
    <div className="min-h-screen items-start">
      <SideBar setSelectedComponent={setSelectedComponent} />
      <main>
        {selectedComponent === 'products' && <ProductsManager />}
        {selectedComponent === 'categories' && <CategoriesManager />}
        {selectedComponent === 'users' && <UsersManager />}
        {selectedComponent === 'orders' && <Orders />}
        {selectedComponent === 'discount' && <DiscountCodesManager />}
      </main>
    </div>
  )
}
