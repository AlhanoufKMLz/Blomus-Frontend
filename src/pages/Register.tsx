import React, { ChangeEvent, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'

import { User, registerSchema } from '../types/types'
import { AppDispatch, RootState } from '../redux/store'
import { registerUser } from '../redux/slices/users/userSlice'

export default function Register() {
  const dispatch = useDispatch<AppDispatch>()
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const { error, isLoading } = useSelector((state: RootState) => state.users)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<User>({ resolver: zodResolver(registerSchema) })

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  function handleFormSubmit() {
    dispatch(registerUser(userData)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success(
          'Welcome, ' +
            res.payload.user.firstName +
            "! We're hrilled to have you here. Check your email to activate your account"
        )
        navigate('/login')
      }
      if (res.meta.requestStatus === 'rejected') {
        toast.error(error)
      }
    })
  }

  return (
    <div className="min-h-screen items-start">
      <section>
        <div className="container flex justify-center px-3 mx-auto mt-10 mb-20">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-md">
            <div className="flex items-center justify-center mt-6">
              <Link
                to={'/login'}
                className="w-1/3 pb-4 font-medium text-center text-primary_grey capitalize border-b">
                Login
              </Link>

              <Link
                to={'/register'}
                className="w-1/3 pb-4 font-medium text-center text-primary_pink capitalize border-b-2 border-primary_green">
                Register
              </Link>
            </div>

            {/* first name container */}
            <div className="relative flex items-center mt-8">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>

              <input
                type="text"
                id="first-name"
                {...register('firstName')}
                onChange={handleChange}
                className="block w-full py-3 border border-primary_grey rounded-lg px-11"
                placeholder="First Name"
              />
            </div>
            {errors.firstName && (
              <span className="text-primary_pink"> {errors.firstName.message} </span>
            )}

            {/* last name container */}
            <div className="relative flex items-center mt-8">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>

              <input
                type="text"
                id="last-name"
                {...register('lastName')}
                onChange={handleChange}
                className="block w-full py-3 border border-primary_grey rounded-lg px-11"
                placeholder="Last Name"
              />
            </div>
            {errors.lastName && (
              <span className="text-primary_pink"> {errors.lastName.message} </span>
            )}

            {/* email container */}
            <div className="relative flex items-center mt-6">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                type="email"
                id="email"
                autoComplete="email"
                {...register('email')}
                onChange={handleChange}
                className="block w-full py-3 border border-primary_grey rounded-lg px-11"
                placeholder="Email address"
              />
            </div>
            {errors.email && <span className="text-primary_pink"> {errors.email.message} </span>}

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
                autoComplete="current-password"
                {...register('password')}
                onChange={handleChange}
                className="block w-full py-3 border border-primary_grey rounded-lg px-11"
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <span className="text-primary_pink"> {errors.password.message} </span>
            )}

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-primary_grey capitalize transition-colors duration-300 transform bg-primary_pink rounded-lg hover:bg-primary_green">
                {isLoading ? 'Registering...' : 'Register'}
              </button>

              <div className="mt-6 text-center text-primary_green hover:text-primary_pink">
                <Link to={'/login'}>Already have an account?</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
