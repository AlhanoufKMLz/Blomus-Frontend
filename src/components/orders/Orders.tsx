import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../redux/store'

export default function Orders() {
  const orders = useSelector((state: RootState) => state.orders)

  return (
    <div className="flex flex-col min-h-screen align-middle">
      {orders.isLoading && <h3> Loading categories...</h3>}
      <table className="md:mx-40 md:my-8 w-9/12">
        <tbody>
          <tr className="text-left text-[#be9995]">
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Date</th>
            <th>User ID</th>
          </tr>
          {orders.orders.map((order) => (
            <tr className="border-t-2" key={order.id}>
              <td className="text-[#727E7E]">{order.id}</td>
              <td className="text-[#727E7E]">{order.productid}</td>
              <td className="text-[#727E7E]">{order.purchasedAt}</td>
              <td className="text-[#727E7E]">{order.userid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
