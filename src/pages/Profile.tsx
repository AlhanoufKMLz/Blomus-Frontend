import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../redux/store'
import { fetchSingleUserThunk } from '../redux/slices/users/logedinUserSlice'
import { useNavigate } from 'react-router'
import { fetchOrderHistoryThunk } from '../redux/slices/orders/orderSlice'
import { Link } from 'react-router-dom'
import ProfileFormModal from '../components/Global/ProfileFormModal'

export default function Profile() {
  // make sure user is loged in
  const navigate = useNavigate()
  const decoded = useSelector((state: RootState) => state.logedinUser.decodedUser)
  if (!decoded) {
    navigate('/login')
    return null
  }

  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootState) => state.logedinUser.user)
  const history = useSelector((state: RootState) => state.orders.orders)

  const [isModalOpen, setIsModalOpen] = useState(false)

  // fetch user and user history
  useEffect(() => {
    Promise.all([
      dispatch(fetchSingleUserThunk(decoded.userId)),
      dispatch(fetchOrderHistoryThunk())
    ])
  }, [])

  // handle open edit profile form
  function handleEdit() {
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen flex flex-col items-center gap-10 mx-5">
      {/* Display user info */}
      <div className="text-primary_pink bg-white rounded-lg p-2 w-fit mt-5">
        <div className="flex justify-between m-1">
          <button onClick={handleEdit}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" fill="white" fillOpacity="0.01" />
              <path
                d="M42 26V40C42 41.1046 41.1046 42 40 42H8C6.89543 42 6 41.1046 6 40V8C6 6.89543 6.89543 6 8 6L22 6"
                stroke="#727E7E"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14 26.7199V34H21.3172L42 13.3081L34.6951 6L14 26.7199Z"
                fill="none"
                stroke="#727E7E"
                strokeWidth="4"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="p-4 bg-gray-100 rounded-lg flex flex-col items-center gap-4">
          <img
            className="object-cover w-16 h-16 rounded-full ring ring-primary_pink"
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            alt=""
          />
          <div className="flex flex-col gap-3">
            <p className="border-b p-1 border-primary_grey">
              <span className="text-primary_green font-bold">FIRST NAME:</span> {user?.firstName}
            </p>
            <p className="border-b p-1 border-primary_grey">
              <span className="text-primary_green font-bold">LAST NAME: </span> {user?.lastName}
            </p>
            <p className="border-b p-1 border-primary_grey">
              <span className="text-primary_green font-bold">EMAIL:</span> {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Display order history */}
      <div className="flex flex-col gap-3 w-full">
        <h1 className="w-full text-xl text-primary_green mx-8 font-bold">Order History</h1>
        <div className="flex flex-col gap-4 m-6">
          {history.map((order) => {
            return (
              <ul className="flex bg-white rounded-lg p-5 gap-5  overflow-x-auto min-w-full max-w-fit">
                <li className="flex flex-col h-full text-xs gap-6 justify-items-center min-w-fit">
                  <div className="flex flex-col">
                    <span className="border-b border-primary_grey text-primary_pink">Date</span>
                    <span className="text-primary_green">{order.orderDate.toLocaleString()}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="border-b border-primary_grey text-primary_pink">
                      Order Status
                    </span>
                    <span className="text-primary_green">{order.orderStatus}</span>
                  </div>
                </li>
                {order.products.map((product) => {
                  return (
                    <li
                      key={product.product._id}
                      className="flex flex-col items-center justify-center">
                      <div className="relative flex w-40 h-40 bg-zinc rounded-lg shadow-lg shadow-[#c0c0c0] hover:shadow-none items-center justify-center">
                        <Link to={`/${product.product._id}`}>
                          <img
                            className="w-20"
                            src={`https://${product.product.image}`}
                            alt={product.product.name}
                          />
                        </Link>
                      </div>
                      <div className="relative w-40 -mt-10 overflow-hidden rounded-lg shadow-lg bg-secondary_grey">
                        <Link to={`/${product.product._id}`}>
                          <h3 className="py-1 font-bold tracking-wide text-xs text-center text-primary_green uppercase">
                            {product.product.name}
                          </h3>
                        </Link>

                        <div className="z-90 flex items-center text-xs justify-between px-3 py-1 bg-primary_pink">
                          <span className="text-secondary_grey">
                            {product.product.price * product.quantity} SAR
                          </span>
                          <span className="text-secondary_grey">{product.quantity} </span>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            )
          })}
        </div>
      </div>

      {/* Update profile form modal */}
      {user && (
        <ProfileFormModal isModalOpen={isModalOpen} user={user} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  )
}
