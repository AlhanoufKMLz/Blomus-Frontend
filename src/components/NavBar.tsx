import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from '../redux/store'
import { logoutUser } from '../redux/slices/users/logedinUserSlice'
import Profile from './Profile'

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector((state: RootState) => state.cart)
  const logedinUser = useSelector((state: RootState) => state.logedinUser.user)

  const [isOpen, setIsOpen] = useState(false)
  const [isProfileOpe, setIsProfileOpen] = useState(false)

  function handleOpenNavBar() {
    setIsOpen(true)
  }

  function handleCloseNavBar() {
    setIsOpen(false)
  }

  function handleLogout() {
    dispatch(logoutUser())
  }

  function handleOpenProfile() {
    setIsProfileOpen(true)
  }

  return (
    <div>
      <nav className="relative">
        <div className="px-3 py-6 md:justify-between md:flex md:w-screen md:items-center">
          <div className="flex">
            <Link to="/">
              <img className="w-auto h-6 md:h-7" src="#" alt="" />
            </Link>

            {/* <!-- Mobile menu button --> */}
            <div className="flex md:hidden">
              {!isOpen && (
                <button
                  onClick={handleOpenNavBar}
                  type="button"
                  className="text-[#727E7E] hover:text-[#D0CDD3]"
                  aria-label="open menu">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                  </svg>
                </button>
              )}
              {isOpen && (
                <button
                  onClick={handleCloseNavBar}
                  type="button"
                  className="text-[#727E7E] hover:text-[#D0CDD3]"
                  aria-label="close menu">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
          <div
            className={
              isOpen
                ? 'absolute inset-x-0 z-20 w-full py-4 px-5 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative bg-zinc-100 md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center'
                : 'hidden md:flex md:items-center md:w-auto'
            }>
            <div className="flex flex-col md:flex-row md:mx-6">
              {logedinUser?.role === 'admin' && (
                <Link
                  className="text-[#727E7E] transition-colors duration-300 transform hover:text-[#D0CDD3] md:mx-4 md:my-0"
                  to={'/dashboard'}>
                  DashBoard
                </Link>
              )}
              <Link
                className="my-2 text-[#be9995] transition-colors duration-300 transform hover:text-[#D0CDD3] md:mx-4 md:my-0"
                to={'/'}>
                Home
              </Link>
              <Link
                className="my-2 text-[#727E7E] transition-colors duration-300 transform  hover:text-[#D0CDD3] md:mx-4 md:my-0"
                to={'/products'}>
                Products
              </Link>
              {logedinUser === null && (
                <Link
                  className="my-2 text-[#be9995] transition-colors duration-300 transform hover:text-[#D0CDD3] md:mx-4 md:my-0"
                  to={'/login'}>
                  Login
                </Link>
              )}
              {logedinUser !== null && (
                <div>
                  <Link
                    className="my-2 text-[#be9995] transition-colors duration-300 transform hover:text-[#D0CDD3] md:mx-4 md:my-0"
                    onClick={handleLogout}
                    to={'/'}>
                    Logout
                  </Link>
                  <button onClick={handleOpenProfile}>Profile</button>
                </div>
              )}
              <Link to={'/cart'}>
                <div className="relative py-2 p-6">
                  <a
                    className="relative text-[#727E7E] transition-colors duration-300 transform hover:text-[#D0CDD3]"
                    href="#">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="absolute top-0 right-0">
                      <p className="absolute -top-2 left-0 flex h-0 w-1 items-center justify-center rounded-full bg-[#be9995] p-2 text-xs text-white">
                        {cart.numberOfItems}
                      </p>
                    </div>
                  </a>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {isProfileOpe && logedinUser && (
        <Profile
          isProfileOpen={isProfileOpe}
          user={logedinUser}
          setIsProfileOpen={setIsProfileOpen}
        />
      )}
    </div>
  )
}
