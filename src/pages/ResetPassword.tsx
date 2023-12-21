import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { useNavigate, useParams } from 'react-router'
import { resetPasswordThunk } from '../redux/slices/users/userSlice'
import { toast } from 'react-toastify'
import { LoginSchema } from '../types/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function ResetPassword() {
  const { resetPasswordToken = '' } = useParams<{ resetPasswordToken: string }>()
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState({ password: '', confirmPassword: '' })

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm<LoginSchema>({ resolver: zodResolver(newPassword) })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewPassword({ ...newPassword, [name]: value })
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault()
    const password = newPassword.password
    dispatch(resetPasswordThunk({ resetPasswordToken, password })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success(res.payload.message)
        navigate('/login')
      }
    })
  }

  return (
    <div className="min-h-screen items-start">
      <section>
        <div className="container flex justify-center mt-10 mb-20 px-3 mx-auto">
          <form onSubmit={handleFormSubmit} className="w-full max-w-md">
            <div className="flex items-center justify-center mt-6">
              <h1 className="text-3xl text-primary_green font-bold text-center p-4">
                Reset Password
              </h1>
            </div>
            {/* password container */}
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-primary_green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                id="password"
                // {...register('password')}
                name="password"
                onChange={handleChange}
                className="block w-full px-10 py-3 border border-primary_grey rounded-lg"
                placeholder="Password"
              />
            </div>
            {/* {errors.password && (
              <span className="text-primary_pink"> {errors.password.message} </span>
            )} */}

            {/* confirm password container */}
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-primary_green"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </span>

              <input
                type="password"
                id="confirm-password"
                // {...register('password')}
                name="confirmPassword"
                onChange={handleChange}
                className="block w-full px-10 py-3 border border-primary_grey rounded-lg"
                placeholder="Confirm Password"
              />
            </div>
            {/* {errors.password && (
              <span className="text-primary_pink"> {errors.password.message} </span>
            )} */}

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-primary_grey capitalize transition-colors duration-300 transform bg-primary_pink rounded-lg hover:bg-primary_green">
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
