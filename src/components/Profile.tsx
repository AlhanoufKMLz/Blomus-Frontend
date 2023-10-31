import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ProfileModalProp, RegisterSchema, User, registerSchema } from '../types/types'
import { AppDispatch } from '../redux/store'
import { editUser } from '../redux/slices/users/userSlice'

export default function Profile(prop: ProfileModalProp) {
  if (!prop.setIsProfileOpen) return null

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) })

  const dispatch = useDispatch<AppDispatch>()
  const [userChanges, setUserChanges] = useState<User>(prop.user)
  const [isEdit, setIsEdit] = useState(false)

  function handleEdit() {
    setIsEdit(true)
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
    toast.success('category details updated successfully!')
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
          {!isEdit && (
            <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center">
              <img
                className="object-cover w-16 h-16 rounded-full ring ring-[#be9995]"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
                alt=""></img>
              <p>First Name: {prop.user.firstName}</p>
              <p>Last Name: {prop.user.lastName}</p>
              <p>Email: {prop.user.email}</p>
              <button onClick={handleEdit}>Edit</button>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          )}
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
                    type="name"
                    name="name"
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
                    type="name"
                    name="name"
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
                    type="name"
                    name="name"
                    value={userChanges.email}
                  />
                </label>
              </div>
              {errors.email && <span className="text-[#be9995]"> {errors.email.message} </span>}

              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  className="h-12 w-12 bg-[#727E7E] rounded-full text-[#D0CDD3]">
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="h-12 w-12 bg-[#be9995] rounded-full text-[#D0CDD3] text-sm">
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
