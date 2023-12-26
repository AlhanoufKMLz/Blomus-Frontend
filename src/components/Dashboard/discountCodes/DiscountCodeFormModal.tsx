import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AppDispatch } from '../../../redux/store'
import { DiscountCode, DiscountCodeFormModalProp, DiscountCodeSchema } from '../../../types/types'
import { createDiscountCodeThunk, updateDiscountCodeThunk } from '../../../redux/slices/discountCode/discountCodeSlice'
import { discountCodeSchema } from '../../../schemas/schemas'

const initialState = {
  _id: '',
  code: '',
  discountPercentage: 0,
  expirationDate: new Date
}

export default function DiscountCodeFormModal(prop: DiscountCodeFormModalProp) {
  if (!prop.isOpen) return null

  const dispatch = useDispatch<AppDispatch>()
  const [discountCodeChanges, discountCodeChangesChanges] = useState<DiscountCode>(initialState)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<DiscountCodeSchema>({ resolver: zodResolver(discountCodeSchema) })

  // set initial value for update form
  useEffect(() => {
    if (prop.discountCode) {
      discountCodeChangesChanges(prop.discountCode)
      reset()
    }
  }, [])

  //handle discount change
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = e.target    
    discountCodeChangesChanges({ ...discountCodeChanges, [name]: value })
  }

  // handle submit
  const handleFormSubmit = () => {
    if (!prop.discountCode) {
      dispatch(createDiscountCodeThunk(discountCodeChanges))
      toast.success('category added successfully!')
    } else {
      dispatch(
        updateDiscountCodeThunk({
          discountCode: discountCodeChanges,
          discountCodeId: discountCodeChanges._id
        })
      )
      toast.success('category details updated successfully!')
    }

    // Reset the useState
    discountCodeChangesChanges(initialState)
    // Close the form
    prop.setIsModalOpen(false)
  }

  // handle close modal
  const handleCloseModal = () => {
    discountCodeChangesChanges(initialState)
    prop.setIsModalOpen(false)
  }

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          <form className="p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="mb-4">
              {/* code container */}
              <label htmlFor="name" className="flex flex-col text-primary_pink">
                <span className="text-primary_green pl-2">Code:</span>
                <input
                  {...register('code')}
                  onChange={handleChange}
                  className="border-2 border-primary_grey h-10 px-5 rounded-lg text-sm focus:outline-none"
                  type="name"
                  name="code"
                  value={discountCodeChanges.code}
                />
              </label>
              {errors.code && <span className="text-primary_pink"> {errors.code.message} </span>}

              {/* percentage container */}
              <label htmlFor="name" className="flex flex-col text-primary_pink">
                <span className="text-primary_green pl-2">Percentage:</span>
                <input
                  {...register('percentage', { valueAsNumber: true })}
                  onChange={handleChange}
                  className="border-2 border-primary_grey h-10 px-5 rounded-lg text-sm focus:outline-none"
                  type="number"
                  name="discountPercentage"
                  value={discountCodeChanges.discountPercentage}
                />
              </label>
              {errors.percentage && <span className="text-primary_pink"> {errors.percentage.message} </span>}

              {/* expiration date container */}
              <label htmlFor="name" className="flex flex-col text-primary_pink">
                <span className="text-primary_green pl-2">Expiration Date:</span>
                <input
                  onChange={handleChange}
                  className="border-2 border-primary_grey h-10 px-5 rounded-lg text-sm focus:outline-none"
                  type="date"
                  name="expirationDate"
                />
              </label>
            </div>

            {/* buttons container */}
            <div className="flex justify-center gap-4">
              <button
                type="submit"
                className="h-16 w-16 bg-primary_green rounded-full text-primary_grey shadow-md hover:shadow-none hover:bg-primary_grey hover:text-primary_green shadow-shadow">
                {prop.discountCode ? <span>Save</span> : <span>add</span>}
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
    </div>
  )
}
