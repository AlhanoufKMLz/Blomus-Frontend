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

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/productsmanager" element={<ProductsManager />} />
        <Route path="/usersmanager" element={<UsersManager />} />
        <Route path="/categoriesmanager" element={<CategoriesManager />} />
        <Route path="/:products" element={<Products />}></Route>
        <Route path="/products/:productid" element={<ProductDetails />}></Route>
      </Routes>
    </div>
  )
}

export default App
