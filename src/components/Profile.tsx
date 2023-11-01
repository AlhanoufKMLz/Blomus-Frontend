import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { EditUserSchema, ProfileModalProp, User, editUserSchema } from '../types/types'
import { AppDispatch } from '../redux/store'
import { editUser } from '../redux/slices/users/userSlice'
import { editLogedInUser } from '../redux/slices/users/logedinUserSlice'

export default function Profile(prop: ProfileModalProp) {
  if (!prop.setIsProfileOpen) return null

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditUserSchema>({ resolver: zodResolver(editUserSchema) })

  const dispatch = useDispatch<AppDispatch>()
  const [userChanges, setUserChanges] = useState<User>(prop.user)
  const [isEdit, setIsEdit] = useState(false)

  function handleEdit() {
    setIsEdit(true)
    reset()
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setUserChanges({
      ...userChanges,
      [name]: value
    })
  }

  function handleFormSubmit() {
    dispatch(editUser({ newUser: userChanges }))
    dispatch(editLogedInUser({ newUser: userChanges }))
    toast.success('user details updated successfully!')
    // Close the form
    setIsEdit(false)
  }

  function handleCancelEdit() {
    setIsEdit(false)
  }

  function handleCloseModal() {
    prop.setIsProfileOpen(false)
  }

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          {/* Display user info */}
          {!isEdit && (
            <div className="text-[#be9995]">
              <div className="flex justify-between m-1">
                <button onClick={handleEdit}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fillOpacity="0.01" />
                    <path
                      d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6"
                      stroke="#727E7E"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z"
                      fill="none"
                      stroke="#727E7E"
                      strokeWidth="4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button onClick={handleCloseModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-[#be9995]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center gap-4">
                <img
                  className="object-cover w-16 h-16 rounded-full ring ring-[#be9995]"
                  src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
                  alt=""
                />
                <div className="flex flex-col gap-3">
                  <p className="border-b-2 p-1">
                    <span className="text-[#727E7E] font-bold">FIRST NAME:</span>{' '}
                    {prop.user.firstName}
                  </p>
                  <p className="border-b-2 p-1">
                    <span className="text-[#727E7E] font-bold">LAST NAME: </span>{' '}
                    {prop.user.lastName}
                  </p>
                  <p className="border-b-2 p-1">
                    <span className="text-[#727E7E] font-bold">EMAIL:</span> {prop.user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Edit form */}
          {isEdit && (
            <form className="p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit(handleFormSubmit)}>
              {/* first name container */}
              <div className="mb-4">
                <label htmlFor="name" className="flex flex-col text-[#be9995]">
                  <span className="text-[#727E7E] pl-2">First Name:</span>
                  <input
                    {...register('firstName')}
                    onChange={handleChange}
                    className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="firstName"
                    value={userChanges.firstName}
                  />
                </label>
              </div>
              {errors.firstName && (
                <span className="text-[#be9995]"> {errors.firstName.message} </span>
              )}

              {/* last name container */}
              <div className="mb-4">
                <label htmlFor="name" className="flex flex-col text-[#be9995]">
                  <span className="text-[#727E7E] pl-2">Last Name:</span>
                  <input
                    {...register('lastName')}
                    onChange={handleChange}
                    className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="lastName"
                    value={userChanges.lastName}
                  />
                </label>
              </div>
              {errors.lastName && (
                <span className="text-[#be9995]"> {errors.lastName.message} </span>
              )}

              {/* email container */}
              <div className="mb-4">
                <label htmlFor="name" className="flex flex-col text-[#be9995]">
                  <span className="text-[#727E7E] pl-2">Email:</span>
                  <input
                    {...register('email')}
                    onChange={handleChange}
                    className="border-2 border-[#D0CDD3] h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="email"
                    value={userChanges.email}
                  />
                </label>
              </div>
              {errors.email && <span className="text-[#be9995]"> {errors.email.message} </span>}

              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="h-16 w-16 bg-[#727E7E] rounded-full text-[#D0CDD3] shadow-md hover:shadow-none hover:bg-[#D0CDD3] hover:text-[#727E7E] shadow-[#5c5c5c]">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="h-16 w-16 bg-[#be9995] rounded-full text-[#D0CDD3] shadow-md hover:shadow-none hover:bg-[#D0CDD3] hover:text-[#be9995] shadow-[#5c5c5c]">
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
