import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen items-start">
      <div className="flex flex-col p-40">
        <h1 className=" text-9xl font-bold text-primary_pink pb-5">Oops!</h1>
        <h1 className="text-4xl text-primary_green">
          Sorry we looked everywhere and we can't seem to find the page you're looking for.
        </h1>
        <h1 className="text-2xl text-primary_pink pb-5">Error code: 404</h1>
        <h1 className="text-xl text-primary_green">Here are some helpful links instead:</h1>
        <ul className="text-primary_pink text-lg p-3">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
