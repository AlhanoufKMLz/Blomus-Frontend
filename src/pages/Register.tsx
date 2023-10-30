import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { User } from '../types/types'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, fetchUsers } from '../redux/slices/users/userSlice'
import { Link } from 'react-router-dom'

export default function Register() {
  const dispatch = useDispatch<AppDispatch>()
  const users = useSelector((state: RootState) => state.users)
  const [userData, setUserData] = useState<User>({
    firstName: '',
    lastName: '',
    id: 0,
    email: '',
    password: '',
    role: 'visitor'
  })
  const navigate = useNavigate()

  //Fetching the data
  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const userFound = users.users.find((user) => user.email == userData.email)
    if (!userFound) {
      navigate('/')
      setUserData({ ...userData, id: Number(new Date()) })
      dispatch(addUser({ user: userData }))
    } else console.log('An account with this email is already existed')
  }

  return (
    <div className="min-h-screen items-start">
      <section>
        <div className="container flex justify-center px-3 mx-auto mt-10 mb-20">
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex items-center justify-center mt-6">
              <Link
                to={'/login'}
                className="w-1/3 pb-4 font-medium text-center text-[#D0CDD3] capitalize border-b">
                Login
              </Link>

              <Link
                to={'/register'}
                className="w-1/3 pb-4 font-medium text-center text-[#be9995] capitalize border-b-2 border-[#727E7E]">
                Register
              </Link>
            </div>

            {/* first name container */}
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-[#727E7E]"
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
                name="first-name"
                id="first-name"
                onChange={handleChange}
                className="block w-full py-3 border rounded-lg px-11"
                placeholder="First Name"
              />
            </div>

            {/* last name container */}
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-[#727E7E]"
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
                name="last-name"
                id="last-name"
                onChange={handleChange}
                className="block w-full py-3 border rounded-lg px-11"
                placeholder="Last Name"
              />
            </div>

            {/* email container */}
            <div className="relative flex items-center mt-6">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-[#727E7E]"
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
                name="email"
                id="email"
                onChange={handleChange}
                className="block w-full py-3 border rounded-lg px-11"
                placeholder="Email address"
              />
            </div>

            {/* password container */}
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-[#727E7E]"
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
                name="password"
                id="password"
                onChange={handleChange}
                className="block w-full py-3 border rounded-lg px-11"
                placeholder="Password"
              />
            </div>

            {/* confirm password container */}
            <div className="relative flex items-center mt-4">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-[#727E7E]"
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
                name="confirm-password"
                id="confirm-password"
                className="block w-full py-3 border rounded-lg px-11"
                placeholder="Confirm Password"
              />
            </div>

            <div className="mt-6">
              <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-[#D0CDD3] capitalize transition-colors duration-300 transform bg-[#be9995] rounded-lg hover:bg-[#727E7E]">
                Regisret
              </button>

              <div className="mt-6 text-center text-[#727E7E] hover:text-[#be9995]">
                <Link to={'/login'}>Already have an account?</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
