import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { EditUserSchema, ProfileModalProp, User } from '../../types/types'
import { AppDispatch } from '../../redux/store'
import { updateUserThunk } from '../../redux/slices/users/userSlice'
import { editLogedInUser } from '../../redux/slices/users/logedinUserSlice'
import { editUserSchema } from '../../schemas/schemas'

export default function Profile(prop: ProfileModalProp) {
  if (!prop.isModalOpen) return null

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EditUserSchema>({ resolver: zodResolver(editUserSchema) })

  const dispatch = useDispatch<AppDispatch>()
  const [userChanges, setUserChanges] = useState<User>(prop.user)
  const [newAvatar, setNewAvatar] = useState<File | undefined>(undefined)

  // handle user changes
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setUserChanges({
      ...userChanges,
      [name]: value
    })
  }

  // handle upload avatar
  const handleUploadAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) setNewAvatar(e.target.files[0])
  }

  // handle submit
  function handleFormSubmit() {
    const userData = new FormData()
    userData.append('firstName', userChanges.firstName)
    userData.append('lastName', userChanges.lastName)
    if (newAvatar) userData.append('avatar', userChanges.avatar)

    dispatch(updateUserThunk({ user: userData, userId: userChanges._id}))
    dispatch(editLogedInUser({ newUser: userChanges }))
    toast.success('user details updated successfully!')
    // Close the form
    prop.setIsModalOpen(false)
  }

  // handle close modal
  function handleCloseModal() {
    prop.setIsModalOpen(false)
  }

  return (
    <div>
      <div className="modal-overlay">
        <div className="modal-content">
          {/* Edit form */}
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