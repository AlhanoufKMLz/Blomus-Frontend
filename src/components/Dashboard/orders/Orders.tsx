import { useSelector } from 'react-redux'

import { RootState } from '../../../redux/store'
import { useState } from 'react'
import React from 'react'

export default function Orders() {
  const orders = useSelector((state: RootState) => state.orders)
  const [showMoreOrder, setShowMoreOrder] = useState('')

  const handleShowMore = (orderId: string) => {
    if (showMoreOrder === orderId) {
      setShowMoreOrder('')
      return
    }
    setShowMoreOrder(orderId)
  }
  return (
    <div className="flex flex-col min-h-screen align-middle">
      {orders.isLoading && <h3> Loading orders...</h3>}
      {orders.error && <h3> {orders.error}</h3>}
      <div className="max-h-[600px] overflow-y-auto  ml-16">
        <table className="md:mx-40 md:my-8 w-9/12">
          <tbody>
            <tr className="text-left text-primary_pink">
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
            </tr>

            {orders.orders.map((order) => (
              <React.Fragment key={order._id}>
                <tr className="border-t-2 border-zinc_secondery">
                  <td className="text-primary_green">{order.user.firstName}</td>
                  <td className="text-primary_green">{order.orderDate.toLocaleString()}</td>
                  <td className="text-primary_green">{order.orderStatus}</td>
                  <td className="text-primary_green text-right">
                    <button onClick={() => handleShowMore(order._id)}>Show details</button>
                  </td>
                </tr>
                {showMoreOrder === order._id && (
                  <tr>
                    <td colSpan={4}>
                      <div className="p-6 m-4 bg-white rounded-lg">
                        <table className='w-full'>
                          <tbody>
                            <tr className="text-left text-primary_pink">
                              <th>Image</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                            </tr>
                            {order.products.map((item) => (
                              <tr
                                className="border-t-2 border-zinc_secondery"
                                key={item.product._id}>
                                <td className="pl-10 py-5">
                                  {/* <img src={product.image} alt={product.name} width="50" /> */}
                                </td>
                                <td className="text-primary_green">{item.product.name}</td>
                                <td className="text-primary_green">{item.product.price}</td>
                                <td className="text-primary_green">{item.quantity}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
