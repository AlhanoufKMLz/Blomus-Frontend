import './App.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Route, Routes } from 'react-router'
import { useSelector } from 'react-redux'

import { UsersManager } from './components/Dashboard/users/UsersManager'
import { ProductsManager } from './components/Dashboard/products/ProductsManager'
import { CategoriesManager } from './components/Dashboard/categories/CategoriesManager'
import { RootState } from './redux/store'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
import Orders from './components/Dashboard/orders/Orders'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import PrivateRoutes from './utils/PrivateRoutes'

function App() {
  const logedinUser = useSelector((state: RootState) => state.logedinUser.decodedUser)

  return (
    <div className="bg-zinc">
      <NavBar />
      <ToastContainer />
      <Routes>
        {/* private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/productsmanager" element={<ProductsManager />} />
          <Route path="/usersmanager" element={<UsersManager />} />
          <Route path="/categoriesmanager" element={<CategoriesManager />} />
          <Route path="/orders" element={<Orders />}></Route>
        </Route>

        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />}></Route>
        <Route path="/:productid" element={<ProductDetails />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:resetPasswordToken" element={<ResetPassword />}></Route>

        {/* catch all */}
        <Route path="*" element={<Home />}></Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
