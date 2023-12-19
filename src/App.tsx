import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Navigate, Route, Routes } from 'react-router'
import { useSelector } from 'react-redux'

import Home from './pages/Home'
import NavBar from './components/NavBar'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
import Orders from './components/orders/Orders'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import { UsersManager } from './components/users/UsersManager'
import { ProductsManager } from './components/products/ProductsManager'
import { CategoriesManager } from './components/categories/CategoriesManager'
import { RootState } from './redux/store'
import { ROLES } from './constants'

function App() {
  const logedinUser = useSelector((state: RootState) => state.logedinUser.decodedUser)

  return (
    <div className="bg-zinc">
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={logedinUser?.role == ROLES.ADMIN ? <Dashboard /> : <Navigate to="/" />} />

        <Route path="/products" element={<Products />}></Route>
        <Route path="/:productid" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        <Route path="/productsmanager" element={<ProductsManager />} />
        <Route path="/usersmanager" element={<UsersManager />} />
        <Route path="/categoriesmanager" element={<CategoriesManager />} />
        <Route path="/orders" element={<Orders />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
