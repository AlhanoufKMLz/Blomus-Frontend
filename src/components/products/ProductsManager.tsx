import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { removeProduct } from '../../redux/slices/products/productSlice'
import { AppDispatch, RootState } from '../../redux/store'
import { Product } from '../../types/types'
import ProductFormModal from './ProductFormModal'

export function ProductsManager() {
  const products = useSelector((state: RootState) => state.products)
  const categories = useSelector((state: RootState) => state.categories)
  const dispatch = useDispatch<AppDispatch>()

  const [productsToDisplay, setProductsToDisplay] = useState<Product[]>(products.products)
  const [searchKeyWord, setSearchKeyWord] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>()

  //Filter products pased on category
  function filter(event: { target: { value: string } }) {
    const selectedValue = Number(event.target.value)

    if (selectedValue === 0) {
      setProductsToDisplay(products.products)
    } else {
      setProductsToDisplay(
        products.products.filter((product) => product.categories.includes(selectedValue))
      )
    }
  }

  //Search for product
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKeyWord(event.target.value)
  }
  useEffect(() => {
    if (searchKeyWord.trim() !== '') {
      const results = products.products.filter((product) =>
        product.name.toLowerCase().includes(searchKeyWord.toLowerCase())
      )
      setProductsToDisplay(results)
    } else setProductsToDisplay(products.products)
  }, [searchKeyWord, products.products])

  //Open edit product modal
  function handleEdit(product: Product) {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  //Open add prodact form
  function addProductForm() {
    setSelectedProduct(null)
    setIsModalOpen(true)
  }

  //Display products table
  return (
    <div className="flex flex-col min-h-screen align-middle">
      <div className="flex flex-col justify-center md:flex-row border-b-2 pb-5">
        <div className="pt-2 relative text-[#be9995]">
          <input
            onChange={handleChange}
            className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search for products..."
          />
          <svg
            className="h-4 w-4 fill-current absolute right-0 top-0 mt-5 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 56.966 56.966"
            xmlSpace="preserve"
            width="512px"
            height="512px">
            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </div>
        <select
          onChange={filter}
          className="text-[#be9995] mt-2 h-10 rounded-lg text-sm bg-zinc-100">
          <option value={0}>All Products</option>
          {categories.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {products.isLoading && <h3> Loading products...</h3>}
      {products.error && <h3> {products.error}</h3>}
      <table className="md:mx-40 md:my-8 w-9/12">
        <tbody>
          <tr className="text-left text-[#be9995]">
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
          </tr>
          {productsToDisplay.map((product) => (
            <tr className="border-t-2" key={product.id}>
              <td className="pl-10 py-5">
                <img src={product.image} alt={product.name} width="50" />
              </td>
              <td className="text-[#727E7E]">{product.name}</td>
              <td className="text-[#727E7E]">{product.price}</td>
              <td>
                <button className="text-[#727E7E]" onClick={() => handleEdit(product)}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                    <path
                      d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6"
                      stroke="#727E7E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z"
                      fill="none"
                      stroke="#727E7E"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </td>
              <td>
                <button
                  className="text-[#be9995]"
                  onClick={() => dispatch(removeProduct({ productid: product.id }))}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16">
                    {' '}
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />{' '}
                    <path
                      fillRule="evenodd"
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                    />{' '}
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="fixed bg-[#727E7E] bottom-8 right-8 text-white h-14 w-14 rounded-full text-4xl text-center"
        onClick={addProductForm}>
        +
      </button>

      {/* Edit prodact modal */}
      {selectedProduct && (
        <ProductFormModal
          isOpen={isModalOpen}
          product={selectedProduct}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      {!selectedProduct && (
        <ProductFormModal isOpen={isModalOpen} product={null} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  )
}
