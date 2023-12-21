import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { EditUserSchema, ProfileModalProp, User, editUserSchema } from '../types/types'
import { AppDispatch } from '../redux/store'
import { updateUserThunk } from '../redux/slices/users/userSlice'
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
  const [newAvatar, setNewAvatar] = useState<File | undefined>(undefined)
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

  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setNewAvatar(e.target.files[0])
  }

  function handleFormSubmit() {
    const userData = new FormData()
    userData.append('firstName', userChanges.firstName)
    userData.append('lastName', userChanges.lastName)
    if (newAvatar) userData.append('avatar', userChanges.avatar)

    dispatch(updateUserThunk({ user: userData, userId: userChanges._id}))
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
            <div className="text-primary_pink">
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
                    className="w-6 h-6 text-primary_pink"
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
                  className="object-cover w-16 h-16 rounded-full ring ring-primary_pink"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt=""
                />
                <div className="flex flex-col gap-3">
                  <p className="border-b-2 p-1">
                    <span className="text-primary_green font-bold">FIRST NAME:</span>{' '}
                    {prop.user.firstName}
                  </p>
                  <p className="border-b-2 p-1">
                    <span className="text-primary_green font-bold">LAST NAME: </span>{' '}
                    {prop.user.lastName}
                  </p>
                  <p className="border-b-2 p-1">
                    <span className="text-primary_green font-bold">EMAIL:</span> {prop.user.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Edit form */}
          {isEdit && (
            <form className="p-4 bg-gray-100 rounded-lg" onSubmit={handleSubmit(handleFormSubmit)}>
              <input type="file" id="image" onChange={handleUploadAvatar} />

              {/* first name container */}
              <div className="mb-4">
                <label htmlFor="name" className="flex flex-col text-primary_pink">
                  <span className="text-primary_green pl-2">First Name:</span>
                  <input
                    {...register('firstName')}
                    onChange={handleChange}
                    className="border-2 border-primary_grey h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="firstName"
                    value={userChanges.firstName}
                  />
                </label>
              </div>
              {errors.firstName && (
                <span className="text-primary_pink"> {errors.firstName.message} </span>
              )}

              {/* last name container */}
              <div className="mb-4">
                <label htmlFor="name" className="flex flex-col text-primary_pink">
                  <span className="text-primary_green pl-2">Last Name:</span>
                  <input
                    {...register('lastName')}
                    onChange={handleChange}
                    className="border-2 border-primary_grey h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="lastName"
                    value={userChanges.lastName}
                  />
                </label>
              </div>
              {errors.lastName && (
                <span className="text-primary_pink"> {errors.lastName.message} </span>
              )}

              {/* email container */}
              <div className="mb-4">
                <label htmlFor="name" className="flex flex-col text-primary_pink">
                  <span className="text-primary_green pl-2">Email:</span>
                  <input
                    {...register('email')}
                    onChange={handleChange}
                    className="border-2 border-primary_grey h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                    type="email"
                    value={userChanges.email}
                  />
                </label>
              </div>
              {errors.email && <span className="text-primary_pink"> {errors.email.message} </span>}

              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="h-16 w-16 bg-primary_green rounded-full text-primary_grey shadow-md hover:shadow-none hover:bg-primary_grey hover:text-primary_green shadow-shadow">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="h-16 w-16 bg-primary_pink rounded-full text-primary_grey shadow-md hover:shadow-none hover:bg-primary_grey hover:text-primary_pink shadow-shadow">
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
