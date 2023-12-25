import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { AppDispatch, RootState } from '../redux/store'
import { loginUserThunk } from '../redux/slices/users/logedinUserSlice'
import { LoginSchema, loginSchema } from '../types/types'
import { fetchCartItemsThunk } from '../redux/slices/cart/cartSlice'
import { fetchWishlistItemsThunk } from '../redux/slices/wishlist/wishlistSlice'

export default function Login() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [userLogin, setUserLogin] = useState({ email: '', password: '' })
  const {error, isLoading} = useSelector((state: RootState) => state.logedinUser)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserLogin({ ...userLogin, [name]: value })
  }

  function handleFormSubmit() {
    dispatch(loginUserThunk(userLogin)).then((res) => {
      if(res.meta.requestStatus === 'fulfilled'){
        //toast.success('Welcome back ' + res.payload.user.firstName + "! We're glad to see you again")
        dispatch(fetchCartItemsThunk())
        dispatch(fetchWishlistItemsThunk())
        navigate('/')
      } 
      if(res.meta.requestStatus === 'rejected'){
        toast.error(error)
      }
    })
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
                {...register('password')}
                autoComplete="current-password"
                onChange={handleChange}
                className="block w-full px-10 py-3 border border-primary_grey rounded-lg"
                placeholder="Password"
              />
            </div>
            {errors.password && (
              <span className="text-primary_pink"> {errors.password.message} </span>
            )}

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-primary_grey capitalize transition-colors duration-300 transform bg-primary_pink rounded-lg hover:bg-primary_green">
                {isLoading? "Loging in..." : "Login"}
              </button>
              <div className="mt-6 text-center text-primary_green hover:text-primary_pink">
                <Link to={'/forgot-password'}>Forgot you&lsquo;re password?</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
