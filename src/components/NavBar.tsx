import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div>
      <nav className="bg-red-200 flex">
        <ul className="flex space-x-4 p-6">
          <li className="flex-auto">
            <Link to="/"> Home </Link>
          </li>
          <li className="flex-auto">
            <Link to="/admin"> Admin </Link>
          </li>
          <li className="flex-auto">
            <Link to="/products"> Products </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
