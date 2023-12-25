import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ProductFormModalProp, Product, ProductSchema, productSchema } from '../../../types/types'
import { AppDispatch, RootState } from '../../../redux/store'
import { createProductThunk, updateProductThunk } from '../../../redux/slices/products/productSlice'
import { fetchCategoriesThunk } from '../../../redux/slices/categories/categorySlice'

const initialState = {
  _id: '',
  name: '',
  image: '',
  description: '',
  price: 0,
  categories: [],
  sizes: [],
  quantityInStock: 0,
  itemsSold: 0,
  discount: 0
}

export default function ProductFormModal(prop: ProductFormModalProp) {
  if (!prop.isOpen) return null

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductSchema>({ resolver: zodResolver(productSchema) })

  const dispatch = useDispatch<AppDispatch>()
  const [productChanges, setProductChanges] = useState<Product>(initialState)
  const [productImage, setProductImage] = useState<File | undefined>(undefined)
  const [numberOfSizes, setNumberOfSizes] = useState(1)

  useEffect(() => {
    if (prop.product) {
      setProductChanges(prop.product)
      reset()
    }
  }, [])

  useEffect(() => {
    dispatch(fetchCategoriesThunk())
  }, [])
  const categories = useSelector((state: RootState) => state.categories.categories)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number) => {
    const { name, value } = e.target
    if (index != undefined) {
      let updatedSizes = [...productChanges.sizes]
      updatedSizes[index] = value
      setProductChanges({
        ...productChanges,
        sizes: updatedSizes
      })
      return
    }
    setProductChanges({
      ...productChanges,
      [name]: value
    })
  }

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setProductImage(e.target.files[0])
  }

  const handleAddCategroy = (category: string) => {
    //add category
    if (!productChanges.categories.includes(category))
      setProductChanges({
        ...productChanges,
        categories: [category, ...productChanges.categories]
      })
    //remove category
    else
      setProductChanges({
        ...productChanges,
        categories: productChanges.categories.filter((item) => item !== category)
      })
  }

  const handleAddSizeField = () => {
    setNumberOfSizes(numberOfSizes + 1)
  }

  const handleRemoveSizeField = () => {
    setNumberOfSizes(numberOfSizes - 1)
  }

  const handleFormSubmit = () => {
    const productData = new FormData()
    productData.append('name', productChanges.name)
    productData.append('price', String(productChanges.price))
    productData.append('quantityInStock', String(productChanges.quantityInStock))
    productData.append('discount', String(productChanges.discount))
    productData.append('description', productChanges.description)
    productData.append('categories', productChanges.categories.join(','))
    productData.append('sizes', productChanges.sizes.join(','))
    if (productImage) productData.append('image', productImage)

    // Add new product
    if (!prop.product) {
      dispatch(createProductThunk(productData))
      toast.success('Product added successfully!')

      // Update product
    } else {
      dispatch(updateProductThunk({ product: productData, productId: productChanges._id }))
      toast.success('Product details updated successfully!')
    }
    // Reset the useState
    setProductChanges(initialState)
    // Close the form
    prop.setIsModalOpen(false)
  }

  const handleCloseModal = () => {
    prop.setIsModalOpen(false)
    let updatedSizes = [...productChanges.sizes]
    updatedSizes.pop()
    setProductChanges({
      ...productChanges,
      sizes: updatedSizes
    })
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form
          className="p-4 bg-gray-100 rounded-lg max-h-[700px] overflow-y-auto"
          onSubmit={handleSubmit(handleFormSubmit)}>
          {/* name container */}
          <div className="mb-4">
            <label htmlFor="name" className="flex flex-col text-primary_pink">
              <span className="text-primary_green pl-2">Name:</span>
              <input
                type="text"
                id="name"
                {...register('name')}
                className="border-2 border-primary_grey h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                value={productChanges.name}
                onChange={handleChange}
              />

              {errors.name && <span className="text-primary_pink"> {errors.name.message} </span>}
            </label>
          </div>

          <div className="flex justify-between flex-col md:flex-row">
            {/* price container */}
            <div className="mb-4 md:w-1/3">
              <label htmlFor="price" className="flex flex-col text-primary_pink">
                <span className="text-primary_green pl-2">Price:</span>
                <input
                  type="number"
                  id="price"
                  {...register('price', { valueAsNumber: true })}
                  className="border-2 border-primary_grey h-10 px-5 rounded-lg text-sm focus:outline-none"
                  value={productChanges.price}
                  onChange={handleChange}
                />
                {errors.price && (
                  <span className="text-primary_pink"> {errors.price.message} </span>
                )}
              </label>
            </div>
            {/* quantity in stock container */}
            <div className="mb-4 md:w-1/3">
              <label htmlFor="price" className="flex flex-col text-primary_pink">
                <span className="text-primary_green pl-2">Quantity in stock:</span>
                <input
                  type="number"
                  id="quantity-in-stock"
                  {...register('quantityInStock', { valueAsNumber: true })}
                  className="border-2 border-primary_grey h-10 px-5 rounded-lg text-sm focus:outline-none"
                  value={productChanges.quantityInStock}
                  onChange={handleChange}
                />
                {errors.price && (
                  <span className="text-primary_pink"> {errors.quantityInStock?.message} </span>
                )}
              </label>
            </div>
            {/* discount container */}
            <div className="mb-4 md:w-1/3">
              <label htmlFor="discount" className="flex flex-col text-primary_pink">
                <span className="text-primary_green pl-2">Discount:</span>
                <input
                  type="number"
                  id="discount"
                  {...register('discount', { valueAsNumber: true })}
                  className="border-2 border-primary_grey h-10 px-5 rounded-lg text-sm focus:outline-none"
                  value={productChanges.discount}
                  onChange={handleChange}
                />
                {errors.discount && (
                  <span className="text-primary_pink"> {errors.discount.message} </span>
                )}
              </label>
            </div>
          </div>

          {/* image container */}
          <div className="mb-4">
            <label htmlFor="image" className="flex flex-col text-primary_pink">
              <span className="text-primary_green pl-2">Upload Image:</span>
              <input type="file" id="image" onChange={handleUploadImage} />
              {/* {errors.image && <span className="text-primary_pink"> {errors.image.message} </span>} */}
            </label>
          </div>

          {/* description container */}
          <div className="mb-4">
            <label htmlFor="description" className="flex flex-col text-primary_pink">
              <span className="text-primary_green pl-2">Description:</span>
              <textarea
                id="description"
                {...register('description')}
                className="border-2 border-primary_grey h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                value={productChanges.description}
                onChange={handleChange}
              />
              {errors.description && (
                <span className="text-primary_pink"> {errors.description.message} </span>
              )}
            </label>
          </div>

          {/* categories container */}
          <div className="mb-4">
            <label htmlFor="categories" className="flex flex-col text-primary_pink">
              <span className="text-primary_green pl-2">Categories:</span>
              <div className="border-2 border-primary_grey px-5 py-2 rounded-lg text-sm focus:outline-none flex flex-wrap gap-2">
                {categories.map((category) => (
                  <div key={category._id}>
                    <input
                      type="checkbox"
                      id={category.name}
                      onChange={() => handleAddCategroy(category._id)}
                      checked={productChanges.categories.some((item) => category._id === item)}
                    />
                    <label htmlFor={category.name}> {category.name}</label>
                  </div>
                ))}
              </div>
            </label>
          </div>

          {/* sizes containers */}
          <div className="mb-4">
            <label htmlFor="sizes" className="flex flex-col text-primary_pink">
              <div className="flex justify-between">
                <span className="text-primary_green pl-2">Sizes:</span>
                <div>
                  <button className="pr-2 text-2xl" onClick={handleRemoveSizeField}>
                    -
                  </button>
                  <button className="pr-2 text-2xl" onClick={handleAddSizeField}>
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-between">
                {Array.from({ length: numberOfSizes }, (_, index) => {
                  return (
                    <input
                      key={index}
                      type="text"
                      id="sizes"
                      placeholder={`${index + 1}. Add size`}
                      {...register('sizes')}
                      className="border-2 border-primary_grey h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none mb-2"
                      onChange={(e) => handleChange(e, index)}
                      //value={productChanges.sizes[index]}
                    />
                  )
                })}
              </div>
              {errors.sizes && <span className="text-primary_pink"> {errors.sizes.message} </span>}
            </label>
          </div>

          {/* buttons container */}
          <div className="flex justify-center gap-4">
            <button
              type="submit"
              className="h-16 w-16 bg-primary_green rounded-full text-primary_grey shadow-md hover:shadow-none hover:bg-primary_grey hover:text-primary_green shadow-shadow">
              {prop.product ? <span>Save</span> : <span>add</span>}
            </button>
            <button
              type="button"
              onClick={handleCloseModal}
              className="h-16 w-16 bg-primary_pink rounded-full text-primary_grey shadow-md hover:shadow-none hover:bg-primary_grey hover:text-primary_pink shadow-shadow">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
