import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'

export default function Orders() {
  const orders = useSelector((state: RootState) => state.orders)

  return (
    <div className="flex flex-col min-h-screen align-middle">
      {orders.isLoading && <h3> Loading orders...</h3>}
      {orders.error && <h3> {orders.error}</h3>}
      <div className="max-h-[600px] overflow-y-auto  ml-16">
        <table className="md:mx-40 md:my-8 w-9/12">
          <tbody>
            <tr className="text-left text-primary_pink">
              <th>Order ID</th>
              <th>Product ID</th>
              <th>Date</th>
              <th>User ID</th>
            </tr>
            {orders.orders.map((order) => (
              <tr className="border-t-2 border-zinc_secondery" key={order.id}>
                <td className="text-primary_green py-5">{order.id}</td>
                <td className="text-primary_green">{order.productid}</td>
                <td className="text-primary_green">{order.purchasedAt}</td>
                <td className="text-primary_green">{order.userid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
