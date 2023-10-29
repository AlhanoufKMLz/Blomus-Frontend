import { ProductsManager } from './components/products/ProductsManager'
import './App.css'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router'
import Admin from './pages/Admin'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import { UsersManager } from './components/users/UsersManager'
import { CategoriesManager } from './components/categories/CategoriesManager'
import Cart from './pages/Cart'
import Orders from './components/orders/Orders'
import Login from './pages/Login'
import Register from './pages/Register'
import Footer from './components/Footer'
import About from './pages/About'

function App() {
  return (
    <div className="bg-zinc-100">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />

        <Route path="/products" element={<Products />}></Route>
        <Route path="/products/:productid" element={<ProductDetails />}></Route>
        <Route path="/about" element={<About />}></Route>
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
