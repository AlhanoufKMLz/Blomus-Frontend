import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '../../../redux/store'
import { useState } from 'react'
import React from 'react'
import OrderDetails from './OrderDetails'
import { STATUS } from '../../../constants/constants'
import { updateOrderStatusThunk } from '../../../redux/slices/orders/orderSlice'

export default function OrdersManager() {
  const dispatch = useDispatch<AppDispatch>()
  const orders = useSelector((state: RootState) => state.orders)

  const [showMoreOrder, setShowMoreOrder] = useState('')

  // handle change order status
  const handleChangeStatus = (orderStatus: string, orderId: string) => {
    dispatch(updateOrderStatusThunk({ orderStatus, orderId }))
  }

  // handle show more order details
  const handleShowMore = (orderId: string) => {
    if (showMoreOrder === orderId) {
      setShowMoreOrder('')
      return
    }
    setShowMoreOrder(orderId)
  }

  // display orders table
  return (
    <div className="flex flex-col min-h-screen align-middle">
      {/* orders table */}
      <div className="max-h-[700px] overflow-y-auto  ml-16">
        <table className="md:mx-40 md:my-8 w-9/12">
          <tbody>
            <tr className="text-left text-primary_pink">
              <th>User</th>
              <th>Date</th>
              <th className="text-center">Status</th>
            </tr>

            {orders.orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border-t-2 border-zinc_secondery">
                  <td className="text-primary_green py-5">{order.user.firstName}</td>
                  <td className="text-primary_green">{order.orderDate.toLocaleString()}</td>
                  <td className="flex justify-center align-middle py-5">
                    <select
                      className="text-primary_green rounded-lg p-1"
                      onChange={(e) => handleChangeStatus(e.target.value, order._id)}>
                      {Object.values(STATUS).map((status) => (
                        <option key={status} value={status} selected={status === order.orderStatus}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-primary_pink text-right text-sm">
                    <button onClick={() => handleShowMore(order._id)}>Show more...</button>
                  </td>
                </tr>
                {showMoreOrder === order._id && <OrderDetails orders={order.products} />}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
