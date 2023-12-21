import React, { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { AppDispatch } from '../redux/store'
import { sendEmailThunk } from '../redux/slices/users/userSlice'
import { EmailSchema, emailSchema } from '../types/types'

export default function ForgotPassword() {
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<EmailSchema>({ resolver: zodResolver(emailSchema) })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  function handleFormSubmit() {
    dispatch(sendEmailThunk(email))
  }

  return (
    <div className="min-h-screen items-start">
      <section>
        <div className="container flex justify-center mt-10 mb-20 px-3 mx-auto">
          <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full max-w-md">
            <div className="flex items-center justify-center mt-6">
              <Link
                to={'/login'}
                className="w-1/3 pb-4 font-medium text-center text-primary_pink capitalize border-b-2 border-primary_green">
                Login
              </Link>

              <Link
                to={'/register'}
                className="w-1/3 pb-4 font-medium text-center text-primary_grey capitalize border-b">
                Register
              </Link>
            </div>

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
                {...register('email')}
                autoComplete="email"
                onChange={handleChange}
                className="block w-full py-3 border border-primary_grey rounded-lg px-11"
                placeholder="Email address"
              />
            </div>
            {errors.email && (
              <span className="text-primary_pink"> {errors.email.message} </span>
            )}

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-primary_grey capitalize transition-colors duration-300 transform bg-primary_pink rounded-lg hover:bg-primary_green">
                {/* {isLoading? "Loging in..." : "Login"} */} Send Email
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
