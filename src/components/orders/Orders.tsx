import React from 'react'
import { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'

export default function Orders() {
  const orders = useSelector((state: RootState) => state.orders)

  return (
    <div className="grid">
      {orders.isLoading && <h3> Loading categories...</h3>}
      <table>
        <tbody>
          <tr className="text-left">
            <th>Order ID</th>
            <th>Product ID</th>
            <th>Date</th>
            <th>User ID</th>
          </tr>
          {orders.items.map((order) => (
            <tr className="border-t-2" key={order.id}>
              <td>{order.id}</td>
              <td>{order.productid}</td>
              <td>{order.purchasedAt}</td>
              <td>{order.userid}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
