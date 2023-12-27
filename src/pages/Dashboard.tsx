import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ProductsManager } from '../components/Dashboard/products/ProductsManager'
import { CategoriesManager } from '../components/Dashboard/categories/CategoriesManager'
import { UsersManager } from '../components/Dashboard/users/UsersManager'
import { fetchUsersThunk } from '../redux/slices/users/userSlice'
import { fetchCategoriesThunk } from '../redux/slices/categories/categorySlice'
import { fetchOrdersThunk } from '../redux/slices/orders/orderSlice'
import { AppDispatch, RootState } from '../redux/store'
import { DiscountCodesManager } from '../components/Dashboard/discountCodes/DiscountCodesManager'
import { fetchDiscountCodesThunk } from '../redux/slices/discountCode/discountCodeSlice'
import SideBar from '../components/Dashboard/SideBar'
import Orders from '../components/Dashboard/orders/OrdersManager'
import { fetchProductsThunk } from '../redux/slices/products/productSlice'

export default function Admin() {
  const dispatch = useDispatch<AppDispatch>()
  const products = useSelector((state: RootState) => state.products.products)
  const categories = useSelector((state: RootState) => state.categories.categories)
  const users = useSelector((state: RootState) => state.users.users)
  const orders = useSelector((state: RootState) => state.orders.orders)
  const discountCodes = useSelector((state: RootState) => state.discountCodes.codes)

  const [selectedComponent, setSelectedComponent] = useState('products')

  useEffect(() => {
    Promise.all([
      dispatch(fetchProductsThunk({ pageNumber: 1 })),
      dispatch(fetchCategoriesThunk()),
      dispatch(fetchUsersThunk()),
      dispatch(fetchOrdersThunk()),
      dispatch(fetchDiscountCodesThunk())
    ])
  }, [])

  return (
    <div className="min-h-screen items-start">
      <SideBar setSelectedComponent={setSelectedComponent} />
      <div className="flex p-8 gap-5 pl-56">
        <div className="bg-white rounded-lg shadow-lg p-5 w-60 flex gap-4 items-center">
          <div className="bg-primary_green p-2 rounded-full w-16 h-16 flex justify-center items-center">
            <svg
              className="w-8 h-8"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                stroke="#FFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-4xl text-primary_pink">{products.length}</h1>
            <h1 className="text-sm text-primary_grey">Products</h1>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 w-60 flex gap-4 items-center">
          <div className="bg-primary_green p-2 rounded-full w-16 h-16 flex justify-center items-center">
            <svg width="36" height="36" viewBox="0 0 48 48">
              <g id="Layer_2" data-name="Layer 2">
                <g id="invisible_box" data-name="invisible box">
                  <rect width="48" height="48" fill="none" />
                </g>
                <g id="icons_Q2" data-name="icons Q2">
                  <path
                    fill="#FFFF"
                    d="M24,7.7,29.3,16H18.6L24,7.7M24,2a2.1,2.1,0,0,0-1.7,1L13.2,17a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H33a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-9-14A1.9,1.9,0,0,0,24,2Z"
                  />
                  <path
                    fill="#FFFF"
                    d="M43,43H29a2,2,0,0,1-2-2V27a2,2,0,0,1,2-2H43a2,2,0,0,1,2,2V41A2,2,0,0,1,43,43ZM31,39H41V29H31Z"
                  />
                  <path
                    fill="#FFFF"
                    d="M13,28a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-4A10,10,0,1,0,23,34,10,10,0,0,0,13,24Z"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-4xl text-primary_pink">{categories.length}</h1>
            <h1 className="text-sm text-primary_grey">Categories</h1>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 w-60 flex gap-4 items-center">
          <div className="bg-primary_green p-2 rounded-full w-16 h-16 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              fill="currentColor"
              className="bi bi-people"
              viewBox="0 0 16 16">
              <path
                fill="#FFFF"
                d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
              />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-4xl text-primary_pink">{users.length}</h1>
            <h1 className="text-sm text-primary_grey">Users</h1>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 w-60 flex gap-4 items-center">
          <div className="bg-primary_green p-2 rounded-full w-16 h-16 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="#FFFF"
              className="bi bi-boxes"
              viewBox="0 0 16 16">
              <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />{' '}
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-4xl text-primary_pink">{orders.length}</h1>
            <h1 className="text-sm text-primary_grey">Orders</h1>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 w-60 flex gap-4 items-center">
          <div className="bg-primary_green p-2 rounded-full w-16 h-16 flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 16 16"
              fill="#FFFF"
              className="cf-icon-svg">
              <path d="M2.865 8.14a2.553 2.553 0 1 1 2.552-2.552 2.555 2.555 0 0 1-2.552 2.553zm0-1.582a.97.97 0 1 0-.97-.97.97.97 0 0 0 .97.97zm7.942-1.991L3.914 14.886a1.03 1.03 0 0 1-1.712-1.143l6.893-10.32a1.03 1.03 0 0 1 1.712 1.144zm1.88 8.215a2.553 2.553 0 1 1-2.552-2.552 2.555 2.555 0 0 1 2.553 2.552zm-1.582 0a.97.97 0 1 0-.97.97.97.97 0 0 0 .97-.97z" />
            </svg>
          </div>
          <div>
            <h1 className="font-bold text-4xl text-primary_pink">{discountCodes.length}</h1>
            <h1 className="text-sm text-primary_grey">Discount codes</h1>
          </div>
        </div>
      </div>

      <div className="flex gap-5 pl-56 justify-start mb-10">
        <div className="bg-white rounded-lg shadow-lg p-5 w-80 flex gap-4 items-center">
          <div className="bg-primary_green p-2 rounded-full w-16 h-16 flex justify-center items-center">
            <h1 className="font-bold text-2xl text-white">SAR</h1>
          </div>
          <div>
            <h1 className=" text-primary_grey">Visits</h1>
            <h1 className="font-bold text-2xl text-primary_pink">54</h1>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-5 w-80 flex gap-4 items-center">
          <div className="bg-primary_green p-2 rounded-full w-16 h-16 flex justify-center items-center">
            <h1 className="font-bold text-2xl text-white">SAR</h1>
          </div>
          <div>
            <h1 className=" text-primary_grey">Sales</h1>
            <h1 className="font-bold text-2xl text-primary_pink">5,5520</h1>
          </div>
        </div>
      </div>

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
