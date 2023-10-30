import React, { useState } from 'react'

import SideBar from '../components/SideBar'
import { ProductsManager } from '../components/products/ProductsManager'
import { CategoriesManager } from '../components/categories/CategoriesManager'
import Orders from '../components/orders/Orders'
import { UsersManager } from '../components/users/UsersManager'

export default function Admin() {
  const [selectedComponent, setSelectedComponent] = useState('products')

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
