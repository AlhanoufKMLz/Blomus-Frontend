import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { AppDispatch, RootState } from '../../redux/store'
import { logout } from '../../redux/slices/users/logedinUserSlice'
import { ROLES } from '../../constants/constants'

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>()
  const cart = useSelector((state: RootState) => state.cart)
  const state = useSelector((state: RootState) => state.logedinUser)

  const [isOpen, setIsOpen] = useState(false)

  function handleOpenNavBar() {
    setIsOpen(true)
  }

  function handleCloseNavBar() {
    setIsOpen(false)
  }

  function handleLogout() {
    dispatch(logout())
    localStorage.removeItem('token')
  }

  return (
    <div>
      <nav>
        <div className="p-6 md:justify-between md:flex md:w-screen md:items-center">
          <div className="flex">
            <Link to="/">
              <img className="w-60 md:w-40" src="public/images/logo.png" alt="" />
            </Link>

            {/* <!-- Mobile menu button --> */}
            <div className="flex md:hidden">
              {!isOpen && (
                <button
                  onClick={handleOpenNavBar}
                  type="button"
                  className="text-primary_green hover:text-primary_grey"
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
                  className="text-primary_green hover:text-primary_grey"
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
                ? 'absolute inset-x-0 z-20 w-full py-4 px-5 transition-all duration-300 ease-in-out md:mt-0 md:p-0 md:top-0 md:relative bg-zinc md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center'
                : 'hidden md:flex md:items-center md:w-auto'
            }>
            <div className="flex flex-col md:flex-row md:mx-6 items-center">
              <Link
                className="my-2 text-primary_pink transition-colors duration-300 transform hover:text-primary_grey md:mx-4 md:my-0"
                to={'/'}>
                Home
              </Link>
              <Link
                className="my-2 text-primary_green transition-colors duration-300 transform  hover:text-primary_grey md:mx-4 md:my-0"
                to={'/products'}>
                Products
              </Link>
              {!state.decodedUser && (
                <Link
                  className="my-2 text-primary_pink transition-colors duration-300 transform hover:text-primary_grey md:mx-4 md:my-0"
                  to={'/login'}>
                  Login
                </Link>
              )}
              {state.decodedUser?.role === ROLES.ADMIN && (
                <Link
                  className="text-primary_pink transition-colors duration-300 transform hover:text-primary_grey md:mx-4 md:my-0"
                  to={'/dashboard'}>
                  DashBoard
                </Link>
              )}
              {state.decodedUser && (
                <div className="flex items-center">
                  <Link
                    className="my-2 text-primary_green transition-colors duration-300 transform hover:text-primary_grey md:mx-4 md:my-0"
                    onClick={handleLogout}
                    to={'/'}>
                    Logout
                  </Link>
                  <Link to={'/profile'}>
                    <img
                      className="object-cover w-8 h-8 rounded-full ring ring-primary_pink"
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      alt=""></img>
                  </Link>
                </div>
              )}
              <Link to={'/cart'}>
                <div className="relative pl-4 pr-2">
                  <a
                    className="relative text-primary_green transition-colors duration-300 transform hover:text-primary_grey"
                    href="#">
                    <svg
                      className="w-6 h-6"
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
                    {cart.itemsCount > 0 && (
                      <div className="absolute top-0 right-0">
                        <p className="absolute -top-2 -left-2 flex h-0 w-1 items-center justify-center rounded-full bg-primary_pink p-2 text-xs text-white">
                          {cart.itemsCount}
                        </p>
                      </div>
                    )}
                  </a>
                </div>
              </Link>
              <Link to={'/wishlist'}>
                <div className="relative">
                  <a
                    className="relative text-primary_green transition-colors duration-300 transform hover:text-primary_grey"
                    href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none">
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                        stroke="#be9995"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </a>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
