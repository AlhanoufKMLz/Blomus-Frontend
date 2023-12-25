import React from 'react'
import { Product } from '../../../types/types'

export default function OrderDetails(prop: {orders:{product: Product, quantity: number}[]}) {
  return (
    <tr>
      <td colSpan={4}>
        <div className="p-4 m-4 bg-white rounded-lg">
          <table className="w-full">
            <tbody>
              <tr className="text-left text-primary_pink">
                <th>Image</th>
                <th>Name</th>
                <th className="text-center">Price</th>
                <th className="text-center">Quantity</th>
              </tr>
              {prop.orders.map((item) => (
                <tr className="border-t-2 border-zinc_secondery" key={item.product._id}>
                  <td className="pl-10 py-5">
                    {/* <img src={product.image} alt={product.name} width="50" /> */}
                  </td>
                  <td className="text-primary_green">{item.product.name}</td>
                  <td className="text-primary_green text-center">{item.product.price}</td>
                  <td className="text-primary_green text-center">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  )
}
