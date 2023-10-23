import { ProductsManager } from './components/ProductsManager'
import './App.css'
import Home from './components/pages/Home'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router'
import Admin from './components/pages/Admin'
import Products from './components/pages/Products'
import ProductDetails from './components/pages/ProductDetails'

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/productsmanager" element={<ProductsManager />} />
        <Route path="/:products" element={<Products />}></Route>
        <Route path="/products/:productid" element={<ProductDetails />}></Route>
      </Routes>
    </div>
  )
}

export default App
