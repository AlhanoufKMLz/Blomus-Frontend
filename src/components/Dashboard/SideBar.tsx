import React, { useState } from 'react'

import { SideBarProp } from '../../types/types'

export default function SideBar(prop: SideBarProp) {
  const [isOpen, setIsOpen] = useState(false)

  function handleOpenNavBar() {
    setIsOpen(true)
  }
  function handleCloseNavBar() {
    setIsOpen(false)
  }
  function handleNavigate(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const target = e.target as HTMLButtonElement
    prop.setSelectedComponent(target.value)
  }

  return (
    <div>
      <nav className="fixed px-3">
        <div
          className={
            isOpen
              ? 'absolute shadow-md rounded-r-lg inset-x-0 h-screen w-fit py-4 px-2 transition-all duration-300 ease-in-out text-primary_grey bg-primary_pink'
              : 'absolute shadow-md rounded-r-lg inset-x-0 h-screen w-20 py-4 px-2 transition-all duration-300 ease-in-out text-primary_grey bg-primary_pink'
          }>
          <ul className="flex flex-col">
            <li className="flex hover:text-primary_green rounded-lg my-3 px-5">
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
            </li>
            <li className="flex hover:bg-primary_grey hover:text-primary_green rounded-lg py-3 px-5">
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                  stroke="#727E7E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {isOpen && (
                <button
                  className="my-2 transition-colors duration-300 transform md:mx-4 md:my-0"
                  value={'products'}
                  onClick={handleNavigate}>
                  Products
                </button>
              )}
            </li>
            <li className="flex hover:bg-primary_grey hover:text-primary_green rounded-lg py-3 px-5">
              <svg width="24" height="24" viewBox="0 0 48 48">
                <g id="Layer_2" data-name="Layer 2">
                  <g id="invisible_box" data-name="invisible box">
                    <rect width="48" height="48" fill="none" />
                  </g>
                  <g id="icons_Q2" data-name="icons Q2">
                    <path
                      fill="#727E7E"
                      d="M24,7.7,29.3,16H18.6L24,7.7M24,2a2.1,2.1,0,0,0-1.7,1L13.2,17a2.3,2.3,0,0,0,0,2,1.9,1.9,0,0,0,1.7,1H33a2.1,2.1,0,0,0,1.7-1,1.8,1.8,0,0,0,0-2l-9-14A1.9,1.9,0,0,0,24,2Z"
                    />
                    <path
                      fill="#727E7E"
                      d="M43,43H29a2,2,0,0,1-2-2V27a2,2,0,0,1,2-2H43a2,2,0,0,1,2,2V41A2,2,0,0,1,43,43ZM31,39H41V29H31Z"
                    />
                    <path
                      fill="#727E7E"
                      d="M13,28a6,6,0,1,1-6,6,6,6,0,0,1,6-6m0-4A10,10,0,1,0,23,34,10,10,0,0,0,13,24Z"
                    />
                  </g>
                </g>
              </svg>
              {isOpen && (
                <button
                  className="my-2 transition-colors duration-300 transform md:mx-4 md:my-0"
                  value={'categories'}
                  onClick={handleNavigate}>
                  Categories
                </button>
              )}
            </li>
            <li className="flex hover:bg-primary_grey hover:text-primary_green rounded-lg py-3 px-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-people"
                viewBox="0 0 16 16">
                <path
                  fill="#727E7E"
                  d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                />{' '}
              </svg>
              {isOpen && (
                <button
                  className="my-2 transition-colors duration-300 transform md:mx-4 md:my-0"
                  value={'users'}
                  onClick={handleNavigate}>
                  Users
                </button>
              )}
            </li>
            <li className="flex hover:bg-primary_grey hover:text-primary_green rounded-lg py-3 px-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="#727E7E"
                className="bi bi-boxes"
                viewBox="0 0 16 16">
                <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />{' '}
              </svg>
              {isOpen && (
                <button
                  className="my-2 transition-colors duration-300 transform md:mx-4 md:my-0"
                  value={'orders'}
                  onClick={handleNavigate}>
                  Orders
                </button>
              )}
            </li>
            <li className="flex hover:bg-primary_grey hover:text-primary_green rounded-lg py-3 px-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 16 16"
                fill="#727E7E"
                className="cf-icon-svg">
                <path d="M2.865 8.14a2.553 2.553 0 1 1 2.552-2.552 2.555 2.555 0 0 1-2.552 2.553zm0-1.582a.97.97 0 1 0-.97-.97.97.97 0 0 0 .97.97zm7.942-1.991L3.914 14.886a1.03 1.03 0 0 1-1.712-1.143l6.893-10.32a1.03 1.03 0 0 1 1.712 1.144zm1.88 8.215a2.553 2.553 0 1 1-2.552-2.552 2.555 2.555 0 0 1 2.553 2.552zm-1.582 0a.97.97 0 1 0-.97.97.97.97 0 0 0 .97-.97z" />
              </svg>
              {isOpen && (
                <button
                  className="my-2 transition-colors duration-300 transform md:mx-4 md:my-0"
                  value={'discount'}
                  onClick={handleNavigate}>
                  Discount
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
